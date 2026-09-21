<h1 align="center">AJohn Blog</h1>
<p align="center">
  <img src="https://github.com/zzyAJohn.png" width="200px" alt="avatar">
</p>
<p align="center">
  由 <a href="https://vuepress.vuejs.press/"><img alt="Static Badge" src="https://img.shields.io/badge/VuePress-2.0.0--rc.18-3eaf7c"></a>
  和 <a href="https://theme-plume.vuejs.press/"><img alt="Static Badge" src="https://img.shields.io/badge/vuepress--theme--plume-1.0.0--rc.119-5086a1"></a>
  驱动
</p>
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/blog-preview.png">
</p>

## 目录结构

个人博客，基于 VuePress 2 + vuepress-theme-plume，push 到 main 后由 GitHub Actions 自动构建部署。开发偏好与约束见 [AGENTS.md](./AGENTS.md)，每日开发记录见 [devlog/](./devlog/)。

| 目录 | 作用 |
|---|---|
| `docs/` | VuePress 站点源目录，**其中所有 md 都会发布为博客页面**（勿放内部文件） |
| `docs/blog/` | 博客文章（post 类型集合） |
| `docs/<collection>/` | 各主题系列笔记（doc 类型集合）：`cpp`、`cs61a`、`cs61b`、`design_pattern`、`eight`、`leetcode`、`music`、`photography`、`plant`、`projects`、`read`、`record`、`regimen`、`tv`、`works` |
| `docs/.vuepress/` | 站点与主题配置、自定义组件、构建产物（`dist/`） |
| `docs/.vuepress/collections/` | 每个 doc collection 的 `defineCollection` 定义与 sidebar，`index.ts` 汇总注册 |
| `docs/.vuepress/theme/` | 主题层定制：自定义组件（`components/`）、样式（`styles/`）、数据（`data/`） |
| `docs/.vuepress/public/` | 静态资源 |
| `devlog/` | 每日开发记录（`YYYY-MM-DD.md`，中文撰写），agent 复盘入口 |

## 关键文件

| 文件 | 作用 |
|---|---|
| `AGENTS.md` | 开发偏好与约束，agent 优先阅读 |
| `CLAUDE.md` | 指向 AGENTS.md（Claude Code 兼容入口） |
| `README.md` | 本文件：目录与文件作用说明 |
| `package.json` | 依赖与脚本（`docs:dev` / `docs:build` / `vp-update`） |
| `docs/.vuepress/config.ts` | VuePress 站点配置 |
| `docs/.vuepress/plume.config.ts` | plume 主题配置（navbar、collections 注册等） |
| `docs/.vuepress/navbar.ts` | 导航栏配置 |
| `docs/.vuepress/client.ts` | 客户端配置入口 |
| `.github/workflows/deploy.yml` | push main 自动构建部署 |
| `.claude/skills/plume-blog-publisher/` | 博客写作与发布 skill（写作任务优先使用） |

## 开发记录索引

（重要阶段/里程碑链接，随开发追加）
