---
title: 'Lab 3: Recursion, Python Lists'
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2024/11/22 22:26:41
permalink: /cs61a/g4b24yr2/
---
## Starter Files

Download [lab03.zip](https://cs61a.org/lab/lab03/lab03.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: important 重要
请注意，该代码包含答案，因此如果你想独立完成请务必提前将 lab03.py 中的答案删除！
:::

## Topics
如果您需要复习本实验的材料，请查阅本节。如果遇到困难，可以直接跳到问题部分并回头参考。
::: details List
列表是一种数据结构，可以保存有序的项目集合。这些项目称为元素，可以是任何数据类型，包括数字、字符串，甚至其他列表。方括号中以逗号分隔的表达式列表可创建一个列表：

```bash
>>> list_of_values = [2, 1, 3, True, 3]
>>> nested_list = [2, [1, 3], [True, [3]]]
```
列表中的每个位置都有一个索引，最左边的元素索引为 `0` 。
```bash
>>> list_of_values[0]
2
>>> nested_list[1]
[1, 3]
```
负索引从末尾开始计数，最右边的元素索引为 `-1` 。
```bash
>>> nested_list[-1]
[True, [3]]
```
添加列表会创建一个包含所添加列表元素的更长的列表。
```bash
>>> [1, 2] + [3] + [4, 5]
[1, 2, 3, 4, 5]
```
:::

::: details List Comprehensions
列表推导式描述列表中的元素，并计算出包含这些元素的新列表。

有两种形式：
```py
[<expression> for <element> in <sequence>]
[<expression> for <element> in <sequence> if <conditional>]
```
以下示例从 `[1, 2, 3, 4]` 开始，使用 `if i % 2 == 0` 挑选出偶数元素 `2` 和 `4` ，然后使用 `i*i` 计算每个元素的平方。`for i` 的目的是为 `[1, 2, 3, 4]` 中的每个元素命名。
```bash
>>> [i*i for i in [1, 2, 3, 4] if i % 2 == 0]
[4, 16]
```
此列表推导式求得的结果是：

- `i*i` 的值
- 对于序列 `[1, 2, 3, 4]` 中的每个元素 `i`
- 对于 `i % 2 == 0`
换句话说，此列表推导式将创建一个新列表，其中包含原始列表 `[1, 2, 3, 4]` 中每个偶数元素的平方。

我们还可以将列表推导式重写为等效的 `for` 语句，例如上面的例子：

```bash
>>> result = []
>>> for i in [1, 2, 3, 4]:
...     if i % 2 == 0:
...         result = result + [i*i]
>>> result
[4, 16]
```
:::


::: details For Loops

`for` 语句对序列（例如列表或范围）中的每个元素执行代码。每次执行代码时，紧跟在 `for` 后面的名称都会绑定到序列的不同元素。
```py
for <name> in <expression>:
    <suite>
```

首先， `<expression>` 被求值。它必须求值为一个序列。然后，按顺序对序列中的每个元素

1. `<name>` 绑定到元素。
2. `<suite>` 被执行。

下面是一个例子：

```py
for x in [-1, 4, 2, 0, 5]:
    print("Current elem:", x)
```
将显示以下内容：
```py
Current elem: -1
Current elem: 4
Current elem: 2
Current elem: 0
Current elem: 5
```
:::

::: details Ranges
范围是一种保存整数序列的数据结构。范围可以通过以下方式创建：

- `range(stop)` 包含 0、1、...、 `stop` - 1
- `range(start, stop)` 包含 `start` 、 `start` + 1、...、 `stop` - 1

请注意，范围函数不包括 `stop` ；它生成的数字不超过 `stop` 。

例如：
```bash
>>> for i in range(3):
...     print(i)
...
0
1
2
```

虽然范围和列表都是序列，但范围对象与列表不同。可以通过调用 `list()` 将范围转换为列表：
```bash
>>> range(3, 6)
range(3, 6)  # this is a range object
>>> list(range(3, 6))
[3, 4, 5]  # list() converts the range object to a list
>>> list(range(5))
[0, 1, 2, 3, 4]
>>> list(range(1, 6))
[1, 2, 3, 4, 5]
```
:::
## Required Questions
## Lists
::: tip
对于所有 WWPD 问题，如果您认为答案是 `<function...>` ，请输入 `Function` ；如果答案是错误，请输入 `Error` ；如果未显示任何内容，请输入 `Nothing` 。
:::
### Q1: WWPD: Lists & Ranges
使用 Ok 测试您对以下“Python 会显示什么？”问题的了解：
```bash
python ok -q lists-wwpd -u
```

预测当你在交互式解释器中输入以下内容时 Python 将显示什么。然后尝试检查你的答案。

```bash
>>> s = [7//3, 5, [4, 0, 1], 2]
>>> s[0]
______

>>> s[2]
______

>>> s[-1]
______

>>> len(s)
______

>>> 4 in s
______

>>> 4 in s[2]
______

>>> s[2] + [3 + 2]
______

>>> 5 in s[2]
______

>>> s[2] * 2
______

>>> list(range(3, 6))
______

>>> range(3, 6)
______

>>> r = range(3, 6)
>>> [r[0], r[2]]
______

>>> range(4)[-1]
______
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab03> python ok -q lists-wwpd -u 
=====================================================================
Assignment: Lab 3
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Lists > Suite 1 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> s = [7//3, 5, [4, 0, 1], 2]
>>> s[0]
? 2 # [!code ++]
-- OK! --

>>> s[2] 
? [4, 0, 1] # [!code ++]
-- OK! --

>>> s[-1]
? 2 # [!code ++]
-- OK! --

>>> len(s)
? 4 # [!code ++]
-- OK! --

>>> 4 in s
? False # [!code ++]
-- OK! -- 

>>> 4 in s[2]
? True # [!code ++]
-- OK! --

>>> s[2] + [3 + 2]
? [4, 0, 1, 5] # [!code ++]
-- OK! --

>>> 5 in s[2]
? False # [!code ++]
-- OK! --

>>> s[2] * 2
? [4, 0, 1, 4, 0, 1] # [!code ++]
-- OK! --

>>> list(range(3, 6))
? [3, 4, 5]  
-- OK! -- # [!code ++]

>>> range(3, 6)
? range(3, 6) # [!code ++]
-- OK!

>>> r = range(3, 6)
>>> [r[0], r[2]]
? [3, 5] # [!code ++]
-- OK!

>>> range(4)[-1]
? 3 # [!code ++]
-- OK!

---------------------------------------------------------------------
OK! All cases for Lists unlocked.

Backup... 100% complete
Backup past deadline by 160 days, 7 hours, 7 minutes, and 18 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab03/backups/mGONKA

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab03>
```
:::
### Q2:Print If
实现 `print_if` ，它接受一个列表 `s` 和一个单参数函数 `f` 。它打印 `s` 中每个满足 `f(x)` 返回真值的元素 `x` 。
```py
def print_if(s, f):
    """Print each element of s for which f returns a true value.

    >>> print_if([3, 4, 5, 6], lambda x: x > 4)
    5
    6
    >>> result = print_if([3, 4, 5, 6], lambda x: x % 2 == 0)
    4
    6
    >>> print(result)  # print_if should return None
    None
    """
    for x in s:
        "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python ok -q print_if
```

::: details 点击查看答案
```py
def print_if(s, f):
    """Print each element of s for which f returns a true value.

    >>> print_if([3, 4, 5, 6], lambda x: x > 4)
    5
    6
    >>> result = print_if([3, 4, 5, 6], lambda x: x % 2 == 0)
    4
    6
    >>> print(result)  # print_if should return None
    None
    """
    for x in s:
        "*** YOUR CODE HERE ***"
        if f(x): # [!code ++]
            print(x) # [!code ++]
```
:::

### Q3:Close
实现 `close` ，它接受一个数字列表 `s` 和一个非负整数 `k` 。它返回 `s` 中有多少个元素在其索引的 `k` 范围内。也就是说，元素与其索引之间的差的绝对值小于或等于 `k` 。
::: tip
请记住，列表是“零索引”；第一个元素的索引为 `0` 。
:::
```py
def close(s, k):
    """Return how many elements of s that are within k of their index.

    >>> t = [6, 2, 4, 3, 5]
    >>> close(t, 0)  # Only 3 is equal to its index
    1
    >>> close(t, 1)  # 2, 3, and 5 are within 1 of their index
    3
    >>> close(t, 2)  # 2, 3, 4, and 5 are all within 2 of their index
    4
    >>> close(list(range(10)), 0)
    10
    """
    count = 0
    for i in range(len(s)):  # Use a range to loop over indices
        "*** YOUR CODE HERE ***"
    return count
```

使用 Ok 来测试你的代码：
```bash
python ok -q close
```

::: details 点击查看答案
```py
def close(s, k):
    """Return how many elements of s that are within k of their index.

    >>> t = [6, 2, 4, 3, 5]
    >>> close(t, 0)  # Only 3 is equal to its index
    1
    >>> close(t, 1)  # 2, 3, and 5 are within 1 of their index
    3
    >>> close(t, 2)  # 2, 3, 4, and 5 are all within 2 of their index
    4
    >>> close(list(range(10)), 0)
    10
    """
    count = 0
    for i in range(len(s)):  # Use a range to loop over indices
        "*** YOUR CODE HERE ***"
        if abs(s[i] - i) <= k: # [!code ++]
            count += 1 # [!code ++]
    return count # [!code ++]
```
:::

## List Comprehensions

重要提示：对于所有 WWPD 问题，如果您认为答案是 `<function...>` ，请输入 `Function` ；如果出现错误，请输入 `Error` ；如果未显示任何内容，请输入 `Nothing` 。

### Q4:WWPD: List Comprehensions
使用 Ok 测试您对以下“Python 会显示什么？”问题的了解：
```bash
python ok -q list-comprehensions-wwpd -u
```
预测当您在交互式解释器中输入以下内容时 Python 会显示什么。然后尝试检查您的答案。

```bash
>>> [2 * x for x in range(4)]
______

>>> [y for y in [6, 1, 6, 1] if y > 2]
______

>>> [[1] + s for s in [[4], [5, 6]]]
______

>>> [z + 1 for z in range(10) if z % 3 == 0]
______
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab03> python ok -q list-comprehensions-wwpd -u
=====================================================================
Assignment: Lab 3
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Comprehensions > Suite 1 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> [2 * x for x in range(4)]
? [0, 2, 4, 6] # [!code ++]
-- OK! --

>>> [y for y in [6, 1, 6, 1] if y > 2]
? [6, 6] # [!code ++]
-- OK! --

>>> [[1] + s for s in [[4], [5, 6]]]
? [[1, 4], [1, 5, 6]] # [!code ++]
-- OK! --

>>> [z + 1 for z in range(10) if z % 3 == 0]
? [1, 4, 7, 10] # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Comprehensions unlocked.

Backup... 100% complete
Backup past deadline by 160 days, 7 hours, 13 minutes, and 14 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab03/backups/AANKw1

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab03>
```
:::

### Q5:Close List
实现 close_list，它接受一个数字列表 s 和一个非负整数 k。它返回 s 中索引在 k 范围内的元素列表。也就是说，元素与其索引之间的差的绝对值小于或等于 k。
```py
def close_list(s, k):
    """Return a list of the elements of s that are within k of their index.

    >>> t = [6, 2, 4, 3, 5]
    >>> close_list(t, 0)  # Only 3 is equal to its index
    [3]
    >>> close_list(t, 1)  # 2, 3, and 5 are within 1 of their index
    [2, 3, 5]
    >>> close_list(t, 2)  # 2, 3, 4, and 5 are all within 2 of their index
    [2, 4, 3, 5]
    """
    return [___ for i in range(len(s)) if ___]
```

使用 Ok 来测试你的代码：
```bash
python ok -q close_list
```

::: details 点击查看答案
```py
def close_list(s, k):
    """Return a list of the elements of s that are within k of their index.

    >>> t = [6, 2, 4, 3, 5]
    >>> close_list(t, 0)  # Only 3 is equal to its index
    [3]
    >>> close_list(t, 1)  # 2, 3, and 5 are within 1 of their index
    [2, 3, 5]
    >>> close_list(t, 2)  # 2, 3, 4, and 5 are all within 2 of their index
    [2, 4, 3, 5]
    """
    return [s[i] for i in range(len(s)) if abs(s[i] - i) <= k] # [!code ++]
```
:::

### Q6:Squares Only
实现函数 `squares` ，该函数接受一个正整数列表。它返回一个列表，其中包含原始列表中完全平方元素的平方根。使用列表推导。

要确定 `x` 是否为完全平方，您可以检查 `sqrt(x)` 是否等于 `round(sqrt(x))` 。


```py
from math import sqrt

def squares(s):
    """Returns a new list containing square roots of the elements of the
    original list that are perfect squares.

    >>> seq = [8, 49, 8, 9, 2, 1, 100, 102]
    >>> squares(seq)
    [7, 3, 1, 10]
    >>> seq = [500, 30]
    >>> squares(seq)
    []
    """
    return [___ for n in s if ___]
```

使用 Ok 来测试你的代码：
```bash
python ok -q squares
```

::: details 点击查看答案
```py
from math import sqrt

def squares(s):
    """Returns a new list containing square roots of the elements of the
    original list that are perfect squares.

    >>> seq = [8, 49, 8, 9, 2, 1, 100, 102]
    >>> squares(seq)
    [7, 3, 1, 10]
    >>> seq = [500, 30]
    >>> squares(seq)
    []
    """
    return [int(sqrt(n)) for n in s if int(sqrt(n)) ** 2 == n] # [!code ++]
```
:::

## Recursion
### Q7:Double Eights
编写一个递归函数，输入一个正整数 `n` ，并确定其数字是否包含两个相邻的 `8` （即两个紧挨着的 `8` ）。u
::: tip
首先想出一个递归计划：如果数字的其余数字中出现（想出一些容易检查的东西）或双八，则该数字的数字包含双八。
:::
::: important
使用递归；如果使用任何循环（for、while），测试将失败。
:::
```py
def double_eights(n):
    """Returns whether or not n has two digits in row that
    are the number 8.

    >>> double_eights(1288)
    True
    >>> double_eights(880)
    True
    >>> double_eights(538835)
    True
    >>> double_eights(284682)
    False
    >>> double_eights(588138)
    True
    >>> double_eights(78)
    False
    >>> # ban iteration
    >>> from construct_check import check
    >>> check(LAB_SOURCE_FILE, 'double_eights', ['While', 'For'])
    True
    """
    "*** YOUR CODE HERE ***"
```
使用 Ok 来测试你的代码：
```bash
python ok -q double_eights
```

::: details 点击查看答案
```py
def double_eights(n):
    """Returns whether or not n has two digits in row that
    are the number 8.

    >>> double_eights(1288)
    True
    >>> double_eights(880)
    True
    >>> double_eights(538835)
    True
    >>> double_eights(284682)
    False
    >>> double_eights(588138)
    True
    >>> double_eights(78)
    False
    >>> # ban iteration
    >>> from construct_check import check
    >>> check(LAB_SOURCE_FILE, 'double_eights', ['While', 'For'])
    True
    """
    "*** YOUR CODE HERE ***"
    if n < 100 and n != 88: # [!code ++]
        return False # [!code ++]
    elif n % 100 == 88: # [!code ++]
        return True # [!code ++]
    else: # [!code ++]
        return double_eights(n // 10) # [!code ++]
```
:::

### Q8:Making Onions
编写一个函数 `make_onion` ，该函数接受两个单参数函数 `f` 和 `g` 。它返回一个接受三个参数的函数： `x` 、 `y` 和 `limit` 。如果可以使用对 `f` 和 `g` 的最多限制次调用从 `x` 到达 `y` ，则返回的函数返回 `True` ，否则返回 `False` 。

例如，如果 `f` 加 1 且 `g` 加倍，则可以通过四次调用从 5 到达 25：`f(g(g(f(5))))` 。

```py
def make_onion(f, g):
    """Return a function can_reach(x, y, limit) that returns
    whether some call expression containing only f, g, and x with
    up to limit calls will give the result y.

    >>> up = lambda x: x + 1
    >>> double = lambda y: y * 2
    >>> can_reach = make_onion(up, double)
    >>> can_reach(5, 25, 4)      # 25 = up(double(double(up(5))))
    True
    >>> can_reach(5, 25, 3)      # Not possible
    False
    >>> can_reach(1, 1, 0)      # 1 = 1
    True
    >>> add_ing = lambda x: x + "ing"
    >>> add_end = lambda y: y + "end"
    >>> can_reach_string = make_onion(add_ing, add_end)
    >>> can_reach_string("cry", "crying", 1)      # "crying" = add_ing("cry")
    True
    >>> can_reach_string("un", "unending", 3)     # "unending" = add_ing(add_end("un"))
    True
    >>> can_reach_string("peach", "folding", 4)   # Not possible
    False
    """
    def can_reach(x, y, limit):
        if limit < 0:
            return ____
        elif x == y:
            return ____
        else:
            return can_reach(____, ____, limit - 1) or can_reach(____, ____, limit - 1)
    return can_reach
```


使用 Ok 来测试你的代码：
```bash
python ok -q make_onion
```

::: details 点击查看答案
```py
def make_onion(f, g):
    """Return a function can_reach(x, y, limit) that returns
    whether some call expression containing only f, g, and x with
    up to limit calls will give the result y.

    >>> up = lambda x: x + 1
    >>> double = lambda y: y * 2
    >>> can_reach = make_onion(up, double)
    >>> can_reach(5, 25, 4)      # 25 = up(double(double(up(5))))
    True
    >>> can_reach(5, 25, 3)      # Not possible
    False
    >>> can_reach(1, 1, 0)      # 1 = 1
    True
    >>> add_ing = lambda x: x + "ing"
    >>> add_end = lambda y: y + "end"
    >>> can_reach_string = make_onion(add_ing, add_end)
    >>> can_reach_string("cry", "crying", 1)      # "crying" = add_ing("cry")
    True
    >>> can_reach_string("un", "unending", 3)     # "unending" = add_ing(add_end("un"))
    True
    >>> can_reach_string("peach", "folding", 4)   # Not possible
    False
    """
    def can_reach(x, y, limit):
        if limit < 0:
            return False # [!code ++]
        elif x == y:
            return True # [!code ++]
        else:
            return can_reach(f(x), y, limit - 1) or can_reach(g(x), y, limit - 1) # [!code ++]
    return can_reach
```
:::

## Check Your Score Locally
您可以通过运行来在本地检查此作业的每个问题的分数：

```bash
python ok --score
```

我的得分：
```bash
PS D:\Github\CS61A_Fall2024\lab\lab03> python ok --score
=====================================================================
Assignment: Lab 3
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Scoring tests

---------------------------------------------------------------------
Lists
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
Doctests for print_if

>>> from lab03 import *
>>> print_if([3, 4, 5, 6], lambda x: x > 4)
5
6
>>> result = print_if([3, 4, 5, 6], lambda x: x % 2 == 0)
4
6
>>> print(result)  # print_if should return None
None
Score: 1.0/1

---------------------------------------------------------------------
Doctests for close

>>> from lab03 import *
>>> t = [6, 2, 4, 3, 5]
>>> close(t, 0)  # Only 3 is equal to its index
1
>>> close(t, 1)  # 2, 3, and 5 are within 1 of their index
3
>>> close(t, 2)  # 2, 3, 4, and 5 are all within 2 of their index
4
>>> close(list(range(10)), 0)
10
Score: 1.0/1

---------------------------------------------------------------------
Comprehensions
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
Doctests for close_list

>>> from lab03 import *
>>> t = [6, 2, 4, 3, 5]
>>> close_list(t, 0)  # Only 3 is equal to its index
[3]
>>> close_list(t, 1)  # 2, 3, and 5 are within 1 of their index
[2, 3, 5]
>>> close_list(t, 2)  # 2, 3, 4, and 5 are all within 2 of their index
[2, 4, 3, 5]
Score: 1.0/1

---------------------------------------------------------------------
Doctests for squares

>>> from lab03 import *
>>> seq = [8, 49, 8, 9, 2, 1, 100, 102]
>>> squares(seq)
[7, 3, 1, 10]
>>> seq = [500, 30]
>>> squares(seq)
[]
Score: 1.0/1

---------------------------------------------------------------------
Doctests for double_eights

>>> from lab03 import *
>>> double_eights(1288)
True
>>> double_eights(880)
True
>>> double_eights(538835)
True
>>> double_eights(284682)
False
>>> double_eights(588138)
True
>>> double_eights(78)
False
>>> # ban iteration
>>> from construct_check import check
>>> check(LAB_SOURCE_FILE, 'double_eights', ['While', 'For'])
True
Score: 1.0/1

---------------------------------------------------------------------
Doctests for make_onion

>>> from lab03 import *
>>> up = lambda x: x + 1
>>> double = lambda y: y * 2
>>> can_reach = make_onion(up, double)
>>> can_reach(5, 25, 4)      # 25 = up(double(double(up(5))))
True
>>> can_reach(5, 25, 3)      # Not possible
False
>>> can_reach(1, 1, 0)      # 1 = 1
True
>>> add_ing = lambda x: x + "ing"
>>> add_end = lambda y: y + "end"
>>> can_reach_string = make_onion(add_ing, add_end)
>>> can_reach_string("cry", "crying", 1)      # "crying" = add_ing("cry")
True
>>> can_reach_string("un", "unending", 3)     # "unending" = add_ing(add_end("un"))
True
>>> can_reach_string("peach", "folding", 4)   # Not possible
False
Score: 1.0/1

---------------------------------------------------------------------
Point breakdown
    Lists: 0.0/0
    print_if: 1.0/1
    close: 1.0/1
    Comprehensions: 0.0/0
    close_list: 1.0/1
    squares: 1.0/1
    double_eights: 1.0/1
    make_onion: 1.0/1

Score:
    Total: 6.0

Backup... 100% complete
Backup past deadline by 160 days, 7 hours, 21 minutes, and 11 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab03/backups/QvngQq

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab03>  
```

这不会提交作业！当您对分数满意时，请将作业提交给 Gradescope 以获得学分。