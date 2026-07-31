# 构建、预览与发布

## 当前部署链路

项目的 `.github/workflows/deploy.yml` 在 push 到 `main` 后执行：

1. 检出完整 Git 历史；
2. 安装 pnpm；
3. 使用 Node.js 20；
4. 执行 `pnpm install --frozen-lockfile`；
5. 执行 `pnpm run docs:build`；
6. 将 `docs/.vuepress/dist` 部署到 `blog_pages`；
7. 写入自定义域名 `ajohn.top`。

线上部署依赖 GitHub Actions 和仓库密钥。不要直接修改 `blog_pages`，不要提交 `docs/.vuepress/dist`。

## 本地构建

从仓库根目录运行：

```bash
corepack pnpm docs:build
```

项目 `package.json` 声明 `pnpm@9.13.2`。优先通过 Corepack 使用声明版本，避免系统中其他 pnpm 自动重建 `node_modules`。

若依赖尚未安装或锁文件发生变化：

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm docs:build
```

不要无理由更新依赖或锁文件。构建失败时保留完整错误，定位到内容、组件语法、collection 或依赖问题后再修复。

## 本地预览

开发模式：

```bash
corepack pnpm docs:dev
```

静态构建预览：

```bash
corepack pnpm docs:build
corepack pnpm docs:preview
```

检查：

- 页面标题、摘要与 `<!-- more -->`；
- post 列表、分类与标签；
- doc sidebar 顺序、章节链接和 README；
- 代码高亮、容器嵌套、Mermaid/PlantUML；
- 视频、PDF、外部链接和本地图片；
- 桌面与窄屏布局；
- 浏览器控制台明显错误。

## 提交前检查

```bash
git status --short --branch
git diff --check
git diff -- <本次涉及的文件>
```

只暂存本次任务文件：

```bash
git add -- <内容文件> <collection 配置文件>
git diff --cached --check
git diff --cached
```

绝不能使用 `git add .` 把用户已有的无关修改带入提交。若目标文件本来就有用户修改，先确认并保留其内容。

建议提交信息：

```text
docs(blog): add <文章主题>
docs(notes): add <系列或章节主题>
docs(blog): update <文章主题>
```

## 推送与 GitHub Actions

发布要求必须明确指向上线或推送。确认当前分支：

```bash
git branch --show-current
```

该项目只有 `main` push 会触发网页部署。如果不在 `main`，不要强推或擅自改写历史；选择切回 main、合并/变基，或请用户决定 PR 流程。

构建成功并确认暂存内容后：

```bash
git commit -m "docs(blog): add <主题>"
git push origin main
```

如果安装了 GitHub CLI：

```bash
gh run list --workflow deploy.yml --branch main --limit 1
gh run watch <run-id> --exit-status
```

没有 `gh` 时，使用已登录的浏览器查看仓库 Actions 页面。只有 workflow 成功后才报告部署成功；push 成功但 workflow 未完成时，明确报告“已推送，部署仍在进行”。

## 线上验证

根据页面 permalink 检查：

```text
https://ajohn.top<permalink>
```

至少确认：

- HTTP 页面可访问；
- 标题和一段独特正文已更新；
- CSS、代码块和增强组件正常渲染；
- doc 页面能从 sidebar 进入；
- post 能按预期出现在列表、分类或标签中。

CDN 或浏览器缓存可能造成短暂延迟。先刷新并等待合理时间，不要因此重复提交空改动。

## 失败边界

以下情况停止发布并报告：

- 内容校验或 VuePress 构建失败；
- collection/sidebar 指向不存在文件；
- 暂存区混入无关文件；
- Git 凭据或 GitHub Actions 密钥失败；
- 用户只要求草稿、写作或预览；
- `draft: true` 尚未移除；
- 线上页面与本地构建明显不一致。
