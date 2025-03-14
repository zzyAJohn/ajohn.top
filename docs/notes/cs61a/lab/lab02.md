---
title: 'Lab 2: Higher-Order Functions, Lambda Expressions'
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2024/11/21 18:19:07
permalink: /cs61a/lab-lab02/
---


## Starter Files

Download [lab02.zip](https://cs61a.org/lab/lab02/lab02.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: important 重要
请注意，该代码包含答案，因此如果你想独立完成请务必提前将 lab02.py 中的答案删除！
:::

## Topics


## Required Questions

## What Would Python Display?

::: tip
对于所有 WWPD 问题，如果您认为答案是 `<function...>` ，请输入 `Function` ；如果答案是错误，请输入 `Error` ；如果未显示任何内容，请输入 `Nothing` 。
:::
### Q1: WWPD: The Truth Will Prevail
使用 Ok 来通过以下“Python 会显示什么？”问题测试您的知识：
```bash
python3 ok -q short-circuit -u
```

```bash
>>> True and 13
______

>>> False or 0
______

>>> not 10
______

>>> not None
______
```

```bash
>>> True and 1 / 0
______

>>> True or 1 / 0
______

>>> -1 and 1 > 0
______

>>> -1 or 5
______

>>> (1 + 1) and 1
______

>>> print(3) or ""
______
```

```bash
>>> def f(x):
...     if x == 0:
...         return "zero"
...     elif x > 0:
...         return "positive"
...     else:
...         return ""
>>> 0 or f(1)
______

>>> f(0) or f(-1)
______

>>> f(0) and f(-1)
______
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab02> python ok -q short-circuit -u 
=====================================================================
Assignment: Lab 2
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
The Truth Will Prevail > Suite 1 > Case 1
(cases remaining: 4)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> True and 13
? 13 # [!code ++]
-- OK! --

>>> False or 0
? 0 # [!code ++]
-- OK! --

>>> not 10
? False # [!code ++]
-- OK! --

>>> not None
? True # [!code ++]
-- OK! --

---------------------------------------------------------------------
The Truth Will Prevail > Suite 2 > Case 1
(cases remaining: 3)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> True and 1 / 0  # If this errors, just type Error.
? Error # [!code ++]
-- OK! --

>>> True or 1 / 0  # If this errors, just type Error.
? True # [!code ++]
-- OK! --

>>> -1 and 1 > 0 # If this errors, just type Error.
? True # [!code ++]
-- OK! --

>>> -1 or 5
? -1 # [!code ++]
-- OK! --

>>> (1 + 1) and 1  # If this errors, just type Error. If this is blank, just type Nothing.
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
The Truth Will Prevail > Suite 2 > Case 2
(cases remaining: 2)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> print(3) or ""
(line 1)? 3 # [!code ++]
(line 2)? "" # [!code ++]
-- OK! --

---------------------------------------------------------------------
The Truth Will Prevail > Suite 3 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> def f(x):
...     if x == 0:
...         return "zero"
...     elif x > 0:
...         return "positive"
...     else:
...         return ""
>>> 0 or f(1)
? "positive" # [!code ++]
-- OK! --

>>> f(0) or f(-1)
? "zero" # [!code ++]
-- OK! --

>>> f(0) and f(-1)
? "" # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for The Truth Will Prevail unlocked.

Backup... 100% complete
Backup past deadline by 183 days, 5 hours, 23 minutes, and 17 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab02/backups/mGq8XO

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab02>
```
:::

### Q2: WWPD: Higher-Order Functions
使用 Ok 来通过以下“Python 会显示什么？”问题测试您的知识：
```bash
python3 ok -q hof-wwpd -u
```

```bash
>>> def cake():
...    print('beets')
...    def pie():
...        print('sweets')
...        return 'cake'
...    return pie
>>> chocolate = cake()
______

>>> chocolate
______

>>> chocolate()
______

>>> more_chocolate, more_cake = chocolate(), cake
______

>>> more_chocolate
______

>>> def snake(x, y):
...    if cake == more_cake:
...        return chocolate
...    else:
...        return x + y
>>> snake(10, 20)
______

>>> snake(10, 20)()
______

>>> cake = 'cake'
>>> snake(10, 20)
______
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab02>python ok -q hof-wwpd -u 
=====================================================================
Assignment: Lab 2
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Higher Order Functions > Suite 1 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> # If Python displays <function...>, type Function, if it errors type Error, if it displays nothing type Nothing
>>> def cake():
...    print('beets')
...    def pie():
...        print('sweets')
...        return 'cake'
...    return pie
>>> chocolate = cake()
? beets # [!code ++]
-- OK! --

>>> chocolate
? Function # [!code ++]
-- OK! --

>>> chocolate()
(line 1)? sweets # [!code ++]
(line 2)? 'cake' # [!code ++]
-- OK! --

>>> more_chocolate, more_cake = chocolate(), cake
? sweets # [!code ++]
-- OK! --

>>> more_chocolate
? 'cake' # [!code ++]
-- OK! --

>>> # Reminder: cake, more_cake, and chocolate were defined/assigned in the code above!
>>> # It might be helpful to refer to their definitions on the assignment website so you don't have to scroll as much!
>>> def snake(x, y):
...    if cake == more_cake:
...        return chocolate
...    else:
...        return x + y
>>> snake(10, 20)
? Function # [!code ++]
-- OK! --

>>> snake(10, 20)()
(line 1)? sweets # [!code ++]
(line 2)? 'cake' # [!code ++]
-- OK! --

>>> cake = 'cake'
>>> snake(10, 20)
? 30 # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Lists unlocked.

Backup... 100% complete
Backup past deadline by 160 days, 7 hours, 7 minutes, and 18 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab02/backups/mGONKA

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab02>
```
:::




### Q3: WWPD: Lambda
使用 Ok 来通过以下“Python 会显示什么？”问题测试您的知识：
```bash
python3 ok -q lambda -u
```
::: tip
以下两行代码在执行时不会在交互式 Python 解释器中显示任何输出：
```bash
>>> x = None
>>> x
>>>
```
:::

```bash
>>> lambda x: x  # A lambda expression with one parameter x
______

>>> a = lambda x: x  # Assigning the lambda function to the name a
>>> a(5)
______

>>> (lambda: 3)()  # Using a lambda expression as an operator in a call exp.
______

>>> b = lambda x, y: lambda: x + y  # Lambdas can return other lambdas!
>>> c = b(8, 4)
>>> c
______

>>> c()
______

>>> d = lambda f: f(4)  # They can have functions as arguments as well.
>>> def square(x):
...     return x * x
>>> d(square)
______
```

```bash
>>> higher_order_lambda = lambda f: lambda x: f(x)
>>> g = lambda x: x * x
>>> higher_order_lambda(2)(g)  # Which argument belongs to which function call?
______

>>> higher_order_lambda(g)(2)
______

>>> call_thrice = lambda f: lambda x: f(f(f(x)))
>>> call_thrice(lambda y: y + 1)(0)
______

>>> print_lambda = lambda z: print(z)  # When is the return expression of a lambda expression executed?
>>> print_lambda
______

>>> one_thousand = print_lambda(1000)
______

>>> one_thousand # What did the call to print_lambda return?
______
```
::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab02> python ok -q lambda -u 
=====================================================================
Assignment: Lab 2
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Lambda the Free > Suite 1 > Case 1
(cases remaining: 5)

Q: Which of the following statements describes a difference between a def statement and a lambda expression?
Choose the number of the correct choice:
0) A def statement can only have one line in its body.
1) A lambda expression cannot return another function.
2) A lambda expression cannot have more than two parameters.
3) A lambda expression does not automatically bind the function that it returns to a name.
? 3 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Lambda the Free > Suite 1 > Case 2
(cases remaining: 4)

