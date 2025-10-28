---
title: 'Lab 7: Inheritance, Linked Lists'
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2025/01/03 16:30:17
permalink: /cs61a/lab-lab07/
---

## Starter Files

Download [lab07.zip](https://cs61a.org/lab/lab07/lab07.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: tip 提示
初始代码可以在 github 仓库历史 Commits 中的 Commits on Jan 3, 2025 的 `initial lab07` 找到
:::

## Required Questions

## Inheritance
如果您需要复习继承，请查看下拉菜单。如果遇到困难，可以直接跳到问题部分，然后再回头查看。
::: details Inheritance
为了避免为类似的类重新定义属性和方法，我们可以编写一个**基类**，让更专业的类从中**继承**。例如，我们可以编写一个名为 `Pet` 的类，并将 `Dog` 定义为 `Pet` 的**子类**：
```py
class Pet:

    def __init__(self, name, owner):
        self.is_alive = True    # It's alive!!!
        self.name = name
        self.owner = owner

    def eat(self, thing):
        print(self.name + " ate a " + str(thing) + "!")

    def talk(self):
        print(self.name)

class Dog(Pet):

    def talk(self):
        super().talk()
        print('This Dog says woof!')
```
继承表示两个或多个类之间的层次关系，其中一个类**是另一个**类的更具体版本：狗**是一种**宠物（我们使用**是一个**来描述 OOP 语言中的这种关系，而不是指 Python 的 `is` 运算符）。

由于 `Dog` 继承自 `Pet` ，因此 `Dog` 类也将继承 `Pet` 类的方法，因此我们不必重新定义 `__init__` 或 `eat` 。我们确实希望每只 `Dog` 都以特定于 `Dog` 的方式说话，因此我们可以**覆盖** `talk` 方法。

我们可以使用 `super()` 来引用 `self` 的超类，并像访问超类实例一样访问任何超类方法。例如， `Dog` 类中的 `super().talk()` 将调用 `Pet` 类中的 `talk` 方法，但将 `Dog` 实例作为 `self` 传递。
:::
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

::: details 点击查看答案
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

::: details 点击查看答案
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
::: details 点击查看答案
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
如果您需要复习一下链接列表，请查看下拉菜单。如果遇到困难，可以直接跳到问题部分，然后再回头查看。
::: details Linked Lists
链表是一种用于存储一系列值的数据结构。对于某些操作，例如在长列表中间插入值，它比常规内置列表更有效。链表不是内置的，因此我们定义一个名为 `Link` 的类来表示它们。链表是 `Link` 实例或 `Link.empty`（表示空链表）。

`Link` 实例有两个实例属性， `first` 和 `rest` 。

`Link` 实例的 `rest` 属性应始终是链表：另一个 `Link` 实例或 `Link.empty` 。它绝不应为 `None` 。

要检查链表是否为空，请将其与 `Link.empty` 进行比较。由于只有一个空列表，我们可以使用 `is` 进行比较，但 `==` 也可以。

```py
def is_empty(s):
    """Return whether linked list s is empty."""
    return s is Link.empty:
```
您可以通过两种方式改变 `Link` 对象 `s` ：

- 使用 `s.first = ...` 更改第一个元素
- 使用 `s.rest = ... ` 更改其余元素

您可以通过调用 `Link` 创建一个新 `Link` 对象：

- `Link(4)` 创建一个长度为 1 且包含 4 的链接列表。

- `Link(4, s)` 创建一个以 4 开头的链接列表，后面跟着链接列表 `s` 的元素。
:::
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

::: details 点击查看答案
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
::: details 点击查看答案
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

::: details 点击查看答案
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
::: details 我的得分：
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
:::