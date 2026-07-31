#!/usr/bin/env python3
"""Validate Markdown files created or edited by plume-blog-publisher."""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote

FRONTMATTER_RE = re.compile(r"\A---\n(.*?)\n---\n?", re.DOTALL)
SCALAR_RE_TEMPLATE = r"(?m)^{key}:\s*(.*?)\s*$"
LINK_RE = re.compile(r"(?<!@)\!?\[[^\]]*\]\(([^)]+)\)")
PERMALINK_RE = re.compile(r"(?m)^permalink:\s*['\"]?([^'\"\s]+)")
POST_PERMALINK_RE = re.compile(r"^/(?:blog|article)/[a-z0-9]{8}/$")
TIME_RE = re.compile(r"^\d{4}/\d{2}/\d{2} \d{2}:\d{2}:\d{2}$")
SCAFFOLD_MARKER = "plume-blog-publisher: replace this scaffold content"


def scalar(frontmatter: str, key: str) -> str | None:
    match = re.search(SCALAR_RE_TEMPLATE.format(key=re.escape(key)), frontmatter)
    if not match:
        return None
    return match.group(1).strip().strip("'\"")


def strip_fenced_code(text: str) -> str:
    result: list[str] = []
    fence: str | None = None
    for line in text.splitlines():
        stripped = line.lstrip()
        marker = "```" if stripped.startswith("```") else "~~~~" if stripped.startswith("~~~~") else None
        if marker:
            fence = None if fence == marker else marker if fence is None else fence
            continue
        if fence is None:
            result.append(line)
    return "\n".join(result)


def changed_markdown(root: Path) -> list[Path]:
    proc = subprocess.run(
        ["git", "status", "--porcelain=v1", "-z", "--", "docs"],
        cwd=root,
        check=True,
        stdout=subprocess.PIPE,
    )
    paths: list[Path] = []
    chunks = proc.stdout.decode("utf-8", errors="surrogateescape").split("\0")
    i = 0
    while i < len(chunks):
        entry = chunks[i]
        if not entry:
            break
        status = entry[:2]
        name = entry[3:]
        if status[0] in "RC" or status[1] in "RC":
            i += 1
            if i < len(chunks):
                name = chunks[i]
        path = root / name
        if path.suffix.lower() == ".md" and path.exists():
            paths.append(path.resolve())
        i += 1
    return paths


def resolve_files(root: Path, values: list[str], use_changed: bool) -> list[Path]:
    paths = changed_markdown(root) if use_changed else []
    for value in values:
        p = Path(value).expanduser()
        if not p.is_absolute():
            p = root / p
        paths.append(p.resolve())
    unique: list[Path] = []
    seen: set[Path] = set()
    for path in paths:
        if path not in seen:
            unique.append(path)
            seen.add(path)
    return unique


def duplicate_permalinks(root: Path) -> dict[str, list[Path]]:
    found: defaultdict[str, list[Path]] = defaultdict(list)
    for path in (root / "docs").rglob("*.md"):
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        match = PERMALINK_RE.search(text)
        if match:
            found[match.group(1)].append(path)
    return {key: value for key, value in found.items() if len(value) > 1}


def check_local_links(path: Path, body: str) -> list[str]:
    errors: list[str] = []
    for raw in LINK_RE.findall(strip_fenced_code(body)):
        target = raw.strip()
        if target.startswith("<") and target.endswith(">"):
            target = target[1:-1]
        if " " in target and not target.startswith(("http://", "https://")):
            target = target.split(" ", 1)[0]
        target = target.split("#", 1)[0].split("?", 1)[0]
        if not target or target.startswith(("http://", "https://", "mailto:", "tel:", "data:", "/")):
            continue
        candidate = (path.parent / unquote(target)).resolve()
        if not candidate.exists():
            errors.append(f"本地链接不存在：{raw}")
    return errors


