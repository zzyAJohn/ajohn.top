---
title: 'Lab 1: Functions'
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2025/03/14 16:26:29
permalink: /cs61a/ekpww5bn/
---

## Starter Files

Download [lab01.zip](https://cs61a.org/lab/lab01/lab01.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: important 重要
请注意，该代码包含答案，因此如果你想独立完成请务必提前将 lab01.py 中的答案删除！
:::

## Required Questions

## Review

::: details Using Python
以下是在文件上运行 Python 的最常见方法。
1. 不使用命令行选项将运行您提供的文件中的代码并返回到命令行。如果您的文件仅包含函数定义，除非存在语法错误，否则您将看不到任何输出。
    ```bash
    python lab00.py
    ```

2. `-i`：`-i` 选项运行您提供的文件中的代码，然后打开一个交互式会话（带有 `>>>` 提示符）。然后您可以评估表达式，例如调用您定义的函数。要退出，请键入 `exit()` 。您还可以在 Linux/Mac 计算机上使用键盘快捷键 `Ctrl-D` ，在 Windows 计算机上使用 `Ctrl-Z Enter`。

    如果您在以交互方式运行 Python 文件时对其进行编辑，则需要退出并重新启动解释器以使这些更改生效。

    以下是我们如何以交互方式运行 `lab00.py`：

    ```bash
    python -i lab00.py
    ```
3. `-m doctest`：运行文件中的 `doctest` ，这些是函数文档字符串中的示例。

    文件中的每个测试都由 `>>>` 后跟一些 Python 代码和预期输出组成。

    以下是我们如何运行 `lab00.py` 中的 doctest：

    ```bash
    python -m doctest lab00.py
    ```

当我们的代码通过所有文档测试时，不会显示任何输出。否则，将显示有关失败的测试的信息。
:::

::: details Using OK

在 61A 中，我们使用一个名为 OK 的程序来自动评分实验室、家庭作业和项目。
要使用 Ok 测试函数，请运行以下命令（将 `FUNCTION` 替换为函数名称）：

```bash
python ok -q FUNCTION
```

如果您的函数包含以 `"DEBUG:"` 开头的 `print` 调用，则 OK 将忽略此行。（否则，包括额外的 `print` 调用可能会因显示的额外输出而导致测试失败。）
```bash
print("DEBUG:", x)
```
[使用 OK 页面](https://hqhq1025.github.io/cs61a-24fa-backup/articles/using-ok.html) 上描述了更多功能。您可以在 [ok-help](https://go.cs61a.org/ok-help) 中快速生成大多数 ok 命令。
:::

::: details Division, Floor Div, and Modulo
以下是 Python 3 中与除法相关的运算符的示例：

真除法：`/`（小数除法）：
```bash
>>> 1 / 5
0.2

>>> 25 / 4
6.25

>>> 4 / 2
2.0

>>> 5 / 0
ZeroDivisionError
```
向下取整除法： `//`（整数除法）：

```bash
>>> 1 // 5 # truncate result of true division
0

>>> 25 // 4
6

>>> 4 // 2
2

>>> 5 // 0
ZeroDivisionError
```

（整数除法）模数：`%`（余数）：

```bash
>>> 1 % 5
1

>>> 25 % 4
1

>>> 4 % 2
0

>>> 5 % 0
ZeroDivisionError
```

除以 0 时会发生 `ZeroDivisionError` 。

涉及 `%` 运算符的一项有用技术是检查数字 `x` 是否可以被另一个数字 `y` 整除：

```bash
x % y == 0
```

例如，为了检查 `x` 是否为偶数：`x % 2 == 0`
:::


::: details Return and Print
您定义的大多数函数都包含一个 `return` 语句，该语句提供用于调用该函数的调用表达式的值。
当 Python 执行 `return` 语句时，函数调用会立即终止。如果 Python 到达函数体的末尾而没有执行 `return` 语句，则函数返回 `None` 。

相反， `print` 函数用于显示值。与 `return` 语句不同，当 Python 评估对 `print` 的调用时，该函数不会立即终止。

```py
def what_prints():
    print('Hello World!')
    return 'Exiting this function.'
    print('61A is awesome!')

>>> what_prints()
Hello World!
'Exiting this function.'
```

::: tip
`print` 将显示不带引号的文本，但 `return` 将保留引号。
:::


## What Would Python Display? (WWPD)

### Q1: Return and Print
::: tip
使用 Ok 来通过以下“Python 会显示什么？”问题测试您的知识：
```bash
python ok -q return-and-print -u
```
:::

```bash
>>> def welcome():
...     print('Go')
...     return 'hello'
...
>>> def cal():
...     print('Bears')
...     return 'world'
...
>>> welcome()
______

>>> print(welcome(), cal())
______
```
::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab01> python ok -q return-and-print -u
=====================================================================
Assignment: Lab 1
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
return-and-print > Suite 1 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> def welcome():
...     print('Go')
...     return 'hello'
>>> def cal():
...     print('Bears')
...     return 'world'
>>> welcome()
(line 1)? Go # [!code ++]
(line 2)? 'hello' # [!code ++]
-- OK! --

>>> print(welcome(), cal())
(line 1)? Go # [!code ++]
(line 2)? Bears # [!code ++]
(line 3)? hello world # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for return-and-print unlocked.

Backup... 100% complete
Backup past deadline by 190 days, 1 hour, 47 minutes, and 2 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab01/backups/z96Qny

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab01> 
```
:::
## Write Code

### Q2: Debugging Quiz

以下是关于不同调试技术的快速测验，这些技术将对您在本课程中的使用有所帮助。您可以参考[调试文章](https://hqhq1025.github.io/cs61a-24fa-backup/articles/debugging/index.html)来回答问题。

使用 Ok 来测试您的理解：

```bash
python ok -q debugging-quiz -u
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab01> python ok -q debugging-quiz -u 
=====================================================================
Assignment: Lab 1
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
debugging-quiz > Suite 1 > Case 1
(cases remaining: 7)

Q: In the following traceback, what is the most recent function call?
Traceback (most recent call last):
    File "temp.py", line 10, in <module>
      f("hi")
    File "temp.py", line 2, in f
      return g(x + x, x)
    File "temp.py", line 5, in g
      return h(x + y * 5)
    File "temp.py", line 8, in h
      return x + 0
  TypeError: must be str, not int
Choose the number of the correct choice:
0) h(x + y * 5)
1) f("hi")
2) g(x + x, x)
? 0 # [!code ++]
-- OK! --

