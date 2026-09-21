# AGENTS.md — 开发偏好

> 本文件记录开发过程中的偏好与约束，agent 开工前必读。随开发持续追加，不删旧内容。

## 语言
- 回复使用中文；博客正文使用中文，代码示例注明语言
- Devlog 内容用中文撰写（用户也会阅读），目录名用英文 `devlog/`；文件路径、命令、报错原文保留原样

## 项目背景
- 个人博客（VuePress 2 + vuepress-theme-plume），通过 GitHub Actions 部署
- 写博客/发布相关任务优先使用已有的 `plume-blog-publisher` skill（`.claude/skills/plume-blog-publisher/`）

## 代码风格
- TypeScript，跟随仓库现有配置风格
- Vue 组件跟随 `docs/.vuepress/theme/` 下现有组件的写法

## 验证方式
- 改动主题配置或内容后运行 `pnpm docs:build` 验证构建
- 开发预览用 `pnpm docs:dev`；缓存问题用 `pnpm docs:dev-clean`

## 禁区
- **不许 fork 主题源码或修改 `node_modules`**——主题必须保持 npm 依赖形式可升级（`pnpm vp-update`），这是本项目最重要的约束
- 所有定制只放在 `docs/.vuepress/` 下的自有文件（`config.ts`、`plume.config.ts`、`collections/`、`theme/`、`client.ts`）
- 不依赖主题内部未导出的私有 API；主题定制优先用官方文档的插槽/配置机制
- 不提交用户未要求的改动；不覆盖用户已有的未提交修改
- 内部开发记录放仓库根目录 `devlog/`，不放 `docs/`（`docs/` 下所有 md 会被发布为博客页面）

## 历史决策
- 2026-09-21：曾实现"编辑器内嵌博客"（/write/ 页 + 页面级编辑按钮 + routeMeta 注入），验证可行后用户选择恢复原状并回退；相关技术结论（extendsPage 直接赋值 page.routeMeta、hono cors origin 数组只支持字符串、密码换 token 鉴权模型）记录在当日 devlog，独立编辑器项目 `~/Desktop/AJohn/ajohn-editor` 保留
