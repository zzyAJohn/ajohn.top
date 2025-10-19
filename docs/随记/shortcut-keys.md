---
title: 你真的会用 VSCode 吗？
tags:
    - VSCode
createTime: 2024/11/07 00:00:00
permalink: /article/ayskep62/
cover: https://img1.baidu.com/it/u=3550883277,3233325513&fm=253&fmt=auto&app=138&f=JPEG?w=946&h=500
---

VS Code 已经成为很多开发者的日常工具，但不会用快捷键就像开车只会踩油门——效率远远不够。<!-- more -->


## 1. 入门与全局命令
- **命令面板（Command Palette）** — 快速访问所有命令  
  * Windows / Linux：`Ctrl + Shift + P`  
  * 用法：当你不知道某个功能在哪或想执行复杂命令（切换主题、安装扩展、运行任务），先按命令面板并输入关键词。

- **快速打开文件（Quick Open）**  
  * Windows / Linux：`Ctrl + P`  
  * 提示：支持输入部分文件名、路径片段，或 `#` 跳转到行、`:` 跳转到列。


## 2. 光标、选择与导航

- **行首 / 行尾 / 文档首尾**  
  * 行首：`Home`（两下 `Home`：移动到真正首端）  
  * 行尾：`End`  
  * 文档首行：`Ctrl + Home`  
  * 文档尾行：`Ctrl + End`

- **以单词为单位移动 / 选择**  
  * 移动：`Ctrl + ← / →`  
  * 选词：`Ctrl + Shift + ← / →`

- **跳转到指定行**：`Ctrl + G`，输入行号。

## 3. 多光标与列编辑

- **在当前光标下向上 / 向下添加光标**  
  * Windows / Linux：`Ctrl + Alt + ↓ / ↑`

- **逐个选中并添加匹配项**：`Ctrl + D`  
- **选中所有匹配项并创建光标**：`Ctrl + Shift + L`

- **列（矩形）选择**  
  * 鼠标：按住 `Alt` 并拖拽：矩形/列选择  
  * 键盘（Win）：`Shift + Alt + ↑/↓` 来扩展列选择

- **复制 / 移动 当前行或所选**  
  * 复制行：`Shift + Alt + ↑ / ↓`  
  * 移动行：`Alt + ↑ / ↓`

- **注释**  
  * 行注释：`Ctrl + /`  
  * 块注释：`Shift + Alt + A`



## 4. 搜索、替换与重构
- **当前文件查找**：`Ctrl + F`  
- **当前文件替换**：`Ctrl + H`  
- **跨文件全局搜索**：`Ctrl + Shift + F`  
  * 支持正则、按文件/文件夹过滤、排除路径。

- **重命名符号**：`F2` — 在函数/变量上按 `F2` 批量重命名（会尽量保留语义范围）。  
- **跳转 / 查看定义**：  
  * 转到定义：`F12`  
  * Peek（内联查看）：`Alt + F12`  
  * 查找引用：`Shift + F12`



## 5. 文件 / 窗口 / 终端 管理
- **拆分编辑器（并排查看）**：`Ctrl + \`  
- **在编辑器标签间切换**：`Ctrl + PageUp / PageDown`  
- **把当前文件分栏到右边**：`Ctrl + Alt + →`（可自定义）

- **集成终端**  
  * 打开/隐藏： ``Ctrl + ` ``  （在 Markdown 中显示反引号可使用双反引号包裹）  
  * 新建终端：右上角 `+` 或命令面板 `Terminal: Create New Integrated Terminal`  
  * 在多个终端间切换：`Ctrl + PageUp / PageDown` 或在终端下拉列表选择

- **Zen 模式 / 专注模式**：`Ctrl + K Z`（先按 `Ctrl+K` 再按 `Z`），进入无干扰写代码界面。



## 6. 显示、格式化、预览
- **格式化文档**：`Shift + Alt + F`  
  * 如果安装了多个格式化工具（如 Prettier、EditorConfig），可以通过 `Format Document With...` 选择。

- **Markdown 预览**：  
  * 打开预览：`Ctrl + Shift + V`  
  * 在侧边打开预览：`Ctrl + K V`


## 参考资料

- [B站：VSCode 快捷键速成](https://www.bilibili.com/video/BV11S4y1h7he/?spm_id_from=333.337.search-card.all.click&vd_source=a12b120a91b36ce38ce8755fef7348d7)
