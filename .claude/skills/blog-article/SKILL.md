---
name: blog-article
description: 在博客中创建或编辑文章。当用户要写博客、写文章、发布新内容时触发。
---

## 目标

在 VuePress 博客中创建或编辑一篇博客文章。

## 文章类型

博客文章属于 `post` 类型，存放在 `docs/blog/` 目录下。支持子文件夹分类：

- `docs/blog/xxx.md` — 直接放在根目录（零碎文章）
- `docs/blog/深度学习/xxx.md` — 按主题分类到子文件夹
- `docs/blog/随记/xxx.md` — 按主题分类到子文件夹

已有的子文件夹分类：深度学习、随记、博客相关、文档、一些小问题、C++ 等。用户可以选择已有分类或新建分类。

## frontmatter 格式

每篇文章必须包含以下 frontmatter：

```yaml
---
title: 文章标题
createTime: YYYY/MM/DD HH:mm:ss
permalink: /blog/随机字符串/
tags:
    - 标签1
    - 标签2
---
```

- `title`：文章标题
- `createTime`：创建时间，格式 `YYYY/MM/DD HH:mm:ss`
- `permalink`：永久链接，格式 `/blog/随机字符/`，随机字符用 8 位小写字母+数字
- `tags`：标签列表，可选但推荐

## 写作规范

- 用中文撰写
- 用实际例子说话，不讲空话
- 开头用 `<!-- more -->` 截断，前面的内容作为摘要展示在列表页
- 标题用 `##` 作为一级标题（因为 title 已经在 frontmatter 中）

## 操作步骤

1. 确定文章分类（已有子文件夹或新建）
2. 确定文件名（英文，kebab-case，如 `my-article.md`）
3. 创建文件，写入 frontmatter
4. 撰写文章内容
