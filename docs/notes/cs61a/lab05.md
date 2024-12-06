---
title: 'Lab 5: Mutability, Iterators'
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2024/12/05 20:30:59
permalink: /cs61a/va2a24a4/
---

Starter Files
Download [lab05.zip](https://cs61a.org/lab/lab05/lab05.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

请注意，该代码包含答案，因此如果你想独立完成请务必提前将 lab05.py 中的答案删除！


## Required Questions

## Mutability
Consult the drop-down if you need a refresher on mutability. It's okay to skip directly to the questions and refer back here should you get stuck.

### Q1: WWPD: List-Mutation

Important: For all WWPD questions, type if you believe the answer is , if it errors, and if nothing is displayed.Function<function...>ErrorNothing

Use Ok to test your knowledge with the following "What Would Python Display?" questions:

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

::: warning 答案警告
```bash
PS D:\Github\CS61A_Fall2020\lab\lab05> python ok -q list-mutation -u 
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
? [6, 7, 8, 6]
-- Not quite. Try again! --

? Nothing
-- Not quite. Try again! --

? None
-- OK! --

>>> s    
? [6, 7, 8, 6]
-- OK! --

>>> s.insert(0, 9)
>>> s
? [9, 6, 7, 8, 6] 
-- OK! --

>>> x = s.pop(1)
>>> s
? [9, 7, 8, 6]    
-- OK! --

>>> s.remove(x)
>>> s
? [9, 7, 8]    
-- OK! --

>>> a, b = s, s[:]
>>> a is s
? True
-- OK! --

>>> b == s
? True
-- OK! --

>>> b is s
? True
-- Not quite. Try again! --

? None
-- Not quite. Try again! --

? False
-- OK! --

>>> a.pop()
? [9, 7]
-- Not quite. Try again! --

? None
-- Not quite. Try again! --

? 8
-- OK! --

>>> a + b
? [9, 7, 8, 9, 7, 8]
-- Not quite. Try again! --

? Nothing
-- Not quite. Try again! --

? None
-- Not quite. Try again! --

? [9, 7, 9, 7]
-- Not quite. Try again! --

? [9, 7, 9, 7, 8]
-- OK! --  

>>> s = [3]
>>> s.extend([4, 5])
>>> s
? [3, 4, 5]
-- OK! --
>>> a
? [9, 7]
-- OK! --

>>> s.extend([s.append(9), s.append(10)])
>>> s
? [3, 4, 5, 9, 10]
-- Not quite. Try again! --

? Error
? Error
-- Not quite. Try again! --
-- Not quite. Try again! --


? [3, 4, 5, None, None]
? [3, 4, 5, None, None]
-- Not quite. Try again! --

-- Not quite. Try again! --

? [3, 4, 5, 9, 10, None, None]

? [3, 4, 5, 9, 10, None, None]
? [3, 4, 5, 9, 10, None, None]
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
Write a function that takes in a list , a value , and a value . It modified in place by inserting just after each value equal to in . It returns .sbeforeaftersafterbeforess

Important: No new lists should be created.

Note: If the values passed into and are equal, make sure you're not creating an infinitely long list while iterating through it. If you find that your code is taking more than a few seconds to run, the function may be in an infinite loop of inserting new values.beforeafter

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

::: warning 答案警告
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
    i = 0
    end = len(s)
    while i < end:
        if s[i] == before:
            s.insert(i + 1, after)
            end += 1
            i += 1
        i += 1
    return s
```
:::



### Q3: Group By
Write a function that takes a list and a function , and returns a dictionary that groups the elements of based on the result of applying .sfnsfn

The dictionary should have one key for each unique result of applying to elements of .fns
The value for each key should be a list of all elements in that, when passed to , produce that key value.sfn
In other words, for each element in , determine and add to the list corresponding to in the dictionary.esfn(e)efn(e)

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

::: warning 答案警告
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
    for num in s:
        key = fn(num)
        if key in grouped:
            grouped[key].append(num)
        else:
            grouped[key] = [num]
    return grouped
```
:::

## Iterators
Consult the drop-down if you need a refresher on iterators. It's okay to skip directly to the questions and refer back here should you get stuck.

### Q4: WWPD: Iterators

Important: Enter if a exception occurs, if you believe a different error occurs, and if the output is an iterator object.StopIterationStopIterationErrorIterator

Important: Python's built-in function , , and return iterators, not lists.mapfilterzip

Use Ok to test your knowledge with the following "What Would Python Display?" questions:
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

::: warning 答案警告

```bash
PS D:\Github\CS61A_Fall2020\lab\lab05> python ok -q iterators-wwpd -u 
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
? 1
-- Not quite. Try again! --

? Error
-- OK! --  

>>> next(t)
? 1
-- OK! --

>>> next(t)
? 2
-- OK! --

>>> next(iter(s))
? 3
-- Not quite. Try again! --

? 1
-- OK! --

>>> next(iter(s))
? 2
-- Not quite. Try again! --

? 1
-- OK! --

>>> next(t)
? 3
-- OK! --

>>> next(t)
? 4
-- OK! --

---------------------------------------------------------------------
Iterators > Suite 1 > Case 2
(cases remaining: 2)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> r = range(6)
>>> r_iter = iter(r)
>>> next(r_iter)
? 0
-- OK! --

>>> [x + 1 for x in r]
? [1, 2, 3, 4, 5, 6]
-- OK! --

>>> [x + 1 for x in r_iter]
? [2, 3, 4, 5, 6]
-- OK! --

>>> next(r_iter)
? 1
-- Not quite. Try again! --

? None
-- Not quite. Try again! --

? Error
-- Not quite. Try again! --

? StopIteration
-- OK! --

---------------------------------------------------------------------
Iterators > Suite 1 > Case 3
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> map_iter = map(lambda x : x + 10, range(5))
>>> next(map_iter)
? 10
-- OK! --

? 11
-- OK! --

>>> list(map_iter)
? [12, 13, 14]
-- OK! --

>>> for e in filter(lambda x : x % 4 == 0, range(1000, 1008)):
...     print(e)
(line 1)? 1000
(line 2)? 1004
-- OK! --

>>> [x + y for x, y in zip([1, 2, 3], [4, 5, 6])]
? [5, 7, 9]
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

Implement , which takes an iterator , an integer , and a value . It returns the number of elements in the first elements of that are equal to .count_occurrencestnxntx

You can assume that has at least elements.tn

Important: You should call on exactly times. If you need to iterate through more than elements, think about how you can optimize your solution.nexttnn
```bash
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
```
python ok -q count_occurrences
```

::: warning 答案警告
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
    i = 0
    res = 0
    while i < n:
        if next(t) == x:
            res += 1
        i += 1
    return res
```
:::

### Q6: Repeated
Implement , which takes in an iterator and an integer greater than 1. It returns the first value in that appears times in a row. You may assume that there is an element of repeated at least times in a row.repeatedtktktk

Important: Call on only the minimum number of times required. If you are receiving a exception, your function is calling too many times.nexttStopIterationrepeatednext

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

::: warning 答案警告
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
    res = 1
    before = next(t)
    while 1:
        now = next(t)
        if now == before:
            res += 1
            if res == k:
                return before
        else:
            res = 1
            before = now
```
:::

## Check Your Score Locally
You can locally check your score on each question of this assignment by running

```bash
python ok --score
```

我的得分：
```bash
PS D:\Github\CS61A_Fall2020\lab\lab05> python ok --score 
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

This does NOT submit the assignment! When you are satisfied with your score, submit the assignment to Gradescope to receive credit for it.

Submit Assignment
If you are in a regular section of CS 61A, fill out this lab attendance and feedback form. (If you are in the mega section, you don't need to fill out the form.)

Then, submit this assignment by uploading any files you've edited to the appropriate Gradescope assignment. Lab 00 has detailed instructions.

## Optional Questions

These questions are optional. If you don't complete them, you will still receive credit for this assignment. They are great practice, so do them anyway!


### Q7: Sprout Leaves
Define a function sprout_leaves that takes in a tree, t, and a list of leaves, leaves. It produces a new tree that is identical to t, but where each old leaf node has new branches, one for each leaf in leaves.

For example, say we have the tree t = tree(1, [tree(2), tree(3, [tree(4)])]):

```
  1
 / \
2   3
    |
    4
```

If we call sprout_leaves(t, [5, 6]), the result is the following tree:

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
Use Ok to test your code:
```bash
python ok -q sprout_leaves
```

::: warning 答案警告
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
    if is_leaf(t):
        return tree(label(t), [tree(leaf) for leaf in leaves])
    else:
        new_branches = []
        for branch in branches(t):
            new_branches.append(sprout_leaves(branch, leaves))
        return tree(label(t), new_branches)
```
:::

### Q8: Partial Reverse
Partially reversing the list [1, 2, 3, 4, 5] starting from index 2 until the end of the list will give [1, 2, 5, 4, 3].

Implement the function partial_reverse which reverses a list starting from index start until the end of the list. This reversal should be in-place, meaning that the original list is modified. Do not create a new list inside your function, even if you do not return it. The partial_reverse function returns None.

Hint: You can swap elements at index i and j in list s with multiple assignment: s[i], s[j] = s[j], s[i]

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

Use Ok to test your code:
```bash
python ok -q partial_reverse
```
::: warning 答案警告
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
    i = start
    j = len(s) - 1
    while i < j:
        s[i], s[j] = s[j], s[i]
        i += 1
        j -= 1
```
:::