Q: How many formal parameters does the following lambda expression have?
lambda a, b: c + d
Choose the number of the correct choice:
0) one
1) two
2) Not enough information
3) three
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Lambda the Free > Suite 1 > Case 3
(cases remaining: 3)

Q: When is the return expression of a lambda expression executed?
Choose the number of the correct choice:
0) When you pass the lambda expression into another function.
1) When the function returned by the lambda expression is called.
2) When the lambda expression is evaluated.
3) When you assign the lambda expression to a name.
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Lambda the Free > Suite 2 > Case 1
(cases remaining: 2)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> # If Python displays <function...>, type Function, if it errors type Error, if it displays nothing type Nothing
>>> lambda x: x  # A lambda expression with one parameter x
? Function # [!code ++]
-- OK! --

>>> a = lambda x: x  # Assigning a lambda function to the name a
>>> a(5)
? 5 # [!code ++]
-- OK! --

>>> (lambda: 3)()  # Using a lambda expression as an operator in a call exp.
? 3 # [!code ++]
-- OK! --

>>> b = lambda x, y: lambda: x + y # Lambdas can return other lambdas!
>>> c = b(8, 4)
>>> c
? Function # [!code ++]
-- OK! --

>>> c()
? 12 # [!code ++]
-- OK! --

>>> d = lambda f: f(4)  # They can have functions as arguments as well
>>> def square(x):
...     return x * x
>>> d(square)
? 16 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Lambda the Free > Suite 2 > Case 2
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> # Try drawing an environment diagram if you get stuck!
>>> higher_order_lambda = lambda f: lambda x: f(x)
>>> g = lambda x: x * x
>>> higher_order_lambda(2)(g) # Which argument belongs to which function call?
? Error # [!code ++]
-- OK! --