def check_file(root: Path, path: Path, strict_sidebar: bool) -> list[str]:
    errors: list[str] = []
    try:
        rel = path.relative_to(root)
    except ValueError:
        return ["文件位于仓库之外"]
    if not path.is_file():
        return ["文件不存在"]
    if path.suffix.lower() != ".md":
        return ["不是 Markdown 文件"]

    text = path.read_text(encoding="utf-8")
    match = FRONTMATTER_RE.match(text)
    if not match:
        return ["缺少有效 YAML frontmatter"]
    frontmatter = match.group(1)
    body = text[match.end():]

    title = scalar(frontmatter, "title")
    if not title:
        errors.append("frontmatter 缺少非空 title")
    if SCAFFOLD_MARKER in text:
        errors.append("仍包含脚手架占位标记")
    if re.search(r"(?im)^\s*(?:TODO|待补充)(?:\s|:|：|$)", strip_fenced_code(body)):
        errors.append("正文仍包含 TODO/待补充占位内容")

    prose = strip_fenced_code(body)
    if re.search(r"(?m)^#\s+\S", prose):
        errors.append("正文包含一级标题；页面标题已由 frontmatter 提供，应从 ## 开始")
    errors.extend(check_local_links(path, body))

    blog_root = (root / "docs" / "blog").resolve()
    try:
        path.relative_to(blog_root)
        is_post = True
    except ValueError:
        is_post = False

    if is_post:
        create_time = scalar(frontmatter, "createTime")
        permalink = scalar(frontmatter, "permalink")
        if not create_time or not TIME_RE.fullmatch(create_time):
            errors.append("post 的 createTime 必须是 YYYY/MM/DD HH:mm:ss")
        if not permalink or not POST_PERMALINK_RE.fullmatch(permalink):
            errors.append("post permalink 必须是 /blog/xxxxxxxx/；历史 /article/xxxxxxxx/ 也允许")
        if body.count("<!-- more -->") != 1:
            errors.append("post 必须且只能包含一个 <!-- more -->")
        else:
            summary = body.split("<!-- more -->", 1)[0]
            summary = re.sub(r"<!--.*?-->", "", summary, flags=re.DOTALL).strip()
            if len(summary) < 20:
                errors.append("<!-- more --> 前的摘要过短或为空")
    elif rel.parts[:1] == ("docs",) and len(rel.parts) >= 3 and rel.parts[1] != ".vuepress":
        collection = rel.parts[1]
        config = root / "docs" / ".vuepress" / "collections" / f"{collection}.ts"
        if not config.is_file():
            errors.append(f"找不到 doc collection 配置：{config.relative_to(root)}")
        elif strict_sidebar:
            config_text = config.read_text(encoding="utf-8")
            relative_in_collection = Path(*rel.parts[2:]).as_posix()
            basename = path.name
            if basename not in config_text and relative_in_collection not in config_text:
                errors.append(f"sidebar 未引用新章节：{relative_in_collection}")

    return errors


def parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--root", default=".")
    p.add_argument("--files", nargs="*", default=[])
    p.add_argument("--changed", action="store_true", help="校验 Git 状态中的已修改/未跟踪 Markdown")
    p.add_argument("--strict-sidebar", action="store_true")
    return p


def main() -> int:
    args = parser().parse_args()
    root = Path(args.root).expanduser().resolve()
    if not (root / "docs").is_dir():
        print(f"错误：找不到 docs/：{root}", file=sys.stderr)
        return 2
    files = resolve_files(root, args.files, args.changed)
    if not files:
        print("错误：请通过 --files 或 --changed 指定 Markdown 文件", file=sys.stderr)
        return 2

    failed = False
    for path in files:
        errors = check_file(root, path, args.strict_sidebar)
        label = str(path.relative_to(root)) if path.is_relative_to(root) else str(path)
        if errors:
            failed = True
            print(f"FAIL {label}")
            for error in errors:
                print(f"  - {error}")
        else:
            print(f"OK   {label}")

    duplicates = duplicate_permalinks(root)
    if duplicates:
        failed = True
        print("FAIL duplicate permalinks")
        for permalink, paths in sorted(duplicates.items()):
            joined = ", ".join(str(p.relative_to(root)) for p in paths)
            print(f"  - {permalink}: {joined}")

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
