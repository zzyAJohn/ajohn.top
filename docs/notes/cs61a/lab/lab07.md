---
title: 'Lab 7: Inheritance, Linked Lists'
createTime: 2025/01/03 16:30:17
permalink: /cs61a/9fgtcinp/
---

## Starter Files

Download [lab07.zip](https://cs61a.org/lab/lab07/lab07.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: tip 提示
初始代码可以在 github 仓库历史 Commits 中的 Commits on Dec 30, 2024 的 `initial lab07` 找到
:::

## Required Questions

## Inheritance

### Q1: WWPD: Inheritance ABCs
::: tip 提示
对于所有 WWPD 问题，如果您认为答案是 <function...>，请输入 `Function` ；如果答案是错误，请输入 `Error` ；如果未显示任何内容，请输入 `Nothing` 。

使用 Ok 回答以下“Python 会显示什么？”问题来测试您的知识：

```bash
python ok -q inheritance-abc -u
```
:::

```bash
>>> class A:
...   x, y = 0, 0
...   def __init__(self):
...         return
>>> class B(A):
...   def __init__(self):
...         return
>>> class C(A):
...   def __init__(self):
...         return
>>> print(A.x, B.x, C.x)
______

>>> B.x = 2
>>> print(A.x, B.x, C.x)
______

>>> A.x += 1
>>> print(A.x, B.x, C.x)
______

>>> obj = C()
>>> obj.y = 1
>>> C.y == obj.y
______

>>> A.y = obj.y
>>> print(A.y, B.y, C.y, obj.y)
______
```

::: warning 以下内容包含答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab07> python ok -q inheritance-abc -u 
=====================================================================
Assignment: Lab 7
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Inheritance ABCs > Suite 1 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> class A:
...   x, y = 0, 0
...   def __init__(self):
...         return
>>> class B(A):
...   def __init__(self):
...         return
>>> class C(A):
...   def __init__(self):
...         return
>>> print(A.x, B.x, C.x)
? 0 0 0 # [!code ++]
-- OK! --

>>> B.x = 2
>>> print(A.x, B.x, C.x)
? 0 2 0 # [!code ++]
-- OK! --

>>> A.x += 1
>>> print(A.x, B.x, C.x)
? 1 2 1 # [!code ++]
-- OK! --

>>> obj = C()
>>> obj.y = 1
>>> C.y == obj.y
? False # [!code ++]
-- OK! --

>>> A.y = obj.y
>>> print(A.y, B.y, C.y, obj.y)
? 1 1 1 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Inheritance ABCs unlocked.

Backup... 100% complete
Backup past deadline by 71 days, 14 minutes, and 58 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab07/backups/3ORNvp

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab07> 
```
:::

## Class Practice

让我们改进讲座中的 `Account` 类，该类模拟一个可以处理存款和取款的银行账户。

```py
class Account:
    """An account has a balance and a holder.

    >>> a = Account('John')
    >>> a.deposit(10)
    10
    >>> a.balance
    10
    >>> a.interest
    0.02
    >>> a.time_to_retire(10.25)  # 10 -> 10.2 -> 10.404
    2
    >>> a.balance                # Calling time_to_retire method should not change the balance
    10
    >>> a.time_to_retire(11)     # 10 -> 10.2 -> ... -> 11.040808032
    5
    >>> a.time_to_retire(100)
    117
    """
    max_withdrawal = 10
    interest = 0.02

    def __init__(self, account_holder):
        self.balance = 0
        self.holder = account_holder

    def deposit(self, amount):
        self.balance = self.balance + amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            return "Insufficient funds"
        if amount > self.max_withdrawal:
            return "Can't withdraw that amount"
        self.balance = self.balance - amount
        return self.balance
```

### Q2: Retirement

向 `Account` 类添加 `time_to_retire` 方法。此方法接收一个 `amount` 并返回当前 `balance` 增长到 `amount` 所需的年数，假设银行在每年年底将利息（计算为当前 `balance` 乘以 `interest` 利率）添加到 `balance` 中。确保您没有修改帐户的余额！

::: important 重要
调用 `time_to_retire` 方法不会改变账户余额。
:::
```py
  def time_to_retire(self, amount):
        """Return the number of years until balance would grow to amount."""
        assert self.balance > 0 and amount > 0 and self.interest > 0
        "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python ok -q Account
```

::: warning 以下内容包含答案
```py
class Account:
    """An account has a balance and a holder.

    >>> a = Account('John')
    >>> a.deposit(10)
    10
    >>> a.balance
    10
    >>> a.interest
    0.02
    >>> a.time_to_retire(10.25)  # 10 -> 10.2 -> 10.404
    2
    >>> a.balance                # Calling time_to_retire method should not change the balance
    10
    >>> a.time_to_retire(11)     # 10 -> 10.2 -> ... -> 11.040808032
    5
    >>> a.time_to_retire(100)
    117
    """
    max_withdrawal = 10
    interest = 0.02

    def __init__(self, account_holder):
        self.balance = 0
        self.holder = account_holder

    def deposit(self, amount):
        self.balance = self.balance + amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            return "Insufficient funds"
        if amount > self.max_withdrawal:
            return "Can't withdraw that amount"
        self.balance = self.balance - amount
        return self.balance

    def time_to_retire(self, amount):
        """Return the number of years until balance would grow to amount."""
        assert self.balance > 0 and amount > 0 and self.interest > 0
        "*** YOUR CODE HERE ***"
        balance = self.balance # [!code ++]
        year = 0 # [!code ++]
        while balance < amount: # [!code ++]
            balance += balance * self.interest # [!code ++]
            year += 1 # [!code ++]
        return year # [!code ++]
```
:::

### Q3: FreeChecking
实现 `FreeChecking` 类，该类与 `Account` 类类似，不同之处在于它在提取 `free_withdrawals` 次数后收取取款费 `withdraw_fee` 。如果提款不成功，则不会收取取款费，但仍计入剩余的免费提款次数。

```py
class FreeChecking(Account):
    """A bank account that charges for withdrawals, but the first two are free!

    >>> ch = FreeChecking('Jack')
    >>> ch.balance = 20
    >>> ch.withdraw(100)  # First one's free. Still counts as a free withdrawal even though it was unsuccessful
    'Insufficient funds'
    >>> ch.withdraw(3)    # Second withdrawal is also free
    17
    >>> ch.balance
    17
    >>> ch.withdraw(3)    # Now there is a fee because free_withdrawals is only 2
    13
    >>> ch.withdraw(3)
    9
    >>> ch2 = FreeChecking('John')
    >>> ch2.balance = 10
    >>> ch2.withdraw(3) # No fee
    7
    >>> ch.withdraw(3)  # ch still charges a fee
    5
    >>> ch.withdraw(5)  # Not enough to cover fee + withdraw
    'Insufficient funds'
    """
    withdraw_fee = 1
    free_withdrawals = 2

    "*** YOUR CODE HERE ***"
```
使用 Ok 来测试你的代码：
```bash
python ok -q FreeChecking
```
::: warning 以下内容包含答案
```py
class FreeChecking(Account):
    """A bank account that charges for withdrawals, but the first two are free!

    >>> ch = FreeChecking('Jack')
    >>> ch.balance = 20
    >>> ch.withdraw(100)  # First one's free. Still counts as a free withdrawal even though it was unsuccessful
    'Insufficient funds'
    >>> ch.withdraw(3)    # Second withdrawal is also free
    17
    >>> ch.balance
    17
    >>> ch.withdraw(3)    # Now there is a fee because free_withdrawals is only 2
    13
    >>> ch.withdraw(3)
    9
    >>> ch2 = FreeChecking('John')
    >>> ch2.balance = 10
    >>> ch2.withdraw(3) # No fee
    7
    >>> ch.withdraw(3)  # ch still charges a fee
    5
    >>> ch.withdraw(5)  # Not enough to cover fee + withdraw
    'Insufficient funds'
    """
    withdraw_fee = 1
    free_withdrawals = 2

    "*** YOUR CODE HERE ***"
    def withdraw(self, amount): # [!code ++]
        if self.free_withdrawals > 0: # [!code ++]
            self.free_withdrawals -= 1 # [!code ++]
            return super().withdraw(amount) # [!code ++]
        else: # [!code ++]
            return super().withdraw(amount + self.withdraw_fee) # [!code ++]
```
:::

## Linked Lists

### Q4: WWPD: Linked Lists

阅读 `Link` 类。确保您理解 doctests 。
::: tip 提示
使用 Ok 测试以下“Python 会显示什么？”问题来测试您的知识：
```bash
python ok -q link -u
```
如果您认为答案是 <function ...>，请输入 `Function` ；如果出现错误，请输入 `Error` ；如果没有显示任何内容，请输入 `Nothing` 。

如果您遇到困难，请尝试在纸上绘制链接列表的盒子指针图或使用 `python -i lab08.py` 将 `Link` 类加载到解释器中。
:::

```bash
>>> link = Link(1000)
>>> link.first
______

>>> link.rest is Link.empty
______

>>> link = Link(1000, 2000)
______

>>> link = Link(1000, Link())
______
```

```bash
>>> link = Link(1, Link(2, Link(3)))
>>> link.first
______

>>> link.rest.first
______

>>> link.rest.rest.rest is Link.empty
______

>>> link.first = 9001
>>> link.first
______

>>> link.rest = link.rest.rest
>>> link.rest.first
______

>>> link = Link(1)
>>> link.rest = link
>>> link.rest.rest is Link.empty
______

>>> link.rest.rest.rest.rest.first
______

>>> link = Link(2, Link(3, Link(4)))
>>> link2 = Link(1, link)
>>> link2.first
______

>>> link2.rest.first
______
```

```bash
>>> link = Link(5, Link(6, Link(7)))
>>> link                 # Look at the __repr__ method of Link
______

>>> print(link)          # Look at the __str__ method of Link
______
```

::: warning 以下内容包含答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab07> python ok -q link -u
=====================================================================
Assignment: Lab 7
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Link > Suite 1 > Case 1
(cases remaining: 3)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> from lab08 import *
>>> link = Link(1000)
>>> link.first # [!code ++]
? 1000

>>> link.rest is Link.empty
? True # [!code ++]
-- OK! --

>>> link = Link(1000, 2000)
? Error # [!code ++]
-- OK! --

>>> link = Link(1000, Link())
? Error # [!code ++]
-- OK! --

---------------------------------------------------------------------
Link > Suite 1 > Case 2
(cases remaining: 2)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> from lab08 import *
>>> link = Link(1, Link(2, Link(3)))
>>> link.first
? 1 # [!code ++]
-- OK! --

>>> link.rest.first
? 2 # [!code ++]
-- OK! --

>>> link.rest.rest.rest is Link.empty
? True # [!code ++]
-- OK! --

>>> link.first = 9001
>>> link.first
? 9001 # [!code ++]
-- OK! --

>>> link.rest = link.rest.rest
>>> link.rest.first
? 3 # [!code ++]
-- OK! --

>>> link = Link(1)
>>> link.rest = link
>>> link.rest.rest is Link.empty
? False # [!code ++]
-- OK! --

>>> link.rest.rest.rest.rest.first
? 1 # [!code ++]
-- OK! --

>>> link = Link(2, Link(3, Link(4)))
>>> link2 = Link(1, link)
>>> link2.first
? 1 # [!code ++]
-- OK! --

>>> link2.rest.first
? 2 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Link > Suite 1 > Case 3
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> from lab08 import *
>>> link = Link(5, Link(6, Link(7)))
>>> link                  # Look at the __repr__ method of Link
? Link(5, Link(6, Link(7))) # [!code ++]
-- OK! --

>>> print(link)          # Look at the __str__ method of Link
? <5 6 7> # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Link unlocked.

Backup... 100% complete
Backup past deadline by 71 days, 37 minutes, and 18 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab07/backups/p7w1Ky

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab07> 
```
:::

### Q5: Without One
实现 `without` ，它接受一个链表 `s` 和一个非负整数 `i` 。它返回一个新的链表，其中包含 `s` 中除索引 `i` 处的元素之外的所有元素。（假设 `s.first` 是索引 0 处的元素。）原始链表 `s` 不应更改。
::: tip 提示
提示：使用递归方法可能比迭代方法更容易。
:::
```py
def without(s, i):
    """Return a new linked list like s but without the element at index i.

    >>> s = Link(3, Link(5, Link(7, Link(9))))
    >>> without(s, 0)
    Link(5, Link(7, Link(9)))
    >>> without(s, 2)
    Link(3, Link(5, Link(9)))
    >>> without(s, 4)           # There is no index 4, so all of s is retained.
    Link(3, Link(5, Link(7, Link(9))))
    >>> without(s, 4) is not s  # Make sure a copy is created
    True
    """
    "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python ok -q without
```
::: warning 以下内容包含答案
```py
def without(s, i):
    """Return a new linked list like s but without the element at index i.

    >>> s = Link(3, Link(5, Link(7, Link(9))))
    >>> without(s, 0)
    Link(5, Link(7, Link(9)))
    >>> without(s, 2)
    Link(3, Link(5, Link(9)))
    >>> without(s, 4)           # There is no index 4, so all of s is retained.
    Link(3, Link(5, Link(7, Link(9))))
    >>> without(s, 4) is not s  # Make sure a copy is created
    True
    """
    "*** YOUR CODE HERE ***"
    if i == 0: # [!code ++]
        return s.rest # [!code ++]
    cur = s # [!code ++]
    res = Link(cur.first) # [!code ++]
    head = res # [!code ++]
    index = 0 # [!code ++]
    while cur.rest: # [!code ++]
        index += 1 # [!code ++]
        cur = cur.rest # [!code ++]
        if index != i: # [!code ++]
            res.rest = Link(cur.first) # [!code ++]
            res = res.rest # [!code ++]
    return head # [!code ++]
```
:::

### Q6: Duplicate Link
编写一个函数 `duplicate_link` ，该函数接受一个链接列表 `s` 和一个值 `val` 。它会改变 `s` ，以便每个等于 `val` 的元素后面都有一个额外的 `val` （重复的副本）。它返回 `None` 。小心不要陷入无限循环，不断复制新的副本！
::: tip 提示
注意：为了将链接插入链接列表，请重新分配以 `val` 为 `first` 个的 `Link` 实例的 `rest` 属性。尝试绘制一个 doctest 来进行可视化！
:::

```py
def duplicate_link(s, val):
    """Mutates s so that each element equal to val is followed by another val.

    >>> x = Link(5, Link(4, Link(5)))
    >>> duplicate_link(x, 5)
    >>> x
    Link(5, Link(5, Link(4, Link(5, Link(5)))))
    >>> y = Link(2, Link(4, Link(6, Link(8))))
    >>> duplicate_link(y, 10)
    >>> y
    Link(2, Link(4, Link(6, Link(8))))
    >>> z = Link(1, Link(2, (Link(2, Link(3)))))
    >>> duplicate_link(z, 2) # ensures that back to back links with val are both duplicated
    >>> z
    Link(1, Link(2, Link(2, Link(2, Link(2, Link(3))))))
    """
    "*** YOUR CODE HERE ***"
```

使用 Ok 来测试你的代码：
```bash
python ok -q duplicate_link
```

::: warning 以下内容包含答案
```py
def duplicate_link(s, val):
    """Mutates s so that each element equal to val is followed by another val.

    >>> x = Link(5, Link(4, Link(5)))
    >>> duplicate_link(x, 5)
    >>> x
    Link(5, Link(5, Link(4, Link(5, Link(5)))))
    >>> y = Link(2, Link(4, Link(6, Link(8))))
    >>> duplicate_link(y, 10)
    >>> y
    Link(2, Link(4, Link(6, Link(8))))
    >>> z = Link(1, Link(2, (Link(2, Link(3)))))
    >>> duplicate_link(z, 2) # ensures that back to back links with val are both duplicated
    >>> z
    Link(1, Link(2, Link(2, Link(2, Link(2, Link(3))))))
    """
    "*** YOUR CODE HERE ***"
    cur = s # [!code ++]
    while cur: # [!code ++]
        if cur.first == val: # [!code ++]
            temp = Link(val, cur.rest) # [!code ++]
            cur.rest = temp # [!code ++]
            cur = temp.rest # [!code ++]
        else: # [!code ++]
            cur = cur.rest # [!code ++]
```
:::

## Check Your Score Locally
您可以通过运行 
```bash
python3 ok --score
```
在本地检查此作业每个问题的得分

这不会提交作业！当您对分数满意时，请将作业提交给 Gradescope 以获得学分。
```bash
PS D:\Github\CS61A_Fall2024\lab\lab07> python ok --score 
=====================================================================
Assignment: Lab 7
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Scoring tests

---------------------------------------------------------------------
Doctests for Account

>>> from lab07 import *
>>> a = Account('John')
>>> a.deposit(10)
10
>>> a.balance
10
>>> a.interest
0.02
>>> a.time_to_retire(10.25)  # 10 -> 10.2 -> 10.404
2
>>> a.balance                # Calling time_to_retire method should not change the balance
10
>>> a.time_to_retire(11)     # 10 -> 10.2 -> ... -> 11.040808032
5
>>> a.time_to_retire(100)
117
Score: 1.0/1

---------------------------------------------------------------------
Doctests for FreeChecking

>>> from lab07 import *
>>> ch = FreeChecking('Jack')
>>> ch.balance = 20
>>> ch.withdraw(100)  # First one's free. Still counts as a free withdrawal even though it was unsuccessful
'Insufficient funds'
>>> ch.withdraw(3)    # Second withdrawal is also free
17
>>> ch.balance
17
>>> ch.withdraw(3)    # Now there is a fee because free_withdrawals is only 2
13
>>> ch.withdraw(3)
9
>>> ch2 = FreeChecking('John')
>>> ch2.balance = 10
>>> ch2.withdraw(3) # No fee
7
>>> ch.withdraw(3)  # ch still charges a fee
5
>>> ch.withdraw(5)  # Not enough to cover fee + withdraw
'Insufficient funds'
Score: 1.0/1

---------------------------------------------------------------------
Doctests for without

>>> from lab07 import *
>>> s = Link(3, Link(5, Link(7, Link(9))))
>>> without(s, 0)
Link(5, Link(7, Link(9)))
>>> without(s, 2)
Link(3, Link(5, Link(9)))
>>> without(s, 4)           # There is no index 4, so all of s is retained.
Link(3, Link(5, Link(7, Link(9))))
>>> without(s, 4) is not s  # Make sure a copy is created
True
Score: 1.0/1

---------------------------------------------------------------------
Doctests for duplicate_link

>>> from lab07 import *
>>> x = Link(5, Link(4, Link(5)))
>>> duplicate_link(x, 5)
>>> x
Link(5, Link(5, Link(4, Link(5, Link(5)))))
>>> y = Link(2, Link(4, Link(6, Link(8))))
>>> duplicate_link(y, 10)
>>> y
Link(2, Link(4, Link(6, Link(8))))
>>> z = Link(1, Link(2, (Link(2, Link(3)))))
>>> duplicate_link(z, 2) # ensures that back to back links with val are both duplicated
>>> z
Link(1, Link(2, Link(2, Link(2, Link(2, Link(3))))))
Score: 1.0/1

---------------------------------------------------------------------
Point breakdown
    Account: 1.0/1
    FreeChecking: 1.0/1
    without: 1.0/1
    duplicate_link: 1.0/1

Score:
    Total: 4.0

Backup... 100% complete
Backup past deadline by 71 days, 1 hour, 26 minutes, and 42 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab07/backups/8O8V7j

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab07>
```