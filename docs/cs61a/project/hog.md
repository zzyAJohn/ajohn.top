---
title: 'Project 1: Hog'
createTime: 2024/11/05 13:11:09
permalink: /cs61a/project-hog/
---

## The Game of Hog

I know! I'll use my
Higher-order functions to
Order higher rolls.


## Introduction

在这个项目中，您将为骰子游戏 Hog 开发一个模拟器和多种策略。您需要结合使用控制语句和高阶函数，如在线教科书[《编写程序》](https://www.composingprograms.com/)第 1.2 至 1.6 节中所述。

过去的学生在没有彻底阅读问题描述的情况下尝试实现功能时，经常会遇到问题。😱 **在开始编码之前，请仔细阅读每个描述。**


### Rules

在 Hog 中，两个玩家轮流尝试以至少 `GOAL` 总分结束回合，其中 `GOAL` 默认为 100。在每个回合中，当前玩家选择一些骰子一起掷，最多 10 个。该玩家的回合得分是骰子结果的总和。但是，掷骰子太多的玩家会面临风险：

- **Sow Sad**。如果任何骰子结果是 1，则当前玩家的回合得分为 `1` ，无论掷出的其他值是多少。
::: details Examples
- 示例 1：当前玩家掷出 7 个骰子，其中 5 个是 `1` 。他们在该回合获得 1 分。
- 示例 2：当前玩家掷出 4 个骰子，所有都是 3。由于 Sow Sad 未发生，他们在该回合获得 `12` 分。
:::


- **Boar Brawl**。选择掷出零点骰子的玩家将获得对手得分十位数与当前玩家得分个位数之间绝对差值的三倍，或 1（取较大者）。个位数指的是最右边的数字，十位数指的是第二右边的数字。如果玩家的得分是一位数（小于 10），则该玩家得分的十位数为 0。

::: details Examples
- 示例 1：

当前玩家有 `21` 分，对手有 `46` 分，当前玩家选择掷零骰子。
对手得分的十位数是 `4` ，当前玩家得分的个位数是 `1` 。
因此，玩家获得 `3 * abs(4 - 1) = 9` 分。
- 示例 2：

当前玩家有 `45` 分，对手有 `52` 分，当前玩家选择掷零骰子。
对手得分的十位数是 `5` ，当前玩家得分的个位数是 `5` 。
由于 `3 * abs(5 - 5) = 0` ，玩家获得 `1` 分。
- 示例 3：

当前玩家有 `2` 分，对手有 `5` 分，当前玩家选择掷零骰子。
对手得分的十位数为 `0` ，当前玩家得分的个位数为 `2` 。
因此，玩家获得 `3 * abs(0 - 2) = 6` 分。
:::

- **Sus Fuss**。如果某个数字恰好有 3 或 4 个因数（包括 1 和数字本身），我们称该数字为 [Sus](https://en.wikipedia.org/wiki/Sus_%28genus%29)。如果掷骰子后，当前玩家的得分为 Sus 数字，则他们的得分立即增加到下一个素数。

::: details Examples
- 示例 1：

一名玩家有 14 分，掷出 2 个骰子，获得 7 分。他们的新分数将是 21，有 4 个因数：1、3、7 和 21。因此，21 是 sus，玩家的分数立即增加到 23，即下一个素数。

- 示例 2：

一名拥有 63 分的玩家掷出 5 个骰子，从轮到自己时获得 1 分。他们的新分数将是 64（Sow Sad 😢），有 7 个因数：1、2、4、8、16、32 和 64。由于 64 不是 sus，因此玩家的分数保持不变。

- 示例 3：

一名玩家有 49 分，掷出 5 个骰子，总计 18 分。他们的新分数将是 67，这是一个质数，并且有 2 个因数：1 和 67。由于 67 不是可疑分数，因此玩家的分数保持不变。
:::

## Download starter files
要开始，请将所有项目代码下载为 zip 存档。以下是解压后存档中所有文件的列表。对于该项目，您只需要对 `hog.py` 进行更改。

- `hog.py`：Hog 的启动实现
- `dice.py`：制作和掷骰子的函数
- `hog_gui.py`：Hog 的图形用户界面 (GUI)（已更新）
- `ucb.py`：CS 61A 的实用函数
- `hog_ui.py`：Hog 的基于文本的用户界面 (UI)
- `ok`：CS 61A 自动评分器
- `tests`： `ok` 使用的测试目录
- `gui_files`：Web GUI 使用的各种内容的目录

您可能还会注意到除上面列出的文件之外的一些文件 - 这些文件是使自动评分器和 GUI 部分正常工作所必需的。请不要修改除 `hog.py` 之外的任何文件。


## Logistics
该项目价值 25 分，其中 1 分用于在检查点日期 09/12 星期四之前提交第 1 阶段。

您将提交以下文件：

- `hog.py`

您无需修改​​或提交任何其他文件即可完成项目。要提交项目，请将所需文件提交给相应的 Gradescope 作业。

您不得使用人工智能工具来帮助您完成此项目或参考在互联网上找到的解决方案。

对于我们要求您完成的功能，我们可能会提供一些初始代码。如果您不想使用该代码，请随意删除它并从头开始。您也可以根据需要添加新的函数定义。

但是，请不要修改任何其他函数或编辑上面未列出的任何文件。这样做可能会导致您的代码无法通过我们的自动评分器测试。此外，请不要更改任何函数签名（名称、参数顺序或参数数量）。

在整个项目中，您应该测试代码的正确性。经常测试是一种很好的做法，这样很容易找出任何问题。但是，你不应该测试得太频繁，以便有时间思考问题。

我们提供了一个名为 ok 的自动评分器来帮助你测试代码和跟踪进度。第一次运行自动评分器时，系统会要求你使用网络浏览器登录 Ok 帐户。请这样做。每次运行 ok 时，它都会在我们的服务器上备份你的工作和进度。

`ok` 的主要目的是测试你的实现。

如果你想以交互方式测试你的代码，你可以运行
```bash
python3 ok -q [question number] -i 
```


并插入相应的问题编号（例如 `01` ）。这将运行该问题的测试，直到第一个您失败的测试，然后让您有机会以交互方式测试您编写的函数。
您也可以通过以下方式使用 OK 中的调试打印功能

```bash
print("DEBUG:", x) 
```

它将在您的终端中产生输出，而不会因额外的输出而导致 OK 测试失败。


## Graphical User Interface
为您提供了**图形用户界面**（简称 GUI）。目前，它无法工作，因为您尚未实现游戏逻辑。完成播放功能后，您将能够玩 Hog 的完全交互式版本！

完成后，您可以从终端运行 GUI 并在浏览器中玩 Hog：
```bash
python3 hog_gui.py
```

## Phase 1: Rules of the Game
在第一阶段，您将开发一个 Hog 游戏模拟器。


### Problem 0 (0 pt)
`dice.py` 文件使用非纯零参数函数表示骰子。这些函数是非纯函数，因为它们每次调用时可能有不同的返回值，因此调用该函数的副作用是更改再次调用该函数时将返回的内容。

这是 `dice.py` 中的文档，您需要阅读它才能在此项目中模拟骰子。


```
A dice function takes no arguments and returns a number from 1 to n
(inclusive), where n is the number of sides on the dice.

Fair dice produce each possible outcome with equal probability.
Two fair dice are already defined, four_sided and six_sided,
and are generated by the make_fair_dice function.

def make_fair_dice(sides):
    """Return a die that generates values ranging from 1 to SIDES, each with an equal chance."""
    ...

four_sided = make_fair_dice(4)
six_sided = make_fair_dice(6)

Test dice are deterministic: they always cycles through a fixed
sequence of values that are passed as arguments.
Test dice are generated by the make_test_dice function.

def make_test_dice(...):
    """Return a die that cycles deterministically through OUTCOMES.

    >>> dice = make_test_dice(1, 2, 3)
    >>> dice()
    1
    >>> dice()
    2
    >>> dice()
    3
    >>> dice()
    1
    >>> dice()
    2
```



通过解锁以下测试来检查您的理解。

```bash
python3 ok -q 00 -u
```


::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\project\hog> python ok -q 00 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 0 > Suite 1 > Case 1
(cases remaining: 2)

>>> from hog import *
>>> test_dice = make_test_dice(4, 1, 2)
>>> test_dice()
? 4 # [!code ++]
-- OK! --

>>> test_dice() # Second call
? 1 # [!code ++]
-- OK! --

>>> test_dice() # Third call
? 2 # [!code ++]
-- OK! --

>>> test_dice() # Fourth call
? 4 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 0 > Suite 2 > Case 1
(cases remaining: 1)

Q: Which of the following is the correct way to "roll" a fair, six-sided die?
Choose the number of the correct choice:
0) six_sided(6)
1) make_fair_dice(6)
2) six_sided(1)
3) six_sided()
4) make_test_dice(6)
5) six_sided
? 3 # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Question 0 unlocked.

