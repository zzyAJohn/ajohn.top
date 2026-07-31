#!/usr/bin/env python3
"""Create a safe Markdown scaffold for this repository's Plume post/doc content."""

from __future__ import annotations

import argparse
import json
import re
import secrets
import string
import sys
from datetime import datetime
from pathlib import Path

PERMALINK_RE = re.compile(r"(?m)^permalink:\s*['\"]?([^'\"\s]+)")
ALPHABET = string.ascii_lowercase + string.digits


def yaml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def resolve_target(root: Path, value: str) -> Path:
    candidate = Path(value).expanduser()
    if not candidate.is_absolute():
        candidate = root / candidate
    candidate = candidate.resolve()
    try:
        candidate.relative_to(root)
    except ValueError as exc:
        raise ValueError(f"目标文件必须位于仓库内：{candidate}") from exc
    return candidate


def existing_permalinks(root: Path) -> set[str]:
    values: set[str] = set()
    for path in (root / "docs").rglob("*.md"):
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        match = PERMALINK_RE.search(text)
        if match:
            values.add(match.group(1))
    return values


def make_permalink(root: Path) -> str:
    used = existing_permalinks(root)
    for _ in range(1000):
        value = "/blog/" + "".join(secrets.choice(ALPHABET) for _ in range(8)) + "/"
        if value not in used:
            return value
    raise RuntimeError("无法生成唯一 permalink")


def ensure_new_markdown(root: Path, target: Path, mode: str) -> None:
    if target.suffix.lower() != ".md":
        raise ValueError("目标文件必须使用 .md 扩展名")
    if target.exists():
        raise FileExistsError(f"文件已存在，拒绝覆盖：{target}")

    docs = (root / "docs").resolve()
    blog = (docs / "blog").resolve()
    vuepress = (docs / ".vuepress").resolve()
    try:
        target.relative_to(docs)
    except ValueError as exc:
        raise ValueError("内容文件必须位于 docs/ 下") from exc

    if mode == "post":
        try:
            target.relative_to(blog)
        except ValueError as exc:
            raise ValueError("post 必须位于 docs/blog/ 下") from exc
    else:
        if target == docs / "README.md":
            raise ValueError("doc 模式不能覆盖站点首页 docs/README.md")
        try:
            target.relative_to(blog)
        except ValueError:
            pass
        else:
            raise ValueError("doc 不能位于 docs/blog/ 下")
        try:
            target.relative_to(vuepress)
        except ValueError:
            pass
        else:
            raise ValueError("doc 不能位于 docs/.vuepress/ 下")


def create_post(args: argparse.Namespace, root: Path, target: Path) -> str:
    permalink = args.permalink or make_permalink(root)
    if not re.fullmatch(r"/blog/[a-z0-9]{8}/", permalink):
        raise ValueError("新 post permalink 必须是 /blog/ 加 8 位小写字母或数字")
    if permalink in existing_permalinks(root):
        raise ValueError(f"permalink 已存在：{permalink}")

    lines = [
        "---",
        f"title: {yaml_string(args.title)}",
        f"createTime: {datetime.now().astimezone().strftime('%Y/%m/%d %H:%M:%S')}",
        f"permalink: {permalink}",
    ]
    if args.tag:
        lines.append("tags:")
        lines.extend(f"  - {yaml_string(tag)}" for tag in args.tag)
    if args.cover:
        lines.append(f"cover: {yaml_string(args.cover)}")
    lines.extend([
        "---",
        "",
        "<!-- plume-blog-publisher: replace this scaffold content -->",
        "在这里根据大纲写一段有信息量的摘要。",
        "",
        "<!-- more -->",
        "",
        "## 正文",
        "",
        "在这里完成正文。",
        "",
    ])
    return "\n".join(lines)


def create_doc(args: argparse.Namespace) -> str:
    lines = [
        "---",
        f"title: {yaml_string(args.title)}",
        f"createTime: {datetime.now().astimezone().strftime('%Y/%m/%d %H:%M:%S')}",
    ]
    if args.permalink:
        if not args.permalink.startswith("/") or not args.permalink.endswith("/"):
            raise ValueError("doc permalink 必须以 / 开始并以 / 结束")
        lines.append(f"permalink: {args.permalink}")
    lines.extend([
        "---",
        "",
        "<!-- plume-blog-publisher: replace this scaffold content -->",
        "## 本章目标",
        "",
        "在这里根据大纲完成章节内容。",
        "",
    ])
    return "\n".join(lines)


def parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest="mode", required=True)
    for mode in ("post", "doc"):
        s = sub.add_parser(mode)
        s.add_argument("--root", default=".", help="仓库根目录，默认当前目录")
        s.add_argument("--file", required=True, help="目标 Markdown 文件，建议使用仓库相对路径")
        s.add_argument("--title", required=True)
        s.add_argument("--permalink")
        if mode == "post":
            s.add_argument("--tag", action="append", default=[], help="可重复传入")
            s.add_argument("--cover")
    return p


def main() -> int:
    args = parser().parse_args()
    root = Path(args.root).expanduser().resolve()
    if not (root / "package.json").is_file() or not (root / "docs").is_dir():
        print(f"错误：不像博客仓库根目录：{root}", file=sys.stderr)
        return 2
    try:
        target = resolve_target(root, args.file)
        ensure_new_markdown(root, target, args.mode)
        content = create_post(args, root, target) if args.mode == "post" else create_doc(args)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
    except (ValueError, FileExistsError, RuntimeError) as exc:
        print(f"错误：{exc}", file=sys.stderr)
        return 1
    print(target.relative_to(root))
    if args.mode == "post":
        match = PERMALINK_RE.search(content)
        if match:
            print(f"permalink={match.group(1)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
