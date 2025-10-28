---
title: 'Lab 5: Mutability, Iterators'
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2024/12/05 20:30:59
permalink: /cs61a/lab-lab05/
---

## Starter Files

Download [lab05.zip](https://cs61a.org/lab/lab05/lab05.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: important 重要
请注意，该代码包含答案，因此如果你想独立完成请务必提前将 lab05.py 中的答案删除！
:::

## Required Questions

## Mutability
如果您需要复习可变性，请查阅下拉菜单。如果遇到困难，可以直接跳到问题并返回此处查看。

::: details List Mutation
Python 中的某些对象（例如列表和字典）是**可变的**，这意味着它们的内容或状态可以更改。其他对象（例如数字类型、元组和字符串）是**不可变的**，这意味着它们一旦创建就无法更改。

列表的两个最常见的变异操作是项目分配和 `append` 方法。
```bash
>>> s = [1, 3, 4]
>>> t = s  # A second name for the same list
>>> t[0] = 2  # this changes the first element of the list to 2, affecting both s and t
>>> s
[2, 3, 4]
>>> s.append(5)  # this adds 5 to the end of the list, affecting both s and t
>>> t
[2, 3, 4, 5]
```

还有许多其他列表变异方法：

- `append(elem)` ：将 `elem` 添加到列表末尾。返回 `None` 。
- `extend(s)` ：将可迭代对象 `s` 的所有元素添加到列表末尾。返回 `None` 。
- `insert(i, elem)` ：在索引 `i` 处插入 `elem` 。如果 `i` 大于或等于列表的长度，则将 `elem` 插入到末尾。这不会替换任何现有元素，而只会添加新元素 `elem` 。返回 `None` 。
- `remove(elem)` ：删除列表中第一次出现的 `elem` 。返回 `None` 。如果 `elem` 不在列表中，则会出现错误。
- `pop(i)` ：删除并返回索引 `i` 处的元素。
- `pop()` ：删除并返回最后一个元素。
字典还有项目分配（经常使用）和 `pop` （很少使用）。
```bash
>>> d = {2: 3, 4: 16}
>>> d[2] = 4
>>> d[3] = 9
>>> d
{2: 4, 4: 16, 3: 9}
>>> d.pop(4)
16
>>> d
{2: 4, 3: 9}
```
:::
### Q1: WWPD: List-Mutation
::: tip 提示
对于所有 WWPD 问题，如果您认为答案是 `<function...>` ，则输入 `Function` ；如果答案错误，则输入 `Error` ；如果没有显示任何内容，则输入 `Nothing` 。
:::
使用 Ok 来通过以下“Python 会显示什么？”问题测试您的知识：

```bash
python ok -q list-mutation -u
```

```bash
>>> s = [6, 7, 8]
>>> print(s.append(6))
______

>>> s
______

>>> s.insert(0, 9)
>>> s
______

>>> x = s.pop(1)
>>> s
______

>>> s.remove(x)
>>> s
______

>>> a, b = s, s[:]
>>> a is s
______

>>> b == s
______

>>> b is s
______

>>> a.pop()
______

>>> a + b
______

>>> s = [3]
>>> s.extend([4, 5])
>>> s
______

>>> a
______

>>> s.extend([s.append(9), s.append(10)])
>>> s
______
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab05> python ok -q list-mutation -u 
=====================================================================
Assignment: Lab 5
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
List Mutation > Suite 1 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> # If nothing would be output by Python, type Nothing
>>> # If the code would error, type Error
>>> s = [6, 7, 8]
>>> print(s.append(6))
? None # [!code ++]
-- OK! --

>>> s    
? [6, 7, 8, 6] # [!code ++]
-- OK! --

>>> s.insert(0, 9)
>>> s
? [9, 6, 7, 8, 6] # [!code ++]
-- OK! --

>>> x = s.pop(1)
>>> s
? [9, 7, 8, 6] # [!code ++]
-- OK! --

>>> s.remove(x)
>>> s
? [9, 7, 8] # [!code ++]
-- OK! --

>>> a, b = s, s[:]
>>> a is s
? True # [!code ++]
-- OK! --

>>> b == s
? True # [!code ++]
-- OK! --

>>> b is s
? False # [!code ++]
-- OK! --

>>> a.pop()
? 8 # [!code ++]
-- OK! --

>>> a + b
? [9, 7, 9, 7, 8] # [!code ++]
-- OK! --  

>>> s = [3]
>>> s.extend([4, 5])
>>> s
? [3, 4, 5] # [!code ++]
-- OK! --
>>> a
? [9, 7] # [!code ++]
-- OK! --

>>> s.extend([s.append(9), s.append(10)])
>>> s
? [3, 4, 5, 9, 10, None, None] # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for List Mutation unlocked.

Backup... 100% complete
Backup past deadline by 56 days, 4 hours, 39 minutes, and 37 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab05/backups/ZpO802

OK is up to date
```
:::

### Q2: Insert Items
编写一个函数，接受列表 `s` 、 `before` 值和 `after` 值。它通过在 `s` 中每个等于 `before` 的值之后插入 `after` 来修改 `s` 。它返回 `s` 。
::: important 重要
不应创建新列表。
:::
::: tip 提示
如果传入 `before` 和 `after` 的值相等，请确保在迭代过程中不会创建无限长的列表。如果您发现代码运行时间超过几秒钟，则该函数可能处于插入新值的无限循环中。
:::
```py
def insert_items(s, before, after):
    """Insert after into s after each occurrence of before and then return s.

    >>> test_s = [1, 5, 8, 5, 2, 3]
    >>> new_s = insert_items(test_s, 5, 7)
    >>> new_s
    [1, 5, 7, 8, 5, 7, 2, 3]
    >>> test_s
    [1, 5, 7, 8, 5, 7, 2, 3]
    >>> new_s is test_s
    True
    >>> double_s = [1, 2, 1, 2, 3, 3]
    >>> double_s = insert_items(double_s, 3, 4)
    >>> double_s
    [1, 2, 1, 2, 3, 4, 3, 4]
    >>> large_s = [1, 4, 8]
    >>> large_s2 = insert_items(large_s, 4, 4)
    >>> large_s2
    [1, 4, 4, 8]
    >>> large_s3 = insert_items(large_s2, 4, 6)
    >>> large_s3
    [1, 4, 6, 4, 6, 8]
    >>> large_s3 is large_s
    True
    """
    "*** YOUR CODE HERE ***"
```

Use Ok to test your code:
```bash
python ok -q insert_items
```

::: details 点击查看答案
```py
def insert_items(s, before, after):
    """Insert after into s after each occurrence of before and then return s.

    >>> test_s = [1, 5, 8, 5, 2, 3]
    >>> new_s = insert_items(test_s, 5, 7)
    >>> new_s
    [1, 5, 7, 8, 5, 7, 2, 3]
    >>> test_s
    [1, 5, 7, 8, 5, 7, 2, 3]
    >>> new_s is test_s
    True
    >>> double_s = [1, 2, 1, 2, 3, 3]
    >>> double_s = insert_items(double_s, 3, 4)
    >>> double_s
    [1, 2, 1, 2, 3, 4, 3, 4]
    >>> large_s = [1, 4, 8]
    >>> large_s2 = insert_items(large_s, 4, 4)
    >>> large_s2
    [1, 4, 4, 8]
    >>> large_s3 = insert_items(large_s2, 4, 6)
    >>> large_s3
    [1, 4, 6, 4, 6, 8]
    >>> large_s3 is large_s
    True
    """
    "*** YOUR CODE HERE ***" 
    i = 0 # [!code ++]
    end = len(s) # [!code ++]
    while i < end: # [!code ++]
        if s[i] == before: # [!code ++]
            s.insert(i + 1, after) # [!code ++]
            end += 1 # [!code ++]
            i += 1 # [!code ++]
        i += 1 # [!code ++]
    return s # [!code ++]
```
:::



### Q3: Group By
编写一个函数，该函数接受列表 `s` 和函数 `fn` ，并返回一个字典，该字典根据应用 `fn` 的结果对 `s` 的元素进行分组。

- 该字典应该为将 `fn` 应用于 `s` 元素的每个唯一结果都有一个键。
- 每个键的值应该是 `s` 中所有元素的列表，当传递给 `fn` 时，会产生该键值。

换句话说，对于 `s` 中的每个元素 `e` ，确定 `fn(e)` 并将 `e` 添加到字典中与 `fn(e)` 对应的列表中。

```py
def group_by(s, fn):
    """Return a dictionary of lists that together contain the elements of s.
    The key for each list is the value that fn returns when called on any of the
    values of that list.

    >>> group_by([12, 23, 14, 45], lambda p: p // 10)
    {1: [12, 14], 2: [23], 4: [45]}
    >>> group_by(range(-3, 4), lambda x: x * x)
    {9: [-3, 3], 4: [-2, 2], 1: [-1, 1], 0: [0]}
    """
    grouped = {}
    for ____ in ____:
        key = ____
        if key in grouped:
            ____
        else:
            grouped[key] = ____
    return grouped
```

Use Ok to test your code:
```bash
python ok -q group_by
```

::: details 点击查看答案
```py
def group_by(s, fn):
    """Return a dictionary of lists that together contain the elements of s.
    The key for each list is the value that fn returns when called on any of the
    values of that list.

    >>> group_by([12, 23, 14, 45], lambda p: p // 10)
    {1: [12, 14], 2: [23], 4: [45]}
    >>> group_by(range(-3, 4), lambda x: x * x)
    {9: [-3, 3], 4: [-2, 2], 1: [-1, 1], 0: [0]}
    """
    grouped = {}
    for num in s: # [!code ++]
        key = fn(num) # [!code ++]
        if key in grouped:
            grouped[key].append(num) # [!code ++]
        else:
            grouped[key] = [num] # [!code ++]
    return grouped
```
:::

## Iterators
如果您需要复习迭代器，请查看下拉菜单。如果遇到困难，可以直接跳到问题部分并返回此处查看。
::: details Iterators
**可迭代对象**是可以迭代的任何值，即每次迭代一个元素。我们用来迭代可迭代对象的一种构造是 for 语句：
```py
for elem in iterable:
    # do something
```
一般来说，可迭代对象是一个对象，调用其内置的 `iter` 函数会返回一个迭代器。**迭代器**是一个对象，调用其内置的 `next` 函数会返回下一个值。

例如，列表就是一个可迭代值。
```bash
>>> s = [1, 2, 3, 4]
>>> next(s)       # s is iterable, but not an iterator
TypeError: 'list' object is not an iterator
>>> t = iter(s)   # Creates an iterator
>>> t
<list_iterator object ...>
>>> next(t)       # Calling next on an iterator
1
>>> next(t)       # Calling next on the same iterator
2
>>> next(iter(t)) # Calling iter on an iterator returns itself
3
>>> t2 = iter(s)
>>> next(t2)      # Second iterator starts at the beginning of s
1
>>> next(t)       # First iterator is unaffected by second iterator
4
>>> next(t)       # No elements left!
StopIteration
>>> s             # Original iterable is unaffected
[1, 2, 3, 4]
```

您还可以在 `for` 语句中使用迭代器，因为所有迭代器都是可迭代的。但请注意，由于迭代器会保持其状态，因此它们只能迭代一次：
```bash
>>> t = iter([4, 3, 2, 1])
>>> for e in t:
...     print(e)
4
3
2
1
>>> for e in t:
...     print(e)
```
这些是返回迭代器的内置函数。
```bash
>>> m = map(lambda x: x * x, [3, 4, 5])
>>> next(m)
9
>>> next(m)
16
>>> f = filter(lambda x: x > 3, [3, 4, 5])
>>> next(f)
4
>>> next(f)
5
>>> z = zip([30, 40, 50], [3, 4, 5])
>>> next(z)
(30, 3)
>>> next(z)
(40, 4)
```
:::
### Q4: WWPD: Iterators
::: tip 提示
如果发生 `StopIteration` 异常，则输入 `StopIteration` ；如果您认为发生了其他错误，则输入 `Error` ；如果输出是迭代器对象，则输入 `Iterator` 。
:::
::: tip 提示
Python 的内置函数 `map` 、 `filter` 和 `zip` 返回迭代器，而不是列表。
:::
使用 Ok 来通过以下“Python 会显示什么？”问题测试您的知识：
```bash
python ok -q iterators-wwpd -u
```
```bash
>>> s = [1, 2, 3, 4]
>>> t = iter(s)
>>> next(s)
______

>>> next(t)
______

>>> next(t)
______

>>> next(iter(s))
______

>>> next(iter(s))
______

>>> u = t
>>> next(u)
______

>>> next(t)
______
>>> r = range(6)
>>> r_iter = iter(r)
>>> next(r_iter)
______

>>> [x + 1 for x in r]
______

>>> [x + 1 for x in r_iter]
______

>>> next(r_iter)
______
>>> map_iter = map(lambda x : x + 10, range(5))
>>> next(map_iter)
______

>>> next(map_iter)
______

>>> list(map_iter)
______

>>> for e in filter(lambda x : x % 4 == 0, range(1000, 1008)):
...     print(e)
______

>>> [x + y for x, y in zip([1, 2, 3], [4, 5, 6])]
______
```

::: details 点击查看答案

```bash
PS D:\Github\CS61A_Fall2024\lab\lab05> python ok -q iterators-wwpd -u 
=====================================================================
Assignment: Lab 5
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Iterators > Suite 1 > Case 1
(cases remaining: 3)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> # Enter StopIteration if StopIteration exception occurs, Error for other errors
>>> # Enter Iterator if the output is an iterator object.
>>> s = [1, 2, 3, 4]
>>> t = iter(s)
>>> next(s)
? Error # [!code ++]
-- OK! --  

>>> next(t)
? 1 # [!code ++]
-- OK! --

>>> next(t)
? 2 # [!code ++]
-- OK! --

>>> next(iter(s))
? 1 # [!code ++]
-- OK! --

>>> next(iter(s))
? 1 # [!code ++]
-- OK! --

>>> next(t)
? 3 # [!code ++]
-- OK! --

>>> next(t)
? 4 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Iterators > Suite 1 > Case 2
(cases remaining: 2)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> r = range(6)
>>> r_iter = iter(r)
>>> next(r_iter)
? 0 # [!code ++]
-- OK! --

>>> [x + 1 for x in r]
? [1, 2, 3, 4, 5, 6] # [!code ++]
-- OK! --

>>> [x + 1 for x in r_iter]
? [2, 3, 4, 5, 6] # [!code ++]
-- OK! --

>>> next(r_iter)
? StopIteration # [!code ++]
-- OK! --

---------------------------------------------------------------------
Iterators > Suite 1 > Case 3
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> map_iter = map(lambda x : x + 10, range(5))
>>> next(map_iter)
? 10 # [!code ++]
-- OK! --

? 11 # [!code ++]
-- OK! --

>>> list(map_iter)
? [12, 13, 14] # [!code ++]
-- OK! --

>>> for e in filter(lambda x : x % 4 == 0, range(1000, 1008)):
...     print(e)
(line 1)? 1000 # [!code ++]
(line 2)? 1004 # [!code ++]
-- OK! --

>>> [x + y for x, y in zip([1, 2, 3], [4, 5, 6])]
? [5, 7, 9] # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Iterators unlocked.

Backup... 100% complete
Backup past deadline by 56 days, 5 hours, 12 minutes, and 2 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab05/backups/p7wZRm

OK is up to date
```
:::

### Q5: Count Occurrences
实现 `count_occurrences` ，它接受一个迭代器 `t` 、一个整数 `n` 和一个值 `x` 。它返回 `t` 的前 `n` 个元素中等于 `x` 的元素数。

您可以假设 `t` 至少有 `n` 个元素。

::: tip 提示
您应该对 `t` 调用 `next` 恰好 `n` 次。如果您需要迭代超过 `n` 个元素，请考虑如何优化您的解决方案。
:::
```py
def count_occurrences(t, n, x):
    """Return the number of times that x is equal to one of the
    first n elements of iterator t.

    >>> s = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
    >>> count_occurrences(s, 10, 9)
    3
    >>> t = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
    >>> count_occurrences(t, 3, 10)
    2
    >>> u = iter([3, 2, 2, 2, 1, 2, 1, 4, 4, 5, 5, 5])
    >>> count_occurrences(u, 1, 3)  # Only iterate over 3
    1
    >>> count_occurrences(u, 3, 2)  # Only iterate over 2, 2, 2
    3
    >>> list(u)                     # Ensure that the iterator has advanced the right amount
    [1, 2, 1, 4, 4, 5, 5, 5]
    >>> v = iter([4, 1, 6, 6, 7, 7, 6, 6, 2, 2, 2, 5])
    >>> count_occurrences(v, 6, 6)
    2
    """
    "*** YOUR CODE HERE ***"
```
Use Ok to test your code:
```bash
python ok -q count_occurrences
```

::: details 点击查看答案
```py
def count_occurrences(t, n, x):
    """Return the number of times that x is equal to one of the
    first n elements of iterator t.

    >>> s = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
    >>> count_occurrences(s, 10, 9)
    3
    >>> t = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
    >>> count_occurrences(t, 3, 10)
    2
    >>> u = iter([3, 2, 2, 2, 1, 2, 1, 4, 4, 5, 5, 5])
    >>> count_occurrences(u, 1, 3)  # Only iterate over 3
    1
    >>> count_occurrences(u, 3, 2)  # Only iterate over 2, 2, 2
    3
    >>> list(u)                     # Ensure that the iterator has advanced the right amount
    [1, 2, 1, 4, 4, 5, 5, 5]
    >>> v = iter([4, 1, 6, 6, 7, 7, 6, 6, 2, 2, 2, 5])
    >>> count_occurrences(v, 6, 6)
    2
    """
    "*** YOUR CODE HERE ***"
    i = 0 # [!code ++]
    res = 0 # [!code ++]
    while i < n: # [!code ++]
        if next(t) == x: # [!code ++]
            res += 1 # [!code ++]
        i += 1 # [!code ++]
    return res # [!code ++]
```
:::

### Q6: Repeated
实现 `repeat` ，它接受迭代器 `t` 和大于 1 的整数 `k` 。它返回 `t` 中连续出现 `k` 次的第一个值。您可以假设 `t` 中有一个元素连续重复至少 `k` 次。

::: tip 提示
仅按所需的最少次数对 `t` 调用 `next` 。如果您收到 `StopIteration` 异常，则您的 `repeat` 函数调用 `next` 的次数过多。
:::
```py
def repeated(t, k):
    """Return the first value in iterator t that appears k times in a row,
    calling next on t as few times as possible.

    >>> s = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
    >>> repeated(s, 2)
    9
    >>> t = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
    >>> repeated(t, 3)
    8
    >>> u = iter([3, 2, 2, 2, 1, 2, 1, 4, 4, 5, 5, 5])
    >>> repeated(u, 3)
    2
    >>> repeated(u, 3)
    5
    >>> v = iter([4, 1, 6, 6, 7, 7, 8, 8, 2, 2, 2, 5])
    >>> repeated(v, 3)
    2
    """
    assert k > 1
    "*** YOUR CODE HERE ***"
```
Use Ok to test your code:
```bash
python ok -q repeated
```

::: details 点击查看答案
```py
def repeated(t, k):
    """Return the first value in iterator t that appears k times in a row,
    calling next on t as few times as possible.

    >>> s = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
    >>> repeated(s, 2)
    9
    >>> t = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
    >>> repeated(t, 3)
    8
    >>> u = iter([3, 2, 2, 2, 1, 2, 1, 4, 4, 5, 5, 5])
    >>> repeated(u, 3)
    2
    >>> repeated(u, 3)
    5
    >>> v = iter([4, 1, 6, 6, 7, 7, 8, 8, 2, 2, 2, 5])
    >>> repeated(v, 3)
    2
    """
    assert k > 1
    "*** YOUR CODE HERE ***"
    res = 1 # [!code ++]
    before = next(t) # [!code ++]
    while 1: # [!code ++]
        now = next(t) # [!code ++]
        if now == before: # [!code ++]
            res += 1 # [!code ++]
            if res == k: # [!code ++]
                return before # [!code ++]
        else: # [!code ++]
            res = 1 # [!code ++]
            before = now # [!code ++]
```
:::

## Check Your Score Locally
您可以通过运行来在本地检查此作业的每个问题的分数：

```bash
python ok --score
```

::: details 我的得分：
```bash
PS D:\Github\CS61A_Fall2024\lab\lab05> python ok --score 
=====================================================================
Assignment: Lab 5
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Scoring tests

---------------------------------------------------------------------
List Mutation
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
Doctests for insert_items

>>> from lab05 import *
>>> test_s = [1, 5, 8, 5, 2, 3]
>>> new_s = insert_items(test_s, 5, 7)
>>> new_s
[1, 5, 7, 8, 5, 7, 2, 3]
>>> test_s
[1, 5, 7, 8, 5, 7, 2, 3]
>>> new_s is test_s
True
>>> double_s = [1, 2, 1, 2, 3, 3]
>>> double_s = insert_items(double_s, 3, 4)
>>> double_s
[1, 2, 1, 2, 3, 4, 3, 4]
>>> large_s = [1, 4, 8]
>>> large_s2 = insert_items(large_s, 4, 4)
>>> large_s2
[1, 4, 4, 8]
>>> large_s3 = insert_items(large_s2, 4, 6)
>>> large_s3
[1, 4, 6, 4, 6, 8]
>>> large_s3 is large_s
True
Score: 1.0/1

---------------------------------------------------------------------
Doctests for group_by

>>> from lab05 import *
>>> group_by([12, 23, 14, 45], lambda p: p // 10)
{1: [12, 14], 2: [23], 4: [45]}
>>> group_by(range(-3, 4), lambda x: x * x)
{9: [-3, 3], 4: [-2, 2], 1: [-1, 1], 0: [0]}
Score: 1.0/1

---------------------------------------------------------------------
Iterators
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
Doctests for count_occurrences

>>> from lab05 import *
>>> s = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
>>> count_occurrences(s, 10, 9)
3
>>> t = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
>>> count_occurrences(t, 3, 10)
2
>>> u = iter([3, 2, 2, 2, 1, 2, 1, 4, 4, 5, 5, 5])
>>> count_occurrences(u, 1, 3)  # Only iterate over 3
1
>>> count_occurrences(u, 3, 2)  # Only iterate over 2, 2, 2
3
>>> list(u)                     # Ensure that the iterator has advanced the right amount
[1, 2, 1, 4, 4, 5, 5, 5]
>>> v = iter([4, 1, 6, 6, 7, 7, 6, 6, 2, 2, 2, 5])
>>> count_occurrences(v, 6, 6)
2
Score: 1.0/1

---------------------------------------------------------------------
Doctests for repeated

>>> from lab05 import *
>>> s = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
>>> repeated(s, 2)
9
>>> t = iter([10, 9, 10, 9, 9, 10, 8, 8, 8, 7])
>>> repeated(t, 3)
8
>>> u = iter([3, 2, 2, 2, 1, 2, 1, 4, 4, 5, 5, 5])
>>> repeated(u, 3)
2
>>> repeated(u, 3)
5
>>> v = iter([4, 1, 6, 6, 7, 7, 8, 8, 2, 2, 2, 5])
>>> repeated(v, 3)
2
Score: 1.0/1

---------------------------------------------------------------------
Point breakdown
    List Mutation: 0.0/0
    insert_items: 1.0/1
    group_by: 1.0/1
    Iterators: 0.0/0
    count_occurrences: 1.0/1
    repeated: 1.0/1

Score:
    Total: 4.0

Backup... 100% complete
Backup past deadline by 56 days, 6 hours, 7 minutes, and 17 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab05/backups/NpDOp8

OK is up to date
```
:::
这不会提交作业！当您对分数满意时，请将作业提交给 Gradescope 以获得学分。

## Optional Questions
这些问题是可选的。如果您不完成它们，您仍将获得此作业的学分。它们是很好的练习，所以无论如何都要完成它们！

### Q7: Sprout Leaves
定义一个函数 `sprout_leaves` ，该函数接受一棵树 `t` 和一个叶子列表 `leaves` 。它生成一棵与 `t` 相同的新树，但每个旧叶子节点都有新分支，每个分支对应于 `leaves` 中的每片叶子。

例如，假设我们有树 `t = tree(1, [tree(2), tree(3, [tree(4)])])`:

```
  1
 / \
2   3
    |
    4
```

如果我们调用 `sprout_leaves(t, [5, 6])` ，结果是以下树：

```
       1
     /   \
    2     3
   / \    |
  5   6   4
         / \
        5   6
```
```py
def sprout_leaves(t, leaves):
    """Sprout new leaves containing the labels in leaves at each leaf of
    the original tree t and return the resulting tree.

    >>> t1 = tree(1, [tree(2), tree(3)])
    >>> print_tree(t1)
    1
      2
      3
    >>> new1 = sprout_leaves(t1, [4, 5])
    >>> print_tree(new1)
    1
      2
        4
        5
      3
        4
        5

    >>> t2 = tree(1, [tree(2, [tree(3)])])
    >>> print_tree(t2)
    1
      2
        3
    >>> new2 = sprout_leaves(t2, [6, 1, 2])
    >>> print_tree(new2)
    1
      2
        3
          6
          1
          2
    """
    "*** YOUR CODE HERE ***"
```
使用 Ok 来测试你的代码：
```bash
python ok -q sprout_leaves
```

::: details 点击查看答案
```py
def sprout_leaves(t, leaves):
    """Sprout new leaves containing the labels in leaves at each leaf of
    the original tree t and return the resulting tree.

    >>> t1 = tree(1, [tree(2), tree(3)])
    >>> print_tree(t1)
    1
      2
      3
    >>> new1 = sprout_leaves(t1, [4, 5])
    >>> print_tree(new1)
    1
      2
        4
        5
      3
        4
        5

    >>> t2 = tree(1, [tree(2, [tree(3)])])
    >>> print_tree(t2)
    1
      2
        3
    >>> new2 = sprout_leaves(t2, [6, 1, 2])
    >>> print_tree(new2)
    1
      2
        3
          6
          1
          2
    """
    "*** YOUR CODE HERE ***"
    if is_leaf(t): # [!code ++]
        return tree(label(t), [tree(leaf) for leaf in leaves]) # [!code ++]
    else: # [!code ++]
        new_branches = [] # [!code ++]
        for branch in branches(t): # [!code ++]
            new_branches.append(sprout_leaves(branch, leaves)) # [!code ++]
        return tree(label(t), new_branches) # [!code ++]
```
:::

### Q8: Partial Reverse
从索引 2 开始部分反转列表 `[1, 2, 3, 4, 5]` 直到列表末尾，将得到 `[1, 2, 5, 4, 3]` 。

实现函数 `partial_reverse` ，该函数将从索引 `start` 开始反转列表直到列表末尾。此反转应该是就地的，这意味着原始列表已被修改。不要在函数内创建新列表，即使您不返回它。 `partial_reverse` 函数返回 `None` 。

::: tip 提示
您可以使用多个赋值交换列表 `s` 中索引 `i` 和 `j` 处的元素：`s[i], s[j] = s[j], s[i]`
:::
```py
def partial_reverse(s, start):
    """Reverse part of a list in-place, starting with start up to the end of
    the list.

    >>> a = [1, 2, 3, 4, 5, 6, 7]
    >>> partial_reverse(a, 2)
    >>> a
    [1, 2, 7, 6, 5, 4, 3]
    >>> partial_reverse(a, 5)
    >>> a
    [1, 2, 7, 6, 5, 3, 4]
    """
    "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python ok -q partial_reverse
```
::: details 点击查看答案
```py
def partial_reverse(s, start):
    """Reverse part of a list in-place, starting with start up to the end of
    the list.

    >>> a = [1, 2, 3, 4, 5, 6, 7]
    >>> partial_reverse(a, 2)
    >>> a
    [1, 2, 7, 6, 5, 4, 3]
    >>> partial_reverse(a, 5)
    >>> a
    [1, 2, 7, 6, 5, 3, 4]
    """
    "*** YOUR CODE HERE ***"
    i = start # [!code ++]
    j = len(s) - 1 # [!code ++]
    while i < j: # [!code ++]
        s[i], s[j] = s[j], s[i] # [!code ++]
        i += 1 # [!code ++]
        j -= 1 # [!code ++]
```
:::