Backup... 100% complete
Backup past deadline by 179 days, 22 hours, 43 minutes, and 46 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/proj01/backups/7Op84G

OK is up to date
PS D:\Github\CS61A_Fall2024\project\hog>
```
:::

您可以通过输入 `exit()` 退出解锁器。

**已知在 Windows 上输入 Ctrl-C 退出解锁器会导致问题，因此请避免这样做。**


### Problem 1 (2 pt)
在 `hog.py` 中实现 `roll_dice` 函数。它需要两个参数：一个名为 `num_rolls` 的正整数，它指定掷骰子的次数，以及一个 `dice` 函数。它返回在一轮中掷骰子该次数所获得的分数：结果之和或 1（Sow Sad）。

- **Sow Sad**。如果任何骰子结果是 1，则当前玩家的回合得分为 `1` ，无论掷出的其他值是多少。
::: details Examples
- 示例 1：当前玩家掷出 7 个骰子，其中 5 个是 `1` 。他们在该回合获得 1 分。
- 示例 2：当前玩家掷出 4 个骰子，所有都是 3。由于 Sow Sad 未发生，他们在该回合获得 `12` 分。
:::

要获得掷骰子的单一结果，请调用 `dice()` 。您应该在 `roll_dice` 的主体中**精确调用** `num_rolls` **次** `dice()`。

请记住，**即使掷骰子过程中发生 Sow Sad**，也要精确调用 `num_rolls` 次 `dice()`。通过这样做，您将正确模拟一起掷所有骰子（并且用户界面将正常工作）。
::: tip
`roll_dice` 函数以及整个项目中的许多其他函数都使用默认参数值 - 您可以在函数标题中看到这一点：
```py
def roll_dice(num_rolls, dice=six_sided): ...
```
参数 `dice=six_sided` 表示 `roll_dice` 函数中的 `dice` 参数是**可选的**。如果没有为 `dice` 提供值，则默认使用 `six_sided` 。

例如，调用 `roll_dice(3, four_sided)` 模拟掷 3 个四面骰子，而调用 `roll_dice(3)` 则由于默认参数而模拟掷 3 个六面骰子。
:::
**理解问题**：

在编写任何代码之前，请解锁测试以验证您对问题的理解：
```bash
python3 ok -q 01 -u
```
::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\project\hog> python ok -q 01 -u
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 1
(cases remaining: 59)

>>> from hog import *
>>> roll_dice(2, make_test_dice(4, 6, 1))
? 10 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 2
(cases remaining: 58)

>>> from hog import *
>>> roll_dice(3, make_test_dice(4, 6, 1))
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 3
(cases remaining: 57)

>>> from hog import *
>>> roll_dice(4, make_test_dice(2, 2, 3))
? 9 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 4
(cases remaining: 56)

>>> from hog import *
>>> a = roll_dice(4, make_test_dice(1, 2, 3))
>>> a # check that the value is being returned, not printed
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 5
(cases remaining: 55)

>>> from hog import *
>>> counted_dice = make_test_dice(4, 1, 2, 6)
>>> roll_dice(3, counted_dice)
? 1 # [!code ++]
-- OK! --

>>> # Make sure you call dice exactly num_rolls times!
>>> # If you call it fewer or more than that, it won't be at the right spot in the cycle for the next roll
>>> # Note that a return statement within a loop ends the loop
>>> roll_dice(1, counted_dice)
? 6 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 1 > Suite 1 > Case 6
(cases remaining: 54)

>>> from hog import *
>>> roll_dice(9, make_test_dice(6))
? 54 # [!code ++]
-- OK! --

>>> roll_dice(7, make_test_dice(2, 2, 2, 2, 2, 2, 1))
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
OK! All cases for Question 1 unlocked.

Backup... 100% complete
Backup past deadline by 190 days, 56 minutes, and 39 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/proj01/backups/vD8BYn

OK is up to date
PS D:\Github\CS61A_Fall2024\project\hog>
```
:::


