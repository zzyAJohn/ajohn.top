---
title: 'Lab 4: Tree Recursion, Data Abstraction'
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2024/11/28 19:26:54
permalink: /cs61a/lab-lab04/
---
## Starter Files

Download [lab04.zip](https://cs61a.org/lab/lab04/lab04.zip).

如果官方链接失效，你也可以通过我的 github 仓库 [CS61A_Fall2024](https://github.com/zzyAJohn/CS61A_Fall2024)来获取我的代码。

::: important 重要
请注意，该代码包含答案，因此如果你想独立完成请务必提前将 lab04.py 中的答案删除！
:::

## Required Questions

## Dictionaries
如果您需要复习一下词典，请查看下拉菜单。如果遇到困难，可以直接跳到问题部分，然后再回头查看。

::: details Dictionaries
字典包含键值对，并允许使用方括号通过键查找值。每个键必须是唯一的。
```bash
>>> d = {2: 4, 'two': ['four'], (1, 1): 4}
>>> d[2]
4
>>> d['two']
['four']
>>> d[(1, 1)]
4
```
可以使用 `.keys()` 或 `.values()` 或 `.items()` 访问键或值或键值对的序列。
```bash
>>> for k in d.keys():
...     print(k)
...
2
two
(1, 1)
>>> for v in d.values():
...     print(v)
...
4
['four']
4
>>> for k, v in d.items():
...     print(k, v)
...
2 4
two ['four']
(1, 1) 4
```
您可以使用 `in` 方法检查字典是否包含键：
```bash
>>> 'two' in d
True
>>> 4 in d
False
```
字典推导式是一种计算新字典的表达式。
```bash
>>> {3*x: 3*x + 1 for x in range(2, 5)}
{6: 7, 9: 10, 12: 13}
```
:::

::: tip 提示
对于所有 WWPD 问题，如果您认为答案是 `<function...>` ，则输入 `Function` ；如果答案错误，则输入 `Error` ；如果没有显示任何内容，则输入 `Nothing` 。
:::
### Q1: Dictionaries
使用 Ok 来通过以下“Python 会显示什么？”问题测试您的知识：

```bash
python ok -q pokemon -u
```
```bash
>>> pokemon = {'pikachu': 25, 'dragonair': 148, 'mew': 151}
>>> pokemon['pikachu']
______

>>> len(pokemon)
______

>>> 'mewtwo' in pokemon
______

>>> 'pikachu' in pokemon
______

>>> 25 in pokemon
______

>>> 148 in pokemon.values()
______

>>> 151 in pokemon.keys()
______

>>> 'mew' in pokemon.keys()
______
```
::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\lab\lab04> python ok -q pokemon -u 
=====================================================================
Assignment: Lab 4
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Dictionaries > Suite 1 > Case 1
(cases remaining: 1)

What would Python display? If you get stuck, try it out in the Python
interpreter!

>>> pokemon = {'pikachu': 25, 'dragonair': 148, 'mew': 151}
>>> pokemon['pikachu']
? 25 # [!code ++]
-- OK! --       

>>> len(pokemon)
? 3 # [!code ++]
-- OK! --

>>> 'mewtwo' in pokemon
? False # [!code ++]
-- OK! --

>>> 'pikachu' in pokemon
? True # [!code ++]
-- OK! --

>>> 25 in pokemon
? False # [!code ++]
-- OK! --

>>> 148 in pokemon.values()
? True # [!code ++]
-- OK! --

>>> 151 in pokemon.keys()
? False # [!code ++]
-- OK! --

>>> 'mew' in pokemon.keys()
? True # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Dictionaries unlocked.

Backup... 100% complete
Backup past deadline by 137 days, 4 hours, 34 minutes, and 59 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab04/backups/8Oqvwo

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab04>
```
:::


### Q2: Divide
实现 `divide` ，它接受两个正整数 `quotients` 和 `divisors` 的列表。它返回一个字典，其键是 `quotients` 的元素。对于每个键 `q` ，其对应的值是所有可以被 `q`  整除的 `divisors` 的元素的列表。
::: tip 提示
每个键的值都需要是一个列表，因此列表推导式在这里可能会有用。
:::

```py
def divide(quotients, divisors):
    """Return a dictonary in which each quotient q is a key for the list of
    divisors that it divides evenly.

    >>> divide([3, 4, 5], [8, 9, 10, 11, 12])
    {3: [9, 12], 4: [8, 12], 5: [10]}
    >>> divide(range(1, 5), range(20, 25))
    {1: [20, 21, 22, 23, 24], 2: [20, 22, 24], 3: [21, 24], 4: [20, 24]}
    """
    return {____: ____ for ____ in ____}
```

使用 Ok 来测试你的代码：
```bash
python ok -q divide
```
::: details 点击查看答案
```py
def divide(quotients, divisors):
    """Return a dictonary in which each quotient q is a key for the list of
    divisors that it divides evenly.

    >>> divide([3, 4, 5], [8, 9, 10, 11, 12])
    {3: [9, 12], 4: [8, 12], 5: [10]}
    >>> divide(range(1, 5), range(20, 25))
    {1: [20, 21, 22, 23, 24], 2: [20, 22, 24], 3: [21, 24], 4: [20, 24]}
    """
    return {x: [d for d in divisors if d % x == 0] for x in quotients} # [!code ++]
```
:::

### Q3: Buying Fruit
实现带有三个参数的 `buy` 函数：

1. `fruits_to_buy` ：表示您需要购买的水果的字符串列表。每种水果必须至少购买一个。
2. `prices` ：一个字典，其中的键是水果名称（字符串），值是正整数，表示每种水果的价格。
3. `total_amount` ：表示可用于购买水果的总金额的整数。查看文档字符串以了解有关输入结构的更多详细信息。

该函数应打印购买所需水果的**所有可能方式**，以便总成本等于 `total_amount` 。您只能选择 `fruit_to_buy` 列表中提到的水果。
::: tip
注意：您可以使用 `display` 函数来格式化输出。对每种水果及其相应的数量调用 `display(fruit, count)` 以生成一个字符串，显示购买的水果类型和数量。
:::
::: tip
提示：如何确保每个组合都至少包含 `fruit_to_buy` 中列出的每种水果中的一个？
:::
```py
def buy(fruits_to_buy, prices, total_amount):
    """Print ways to buy some of each fruit so that the sum of prices is amount.

    >>> prices = {'oranges': 4, 'apples': 3, 'bananas': 2, 'kiwis': 9}
    >>> buy(['apples', 'oranges', 'bananas'], prices, 12)  # We can only buy apple, orange, and banana, but not kiwi
    [2 apples][1 orange][1 banana]
    >>> buy(['apples', 'oranges', 'bananas'], prices, 16)
    [2 apples][1 orange][3 bananas]
    [2 apples][2 oranges][1 banana]
    >>> buy(['apples', 'kiwis'], prices, 36)
    [3 apples][3 kiwis]
    [6 apples][2 kiwis]
    [9 apples][1 kiwi]
    """
    def add(fruits, amount, cart):
        if fruits == [] and amount == 0:
            print(cart)
        elif fruits and amount > 0:
            fruit = fruits[0]
            price = ____
            for k in ____:
                # Hint: The display function will help you add fruit to the cart.
                add(____, ____, ____)
    add(fruits_to_buy, total_amount, '')

def display(fruit, count):
    """Display a count of a fruit in square brackets.

    >>> display('apples', 3)
    '[3 apples]'
    >>> display('apples', 1)
    '[1 apple]'
    >>> print(display('apples', 3) + display('kiwis', 3))
    [3 apples][3 kiwis]
    """
    assert count >= 1 and fruit[-1] == 's'
    if count == 1:
        fruit = fruit[:-1]  # get rid of the plural s
    return '[' + str(count) + ' ' + fruit + ']'
```

使用 Ok 来测试你的代码：
```bash
python ok -q buy
```
::: details 点击查看答案
```py
def buy(fruits_to_buy, prices, total_amount):
    """Print ways to buy some of each fruit so that the sum of prices is amount.

    >>> prices = {'oranges': 4, 'apples': 3, 'bananas': 2, 'kiwis': 9}
    >>> buy(['apples', 'oranges', 'bananas'], prices, 12)  # We can only buy apple, orange, and banana, but not kiwi
    [2 apples][1 orange][1 banana]
    >>> buy(['apples', 'oranges', 'bananas'], prices, 16)
    [2 apples][1 orange][3 bananas]
    [2 apples][2 oranges][1 banana]
    >>> buy(['apples', 'kiwis'], prices, 36)
    [3 apples][3 kiwis]
    [6 apples][2 kiwis]
    [9 apples][1 kiwi]
    """
    def add(fruits, amount, cart):
        if fruits == [] and amount == 0:
            print(cart)
        elif fruits and amount > 0:
            fruit = fruits[0]
            price = prices[fruit] # [!code ++]
            for k in range(1, amount // price + 1): # [!code ++]
                # Hint: The display function will help you add fruit to the cart.
                add(fruits[1:], amount - k * price, cart + display(fruit, k)) # [!code ++]
    add(fruits_to_buy, total_amount, '')


def display(fruit, count):
    """Display a count of a fruit in square brackets.

    >>> display('apples', 3)
    '[3 apples]'
    >>> display('apples', 1)
    '[1 apple]'
    >>> print(display('apples', 3) + display('kiwis', 3))
    [3 apples][3 kiwis]
    """
    assert count >= 1 and fruit[-1] == 's'
    if count == 1:
        fruit = fruit[:-1]  # get rid of the plural s
    return '[' + str(count) + ' ' + fruit + ']'
```
:::

## Data Abstraction
如果您需要复习数据抽象，请查阅下拉菜单。如果遇到困难，可以直接跳到问题并返回此处查看。

::: details Data Abstraction
数据抽象是一组用于组合和分解复合值的函数。一个称为构造函数的函数将两个或多个部分组合成一个整体（例如有理数；也称为分数），其他称为选择器的函数返回该整体的各个部分（例如分子或分母）。
```py
def rational(n, d):
    "Return a fraction n / d for integers n and d."

def numer(r):
    "Return the numerator of rational number r."

def denom(r):
    "Return the denominator of rational number r."
```
至关重要的是，人们可以在不知道这些函数如何实现的情况下使用数据抽象。例如，我们（人类）只需知道 `rational` 、 `numer` 和 `denom` 的作用，就可以验证 `mul_rationals` 是否正确实现，而无需知道它们如何实现。
```py
def mul_rationals(r1, r2):
    "Return the rational number r1 * r2."
    return rational(numer(r1) * numer(r2), denom(r1) * denom(r2))
```
但是，为了让 Python 运行程序，数据抽象需要实现。使用实现知识会跨越抽象障碍，抽象障碍将程序中依赖于数据抽象实现的部分与不依赖于数据抽象实现的部分区分开来。编写良好的程序通常会尽量减少依赖于实现的代码量，以便以后可以更改实现而不需要重写大量代码。

使用已提供的数据抽象时，编写程序时应确保即使数据抽象的实现发生变化，程序仍然正确。
:::

### Cities
假设我们有一个城市数据抽象。一个城市有一个名称、一个纬度坐标和一个经度坐标。

我们的数据抽象有一个**构造函数**：

- `make_city(name, lat, lon)` ：使用给定的名称、纬度和经度创建一个城市对象。

我们还有以下选择器来获取每个城市的信息：

- `get_name(city)` ：返回城市的名称

- `get_lat(city)` ：返回城市的纬度

- `get_lon(city)` ：返回城市的经度

以下是我们如何使用构造函数和选择器来创建城市并提取其信息：

```bash
>>> berkeley = make_city('Berkeley', 122, 37)
>>> get_name(berkeley)
'Berkeley'
>>> get_lat(berkeley)
122
>>> new_york = make_city('New York City', 74, 40)
>>> get_lon(new_york)
40
```
如果您想知道它们是如何实现的，可以在实验室文件中找到所有选择器和构造函数。但是，数据抽象的要点是，在编写有关城市的程序时，我们不需要知道实现。

### Q4: Distance
现在我们将实现函数 `distance` ，该函数计算两个城市对象之间的距离。回想一下，两个坐标对 `(x1, y1)` 和 `(x2, y2)` 之间的距离可以通过计算 `(x1 - x2)**2 + (y1 - y2)**2` 的 `sqrt` 来找到。为了方便起见，我们已经导入了 `sqrt` 。使用城市的纬度和经度作为其坐标；您需要使用选择器来访问此信息！

```py
from math import sqrt
def distance(city_a, city_b):
    """
    >>> city_a = make_city('city_a', 0, 1)
    >>> city_b = make_city('city_b', 0, 2)
    >>> distance(city_a, city_b)
    1.0
    >>> city_c = make_city('city_c', 6.5, 12)
    >>> city_d = make_city('city_d', 2.5, 15)
    >>> distance(city_c, city_d)
    5.0
    """
    "*** YOUR CODE HERE ***"
```
使用 Ok 来测试你的代码：
```bash
python ok -q distance
```

::: details 点击查看答案
```py
from math import sqrt
def distance(city_a, city_b):
    """
    >>> city_a = make_city('city_a', 0, 1)
    >>> city_b = make_city('city_b', 0, 2)
    >>> distance(city_a, city_b)
    1.0
    >>> city_c = make_city('city_c', 6.5, 12)
    >>> city_d = make_city('city_d', 2.5, 15)
    >>> distance(city_c, city_d)
    5.0
    """
    "*** YOUR CODE HERE ***"
    return sqrt((get_lon(city_a) - get_lon(city_b)) ** 2 + (get_lat(city_a) - get_lat(city_b)) ** 2) # [!code ++]
```
:::
### Q5: Closer City
接下来，实现 `closer_city` ，该函数接受纬度、经度和两个城市，并返回更接近所提供纬度和经度的城市名称。

您只能使用选择器 `get_name` `get_lat` `get_lon` 、构造函数 `make_city` 和您刚刚为这个问题定义的 `distance` 函数。
::: tip
如何使用 `distance` 函数找到给定位置与每个给定城市之间的距离？
:::
```py
def closer_city(lat, lon, city_a, city_b):
    """
    Returns the name of either city_a or city_b, whichever is closest to
    coordinate (lat, lon). If the two cities are the same distance away
    from the coordinate, consider city_b to be the closer city.

    >>> berkeley = make_city('Berkeley', 37.87, 112.26)
    >>> stanford = make_city('Stanford', 34.05, 118.25)
    >>> closer_city(38.33, 121.44, berkeley, stanford)
    'Stanford'
    >>> bucharest = make_city('Bucharest', 44.43, 26.10)
    >>> vienna = make_city('Vienna', 48.20, 16.37)
    >>> closer_city(41.29, 174.78, bucharest, vienna)
    'Bucharest'
    """
    "*** YOUR CODE HERE ***"
```
使用 Ok 来测试你的代码：
```bash
python ok -q closer_city
```
::: details 点击查看答案
```py
def closer_city(lat, lon, city_a, city_b):
    """
    Returns the name of either city_a or city_b, whichever is closest to
    coordinate (lat, lon). If the two cities are the same distance away
    from the coordinate, consider city_b to be the closer city.

    >>> berkeley = make_city('Berkeley', 37.87, 112.26)
    >>> stanford = make_city('Stanford', 34.05, 118.25)
    >>> closer_city(38.33, 121.44, berkeley, stanford)
    'Stanford'
    >>> bucharest = make_city('Bucharest', 44.43, 26.10)
    >>> vienna = make_city('Vienna', 48.20, 16.37)
    >>> closer_city(41.29, 174.78, bucharest, vienna)
    'Bucharest'
    """
    "*** YOUR CODE HERE ***"
    city_temp = make_city('city_temp', lat, lon) # [!code ++]
    if distance(city_a, city_temp) < distance(city_b, city_temp): # [!code ++]
        closer = get_name(city_a) # [!code ++]
    else: # [!code ++]
        closer = get_name(city_b) # [!code ++]
    return closer # [!code ++]
```
:::

### Q6: Don't violate the abstraction barrier!
::: tip
这个问题没有代码编写部分（如果你正确地实现了前两个问题）。
:::
在编写使用数据抽象的函数时，我们应该尽可能使用构造函数和选择器，而不是假设数据抽象的实现。依赖数据抽象的底层实现被称为违反抽象障碍。

即使你违反了抽象障碍，你也可能通过了前面问题的文档测试。要检查你是否这样做了，请运行以下命令：

使用 Ok 测试你的代码：
```bash
python ok -q check_city_abstraction
```

我的结果：
```bash
PS D:\Github\CS61A_Fall2024\lab\lab04> python ok -q check_city_abstraction
=====================================================================
Assignment: Lab 4
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Running tests

---------------------------------------------------------------------
Test summary
    1 test cases passed! No cases failed.

Backup... 100% complete
Backup past deadline by 137 days, 5 hours, 7 minutes, and 31 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab04/backups/KmOjKr

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab04> 
```

`check_city_abstraction` 函数仅存在于文档测试中，它将原始抽象的实现与其他东西交换出来，运行前两部分的测试，然后恢复原始抽象。

抽象屏障的性质保证了只要正确使用构造函数和选择器，更改数据抽象的实现不会影响使用该数据抽象的任何程序的功能。

如果您通过了前面问题的 Ok 测试，但没有通过这个问题，那么修复很简单！只需用适当的构造函数或选择器替换任何违反抽象屏障的代码即可。

确保您的函数通过了数据抽象的第一个和第二个实现的测试，并且您了解为什么它们应该适用于这两个实现，然后再继续。

## Check Your Score Locally
您可以通过运行来在本地检查此作业的每个问题的分数：

```bash
python ok --score
```

::: details 我的得分：
```bash
PS D:\Github\CS61A_Fall2024\lab\lab04> python ok --score
=====================================================================
Assignment: Lab 4
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Scoring tests

---------------------------------------------------------------------
Dictionaries
    Passed: 0
    Failed: 0
[k..........] 0.0% passed

---------------------------------------------------------------------
Doctests for divide

>>> from lab04 import *
>>> divide([3, 4, 5], [8, 9, 10, 11, 12])
{3: [9, 12], 4: [8, 12], 5: [10]}
>>> divide(range(1, 5), range(20, 25))
{1: [20, 21, 22, 23, 24], 2: [20, 22, 24], 3: [21, 24], 4: [20, 24]}
Score: 1.0/1

---------------------------------------------------------------------
Doctests for buy

>>> from lab04 import *
>>> prices = {'oranges': 4, 'apples': 3, 'bananas': 2, 'kiwis': 9}
>>> buy(['apples', 'oranges', 'bananas'], prices, 12)  # We can only buy apple, orange, and banana, but not kiwi
[2 apples][1 orange][1 banana]
>>> buy(['apples', 'oranges', 'bananas'], prices, 16)
[2 apples][1 orange][3 bananas]
[2 apples][2 oranges][1 banana]
>>> buy(['apples', 'kiwis'], prices, 36)
[3 apples][3 kiwis]
[6 apples][2 kiwis]
[9 apples][1 kiwi]
Score: 1.0/1

---------------------------------------------------------------------
Doctests for distance

>>> from lab04 import *
>>> city_a = make_city('city_a', 0, 1)
>>> city_b = make_city('city_b', 0, 2)
>>> distance(city_a, city_b)
1.0
>>> city_c = make_city('city_c', 6.5, 12)
>>> city_d = make_city('city_d', 2.5, 15)
>>> distance(city_c, city_d)
5.0
Score: 1.0/1

---------------------------------------------------------------------
Doctests for closer_city

>>> from lab04 import *
>>> berkeley = make_city('Berkeley', 37.87, 112.26)
>>> stanford = make_city('Stanford', 34.05, 118.25)
>>> closer_city(38.33, 121.44, berkeley, stanford)
'Stanford'
>>> bucharest = make_city('Bucharest', 44.43, 26.10)
>>> vienna = make_city('Vienna', 48.20, 16.37)
>>> closer_city(41.29, 174.78, bucharest, vienna)
'Bucharest'
Score: 1.0/1

---------------------------------------------------------------------
Doctests for check_city_abstraction

>>> from lab04 import *
>>> change_abstraction(True)
>>> city_a = make_city('city_a', 0, 1)
>>> city_b = make_city('city_b', 0, 2)
>>> distance(city_a, city_b)
1.0
>>> city_c = make_city('city_c', 6.5, 12)
>>> city_d = make_city('city_d', 2.5, 15)
>>> distance(city_c, city_d)
5.0
>>> berkeley = make_city('Berkeley', 37.87, 112.26)
>>> stanford = make_city('Stanford', 34.05, 118.25)
>>> closer_city(38.33, 121.44, berkeley, stanford)
    buy: 1.0/1
    distance: 1.0/1
    closer_city: 1.0/1
    check_city_abstraction: 1.0/1

Score:
    Total: 5.0

Backup... 100% complete
Backup past deadline by 137 days, 5 hours, 5 minutes, and 55 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/lab04/backups/GgZOPy

OK is up to date
PS D:\Github\CS61A_Fall2024\lab\lab04> 
```
:::
这不会提交作业！当您对分数满意时，请将作业提交给 Gradescope 以获得学分。
