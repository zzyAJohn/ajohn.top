---
name: blog-notes
description: 创建笔记类内容（教程、学习笔记、系列文档）。当用户要写笔记、教程、学习记录、系列文档时触发。
---

## 目标

在 VuePress 博客中创建一套笔记类内容。笔记和博客文章不同，它有自己的目录结构、侧边栏导航，需要注册到 collections 系统中。

## 笔记 vs 博客文章

| | 博客文章 | 笔记 |
|---|---|---|
| 类型 | `post` | `doc` |
| 目录 | `docs/blog/` | `docs/<笔记名>/` |
| collections | 不需要修改 | 需要新建 .ts 并注册 |
| 侧边栏 | 无 | 有，按章节组织 |
| 适合 | 零碎文章、观点输出 | 教程、学习笔记、系列文档 |

## 创建笔记的完整步骤

### 第一步：创建目录结构

在 `docs/` 下新建笔记文件夹，内部按章节组织：

```
docs/<笔记名>/
├── README.md          ← 笔记首页（必须）
├── 1-章节一.md
├── 2-章节二.md
└── 子目录/            ← 可选，用于更细的分类
    └── xxx.md
```

### 第二步：创建 collection 文件

在 `docs/.vuepress/collections/` 下新建 `<笔记名>.ts`：

```typescript
import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: '<笔记名>',          // 对应 docs/ 下的文件夹名
  title: '笔记显示名称',
  sidebar: [
    'README.md',
    {
      text: '第一章标题',
      prefix: '子目录名',   // 如果文件直接放在根目录则不需要 prefix
      items: [
        '1-xxx.md',
        '2-xxx.md',
      ]
    },
    {
      text: '第二章标题',
      prefix: '子目录名',
      items: [
        '3-xxx.md',
        '4-xxx.md',
      ]
    },
  ]
})
```

### 第三步：注册到 index.ts

编辑 `docs/.vuepress/collections/index.ts`：

1. 在顶部添加 import：`import <笔记名> from './<笔记名>'`
2. 在 `defineCollections([...])` 数组中添加 `<笔记名>`

示例：
```typescript
import my_notes from './my_notes'

export default defineCollections([
  // ... 已有的 collections
  my_notes,
])
```

### 第四步：撰写内容

每篇笔记的 frontmatter：

```yaml
---
title: 章节标题
---
```

笔记的 frontmatter 比博客文章简单，一般只需要 title。createTime 和 permalink 通常不需要。

## sidebar 的两种写法

**平铺写法**（文件直接放在笔记根目录）：

```typescript
sidebar: [
  'README.md',
  '1-第一章.md',
  '2-第二章.md',
]
```

**分组写法**（文件放在子目录中）：

```typescript
sidebar: [
  'README.md',
  {
    text: '基础篇',
    prefix: 'base',        // 对应 docs/笔记名/base/ 目录
    items: [
      '1-xxx.md',
      '2-xxx.md',
    ]
  },
]
```

## 注意事项

- collection 文件名和 `dir` 字段要与 `docs/` 下的文件夹名一致
- sidebar 中的文件名要与实际文件名完全匹配（包括中文和空格）
- 修改 index.ts 后需要重启开发服务器才能生效