::: tip
在解锁相应问题的测试用例之前，您将无法使用 ok 测试您的代码。
:::
**编写代码并检查您的工作**：

解锁完成后，开始实施您的解决方案。您可以使用以下命令检查您的正确性：
```bash
python3 ok -q 01
```

::: details 点击查看答案
```py
def roll_dice(num_rolls, dice=six_sided):
    """Simulate rolling the DICE exactly NUM_ROLLS > 0 times. Return the sum of
    the outcomes unless any of the outcomes is 1. In that case, return 1.

    num_rolls:  The number of dice rolls that will be made.
    dice:       A function that simulates a single dice roll outcome. Defaults to the six sided dice.
    """
    # These assert statements ensure that num_rolls is a positive integer.
    assert type(num_rolls) == int, 'num_rolls must be an integer.'
    assert num_rolls > 0, 'Must roll at least once.'
    # BEGIN PROBLEM 1
    "*** YOUR CODE HERE ***"
    sum_score = 0 # [!code ++]
    sow_sad = False # [!code ++]
    while num_rolls: # [!code ++]
        score = dice() # [!code ++]
        if score == 1: # [!code ++]
            sow_sad = True # [!code ++]
        sum_score += score # [!code ++]
        num_rolls -= 1 # [!code ++]
    return 1 if sow_sad else sum_score # [!code ++]
    # END PROBLEM 1
```
:::


