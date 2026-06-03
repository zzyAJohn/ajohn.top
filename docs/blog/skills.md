---
title: Agent Skills 完全指南：从原理到实战
createTime: 2026/06/02 14:46:29
permalink: /blog/vfarszop/
tags:
    - Agent
---



![](https://img1.baidu.com/it/u=2439656134,737181442&fm=253&fmt=auto&app=138&f=JPEG?w=897&h=500)
<!-- more -->



Agent Skills 是继 MCP 之后 Anthropic 推出的又一个 Agent 领域的行业标准。2025 年 10 月发布时仅 Anthropic 自家产品支持，后来 Cursor、Codex、OpenCode、Gemini CLI 等纷纷跟进，如今社区已经默认 Skills 成为扩展 Agent 能力的标准实践。

简单来说，Skills 就是把重复性的、专业的流程打包封装。你需要某种能力时，不用每次重新输入冗长的提示词，像调用工具一样直接用。


## 一、Skills 是什么？

### 1.1 传统模式的问题

传统 AI 聊天模式下，AI 的能力取决于两点：训练数据里学过什么，以及你临时在对话框里告诉它什么。就像招了个什么都懂一点的实习生，每次干活都得重新教一遍。

Agent Skills 带来了一种新玩法：**模块化能力插件**。

你可以把支持 Skills 的 Agent（如 Claude Code）想象成一个超级大脑，Skills 就是给大脑安装的外接工具箱。工具箱里不仅有工具本身，还包含详细的使用说明书，大脑需要时才查阅，不需要时不占空间。

### 1.2 Skills 长什么样？

Agent Skills 的核心关键词是 **File-system based**（基于文件系统）。

写代码时，我们不会所有代码都自己写，而是通过 `import xxx` 引入外部包。Skills 也是类似逻辑——每个 Skill 就是一个实实在在的文件夹，存放在固定位置（如 `.claude/skills`），里面装着：

```
my-skill/
├── SKILL.md          # 指令：告诉 AI 怎么干活的 SOP（必须）
├── reference.md      # 参考：更详细的文档（可选）
├── scripts/          # 脚本：可执行的外部能力（可选）
│   └── helper.py
└── assets/           # 资源：图片、模板等（可选）
```

把文件夹放到 Agent 的执行目录下，下次对话时 Agent 就能根据需求自动匹配到这个 Skill，不需要任何额外配置。

举个例子，一个「润色文章」的 Skill 长这样：

```markdown
---
name: polish-article
description: 用于润色用户提供的文章，适用于需要改进文章质量、
  语法、风格或结构的场景。当用户要求润色、改写或优化文章时触发。
---

## 目标
将用户提供的文章改写为更通俗易懂、逻辑清晰、语言流畅的版本。

## 使用步骤
1. 先搞清楚用户想要什么风格
2. 读原文，理解核心观点
3. 改写，优化表达
4. 按规定格式输出

## 注意事项
- 不要乱加原文没有的内容
- 不要替用户做决定
- 有歧义的地方要提醒用户
```

看起来就是一段提示词？没错，但和直接把提示词塞进系统提示词有本质区别。下面解释。

### 1.3 核心机制：渐进式披露

如果把 50 个 Skill 的说明书全部塞进 AI 的上下文窗口，会怎样？

- **成本爆炸**：每次对话消耗几万 Token
- **注意力分散**：AI "这也想干，那也想干"

Skills 的核心设计叫**渐进式披露**（Progressive Disclosure），说人话就是：**按需加载，用多少拿多少**。分三层：

**第一层：看目录（元数据）** — 系统启动时加载，只读每个 Skill 的名字和简短描述，占用极少 Token。AI 知道自己"会什么"，但不知道"具体怎么做"。

**第二层：翻手册（指令）** — 当用户说"帮我处理这个 Excel"时，AI 匹配到对应 Skill，才去读取 `SKILL.md`。详细操作步骤此时才进入上下文。

**第三层：动手干活（运行时资源）** — 执行具体步骤时，才按需加载 reference 文档和 scripts 脚本。脚本本身的代码不会塞给 AI 读，不用担心大文件消耗 Token。

这意味着：一个 Skill 可以打包整套说明文档和大量脚本，只要任务不需要，这些内容就永远不占上下文。

## 二、Skills VS MCP

### 2.1 MCP 的问题

MCP（Model Context Protocol）的本质是**标准化接口**，让 AI 连接外部工具和数据源。但 MCP 的"按需加载"代价很大：

每个 MCP Server 必须在对话开始前，将**所有工具的完整定义**一次性注入上下文。注意，这里说的不是函数体代码，而是工具的**描述和参数 Schema**——光这些就已经很重了。

举个例子，一个 `create_issue` 工具的定义长这样：

```json
{
  "name": "create_issue",
  "description": "Creates a new issue in a GitHub repository. If using issue templates, the issue body will be automatically populated based on the template. You can also specify labels, assignees, and milestone.",
  "input_schema": {
    "type": "object",
    "properties": {
      "owner": {
        "type": "string",
        "description": "The account owner of the repository. The name is not case sensitive."
      },
      "repo": {
        "type": "string",
        "description": "The name of the repository without the .git extension. The name is not case sensitive."
      },
      "title": {
        "type": "string",
        "description": "The title of the issue."
      },
      "body": {
        "type": "string",
        "description": "The contents of the issue. This field supports Markdown formatting."
      },
      "assignees": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Logins for Users to assign to this issue."
      },
      "labels": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Labels to associate with this issue."
      },
      "milestone": {
        "type": ["string", "null"],
        "description": "The number of the milestone to associate this issue with."
      }
    },
    "required": ["owner", "repo", "title"]
  }
}
```

光这一个工具的定义就接近 **300 Token**。一个 GitHub MCP Server 有 30 多个工具，连接它就要消耗近 **1 万 Token**——还没开始干活。

而 Skills 的元数据呢？每个 Skill 只有两行：

```yaml
name: create-github-issue
description: 在 GitHub 上创建 issue
```

大约 **20 个 Token**。100 个 Skills 的元数据总量，还不如 MCP 一个 Server 的零头。

这就是为什么 Skills 能做到"连接 40 个能力只花几千 Token"，而 MCP "连一个 Server 就要上万"：

| | MCP | Skills |
|---|---|---|
| 首次加载内容 | 每个工具的完整 Schema（名称 + 描述 + 参数定义） | 仅名称 + 一句话描述 |
| 单个工具开销 | ~300 Token | ~20 Token |
| 300 个工具总开销 | 数万 Token | 几千 Token |
| 调用准确率 | 工具越多越低 | 漏斗式引导，始终精准 |
| 编写门槛 | 需要写代码 | 会写提示词就行 |

真实场景下 Agent 不会只连一个 Server。你只问了 `1+1=?`，Agent 已经烧掉大几万 Token。更深层的问题是：工具过多会降低 LLM 的调用准确率。

### 2.2 MCP 会被淘汰吗？

**不会，但需求会大幅减少。**

MCP 的价值在于**统一了 AI 连接世界的方式**。通用三方平台（高德地图、Notion 等）要发布工具让所有 Agent 都能用，首选还是 MCP。

但如果你有重复性工作流（固定流程读写文件、标准范式 Review 代码、固定风格写文章），推荐用 Skill 封装。过去这些场景中需要连接外部世界的能力都得通过 MCP，现在可以全部打包到 Skill 里。

未来的格局大概是：

- Agent 本身内置核心能力（bash、read、edit、write）
- 少数通用 MCP Server 负责远程连接（数据库、云 API、SaaS）
- **大量 Skills 负责封装标准工作流、连接本地知识库**
- Skills 在必要时可以教 Agent 怎么调用 MCP Server 和其他 Skills

## 三、去哪找 Skills？

### 1. 官方自带

Claude Code 自带一组内置 Skills，开箱即用：

| Skill | 用途 |
|-------|------|
| `/code-review` | 代码审查 |
| `/debug` | 调试代码 |
| `/batch` | 批量操作 |
| `/loop` | 循环执行 |
| `/claude-api` | Claude API 相关 |
| `/run` | 启动并运行应用 |
| `/verify` | 验证代码变更是否生效 |

### 2. 社区市场

Skills 作为开放标准爆发式增长，社区涌现了大量市场。Skills 的编写门槛比 MCP 低得多——只要会写提示词就能写 Skill，所以增长速度比 MCP 当年还快。

| 平台 | 特点 | 链接 |
|------|------|------|
| skillsmp.com | Skills 专项市场，数量增长最快 | https://skillsmp.com |
| agentskill.sh | 最大的 Agent Skills 市场，支持 20+ 工具 | https://agentskill.sh |
| skills.sh | Vercel Labs 维护，`npx skills add` 一键安装 | https://skills.sh |
| ClawHub | 52,700+ 工具，支持向量搜索 | https://clawhub.com |
| GitHub | 搜索 `claude-code-skills` 标签 | https://github.com/topics/claude-code-skills |
| 魔搭社区 | 国内访问快，中文友好 | https://modelscope.cn |

## 四、怎么安装 Skills？

### 4.1 安装位置

Skills 有两个存放位置，决定了它的生效范围：

**全局安装**（所有项目生效）：`~/.claude/skills/<skill-name>/SKILL.md`

```
~/.claude/
└── skills/
    ├── code-review/
    │   └── SKILL.md
    └── git-workflow/
        ├── SKILL.md
        └── scripts/
            └── helper.sh
```

**项目安装**（仅当前项目生效）：`.claude/skills/<skill-name>/SKILL.md`

```
your-project/
├── .claude/
│   └── skills/
│       ├── deploy/
│       │   └── SKILL.md
│       └── test/
│           └── SKILL.md
├── src/
└── ...
```

同名冲突时优先级：**全局 > 项目**。

### 4.2 三种安装方式

**方式一：命令行安装（推荐）**

从市场找到安装命令，在项目目录下执行：

```bash
npx skills add https://github.com/anthropics/skills --skill pptx
```

**方式二：手动安装**

下载 Skill 文件夹，放到 `~/.claude/skills/`（全局）或 `.claude/skills/`（项目）即可。

**方式三：让 Claude Code 自己装**

直接把链接丢给 Claude Code：

```
帮我安装这个 skill：https://github.com/anthropics/skills/tree/main/skills/pptx
```

安装完用 `/skills` 命令验证是否成功。

## 五、创建你的第一个 Skill

不想自己写？Anthropic 官方提供了一个**生产 Skill 的 Skill**：[Skill Creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)。

安装后，用自然语言告诉它你想做什么，它自动生成符合标准的 Skill 包。比如：

```
帮我创建一个可以准确获取当前系统时间的 Skill，描述使用中文，脚本使用 Node.js
```

Claude Code 会调用 skill-creator，自动生成包含 `SKILL.md` 和 Node.js 脚本的完整 Skill 目录。

## 六、安全提醒

Skill 本质上是给 AI 的指令，恶意指令可能让 AI 执行危险操作。使用社区 Skills 时注意：

1. **检查来源**：优先选 star 数高、活跃维护的仓库
2. **读 SKILL.md**：安装前看看里面写了什么
3. **注意 `allowed-tools` 字段**：某些 Skill 可能预授权了敏感工具（如 `Bash(rm *)`）
4. **自动匹配要谨慎**：`find-skills` 匹配到的 Skill 建议人工确认后再用

> 对不信任的 Skill，先在测试项目中试用，确认安全后再用于正式项目。

## 七、总结

| 要点 | 说明 |
|------|------|
| Skills 是什么 | 模块化能力插件，基于文件系统，按需加载 |
| 核心机制 | 渐进式披露：元数据 → 指令 → 运行时资源 |
| vs MCP | Skills 更省 Token、更精准；MCP 负责远程连接 |
| 去哪找 | skillsmp、agentskill.sh、skills.sh、ClawHub、GitHub |
| 怎么装 | `npx skills add` / 手动复制 / 让 Claude 装 |
| 怎么验证 | `/skills` 命令查看 |
| 安全 | 检查来源，读 SKILL.md，注意权限 |


## 参考资料


- [一期带你彻底搞懂 Agent Skills，从原理到实战](https://www.bilibili.com/video/BV1GXzaByEEo?spm_id_from=333.788.videopod.sections&vd_source=a12b120a91b36ce38ce8755fef7348d7)
- [8个Skills平台 + 3种安装方法，一次学会](https://www.bilibili.com/video/BV1AU5L6dEDC/?vd_source=a12b120a91b36ce38ce8755fef7348d7)