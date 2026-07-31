---
name: plume-blog-publisher
description: 在当前 VuePress Theme Plume 博客中，把用户提供的大纲、素材或修改要求转化为完整的 post 博客文章或 doc 系列笔记，合理使用 Plume Markdown 容器与图表组件，维护 collection 和 sidebar，执行内容校验、本地构建与预览，并在用户明确要求发布时提交、推送 main、检查 GitHub Actions 和线上页面。用户提到写博客、创建文章、教程、学习笔记、系列文档、根据大纲成文、使用 Plume 组件、预览博客或发布网页时使用。
---

# Plume 博客创作与发布

把“内容判断、写作、页面集成、构建、发布”作为一个连续工作流处理；不要把单篇博客和系列笔记拆成互相竞争的 Skill。

## 开始前

1. 使用 `git rev-parse --show-toplevel` 定位仓库根目录，并在根目录工作。
2. 运行 `git status --short --branch`，记录用户已有修改。不得覆盖、删除、暂存或提交无关改动。
3. 阅读 [references/project-content-model.md](references/project-content-model.md)，再检查目标目录附近的现有页面与 collection 配置。
4. 涉及 Plume 排版时阅读 [references/plume-components.md](references/plume-components.md)。涉及预览或上线时阅读 [references/publishing-workflow.md](references/publishing-workflow.md)。
5. 若用户只给大纲，直接补足低风险的标题、过渡、示例和总结；仅在缺少目标受众、关键素材或发布范围会显著改变结果时询问。

## 选择内容模式

| 情况 | 模式 | 位置 | 必要集成 |
|---|---|---|---|
| 独立观点、经验总结、一次性教程、新闻解读 | `post` | `docs/blog/` | frontmatter、摘要、`<!-- more -->` |
| 多章节课程、系统学习笔记、长期维护的知识体系 | `doc` | `docs/<collection>/` | collection、README、sidebar |
| 给现有系列新增一章 | `doc` | 现有 collection 目录 | 更新对应 sidebar |

默认规则：内容可独立阅读且没有明确章节依赖时选 `post`；存在目录、章节顺序或持续扩展计划时选 `doc`。不要为只有一篇的内容新建 doc collection。

## 工作流

### 1. 解析大纲与素材

- 明确读者、文章目标、核心结论、先决知识和期望篇幅。
- 保留用户观点与语气，不把大纲机械扩写成重复段落。
- 将章节组织为“问题或背景 → 原理 → 操作或案例 → 验证 → 总结”。按内容需要调整，不强制所有文章套用同一模板。
- 对时效性、技术版本、引用数据或陌生事实进行核实；优先使用官方文档、论文、源码或项目仓库，并在正文中给出来源链接。
- 不编造命令输出、测试结果、引用、图片地址或个人经历。用户未提供封面时可以省略 `cover`。

### 2. 创建或定位页面

新页面可使用脚手架生成一致的 frontmatter，随后必须替换占位内容：

```bash
python3 .agents/skills/plume-blog-publisher/scripts/scaffold_content.py post \
  --root "$(git rev-parse --show-toplevel)" \
  --file docs/blog/<category>/<slug>.md \
  --title "文章标题" \
  --tag "标签一" --tag "标签二"
```

```bash
python3 .agents/skills/plume-blog-publisher/scripts/scaffold_content.py doc \
  --root "$(git rev-parse --show-toplevel)" \
  --file docs/<collection>/<chapter>.md \
  --title "章节标题"
```

- 编辑既有页面时不要重新生成 permalink 或 createTime。
- 脚手架拒绝覆盖已有文件；发生冲突时先检查文件内容。
- 新建 doc collection 时同时创建 `README.md`、`docs/.vuepress/collections/<name>.ts`，并注册到 `docs/.vuepress/collections/index.ts`。

### 3. 完成文章写作

- 使用中文，优先给出具体例子、可执行步骤、输入输出和验证方法。
- frontmatter 已提供标题，正文从 `##` 开始；避免正文使用一级标题。
- 默认采用用户的个人博客标题层级：二级标题写为 `## 1. 标题`，三级标题写为 `### 1.1 标题`；序号连续递进、与内容层级一致。标题使用短句，不加书名号，不写“标题：补充说明”式结构。仅当目标页面已有明确且需要保留的标题规范时，才沿用旧格式。
- 写作保持简洁，但不能只把大纲压缩成提纲。每个主要章节补足必要的背景、判断依据、操作细节或个人取舍，让读者知道该怎么做，也知道为什么这样做。
- 保持自然的个人博客口吻。少用“不是……而是……”“关键在于”“先……再……”等模板化句式和口号式小标题；优先用朴素、具体的表述。可以使用克制的第一人称来表达用户已提供的实践、偏好或经验；不得编造作者经历、实拍结果、设备使用感受或未提供的结论。
- post 在开头写有信息量的摘要，并把 `<!-- more -->` 放在摘要之后。
- doc 首页说明学习目标、适用读者、章节地图和阅读顺序；章节之间添加必要的前后关联。
- 代码示例注明语言，确保可以运行或明确标注伪代码。命令要说明执行目录和预期结果。
- 链接使用明确的描述文本；图片必须有可靠地址或项目内路径，并补充必要说明。
- 不保留 TODO、脚手架提示、空章节或未经说明的占位符。