### Problem 2 (2 pt)
实现 `boar_brawl` ，它获取玩家的当前得分 `player_score` 和对手的当前得分 `opposite_score` ，并返回玩家掷出 0 个骰子并调用 Boar Brawl 时获得的分数。

- **Boar Brawl**。选择掷出零个骰子的玩家得分为对手得分的十位数与当前玩家得分的个位数之间绝对差值的三倍，或 1（以较大者为准）。个位数指的是最右边的数字，十位数指的是第二右位数。如果玩家的得分是一位数（小于 10），则该玩家得分的十位数为 0。

::: details Examples
- 示例 1：

当前玩家有 `21` 分，对手有 `46` 分，当前玩家选择掷零骰子。
对手得分的十位数是 `4` ，当前玩家得分的个位数是 `1` 。
因此，玩家获得 `3 * abs(4 - 1) = 9` 分。
- 示例 2：

当前玩家有 `45` 分，对手有 `52` 分，当前玩家选择掷零骰子。
对手得分的十位数是 `5` ，当前玩家得分的个位数是 `5` 。
由于 `3 * abs(5 - 5) = 0`，玩家获得 `1` 分。
- 示例 3：

当前玩家有 `2` 分，对手有 `5` 分，当前玩家选择掷零骰子。
对手得分的十位数为 `0`，当前玩家得分的个位数为 `2`。
因此，玩家获得 `3 * abs(0 - 2) = 6` 分。
:::
::: tip
不要假设分数低于 100。编写 `boar_brawl` 函数，使其对任何非负分数都能正常工作。
:::
::: important
您的实现**不应**使用 `str` 、列表或包含方括号 `[ ]`。测试用例将检查是否已使用过这些内容。
:::
在编写任何代码之前，请解锁测试以验证您对问题的理解：
```bash
python3 ok -q 02 -u
```

::: details 点击查看答案
```bash
PS D:\Github\CS61A_Fall2024\project\hog> python ok -q 02 -u 
=====================================================================
Assignment: Project 1: Hog
OK, version v1.18.1
=====================================================================

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Unlocking tests

At each "? ", type what you would expect the output to be.
Type exit() to quit

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 1
(cases remaining: 14)

>>> from hog import *
>>> import tests.construct_check as test
>>> boar_brawl(21, 46)
? 9 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 2
(cases remaining: 13)

>>> from hog import *
>>> import tests.construct_check as test
>>> boar_brawl(52, 79)
? 15 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 3
(cases remaining: 12)

>>> from hog import *
>>> import tests.construct_check as test
>>> boar_brawl(0, 0)
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 4
(cases remaining: 11)

>>> from hog import *
>>> import tests.construct_check as test
>>> boar_brawl(0, 5)
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 5
(cases remaining: 10)

>>> from hog import *
>>> import tests.construct_check as test
>>> boar_brawl(2, 5)
? 6 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 6
(cases remaining: 9)

>>> from hog import *
>>> import tests.construct_check as test
>>> boar_brawl(7, 2)
? 21 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 7
(cases remaining: 8)

-- Already unlocked --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 8
(cases remaining: 7)

-- Already unlocked --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 9
(cases remaining: 6)

-- Already unlocked --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 10
(cases remaining: 5)

>>> from hog import *
>>> import tests.construct_check as test
>>> boar_brawl(72, 29)
? 1 # [!code ++]
-- OK! --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 11
(cases remaining: 4)

-- Already unlocked --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 12
(cases remaining: 3)

-- Already unlocked --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 13
(cases remaining: 2)

-- Already unlocked --

---------------------------------------------------------------------
Question 2 > Suite 1 > Case 14
(cases remaining: 1)

-- Already unlocked --

---------------------------------------------------------------------
OK! All cases for Question 2 unlocked.

Backup... 100% complete
Backup past deadline by 190 days, 1 hour, 8 minutes, and 58 seconds
Backup successful for user: zhiyong947@gmail.com
URL: https://okpy.org/cal/cs61a/fa24/proj01/backups/Qv6pAG

OK is up to date
PS D:\Github\CS61A_Fall2024\project\hog> 
```
:::

解锁完成后，开始实施解决方案。您可以使用以下方法检查正确性：
```bash
python3 ok -q 02
```
您还可以通过从终端运行 `python3 -i hog.py` 并在各种输入上调用 `boar_brawl` 来以交互方式测试 `boar_brawl` 。

::: details 点击查看答案
```py
def boar_brawl(player_score, opponent_score):
    """Return the points scored by rolling 0 dice according to Boar Brawl.

    player_score:     The total score of the current player.
    opponent_score:   The total score of the other player.

    """
    # BEGIN PROBLEM 2
    "*** YOUR CODE HERE ***"
    return max(3 * abs(opponent_score // 10 % 10 - player_score % 10), 1) # [!code ++]
    # END PROBLEM 2
```
:::