---------------------------------------------------------------------
debugging-quiz > Suite 1 > Case 2
(cases remaining: 6)

Q: In the following traceback, what is the cause of this error?
Traceback (most recent call last):
    File "temp.py", line 10, in <module>
      f("hi")
    File "temp.py", line 2, in f
      return g(x + x, x)
    File "temp.py", line 5, in g
      return h(x + y * 5)
    File "temp.py", line 8, in h
      return x + 0
  TypeError: must be str, not int
Choose the number of the correct choice:
0) the code looped infinitely
1) there was a missing return statement
2) the code attempted to add a string to an integer
? 2 # [!code ++]
-- OK! --

---------------------------------------------------------------------
debugging-quiz > Suite 1 > Case 3
(cases remaining: 5)

Q: How do you write a doctest asserting that square(2) == 4?
Choose the number of the correct choice:
0) def square(x):
       '''
       input: 2
       output: 4
       '''
       return x * x
1) def square(x):
       '''
       >>> square(2)
       4
       '''
       return x * x
2) def square(x):
       '''
       doctest: (2, 4)
       '''
       return x * x
3) def square(x):
       '''
       square(2)
       4
       '''
       return x * x
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
debugging-quiz > Suite 1 > Case 4
(cases remaining: 4)

Q: When should you use print statements?
Choose the number of the correct choice:
0) For permanant debugging so you can have long term confidence in your code
1) To ensure that certain conditions are true at certain points in your code
2) To investigate the values of variables at certain points in your code
? 2 # [!code ++]
-- OK! --

---------------------------------------------------------------------
debugging-quiz > Suite 1 > Case 5
(cases remaining: 3)