### 4. 选择 Plume 组件

组件必须服务于理解，而不是为了装饰：

- 注意事项使用 `tip`、`warning`、`danger`、`details`。
- 顺序操作使用 `steps`；环境或方案切换使用 `tabs`；多语言代码使用 `code-tabs`。
- 目录结构使用 `file-tree`；方案概览使用 `card-grid`；演进过程使用 `timeline`。
- 简单流程优先 Mermaid；需要 UML 标准表达时使用 PlantUML。
- 仅在确有资源时嵌入 Bilibili、YouTube 或 PDF。

严格使用 [references/plume-components.md](references/plume-components.md) 中已验证的语法。若要使用未列出的组件，先核对项目安装版本和官方文档，再通过构建验证。

### 5. 集成 doc collection

- 新 collection 使用 `defineCollection({ type: 'doc', dir, title, sidebar })`。
- 在 `docs/.vuepress/collections/index.ts` 中添加 import，并加入 `defineCollections([...])`。
- sidebar 的文件名、大小写、空格、子目录和 `prefix` 必须与磁盘路径完全一致。
- 新章节必须进入 sidebar；README 必须能链接到主要章节。
- 修改 collection 后重新构建；开发服务器已运行时按需重启。

### 6. 验证

先检查实际改动文件：

```bash
git diff --check
git status --short
```

对本次新增或修改的 Markdown 运行内容校验：

```bash
python3 .agents/skills/plume-blog-publisher/scripts/validate_content.py \
  --root "$(git rev-parse --show-toplevel)" \
  --files <本次修改的 Markdown 文件>
```

若包含 doc 新章节，追加 `--strict-sidebar`。然后执行：

```bash
corepack pnpm docs:build
```

若 `corepack` 不可用，再使用项目声明版本的 `pnpm`。构建失败时修复后重试；不得在构建失败时发布。

### 本地预览链接（每次必做）

每次创建或修改内容完成后，即使用户没有要求发布，也必须启动或复用本地预览服务，并在最终回复中提供对应页面的可点击本地链接。

1. 优先使用静态构建预览，确保链接展示的内容与构建产物一致：

   ```bash
   nohup ./node_modules/.bin/http-server docs/.vuepress/dist \
     -a 127.0.0.1 -p 4173 -c-1 -s \
     >/tmp/<项目名>-vuepress-preview.log 2>&1 &
   ```

2. 若 `4173` 已被其他服务占用，选择一个空闲端口，并记录实际端口；若已有同一项目的预览服务，先验证它仍可访问后再复用。
3. 使用页面的 frontmatter `permalink` 拼出链接，例如 `http://127.0.0.1:4173/photography/qugsti0w/`，并用 `curl` 确认该路径返回 HTTP 200 且包含页面标题或独特正文。
4. 最终回复必须以 Markdown 链接形式给出该地址，并明确说明该链接仅在当前电脑且预览进程运行期间有效。若服务无法启动或无法验证，必须说明失败原因，不得提供未验证的链接。

需要视觉确认时，在本地链接中检查桌面端和窄屏下的标题、摘要、目录、代码块、图表、媒体与链接。

### 7. 发布

只有用户当前请求明确包含“发布、上线、推送网页、推送 GitHub”等含义时，才执行发布。完整规则见 [references/publishing-workflow.md](references/publishing-workflow.md)。

发布前必须：

1. 查看 `git diff`，确认没有无关修改。
2. 只暂存本次内容、collection 配置和用户明确要求的文件。
3. 查看 `git diff --cached` 后再提交。
4. 推送 `main`，等待 GitHub Actions 部署成功。
5. 访问新页面 URL，确认状态正常且正文已更新。

如果用户只要求写作或预览，则停在构建/预览阶段，不自行提交或推送。

## 完成报告

简要报告：

- 创建或修改了哪些页面；
- 选择了 post 还是 doc，以及原因；
- 使用了哪些 Plume 组件；
- 校验、构建、预览和发布结果；
- 已验证的本地预览链接（说明仅在本机预览服务运行时可用）；
- 未处理的用户已有修改、失败项或需要用户提供的素材。