>>> higher_order_lambda(g)(2)
? 4 # [!code ++]
-- OK! --

>>> call_thrice = lambda f: lambda x: f(f(f(x)))
>>> call_thrice(lambda y: y + 1)(0)
? 3 # [!code ++]
-- OK! --

>>> print_lambda = lambda z: print(z) # When is the return expression of a lambda expression executed?
>>> print_lambda
? Function # [!code ++]
-- OK! --

>>> one_thousand = print_lambda(1000)
? 1000 # [!code ++]
-- OK! --

>>> one_thousand # What did the call to print_lambda return? If it displays nothing, write Nothing
? Nothing # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Lists unlocked.

Backup... 100% complete
Backup past deadline by 160 days, 7 hours, 7 minutes, and 18 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab02/backups/mGONKA

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab02>
```

:::

## Coding Practice
### Q4: Composite Identity Function

编写一个函数，该函数接受两个单参数函数 `f` 和 `g` ，并返回另一个具有单个参数 `x` 的函数。如果 `f(g(x))` 等于 `g(f(x))` ，则返回函数应返回 `True` ，否则返回 `False` 。您可以假设 `g(x)` 的输出是 `f` 的有效输入，反之亦然。
```py
def composite_identity(f, g):
    """
    Return a function with one parameter x that returns True if f(g(x)) is
    equal to g(f(x)). You can assume the result of g(x) is a valid input for f
    and vice versa.

    >>> add_one = lambda x: x + 1        # adds one to x
    >>> square = lambda x: x**2          # squares x [returns x^2]
    >>> b1 = composite_identity(square, add_one)
    >>> b1(0)                            # (0 + 1) ** 2 == 0 ** 2 + 1
    True
    >>> b1(4)                            # (4 + 1) ** 2 != 4 ** 2 + 1
    False
    """
    "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python3 ok -q composite_identity
```
::: details 点击查看答案
```py
def composite_identity(f, g):
    """
    Return a function with one parameter x that returns True if f(g(x)) is
    equal to g(f(x)). You can assume the result of g(x) is a valid input for f
    and vice versa.

    >>> add_one = lambda x: x + 1        # adds one to x
    >>> square = lambda x: x**2          # squares x [returns x^2]
    >>> b1 = composite_identity(square, add_one)
    >>> b1(0)                            # (0 + 1) ** 2 == 0 ** 2 + 1
    True
    >>> b1(4)                            # (4 + 1) ** 2 != 4 ** 2 + 1
    False
    """
    "*** YOUR CODE HERE ***"
    def helper(x): # [!code ++]
        if g(f(x)) == f(g(x)): # [!code ++]
            return True # [!code ++]
        else: # [!code ++]
            return False # [!code ++]
    return helper # [!code ++]