Q: How do you prevent the ok autograder from interpreting print statements as output?
Choose the number of the correct choice:
0) Print with # at the front of the outputted line
1) You don't need to do anything, ok only looks at returned values, not printed values
```
```bash
2) Print with 'DEBUG:' at the front of the outputted line
? 2 # [!code ++]
-- OK! --

---------------------------------------------------------------------
debugging-quiz > Suite 1 > Case 6
(cases remaining: 2)

Q: What is the best way to open an interactive terminal to investigate a failing test for question sum_digits in assignment lab01?
Choose the number of the correct choice:
0) python ok -q sum_digits --trace
1) python ok -q sum_digits
2) python ok -q sum_digits -i
3) python -i lab01.py
? 2 # [!code ++]
-- OK! --

---------------------------------------------------------------------
debugging-quiz > Suite 1 > Case 7
(cases remaining: 1)

Q: Which of the following is NOT true?
Choose the number of the correct choice:
0) Debugging is not a substitute for testing
1) It is generally bad practice to release code with debugging print statements left in
2) Code that returns a wrong answer instead of crashing is generally better as it at least works fine
3) Testing is very important to ensure robust code
4) It is generally good practice to release code with assertion statements left in
? 2 # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for debugging-quiz unlocked.

Backup... 100% complete
Backup past deadline by 190 days, 1 hour, 54 minutes, and 18 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab01/backups/lDRXvM

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab01>
```
:::


### Q3: Pick a Digit

实现 `digit` ，它接受正整数 `n` 和 `k` ，并且只有一个返回语句作为其主体。它返回 `n` 中距离最右边数字（个位）左侧 `k` 位的数字。如果 `k` 为 0，则返回最右边的数字。如果 `n` 中距离最右边数字左侧 `k` 位的数字不存在，则返回 0。

::: tip
使用 `//` 和 `%` 以及内置 `pow` 函数来隔离 `n` 中的特定数字。
:::

```py
def digit(n, k):
    """Return the digit that is k from the right of n for positive integers n and k.

    >>> digit(3579, 2)
    5
    >>> digit(3579, 0)
    9
    >>> digit(3579, 10)
    0
    """
    return ____
```

使用 Ok 来测试你的代码：
```bash
python ok -q digit
```


::: details 点击查看答案
```py
def digit(n, k):
    """Return the digit that is k from the right of n for positive integers n and k.

    >>> digit(3579, 2)
    5
    >>> digit(3579, 0)
    9
    >>> digit(3579, 10)
    0
    """
    return n // (10 ** k) % 10 # [!code ++]
```
:::


### Q4: Middle Number

通过编写单个返回表达式来实现 `middle` ，该表达式的计算结果既不是三个不同整数 `a` 、 `b` 和 `c` 中的最大值也不是最小值。

::: tip
尝试合并所有数字，然后去掉您不想返回的数字。
:::
```py
def middle(a, b, c):
    """Return the number among a, b, and c that is not the smallest or largest.
    Assume a, b, and c are all different numbers.

    >>> middle(3, 5, 4)
    4
    >>> middle(30, 5, 4)
    5
    >>> middle(3, 5, 40)
    5
    >>> middle(3, 5, 40)
    5
    >>> middle(30, 5, 40)
    30
    """
    return ____
```


使用 Ok 来测试你的代码：
```bash
python ok -q middle
```
::: details 点击查看答案
```py
def middle(a, b, c):
    """Return the number among a, b, and c that is not the smallest or largest.
    Assume a, b, and c are all different numbers.

    >>> middle(3, 5, 4)
    4
    >>> middle(30, 5, 4)
    5
    >>> middle(3, 5, 40)
    5
    >>> middle(3, 5, 40)
    5
    >>> middle(30, 5, 40)
    30
    """
    return a + b + c - min(a, b, c) - max(a, b, c) # [!code ++]
```
:::


## Check Your Score Locally
您可以通过运行来在本地检查此作业的每个问题的分数：

```bash
python ok --score
```

