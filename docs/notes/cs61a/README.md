---
title: 'CS61A: Structure and Interpretation of Computer Programs'
tags:
    - CS61A
    - Berkeley
    - Python
createTime: 2024/10/29 11:10:09
permalink: /cs61a/
---

::: tip
目前CS61A已经开始下一个学期（Spring 2025），官方自己的存档需要UCB的账号才能访问，Fall 2024的一个备份可见 [hqhq1025](https://github.com/hqhq1025/cs61a-24fa-backup) 的 [CS61A备份网站](https://hqhq1025.github.io/cs61a-24fa-backup/index.html)。
:::

----

注：此简介搬运自 [CS自学指南](https://csdiy.wiki/%E7%BC%96%E7%A8%8B%E5%85%A5%E9%97%A8/Python/CS61A/)

课程简介
- 所属大学：UC Berkeley
- 先修要求：无
- 编程语言：Python, Scheme, SQL
- 课程难度：🌟🌟🌟
- 预计学时：50 小时

伯克利 CS61 系列的第一门课程，也是我的 Python 入门课。

CS61 系列是伯克利 CS 专业的入门课，其中：

- CS61A: 强调抽象，让学生掌握用程序来解决实际问题，而不关注底层的硬件细节。
- CS61B: 注重算法与数据结构以及大规模程序的构建，学生会用 Java 语言结合算法与数据结构的知识来构建千行代码级别的大型项目（一个简易的谷歌地图，一个二维版的 Minecraft）。
- CS61C: 关注计算机体系结构，让学生理解高级语言（例如 C）是如何一步步转换为机器可以理解的 01 串并在 CPU 执行的，学生将会学习 RISC-V 架构并自己用 Logisim 实现一个 CPU。

回到 CS61A，注意这不仅仅是一门编程语言课，而是会深入到程序构造与运行的原理。最后你将在第 4 个 Project 中用 Python 实现一个 Scheme 的解释器。此外，抽象将是这门课的一大主题，你将学习到函数式编程、数据抽象、面向对象等等知识来让你的代码更易读，更模块化。当然，学习编程语言也是这门课的一大内容，你将会掌握 Python、Scheme 和 SQL 这三种编程语言，在它们的学习和比较中，相信你会拥有快速掌握一门新的编程语言的能力。

注意：如果此前完全没有编程基础，直接上手 CS61A 需要一定的学习能力和自律要求。为避免课程难度过高而导致的信心挫折，可以选择一个更为友好的入门编程课程。例如伯克利的 CS10 或者哈佛大学的 CS50。

课程资源

- 课程网站: [fall2024](https://cs61a.org/)
- 课程视频: fall2022, fall2020
- [课程教材](https://www.composingprograms.com/)
- [课程教材中文翻译](https://composingprograms.netlify.app/)
- 课程作业: 课程网站会有每个作业对应的文档链接以及代码框架的下载链接。

----

本文主要记录学习 CS61A 课程的一些心得

因为是课程笔记，所以基础知识不再赘述，仅记录一些有意思的想法

实验，作业，项目可见本博客：

Lab:
- [Lab 0: Getting Started](./lab/lab00.md)
- [Lab 1: Functions](./lab/lab01.md)
- [Lab 2: Higher-Order Functions, Lambda Expressions](./lab/lab02.md)
- [Lab 3: Recursion, Python Lists](./lab/lab03.md)
- [Lab 4: Tree Recursion, Data Abstraction](./lab/lab04.md)
- [Lab 5: Mutability, Iterators](./lab/lab05.md)
- [Lab 6: OOP](./lab/lab06.md)
- [Lab 7: Inheritance, Linked Lists](./lab/lab07.md)
- [Lab 8: Mutable Trees](./lab/lab08.md)

Homework:
- [Homework 1: Functions, Control](./homework/hw01.md)
- [Homework 2: Higher-Order Functions](./homework/hw02.md)
- [Homework 3: Recursion, Tree Recursion](./homework/hw03.md)
- [Homework 4: Sequences, Data Abstraction, Trees](./homework/hw04.md)
- [Homework 5: Generators](./homework/hw05.md)
- [Homework 6: OOP, Linked Lists](./homework/hw06.md)

Project:
- [Project 1: Hog](./project/hog.md)
- [Project 2: Cats](./project/cats.md)
- [Project 3: Ants](./project/ants.md)

你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: important 重要
请注意，该代码包含答案，因此如果你想独立完成请务必提前将对应 python 文件中的答案删除！
:::

END.