```

:::

### Q5: Count Cond
考虑以下 `count_fives` 和 `count_primes` 的实现，它们使用先前分配中的 `sum_digits` 和 `is_prime` 函数：
```py
def count_fives(n):
    """Return the number of values i from 1 to n (including n)
    where sum_digits(n * i) is 5.
    >>> count_fives(10)  # Among 10, 20, 30, ..., 100, only 50 (10 * 5) has digit sum 5
    1
    >>> count_fives(50)  # 50 (50 * 1), 500 (50 * 10), 1400 (50 * 28), 2300 (50 * 46)
    4
    """
    i = 1
    count = 0
    while i <= n:
        if sum_digits(n * i) == 5:
            count += 1
        i += 1
    return count

def count_primes(n):
    """Return the number of prime numbers up to and including n.
    >>> count_primes(6)   # 2, 3, 5
    3
    >>> count_primes(13)  # 2, 3, 5, 7, 11, 13
    6
    """
    i = 1
    count = 0
    while i <= n:
        if is_prime(i):
            count += 1
        i += 1
    return count
```

实现看起来非常相似！通过编写一个函数 `count_cond` 来概括此逻辑，该函数接受一个双参数谓词函数 `condition(n, i)` 。 `count_cond` 返回一个接受 `n` 的单参数函数，该函数在调用时计算满足条件的从 1 到 `n` 的所有数字。
::: tip
当我们说 `condition` 是一个谓词函数时，我们的意思是它是一个返回 `True` 或 `False` 的函数。
:::
```py
def sum_digits(y):
    """Return the sum of the digits of non-negative integer y."""
    total = 0
    while y > 0:
        total, y = total + y % 10, y // 10
    return total

def is_prime(n):
    """Return whether positive integer n is prime."""
    if n == 1:
        return False
    k = 2
    while k < n:
        if n % k == 0:
            return False
        k += 1
    return True

def count_cond(condition):
    """Returns a function with one parameter N that counts all the numbers from
    1 to N that satisfy the two-argument predicate function Condition, where
    the first argument for Condition is N and the second argument is the
    number from 1 to N.

    >>> count_fives = count_cond(lambda n, i: sum_digits(n * i) == 5)
    >>> count_fives(10)   # 50 (10 * 5)
    1
    >>> count_fives(50)   # 50 (50 * 1), 500 (50 * 10), 1400 (50 * 28), 2300 (50 * 46)
    4

    >>> is_i_prime = lambda n, i: is_prime(i) # need to pass 2-argument function into count_cond
    >>> count_primes = count_cond(is_i_prime)
    >>> count_primes(2)    # 2
    1
    >>> count_primes(3)    # 2, 3
    2
    >>> count_primes(4)    # 2, 3
    2
    >>> count_primes(5)    # 2, 3, 5
    3
    >>> count_primes(20)   # 2, 3, 5, 7, 11, 13, 17, 19
    8
    """
    "*** YOUR CODE HERE ***"
```
使用 Ok 来测试你的代码：
```bash
python3 ok -q count_cond
```


::: details 点击查看答案
```py
def count_cond(condition):
    """Returns a function with one parameter N that counts all the numbers from
    1 to N that satisfy the two-argument predicate function Condition, where
    the first argument for Condition is N and the second argument is the
    number from 1 to N.

    >>> count_fives = count_cond(lambda n, i: sum_digits(n * i) == 5)
    >>> count_fives(10)   # 50 (10 * 5)
    1
    >>> count_fives(50)   # 50 (50 * 1), 500 (50 * 10), 1400 (50 * 28), 2300 (50 * 46)
    4

    >>> is_i_prime = lambda n, i: is_prime(i) # need to pass 2-argument function into count_cond
    >>> count_primes = count_cond(is_i_prime)
    >>> count_primes(2)    # 2
    1
    >>> count_primes(3)    # 2, 3
    2
    >>> count_primes(4)    # 2, 3
    2
    >>> count_primes(5)    # 2, 3, 5
    3
    >>> count_primes(20)   # 2, 3, 5, 7, 11, 13, 17, 19
    8
    """
    "*** YOUR CODE HERE ***"
    def helper(n): # [!code ++]
        i = 1 # [!code ++]
        count = 0 # [!code ++]
        while i <= n: # [!code ++]
            if condition(n, i): # [!code ++]
                count += 1 # [!code ++]
            i += 1 # [!code ++]
        return count # [!code ++]

    return helper # [!code ++]