我的得分：
```bash
PS D:\Github\CS61A_Fall2024\lab\lab01> python ok --score
=====================================================================
Assignment: Lab 1
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Scoring tests

---------------------------------------------------------------------
return-and-print
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
debugging-quiz
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
Doctests for digit

>>> from lab01 import *
>>> digit(3579, 2)
5
>>> digit(3579, 0)
9
>>> digit(3579, 10)
0
Score: 1.0/1

---------------------------------------------------------------------
Doctests for middle

>>> from lab01 import *
>>> middle(3, 5, 4)
4
>>> middle(30, 5, 4)
5
>>> middle(3, 5, 40)
5
>>> middle(3, 5, 40)
5
>>> middle(30, 5, 40)
30
Score: 1.0/1

---------------------------------------------------------------------
Point breakdown
    return-and-print: 0.0/0
    debugging-quiz: 0.0/0
    digit: 1.0/1
    middle: 1.0/1

Score:
    Total: 2.0

Backup... 100% complete
Backup past deadline by 190 days, 2 hours, 8 minutes, and 49 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab01/backups/3O6EYR

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab01>
```

这不会提交作业！当您对分数满意时，请将作业提交给 Gradescope 以获得学分。

## Optional Questions

这些问题是可选的。如果您没有完成它们，您仍将获得此作业的学分。它们是很好的练习，所以无论如何都要做！

观看完有关控制（讲座 3）的讲座视频后，请回来尝试这些练习题！欢迎您在本实验室、未来的实验室或办公时间提出有关它们的问题。

### Q6: Falling Factorial

让我们编写一个函数 `falling` ，它是一个“下降”阶乘，接受两个参数 `n` 和 `k` ，并返回从 `n` 开始向下 `k` 个连续数字的乘积。当 `k` 为 0 时，函数应该返回 1 。

```py
def falling(n, k):
    """Compute the falling factorial of n to depth k.

    >>> falling(6, 3)  # 6 * 5 * 4
    120
    >>> falling(4, 3)  # 4 * 3 * 2
    24
    >>> falling(4, 1)  # 4
    4
    >>> falling(4, 0)
    1
    """
    "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python ok -q falling
```

::: details 点击查看答案
```py
def falling(n, k):
    """Compute the falling factorial of n to depth k.

    >>> falling(6, 3)  # 6 * 5 * 4
    120
    >>> falling(4, 3)  # 4 * 3 * 2
    24
    >>> falling(4, 1)  # 4
    4
    >>> falling(4, 0)
    1
    """
    "*** YOUR CODE HERE ***"
    res = 1 # [!code ++]
    while k: # [!code ++]
        res *= n # [!code ++]
        n -= 1 # [!code ++]
        k -= 1 # [!code ++]
    return res # [!code ++]
```
:::


### Q7: Divisible By k
编写一个函数 `divisible_by_k` ，以正整数 `n` 和 `k` 为输入。它打印所有小于或等于 `n` 且能被 `k` 整除的正整数（从最小到最大）。然后，它返回打印了多少个数字。

```py
def divisible_by_k(n, k):
    """
    >>> a = divisible_by_k(10, 2)  # 2, 4, 6, 8, and 10 are divisible by 2
    2
    4
    6
    8
    10
    >>> a
    5
    >>> b = divisible_by_k(3, 1)  # 1, 2, and 3 are divisible by 1
    1
    2
    3
    >>> b
    3
    >>> c = divisible_by_k(6, 7)  # There are no integers up to 6 divisible by 7
    >>> c
    0
    """
    "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python ok -q divisible_by_k
```


::: details 点击查看答案
```py
def divisible_by_k(n, k):
    """
    >>> a = divisible_by_k(10, 2)  # 2, 4, 6, 8, and 10 are divisible by 2
    2
    4
    6
    8
    10
    >>> a
    5
    >>> b = divisible_by_k(3, 1)  # 1, 2, and 3 are divisible by 1
    1
    2
    3
    >>> b
    3
    >>> c = divisible_by_k(6, 7)  # There are no integers up to 6 divisible by 7
    >>> c
    0
    """
    "*** YOUR CODE HERE ***"
    cnt = 0 # [!code ++]
    for i in range(1, n + 1): # [!code ++]
        if i % k == 0: # [!code ++]
            print(i) # [!code ++]
            cnt += 1 # [!code ++]
    return cnt # [!code ++]
```
:::

