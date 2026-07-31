# 项目内容模型

## 项目基线

- 框架：VuePress 2。
- 主题：`vuepress-theme-plume@1.0.0-rc.203`。
- 包管理器：`pnpm@9.13.2`，以 `package.json#packageManager` 为准。
- 源目录：`docs/`。
- collection 注册入口：`docs/.vuepress/collections/index.ts`。
- 主题配置：`docs/.vuepress/config.ts`。
- 构建命令：`corepack pnpm docs:build`。
- 开发命令：`corepack pnpm docs:dev`。

开始任务时重新检查这些文件；项目配置可能随时间变化。

## post：独立博客文章

### 目录

文章放在 `docs/blog/`。子目录就是文章分类；优先复用已有分类，只有主题确实形成稳定类别时才新建目录。

新文件名优先使用简短的英文 kebab-case，例如：

```text
docs/blog/ai/agent-memory-design.md
```

编辑历史文件时保留原文件名和永久链接。

### Frontmatter

新 post 使用：

```yaml
---
title: 文章标题
createTime: YYYY/MM/DD HH:mm:ss
permalink: /blog/8位小写字母或数字/
tags:
  - 标签一
  - 标签二
cover: https://可选的可靠图片地址
---
```

规则：

- `title`、`createTime`、`permalink` 必填。
- 新文章统一使用 `/blog/<8字符>/`；历史文章中的 `/article/<8字符>/` 保持不变。
- permalink 必须在整个 `docs/` 中唯一。
- `tags` 推荐 2–5 个稳定标签，不为同义词创建多个标签。
- `cover` 可选。没有可靠图片时直接省略，不要虚构 URL。
- 需要草稿时使用 `draft: true`，草稿不进入发布流程。
- 正文从 `##` 开始。
- post 开头必须有简洁摘要，随后放置 `<!-- more -->`。

示例：

```markdown
---
title: 用可复现流程管理 AI 博客写作
createTime: 2026/07/31 15:30:00
permalink: /blog/a1b2c3d4/
tags:
  - AI
  - VuePress
---

本文介绍如何把大纲、写作、构建和发布串成一条可验证的博客工作流。

<!-- more -->

## 为什么需要统一流程
```

## doc：系列笔记与结构化文档

### 目录与首页

每个系列对应一个 collection：

```text
docs/<collection>/
├── README.md
├── 01-introduction.md
└── basic/
    └── 01-installation.md
```

`README.md` 负责介绍目标、读者、学习路线和章节索引。章节新文件优先使用带序号的 kebab-case；若现有 collection 已有稳定命名风格，则遵循现有风格。

章节至少包含：

```yaml
---
title: 章节标题
createTime: YYYY/MM/DD HH:mm:ss
---
```

README 可按需要增加稳定 permalink，例如 `/collection-name/`。不要为编辑既有章节重新生成 permalink 或 createTime。

### Collection 配置

新系列在 `docs/.vuepress/collections/<collection>.ts` 中定义：

```ts
import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  dir: '<collection>',
  title: '系列显示名称',
  sidebar: [
    'README.md',
    {
      text: '第一部分',
      prefix: 'basic',
      items: [
        '01-installation.md',
      ],
    },
  ],
})
```

在 `docs/.vuepress/collections/index.ts`：

```ts
import collectionName from './collection-name'

export default defineCollections([
  // existing collections
  collectionName,
])
```

约束：

- collection 文件名、变量名、`dir` 和实际目录保持可追踪的一致关系。
- TypeScript 变量名使用合法 camelCase 或 snake_case，不使用连字符。
- sidebar 中的文件名必须精确匹配磁盘文件。
- 子目录分组使用 `prefix`；根目录文件不设置 prefix。
- 新章节必须添加到 sidebar 的正确顺序。
- 如果系列适合按文件结构自动生成侧边栏，可使用官方支持的 `sidebar: 'auto'`，但本项目现有集合以显式 sidebar 为主，默认延续显式配置。

## 写作质量基线

- 先说明读者能解决什么问题，再展开背景。
- 技术文章至少包含一个真实可执行示例或明确的操作路径。
- 区分事实、推断和个人建议；时效性事实注明版本或日期。
- 首次出现的术语给出简短定义，不连续堆砌术语。
- 大段内容拆成有语义的小节，不滥用列表。
- 代码、配置、命令与正文保持一致；路径使用项目真实结构。
- 完成后搜索并移除 `TODO`、`待补充`、脚手架注释和空标题。