```
:::

## Check Your Score Locally
您可以通过运行来在本地检查此作业的每个问题的分数：

```bash
python ok --score
```


::: details 我的得分：
```bash
PS D:\Github\CS61A_Fall2024\lab\lab02> python ok --score
=====================================================================
Assignment: Lab 2
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Scoring tests

---------------------------------------------------------------------
Lambda the Free
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
The Truth Will Prevail
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
Higher Order Functions
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
Doctests for count_cond

>>> from lab02 import *
>>> count_fives = count_cond(lambda n, i: sum_digits(n * i) == 5)
>>> count_fives(10)   # 50 (10 * 5)
1
>>> count_fives(50)   # 50 (50 * 1), 500 (50 * 10), 1400 (50 * 28), 2300 (50 * 46)
4
>>> is_i_prime = lambda n, i: is_prime(i) # need to pass 2-argument function into count_cond
>>> count_primes = count_cond(is_i_prime)
>>> count_primes(2)    # 2
1
>>> count_primes(3)    # 2, 3
2
>>> count_primes(4)    # 2, 3
2
>>> count_primes(5)    # 2, 3, 5
3
>>> count_primes(20)   # 2, 3, 5, 7, 11, 13, 17, 19
8
Score: 1.0/1

---------------------------------------------------------------------
Doctests for composite_identity

>>> from lab02 import *
>>> add_one = lambda x: x + 1        # adds one to x
>>> square = lambda x: x**2          # squares x [returns x^2]
>>> b1 = composite_identity(square, add_one)
>>> b1(0)                            # (0 + 1) ** 2 == 0 ** 2 + 1
True
>>> b1(4)                            # (4 + 1) ** 2 != 4 ** 2 + 1
False
Score: 1.0/1

---------------------------------------------------------------------
Point breakdown
    Lambda the Free: 0.0/0
    The Truth Will Prevail: 0.0/0
    Higher Order Functions: 0.0/0
    count_cond: 1.0/1
    composite_identity: 1.0/1

Score:
    Total: 2.0

Backup... 100% complete
Backup past deadline by 183 days, 5 hours, 47 minutes, and 7 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab02/backups/Y07rXK

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab02> 
```
:::
这不会提交作业！当您对分数满意时，请将作业提交给 Gradescope 以获得学分。

## Environment Diagram Practice

此组件没有 Gradescope 提交。

但是，我们仍然鼓励您在纸上做这个问题，以熟悉环境图，环境图可能会以另一种形式出现在考试中。要检查您的工作，您可以尝试将代码放入 PythonTutor。

### Q6: HOF Diagram Practice
在纸上或白板上绘制执行以下代码后产生的环境图。使用 [tutor.cs61a.org](https://pythontutor.com/cp/composingprograms.html#mode=edit) 检查您的工作。
```py
n = 7

def f(x):
    n = 8
    return x + 1

def g(x):
    n = 9
    def h():
        return x + 1
    return h

def f(f, x):
    return f(x + n)

f = f(g, n)
g = (lambda y: y())(f)
```

## Optional Questions
::: tip
这些问题是可选的。如果您不完成它们，您仍将获得此作业的学分。它们是很好的练习，所以无论如何都要完成它们！
:::
### Q7: Multiple

编写一个函数，接受两个数字并返回两个数字的倍数中的最小数字。
```py
def multiple(a, b):
    """Return the smallest number n that is a multiple of both a and b.

    >>> multiple(3, 4)
    12
    >>> multiple(14, 21)
    42
    """
    "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python3 ok -q multiple