### Q8: Sum Digits
编写一个函数，接受一个非负整数并对其数字求和。（使用向下取整和取模可能会有所帮助！）
```py
def sum_digits(y):
    """Sum all the digits of y.

    >>> sum_digits(10) # 1 + 0 = 1
    1
    >>> sum_digits(4224) # 4 + 2 + 2 + 4 = 12
    12
    >>> sum_digits(1234567890)
    45
    >>> a = sum_digits(123) # make sure that you are using return rather than print
    >>> a
    6
    """
    "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python ok -q sum_digits
```
::: details 点击查看答案
```py
def sum_digits(y):
    """Sum all the digits of y.

    >>> sum_digits(10) # 1 + 0 = 1
    1
    >>> sum_digits(4224) # 4 + 2 + 2 + 4 = 12
    12
    >>> sum_digits(1234567890)
    45
    >>> a = sum_digits(123) # make sure that you are using return rather than print
    >>> a
    6
    """
    "*** YOUR CODE HERE ***"
    res = 0 # [!code ++]
    while y: # [!code ++]
        res += y % 10 # [!code ++]
        y //= 10 # [!code ++]
    return res # [!code ++]
```
:::

### Q9: WWPD: What If?
::: tip
使用 Ok 测试您掌握的知识，回答以下“Python 会显示什么？”问题：
```bash
python ok -q if-statements -u
```

`print` （与 `return` 不同）不会导致函数退出。
:::
```bash
>>> def ab(c, d):
...     if c > 5:
...         print(c)
...     elif c > 7:
...         print(d)
...     print('foo')
>>> ab(10, 20)
______
```



```bash
>>> def bake(cake, make):
...     if cake == 0:
...         cake = cake + 1
...         print(cake)
...     if cake == 1:
...         print(make)
...     else:
...         return cake
...     return make
>>> bake(0, 29)
______

>>> bake(1, "mashed potatoes")
______
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab01> python ok -q if-statements -u
=====================================================================
Assignment: Lab 1
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
What If? > Suite 1 > Case 1
(cases remaining: 2)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> def ab(c, d):
...     if c > 5:
...         print(c)
...     elif c > 7:
...         print(d)
...     print('foo')
>>> ab(10, 20)
(line 1)? 10 # [!code ++]
(line 2)? foo # [!code ++]
-- OK! --

---------------------------------------------------------------------
What If? > Suite 1 > Case 2
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> def bake(cake, make):
...    if cake == 0:
...        cake = cake + 1
...        print(cake)
...    if cake == 1:
...        print(make)
...    else:
...        return cake
...    return make
>>> bake(0, 29)
(line 1)? 1 # [!code ++]
(line 2)? 29 # [!code ++]
(line 3)? 29 # [!code ++]
-- OK! --

>>> bake(1, "mashed potatoes")
(line 1)? mashed potatoes # [!code ++]
(line 2)? "mashed potatoes" # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for What If? unlocked.

Backup... 100% complete
Backup past deadline by 190 days, 2 hours, 14 minutes, and 42 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab01/backups/qDQ6Ap

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab01>
```
:::


### Q10: Double Eights
编写一个函数，接受一个数字并确定其数字是否包含两个相邻的 8。
```py
def double_eights(n):
    """Return true if n has two eights in a row.
    >>> double_eights(8)
    False
    >>> double_eights(88)
    True
    >>> double_eights(2882)
    True
    >>> double_eights(880088)
    True
    >>> double_eights(12345)
    False
    >>> double_eights(80808080)
    False
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
    """Return true if n has two eights in a row.
    >>> double_eights(8)
    False
    >>> double_eights(88)
    True
    >>> double_eights(2882)
    True
    >>> double_eights(880088)
    True
    >>> double_eights(12345)
    False
    >>> double_eights(80808080)
    False
    """
    "*** YOUR CODE HERE ***"
    while n: # [!code ++]
        if n % 100 == 88: # [!code ++]
            return True # [!code ++]
        n //= 10 # [!code ++]
    return False # [!code ++]
```
:::