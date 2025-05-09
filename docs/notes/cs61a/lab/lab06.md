---
title: 'Lab 6: OOP'
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2024/12/29 16:19:59
permalink: /cs61a/lab-lab06/
---

## Starter Files

Download [lab06.zip](https://cs61a.org/lab/lab06/lab06.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: tip 提示
初始代码可以在 github 仓库历史 Commits 中的 Commits on Dec 29, 2024 的 `initial lab06` 找到
:::

## Required Questions

## Object-Oriented Programming
以下是面向对象编程的复习内容。如果遇到困难，可以直接跳到问题部分，然后再回头参考。
::: details Object-Oriented Programming
**面向对象编程** (OOP) 使用对象和类来组织程序。以下是类的示例：
```py
class Car:
    max_tires = 4

    def __init__(self, color):
        self.tires = Car.max_tires
        self.color = color

    def drive(self):
        if self.tires < Car.max_tires:
            return self.color + ' car cannot drive!'
        return self.color + ' car goes vroom!'

    def pop_tire(self):
        if self.tires > 0:
            self.tires -= 1
```
**类**：对象的类型。 `Car` 类（如上所示）描述了所有 `Car` 对象的特征。

**对象**：类的单个实例。在 Python 中，通过调用类来创建新对象。

```bash
>>> ferrari = Car('red')
```

此处， `ferrari` 是绑定到 `Car` 对象的名称。

**类属性**：属于某个类的变量，可通过点符号访问。 `Car` 类具有 `max_tires` 属性。
```bash
>>> Car.max_tires
4
```
**实例属性**：属于特定对象的变量。每个 `Car` 对象都有一个 `tires` 属性和一个 `color` 属性。与类属性一样，实例属性也可通过点符号访问。
```bash
>>> ferrari.color
'red'
>>> ferrari.tires
4
>>> ferrari.color = 'green'
>>> ferrari.color
'green'
```
**方法**：属于某个对象并通过点符号调用的函数。按照惯例，方法的第一个参数是 `self` 。

当调用某个对象的方法之一时，该对象会隐式地作为 `self` 的参数提供。例如， `ferrari` 对象的 `drive` 方法使用空括号调用，因为 `self` 隐式地绑定到 `ferrari` 对象。

```bash
>>> ferrari = Car('red')
>>> ferrari.drive()
'red car goes vroom!'
```
我们也可以调用原始的 `Car.drive` 函数。原始函数不属于任何特定的 `Car` 对象，因此我们必须为 `self` 提供一个显式参数。

```bash
>>> ferrari = Car('red')
>>> Car.drive(ferrari)
'red car goes vroom!'
```
`__init__` ：创建类的新实例时自动调用的特殊函数。

请注意 `drive` 方法如何将 `self` 作为参数，但看起来我们并没有传入！这是因为点符号隐式地将 `ferrari` 作为 `self` 传递给我们。因此，在此示例中， `self` 绑定到全局框架中名为 `ferrari` 的对象。

为了评估表达式 `Car('red')` ，Python 创建了一个新的 `Car` 对象。然后，Python 调用 Car 类的 `__init__` 函数，将 `self` 绑定到新对象，将 `color` 绑定到 `'red'` 。

:::
### Q1: Bank Account
扩展 `BankAccount` 类以包含 `transactions` 属性。此属性应为一个列表，用于跟踪账户上进行的每笔交易。每当调用 `deposit` 或 `withdraw` 方法时，都应创建一个新的 `Transaction` 实例并将其添加到列表中，**即使操作未成功**。

`Transaction` 类应具有以下属性：

- `before`：交易前的账户余额。
- `after`：交易后的账户余额。
- `id`：交易 ID，即该账户上之前进行的交易（存款或取款）的数量。特定 `BankAccount` 实例的交易 ID 必须是唯一的，但此 `id` 不必在所有账户中都是唯一的。换句话说，您只需确保同一 BankAccount 进行的两个 `Transaction` 对象没有相同的 `id`。

此外，`Transaction` 类应具有以下方法：

- `changed()`：如果余额发生变化（即，`before`与`after`不同），则返回 `True`，否则返回 `False`。
- `report()`：返回描述交易的字符串。该字符串应以交易 ID 开头并描述余额的变化。查看 doctests 以了解预期输出。


```py
class Transaction:
    def __init__(self, id, before, after):
        self.id = id
        self.before = before
        self.after = after

    def changed(self):
        """Return whether the transaction resulted in a changed balance."""
        "*** YOUR CODE HERE ***"

    def report(self):
        """Return a string describing the transaction.

        >>> Transaction(3, 20, 10).report()
        '3: decreased 20->10'
        >>> Transaction(4, 20, 50).report()
        '4: increased 20->50'
        >>> Transaction(5, 50, 50).report()
        '5: no change'
        """
        msg = 'no change'
        if self.changed():
            "*** YOUR CODE HERE ***"
        return str(self.id) + ': ' + msg

class BankAccount:
    """A bank account that tracks its transaction history.

    >>> a = BankAccount('Eric')
    >>> a.deposit(100)    # Transaction 0 for a
    100
    >>> b = BankAccount('Erica')
    >>> a.withdraw(30)    # Transaction 1 for a
    70
    >>> a.deposit(10)     # Transaction 2 for a
    80
    >>> b.deposit(50)     # Transaction 0 for b
    50
    >>> b.withdraw(10)    # Transaction 1 for b
    40
    >>> a.withdraw(100)   # Transaction 3 for a
    'Insufficient funds'
    >>> len(a.transactions)
    4
    >>> len([t for t in a.transactions if t.changed()])
    3
    >>> for t in a.transactions:
    ...     print(t.report())
    0: increased 0->100
    1: decreased 100->70
    2: increased 70->80
    3: no change
    >>> b.withdraw(100)   # Transaction 2 for b
    'Insufficient funds'
    >>> b.withdraw(30)    # Transaction 3 for b
    10
    >>> for t in b.transactions:
    ...     print(t.report())
    0: increased 0->50
    1: decreased 50->40
    2: no change
    3: decreased 40->10
    """

    # *** YOU NEED TO MAKE CHANGES IN SEVERAL PLACES IN THIS CLASS ***

    def __init__(self, account_holder):
        self.balance = 0
        self.holder = account_holder

    def deposit(self, amount):
        """Increase the account balance by amount, add the deposit
        to the transaction history, and return the new balance.
        """
        self.balance = self.balance + amount
        return self.balance

    def withdraw(self, amount):
        """Decrease the account balance by amount, add the withdraw
        to the transaction history, and return the new balance.
        """
        if amount > self.balance:
            return 'Insufficient funds'
        self.balance = self.balance - amount
        return self.balance
```
使用 Ok 来测试你的代码：
```bash
python ok -q BankAccount
```

::: details 点击查看答案
```py
class Transaction:
    def __init__(self, id, before, after):
        self.id = id
        self.before = before
        self.after = after

    def changed(self):
        """Return whether the transaction resulted in a changed balance."""
        "*** YOUR CODE HERE ***"
        if self.before != self.after: # [!code ++]
            return True # [!code ++]
        else: # [!code ++]
            return False # [!code ++]

    def report(self):
        """Return a string describing the transaction.

        >>> Transaction(3, 20, 10).report()
        '3: decreased 20->10'
        >>> Transaction(4, 20, 50).report()
        '4: increased 20->50'
        >>> Transaction(5, 50, 50).report()
        '5: no change'
        """
        msg = 'no change'
        if self.changed():
            "*** YOUR CODE HERE ***"
            if self.before < self.after: # [!code ++]
                msg = f'increased {self.before}->{self.after}' # [!code ++]
            else: # [!code ++]
                msg = f'decreased {self.before}->{self.after}' # [!code ++]
        return str(self.id) + ': ' + msg

class BankAccount(): # [!code --]
class BankAccount(Transaction): # [!code ++]
    """A bank account that tracks its transaction history.

    >>> a = BankAccount('Eric')
    >>> a.deposit(100)    # Transaction 0 for a
    100
    >>> b = BankAccount('Erica')
    >>> a.withdraw(30)    # Transaction 1 for a
    70
    >>> a.deposit(10)     # Transaction 2 for a
    80
    >>> b.deposit(50)     # Transaction 0 for b
    50
    >>> b.withdraw(10)    # Transaction 1 for b
    40
    >>> a.withdraw(100)   # Transaction 3 for a
    'Insufficient funds'
    >>> len(a.transactions)
    4
    >>> len([t for t in a.transactions if t.changed()])
    3
    >>> for t in a.transactions:
    ...     print(t.report())
    0: increased 0->100
    1: decreased 100->70
    2: increased 70->80
    3: no change
    >>> b.withdraw(100)   # Transaction 2 for b
    'Insufficient funds'
    >>> b.withdraw(30)    # Transaction 3 for b
    10
    >>> for t in b.transactions:
    ...     print(t.report())
    0: increased 0->50
    1: decreased 50->40
    2: no change
    3: decreased 40->10
    """

    # *** YOU NEED TO MAKE CHANGES IN SEVERAL PLACES IN THIS CLASS ***

    def __init__(self, account_holder):
        self.balance = 0
        self.holder = account_holder
        self.transactions = [] # [!code ++]
        self.id = 0 # [!code ++]

    def deposit(self, amount):
        """Increase the account balance by amount, add the deposit
        to the transaction history, and return the new balance.
        """
        self.transactions.append(Transaction(self.id, self.balance, self.balance + amount)) # [!code ++]
        self.id += 1 # [!code ++]
        self.balance = self.balance + amount
        return self.balance

    def withdraw(self, amount):
        """Decrease the account balance by amount, add the withdraw
        to the transaction history, and return the new balance.
        """
        if amount > self.balance:
            self.transactions.append(Transaction(self.id, self.balance, self.balance)) # [!code ++]
            self.id += 1 # [!code ++]
            return 'Insufficient funds'
        self.transactions.append(Transaction(self.id, self.balance, self.balance - amount)) # [!code ++]
        self.id += 1 # [!code ++]
        self.balance = self.balance - amount
        return self.balance
```
:::
### Q2: Email
电子邮件系统有三个类：`Email` 、`Server` 和 `Client` 。`Client` 可以 `compose` 电子邮件，并将其 `send` 到 `Server` 。然后 `Server` 将其发送到另一个 `Client` 的 `inbox` 。为了实现这一点， `Server` 有一个名为 `clients` 的字典，它将 `Client` 的名称映射到 `Client` 实例。

假设客户端永远不会更改其使用的服务器，并且它只使用该服务器撰写电子邮件。

填写以下定义以完成实现！ `Email` 类已为您完成。
::: important 重要
在开始之前，请确保您阅读了整个代码片段以了解类之间的关系，并注意方法的参数类型。考虑一下您可以在每个方法中访问哪些变量，以及如何使用它们来访问其他类及其方法。
:::

注意：

- `Email` 类中 `__init__(self, msg, sender, reception_name)` 方法中的 `sender` 参数是 `Client` 实例。
- `Server` 类中 `register_client(self, client)` 方法的 `client` 参数是一个 `Client` 实例。
- `Server` 类中 `send(self, email)` 方法的 `email` 参数是一个 `Email` 实例。

```py
class Email:
    """An email has the following instance attributes:

        msg (str): the contents of the message
        sender (Client): the client that sent the email
        recipient_name (str): the name of the recipient (another client)
    """
    def __init__(self, msg, sender, recipient_name):
        self.msg = msg
        self.sender = sender
        self.recipient_name = recipient_name

class Server:
    """Each Server has one instance attribute called clients that is a
    dictionary from client names to client objects.
    """
    def __init__(self):
        self.clients = {}

    def send(self, email):
        """Append the email to the inbox of the client it is addressed to.
            email is an instance of the Email class.
        """
        ____.inbox.append(email)

    def register_client(self, client):
        """Add a client to the clients mapping (which is a 
        dictionary from client names to client instances).
            client is an instance of the Client class.
        """
        ____[____] = ____

class Client:
    """A client has a server, a name (str), and an inbox (list).

    >>> s = Server()
    >>> a = Client(s, 'Alice')
    >>> b = Client(s, 'Bob')
    >>> a.compose('Hello, World!', 'Bob')
    >>> b.inbox[0].msg
    'Hello, World!'
    >>> a.compose('CS 61A Rocks!', 'Bob')
    >>> len(b.inbox)
    2
    >>> b.inbox[1].msg
    'CS 61A Rocks!'
    >>> b.inbox[1].sender.name
    'Alice'
    """
    def __init__(self, server, name):
        self.inbox = []
        self.server = server
        self.name = name
        server.register_client(____)

    def compose(self, message, recipient_name):
        """Send an email with the given message to the recipient."""
        email = Email(message, ____, ____)
        self.server.send(email)
```
使用 Ok 来测试你的代码：
```bash
python ok -q Client
```


::: details 点击查看答案
```py
class Server:
    """Each Server has one instance attribute called clients that is a
    dictionary from client names to client objects.
    """
    def __init__(self):
        self.clients = {}

    def send(self, email):
        """Append the email to the inbox of the client it is addressed to.
            email is an instance of the Email class.
        """
        ____.inbox.append(email) # [!code --]
        self.clients[email.recipient_name].inbox.append(email) # [!code ++]

    def register_client(self, client):
        """Add a client to the clients mapping (which is a 
        dictionary from client names to client instances).
            client is an instance of the Client class.
        """
        ____[____] = ____ # [!code --]
        self.clients[client.name] = client # [!code ++]

class Client:
    """A client has a server, a name (str), and an inbox (list).

    >>> s = Server()
    >>> a = Client(s, 'Alice')
    >>> b = Client(s, 'Bob')
    >>> a.compose('Hello, World!', 'Bob')
    >>> b.inbox[0].msg
    'Hello, World!'
    >>> a.compose('CS 61A Rocks!', 'Bob')
    >>> len(b.inbox)
    2
    >>> b.inbox[1].msg
    'CS 61A Rocks!'
    >>> b.inbox[1].sender.name
    'Alice'
    """
    def __init__(self, server, name):
        self.inbox = []
        self.server = server
        self.name = name
        server.register_client(____) # [!code --]
        server.register_client(self) # [!code ++]

    def compose(self, message, recipient_name):
        """Send an email with the given message to the recipient."""
        email = Email(message, ____, ____) # [!code --]
        email = Email(message, self, recipient_name) # [!code ++]
        self.server.send(email)
```
:::
### Q3: Mint
铸币厂是铸造硬币的地方。在这个问题中，您将实现一个可以输出具有正确年份和价值的 `Coin` 的 `Mint` 类。

- 每个 `Mint` 实例都有一个 `year` 。 `update` 方法将实例的 `year` 设置为 `Mint` 类的 `present_year` 类属性。
- `create` 方法采用 `Coin` 的子类（不是实例！），然后创建并返回该子类的一个实例，该实例带有 `Mint` 的年份戳（如果未更新，则可能与 `Mint.present_year` 不同。）
- `Coin` 的 `worth` 方法返回硬币的 `cents` 价值，加上超过 50 年的每个年份的额外一分。可以通过从 `Mint` 类的 `present_year` 类属性中减去硬币的年份来确定硬币的年龄。

```py
class Mint:
    """A mint creates coins by stamping on years.

    The update method sets the mint's stamp to Mint.present_year.

    >>> mint = Mint()
    >>> mint.year
    2024
    >>> dime = mint.create(Dime)
    >>> dime.year
    2024
    >>> Mint.present_year = 2104  # Time passes
    >>> nickel = mint.create(Nickel)
    >>> nickel.year     # The mint has not updated its stamp yet
    2024
    >>> nickel.worth()  # 5 cents + (80 - 50 years)
    35
    >>> mint.update()   # The mint's year is updated to 2104
    >>> Mint.present_year = 2179     # More time passes
    >>> mint.create(Dime).worth()    # 10 cents + (75 - 50 years)
    35
    >>> Mint().create(Dime).worth()  # A new mint has the current year
    10
    >>> dime.worth()     # 10 cents + (155 - 50 years)
    115
    >>> Dime.cents = 20  # Upgrade all dimes!
    >>> dime.worth()     # 20 cents + (155 - 50 years)
    125
    """
    present_year = 2024

    def __init__(self):
        self.update()

    def create(self, coin):
        "*** YOUR CODE HERE ***"

    def update(self):
        "*** YOUR CODE HERE ***"

class Coin:
    cents = None # will be provided by subclasses, but not by Coin itself

    def __init__(self, year):
        self.year = year

    def worth(self):
        "*** YOUR CODE HERE ***"

class Nickel(Coin):
    cents = 5

class Dime(Coin):
    cents = 10
```
使用 Ok 来测试你的代码：
```bash
python ok -q Mint
```
::: details 点击查看答案
```py
class Mint:
    """A mint creates coins by stamping on years.

    The update method sets the mint's stamp to Mint.present_year.

    >>> mint = Mint()
    >>> mint.year
    2024
    >>> dime = mint.create(Dime)
    >>> dime.year
    2024
    >>> Mint.present_year = 2104  # Time passes
    >>> nickel = mint.create(Nickel)
    >>> nickel.year     # The mint has not updated its stamp yet
    2024
    >>> nickel.worth()  # 5 cents + (80 - 50 years)
    35
    >>> mint.update()   # The mint's year is updated to 2104
    >>> Mint.present_year = 2179     # More time passes
    >>> mint.create(Dime).worth()    # 10 cents + (75 - 50 years)
    35
    >>> Mint().create(Dime).worth()  # A new mint has the current year
    10
    >>> dime.worth()     # 10 cents + (155 - 50 years)
    115
    >>> Dime.cents = 20  # Upgrade all dimes!
    >>> dime.worth()     # 20 cents + (155 - 50 years)
    125
    """
    present_year = 2024

    def __init__(self):
        self.update()

    def create(self, coin):
        "*** YOUR CODE HERE ***"
        if coin == Dime: # [!code ++]
            return Dime(self.year) # [!code ++]
        else: # [!code ++]
            return Nickel(self.year) # [!code ++]


    def update(self):
        "*** YOUR CODE HERE ***"
        self.year = self.present_year # [!code ++]

class Coin:
    cents = None # will be provided by subclasses, but not by Coin itself

    def __init__(self, year):
        self.year = year

    def worth(self):
        "*** YOUR CODE HERE ***"
        return self.cents + max(Mint.present_year - self.year - 50, 0) # [!code ++]

class Nickel(Coin):
    cents = 5

class Dime(Coin):
    cents = 10
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
PS D:\Github\CS61A_Fall2024\lab\lab06> python ok --score
=====================================================================
Assignment: Lab 6
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Scoring tests

---------------------------------------------------------------------
Doctests for BankAccount

>>> from lab06 import *
>>> a = BankAccount('Eric')
>>> a.deposit(100)    # Transaction 0 for a
100
>>> b = BankAccount('Erica')
>>> a.withdraw(30)    # Transaction 1 for a
70
>>> a.deposit(10)     # Transaction 2 for a
80
>>> b.deposit(50)     # Transaction 0 for b
50
>>> b.withdraw(10)    # Transaction 1 for b
40
>>> a.withdraw(100)   # Transaction 3 for a
'Insufficient funds'
>>> len(a.transactions)
4
>>> len([t for t in a.transactions if t.changed()])
3
>>> for t in a.transactions:
...     print(t.report())
0: increased 0->100
1: decreased 100->70
2: increased 70->80
3: no change
>>> b.withdraw(100)   # Transaction 2 for b
'Insufficient funds'
>>> b.withdraw(30)    # Transaction 3 for b
10
>>> for t in b.transactions:
...     print(t.report())
0: increased 0->50
1: decreased 50->40
2: no change
3: decreased 40->10
Score: 1.0/1

---------------------------------------------------------------------
Doctests for Client

>>> from lab06 import *
>>> s = Server()
>>> a = Client(s, 'Alice')
>>> b = Client(s, 'Bob')
>>> a.compose('Hello, World!', 'Bob')
>>> b.inbox[0].msg
'Hello, World!'
>>> a.compose('CS 61A Rocks!', 'Bob')
>>> len(b.inbox)
2
>>> b.inbox[1].msg
'CS 61A Rocks!'
>>> b.inbox[1].sender.name
'Alice'
Score: 1.0/1

---------------------------------------------------------------------
Doctests for Mint

>>> from lab06 import *
>>> mint = Mint()
>>> mint.year
2024
>>> dime = mint.create(Dime)
>>> dime.year
2024
>>> Mint.present_year = 2104  # Time passes
>>> nickel = mint.create(Nickel)
>>> nickel.year     # The mint has not updated its stamp yet
2024
>>> nickel.worth()  # 5 cents + (80 - 50 years)
35
>>> mint.update()   # The mint's year is updated to 2104
>>> Mint.present_year = 2179     # More time passes
>>> mint.create(Dime).worth()    # 10 cents + (75 - 50 years)
35
>>> Mint().create(Dime).worth()  # A new mint has the current year
10
>>> dime.worth()     # 10 cents + (155 - 50 years)
115
>>> Dime.cents = 20  # Upgrade all dimes!
>>> dime.worth()     # 20 cents + (155 - 50 years)
125
Score: 1.0/1

---------------------------------------------------------------------
Point breakdown
    BankAccount: 1.0/1
    Client: 1.0/1
    Mint: 1.0/1

Score:
    Total: 3.0

Backup... 100% complete
Backup past deadline by 78 days, 1 hour, 33 minutes, and 27 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab06/backups/9O6W7J

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab06> 
```
:::