```


::: details 点击查看答案
```py
def multiple(a, b):
    """Return the smallest number n that is a multiple of both a and b.

    >>> multiple(3, 4)
    12
    >>> multiple(14, 21)
    42
    """
    "*** YOUR CODE HERE ***"
    temp = a # [!code ++]
    while 1: # [!code ++]
        if temp % b == 0: # [!code ++]
            return temp # [!code ++]
        else: # [!code ++]
            temp += a # [!code ++]
```
:::

### Q8: I Heard You Liked Functions...
定义一个函数 `cycle` ，该函数接受三个函数 `f1` 、 `f2` 和 `f3` 作为参数。 `cycle` 将返回另一个函数 `g` ，该函数应接受整数参数 `n` 并返回另一个函数 `h` 。最后一个函数 `h` 应接受参数 `x` ，并根据 `n` 循环将 `f1` 、 `f2` 和 `f3` 应用于 `x` 。以下是最终函数 `h` 应该对 `x` 执行的操作，其中 `n` 有几个值：

- `n = 0` ，返回 `x`

- `n = 1` ，将 `f1` 应用于 `x` ，或返回 `f1(x)`

- `n = 2` ，将 `f1` 应用于 `x` ，然后将 `f2` 应用于其结果，或返回 `f2(f1(x))`

- `n = 3` ，将 `f1` 应用于 `x` ，将 `f2` 应用于应用 `f1` 的结果，然后将 `f3` 应用于应用 `f2` 的结果，或 `f3(f2(f1(x)))`

- `n = 4` ，再次开始循环，先应用 `f1` ，然后应用 `f2` ，然后应用 `f3` ，然后再次应用 `f1` ，或 `f1(f3(f2(f1(x))))`

- 依此类推。

::: tip
大部分工作都在最嵌套的函数内部进行。
:::
```py
def cycle(f1, f2, f3):
    """Returns a function that is itself a higher-order function.

    >>> def add1(x):
    ...     return x + 1
    >>> def times2(x):
    ...     return x * 2
    >>> def add3(x):
    ...     return x + 3
    >>> my_cycle = cycle(add1, times2, add3)
    >>> identity = my_cycle(0)
    >>> identity(5)
    5
    >>> add_one_then_double = my_cycle(2)
    >>> add_one_then_double(1)
    4
    >>> do_all_functions = my_cycle(3)
    >>> do_all_functions(2)
    9
    >>> do_more_than_a_cycle = my_cycle(4)
    >>> do_more_than_a_cycle(2)
    10
    >>> do_two_cycles = my_cycle(6)
    >>> do_two_cycles(1)
    19
    """
    "*** YOUR CODE HERE ***"
```


使用 Ok 来测试你的代码：
```bash
python3 ok -q cycle
```


::: details 点击查看答案
```py
def cycle(f1, f2, f3):
    """Returns a function that is itself a higher-order function.

    >>> def add1(x):
    ...     return x + 1
    >>> def times2(x):
    ...     return x * 2
    >>> def add3(x):
    ...     return x + 3
    >>> my_cycle = cycle(add1, times2, add3)
    >>> identity = my_cycle(0)
    >>> identity(5)
    5
    >>> add_one_then_double = my_cycle(2)
    >>> add_one_then_double(1)
    4
    >>> do_all_functions = my_cycle(3)
    >>> do_all_functions(2)
    9
    >>> do_more_than_a_cycle = my_cycle(4)
    >>> do_more_than_a_cycle(2)
    10
    >>> do_two_cycles = my_cycle(6)
    >>> do_two_cycles(1)
    19
    """
    "*** YOUR CODE HERE ***"
    
    def helper(n): # [!code ++]
        
        def fun(x): # [!code ++]
            f = [f1, f2, f3] # [!code ++]
            cycle = 0 # [!code ++]
            temp = n # [!code ++]
            while temp: # [!code ++]
                x = f[cycle](x) # [!code ++]
                cycle = (cycle + 1) % 3 # [!code ++]
                temp -= 1 # [!code ++]
            return x # [!code ++]

        return fun # [!code ++]

    return helper # [!code ++]
```

:::