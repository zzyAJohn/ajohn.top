---
title: 'Lab 8: Mutable Trees'
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2025/02/15 19:51:55
permalink: /cs61a/lab-lab08/
---


## Starter Files

Download [lab08.zip](https://cs61a.org/lab/lab08/lab08.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: tip 提示
初始代码可以在 github 仓库历史 Commits 中的 Commits on Feb 15, 2025 的 `initial lab08` 找到
:::

## Required Questions

## Mutable Trees

::: details Mutable Trees
`Tree` 实例有两个实例属性：

- `label` 是存储在树根的值。
- `branches` 是 `Tree` 实例的列表，其中包含树其余部分的标签。
`Tree` 类（省略了 `__repr__` 和 `__str__` 方法）定义如下：
```py
class Tree:
    """A tree has a label and a list of branches.

    >>> t = Tree(3, [Tree(2, [Tree(5)]), Tree(4)])
    >>> t.label
    3
    >>> t.branches[0].label
    2
    >>> t.branches[1].is_leaf()
    True
    """
    def __init__(self, label, branches=[]):
        self.label = label
        for branch in branches:
            assert isinstance(branch, Tree)
        self.branches = list(branches)

    def is_leaf(self):
        return not self.branches
```
要从标签 `x` （任意值）和分支列表 `bs` （ `Tree` 实例列表）构造 `Tree` 实例并将其命名为 `t` ，请写入 `t = Tree(x, bs)` 。

对于树 `t` ：

- 其根标签可以是任意值， `t.label` 的计算结果为该值。
- 其分支始终是 `Tree` 实例， `t.branches` 的计算结果为其分支列表。
- 如果 `t.branches` 为空，则` t.is_leaf()` 返回 `True` ，否则返回 `False` 。
- 要构造带有标签 `x` 的叶子，请写入 `Tree(x)` 。

显示树 `t` ：

- `repr(t)` 返回一个 Python 表达式，该表达式的计算结果为等效树。
- `str(t)` 为每个标签返回一行，比其父级缩进一次，子级在其父级之下。

```bash
>>> t = Tree(3, [Tree(1, [Tree(4), Tree(1)]), Tree(5, [Tree(9)])])

>>> t         # displays the contents of repr(t)
Tree(3, [Tree(1, [Tree(4), Tree(1)]), Tree(5, [Tree(9)])])

>>> print(t)  # displays the contents of str(t)
3
  1
    4
    1
  5
    9
```
更改（也称为变异）树 `t` ：

- `t.label = y` 将 `t` 的根标签更改为 `y`（任何值）。
- `t.branches = ns` 将 `t` 的分支更改为 `ns`（Tree 实例列表）。
- `t.branches` 的变异将改变 `t` 。例如， `t.branches.append(Tree(y))` 将添加一个标记为 `y` 的叶子作为最右边的分支。
- `t` 中任何分支的变异都将改变 `t` 。例如， `t.branches[0].label = y` 将最左边分支的根标签更改为 `y` 。

```bash
>>> t.label = 3.0
>>> t.branches[1].label = 5.0
>>> t.branches.append(Tree(2, [Tree(6)]))
>>> print(t)
3.0
  1
    4
    1
  5.0
    9
  2
    6
```

以下是作为功能抽象实现的树数据抽象与作为类实现的树数据抽象之间的差异总结：


| -       | 树构造函数和选择器函数          | Tree 类  |
| ------------- |-------------| -----|
| 构造树     | 要根据给定的 `label` 和 `branches` 列表构造树，我们调用 `tree(label, branchs)` | 要根据给定的 `label` 和 `branches` 列表构造树对象，我们调用 `Tree(label, branchs)`（调用 `Tree.__init__` 方法）。 |
| 标签和分支     | 要获取树 `t` 的标签或分支，我们分别调用 `label(t)` 或 `branchs(t)`     |   要获取树 `t` 的标签或分支，我们分别访问实例属性 `t.label` 或 `t.branches` 。 |
| 可变性 | 函数式树数据抽象是不可变的（不违反其抽象屏障），因为我们无法为调用表达式赋值     |    `Tree` 实例的 `label` 和 `branchs` 属性可以重新分配，从而改变树。 |
| 检查树是否为叶子 | 要检查树 `t` 是否为叶子，我们调用函数 `is_leaf(t)`   |   要检查树 `t` 是否为叶子，我们调用方法 `t.is_leaf()` 。此方法只能在 `Tree` 对象上调用。 |


:::

### Q1: WWPD: Trees
阅读 `lab08.py` 中的 `Tree` 类。确保您理解 doctests 。
::: tip 提示
使用 Ok 测试您掌握的知识，回答以下“Python 会显示什么？”问题：
```bash
python ok -q trees-wwpd -u
```
如果您认为答案是 <function ...>，请输入 `Function` ；如果出现错误，请输入 `Error` ；如果没有显示任何内容，请输入 `Nothing` 。回想一下， `Tree` 实例的显示方式与构造方式相同。
:::
```bash
>>> t = Tree(1, Tree(2))
______

>>> t = Tree(1, [Tree(2)])
>>> t.label
______

>>> t.branches[0]
______

>>> t.branches[0].label
______

>>> t.label = t.branches[0].label
>>> t
______

>>> t.branches.append(Tree(4, [Tree(8)]))
>>> len(t.branches)
______

>>> t.branches[0]
______

>>> t.branches[1]
______
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab08> python ok -q trees-wwpd -u
=====================================================================
Assignment: Lab 8
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Trees > Suite 1 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> t = Tree(1, Tree(2)) # Enter Function if you believe the answer is <function ...>, Error if it errors, and Nothing if nothing is displayed.
? Error # [!code ++]
-- OK! --

>>> t = Tree(1, [Tree(2)])
>>> t.label
? 1 # [!code ++]
-- OK! --

>>> t.branches[0]
? Tree(2) # [!code ++]
-- OK! --

>>> t.branches[0].label
? 2 # [!code ++]
-- OK! --

>>> t.label = t.branches[0].label
>>> t
? Tree(2, [Tree(2)]) # [!code ++]
-- OK! --

>>> t.branches.append(Tree(4, [Tree(8)]))
>>> len(t.branches)
? 2 # [!code ++]
-- OK! --

>>> t.branches[0]
? Tree(2) # [!code ++]
-- OK! --

>>> t.branches[1]
? Tree(4, [Tree(8)]) # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Trees unlocked.

Backup... 0.0% complete

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab08> 
```
:::

### Q2: Cumulative Mul
编写一个函数 `cumulative_mul` ，对树 t 进行变异，使每个节点的标签被其标签与其所有后代标签的乘积所取代。
::: tip 提示
请注意变异当前节点标签和处理其子树的顺序；哪一个应该先出现？
:::
```py
def cumulative_mul(t):
    """Mutates t so that each node's label becomes the product of its own
    label and all labels in the corresponding subtree rooted at t.

    >>> t = Tree(1, [Tree(3, [Tree(5)]), Tree(7)])
    >>> cumulative_mul(t)
    >>> t
    Tree(105, [Tree(15, [Tree(5)]), Tree(7)])
    >>> otherTree = Tree(2, [Tree(1, [Tree(3), Tree(4), Tree(5)]), Tree(6, [Tree(7)])])
    >>> cumulative_mul(otherTree)
    >>> otherTree
    Tree(5040, [Tree(60, [Tree(3), Tree(4), Tree(5)]), Tree(42, [Tree(7)])])
    """
    "*** YOUR CODE HERE ***"
```
使用 Ok 来测试你的代码：
```bash
python ok -q cumulative_mul
```
::: details 点击查看答案
```py
def cumulative_mul(t):
    """Mutates t so that each node's label becomes the product of its own
    label and all labels in the corresponding subtree rooted at t.

    >>> t = Tree(1, [Tree(3, [Tree(5)]), Tree(7)])
    >>> cumulative_mul(t)
    >>> t
    Tree(105, [Tree(15, [Tree(5)]), Tree(7)])
    >>> otherTree = Tree(2, [Tree(1, [Tree(3), Tree(4), Tree(5)]), Tree(6, [Tree(7)])])
    >>> cumulative_mul(otherTree)
    >>> otherTree
    Tree(5040, [Tree(60, [Tree(3), Tree(4), Tree(5)]), Tree(42, [Tree(7)])])
    """
    "*** YOUR CODE HERE ***"
    if t.is_leaf(): # [!code ++]
        return # [!code ++]
    for b in t.branches: # [!code ++]
        cumulative_mul(b) # [!code ++]
    for b in t.branches: # [!code ++]
        t.label *= b.label # [!code ++]
```
:::
### Q3: Prune Small
从树中删除一些节点称为修剪树。

完成函数 `prune_small` ，该函数接受 `Tree` `t` 和数字 `n` 。对于具有超过 `n` 个分支的每个节点，仅保留具有最小标签的 `n` 个分支并删除（修剪）其余的。
::: tip 提示
`max` 函数接受 `iterable` 以及可选的 `key` 参数（接受一个参数函数）。例如， `max([-7, 2, -1], key=abs)` 将返回 `-7` ，因为 `abs(-7)` 大于 `abs(2)` 和 `abs(-1)` 。
:::

```py
def prune_small(t, n):
    """Prune the tree mutatively, keeping only the n branches
    of each node with the smallest labels.

    >>> t1 = Tree(6)
    >>> prune_small(t1, 2)
    >>> t1
    Tree(6)
    >>> t2 = Tree(6, [Tree(3), Tree(4)])
    >>> prune_small(t2, 1)
    >>> t2
    Tree(6, [Tree(3)])
    >>> t3 = Tree(6, [Tree(1), Tree(3, [Tree(1), Tree(2), Tree(3)]), Tree(5, [Tree(3), Tree(4)])])
    >>> prune_small(t3, 2)
    >>> t3
    Tree(6, [Tree(1), Tree(3, [Tree(1), Tree(2)])])
    """
    while ____:
        largest = max(____, key=____)
        t.branches.remove(largest)
    for b in t.branches:
        ____
```
使用 Ok 来测试你的代码：
```bash
python ok -q prune_small
```
::: details 点击查看答案
```py
def prune_small(t, n):
    """Prune the tree mutatively, keeping only the n branches
    of each node with the smallest labels.

    >>> t1 = Tree(6)
    >>> prune_small(t1, 2)
    >>> t1
    Tree(6)
    >>> t2 = Tree(6, [Tree(3), Tree(4)])
    >>> prune_small(t2, 1)
    >>> t2
    Tree(6, [Tree(3)])
    >>> t3 = Tree(6, [Tree(1), Tree(3, [Tree(1), Tree(2), Tree(3)]), Tree(5, [Tree(3), Tree(4)])])
    >>> prune_small(t3, 2)
    >>> t3
    Tree(6, [Tree(1), Tree(3, [Tree(1), Tree(2)])])
    """
    while len(t.branches) > n: # [!code ++]
        largest = max(t.branches, key=lambda x: x.label) # [!code ++]
        t.branches.remove(largest)
    for b in t.branches:
        prune_small(b, n) # [!code ++]
```
:::
### Q4: Delete
实现 `delete` ，它接受 Tree `t` 并删除所有标记为 `x` 的非根节点。每个剩余节点的父节点是其未被删除的最近祖先。根节点永远不会被删除，即使其标签为 `x` 。
```py
def delete(t, x):
    """Remove all nodes labeled x below the root within Tree t. When a non-leaf
    node is deleted, the deleted node's children become children of its parent.

    The root node will never be removed.

    >>> t = Tree(3, [Tree(2, [Tree(2), Tree(2)]), Tree(2), Tree(2, [Tree(2, [Tree(2), Tree(2)])])])
    >>> delete(t, 2)
    >>> t
    Tree(3)
    >>> t = Tree(1, [Tree(2, [Tree(4, [Tree(2)]), Tree(5)]), Tree(3, [Tree(6), Tree(2)]), Tree(4)])
    >>> delete(t, 2)
    >>> t
    Tree(1, [Tree(4), Tree(5), Tree(3, [Tree(6)]), Tree(4)])
    >>> t = Tree(1, [Tree(2, [Tree(4), Tree(5)]), Tree(3, [Tree(6), Tree(2)]), Tree(2, [Tree(6),  Tree(2), Tree(7), Tree(8)]), Tree(4)])
    >>> delete(t, 2)
    >>> t
    Tree(1, [Tree(4), Tree(5), Tree(3, [Tree(6)]), Tree(6), Tree(7), Tree(8), Tree(4)])
    """
    new_branches = []
    for _________ in ________________:
        _______________________
        if b.label == x:
            __________________________________
        else:
            __________________________________
    t.branches = ___________________
```
使用 Ok 来测试你的代码：
```bash
python ok -q delete
```
::: details 点击查看答案
```py
def delete(t, x):
    """Remove all nodes labeled x below the root within Tree t. When a non-leaf
    node is deleted, the deleted node's children become children of its parent.

    The root node will never be removed.

    >>> t = Tree(3, [Tree(2, [Tree(2), Tree(2)]), Tree(2), Tree(2, [Tree(2, [Tree(2), Tree(2)])])])
    >>> delete(t, 2)
    >>> t
    Tree(3)
    >>> t = Tree(1, [Tree(2, [Tree(4, [Tree(2)]), Tree(5)]), Tree(3, [Tree(6), Tree(2)]), Tree(4)])
    >>> delete(t, 2)
    >>> t
    Tree(1, [Tree(4), Tree(5), Tree(3, [Tree(6)]), Tree(4)])
    >>> t = Tree(1, [Tree(2, [Tree(4), Tree(5)]), Tree(3, [Tree(6), Tree(2)]), Tree(2, [Tree(6),  Tree(2), Tree(7), Tree(8)]), Tree(4)])
    >>> delete(t, 2)
    >>> t
    Tree(1, [Tree(4), Tree(5), Tree(3, [Tree(6)]), Tree(6), Tree(7), Tree(8), Tree(4)])
    """
    new_branches = []
    for b in t.branches: # [!code ++]
        delete(b, x) # [!code ++]
        if b.label == x:
            new_branches.extend(b.branches) # [!code ++]
        else:
            new_branches.append(b) # [!code ++]
    t.branches = new_branches # [!code ++]
```
:::
## Check Your Score Locally
您可以通过运行 
```bash
python ok --score
```
在本地检查此作业每个问题的得分

这不会提交作业！当您对分数满意时，请将作业提交给 Gradescope 以获得学分。
::: details 我的得分：
```bash
PS D:\Github\CS61A_Fall2024\lab\lab08> python ok --score
=====================================================================
Assignment: Lab 8
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Scoring tests

---------------------------------------------------------------------
Trees
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
Doctests for cumulative_mul

>>> from lab08 import *
>>> t = Tree(1, [Tree(3, [Tree(5)]), Tree(7)])
>>> cumulative_mul(t)
>>> t
Tree(105, [Tree(15, [Tree(5)]), Tree(7)])
>>> otherTree = Tree(2, [Tree(1, [Tree(3), Tree(4), Tree(5)]), Tree(6, [Tree(7)])])
>>> cumulative_mul(otherTree)
>>> otherTree
Tree(5040, [Tree(60, [Tree(3), Tree(4), Tree(5)]), Tree(42, [Tree(7)])])
Score: 1.0/1

---------------------------------------------------------------------
Doctests for prune_small

>>> from lab08 import *
>>> t1 = Tree(6)
>>> prune_small(t1, 2)
>>> t1
Tree(6)
>>> t2 = Tree(6, [Tree(3), Tree(4)])
>>> prune_small(t2, 1)
>>> t2
Tree(6, [Tree(3)])
>>> t3 = Tree(6, [Tree(1), Tree(3, [Tree(1), Tree(2), Tree(3)]), Tree(5, [Tree(3), Tree(4)])])
>>> prune_small(t3, 2)
>>> t3
Tree(6, [Tree(1), Tree(3, [Tree(1), Tree(2)])])
Score: 1.0/1

---------------------------------------------------------------------
Doctests for delete

>>> from lab08 import *
>>> t = Tree(3, [Tree(2, [Tree(2), Tree(2)]), Tree(2), Tree(2, [Tree(2, [Tree(2), Tree(2)])])])
>>> delete(t, 2)
>>> t
Tree(3)
>>> t = Tree(1, [Tree(2, [Tree(4, [Tree(2)]), Tree(5)]), Tree(3, [Tree(6), Tree(2)]), Tree(4)])
>>> delete(t, 2)
>>> t
Tree(1, [Tree(4), Tree(5), Tree(3, [Tree(6)]), Tree(4)])
>>> t = Tree(1, [Tree(2, [Tree(4), Tree(5)]), Tree(3, [Tree(6), Tree(2)]), Tree(2, [Tree(6),  Tree(2), Tree(7), Tree(8)]), Tree(4)])
>>> delete(t, 2)
>>> t
Tree(1, [Tree(4), Tree(5), Tree(3, [Tree(6)]), Tree(6), Tree(7), Tree(8), Tree(4)])
Score: 1.0/1

---------------------------------------------------------------------
Point breakdown
    Trees: 0.0/0
    cumulative_mul: 1.0/1
    prune_small: 1.0/1
    delete: 1.0/1

Score:
    Total: 3.0

Backup... 100% complete
Backup past deadline by 107 days, 6 hours, 51 minutes, and 14 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab08/backups/z9m82q

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab08> 
```
:::


## Optional Questions
### Q5: Maximum Path Sum
编写一个函数，接收一棵树并返回从树的根到叶子的任意路径上值的最大和。
```py
def max_path_sum(t):
    """Return the maximum path sum of the tree.

    >>> t = Tree(1, [Tree(5, [Tree(1), Tree(3)]), Tree(10)])
    >>> max_path_sum(t)
    11
    """
    "*** YOUR CODE HERE ***"
```
使用 Ok 来测试你的代码：
```bash
python ok -q max_path_sum
```
::: details 点击查看答案
```py
def max_path_sum(t):
    """Return the maximum path sum of the tree.

    >>> t = Tree(1, [Tree(5, [Tree(1), Tree(3)]), Tree(10)])
    >>> max_path_sum(t)
    11
    """
    "*** YOUR CODE HERE ***"
    if t.is_leaf(): # [!code ++]
        return t.label # [!code ++]
    res = [] # [!code ++]
    for b in t.branches: # [!code ++]
        res.append(max_path_sum(b)) # [!code ++]
    return t.label + max(res) # [!code ++]
```
:::