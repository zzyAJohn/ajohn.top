---
title: recursion
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2024/11/12 08:42:59
permalink: /cs61a/va2a14f4/
---

>你只需要无条件地信任并调用你的递归函数就可以了，而递归函数需要考虑的事情就很多了
——AJohn

# 阶乘

```py
def factorial(n):
    """
    返回n的阶乘
    >>> factorial(4)
    24
    >>> factorial(5)
    120
    """
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)
```

调用：`factorial(4)`

输出：`24`

# 斐波那契数列

```py
def fib(n):
    """
    返回第 n 个斐波那契数列的值
    >>> fib(4)
    2
    >>> fib(10)
    55
    """
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n-2) + fib(n-1)

def pirnt_1_to_fib_n(n):
    """
    打印第 1 个到第 n 个斐波那契数列的值，便于检查
    """
    for i in range(1, n + 1):
        print(fib(i), end = ',' if i < n else '')
```

调用：`pirnt_1_to_fib_n(10)`

输出：`1,1,2,3,5,8,13,21,34,55`

**PS：上面两个例子太过简单，你可能会对递归产生质疑，因为你用while循环也能轻松做到，但请看接下来的这个例子，你将感受到递归的真正魅力**

# 汉诺塔

```py
def move_disk(disk_number, from_peg, to_peg):
    print(f"Move {disk_number} from {from_peg} to {to_peg}")

def hanoi(n, start_peg, end_peg):
    if n == 1:
        move_disk(n, start_peg, end_peg)
    else:
        spare_peg = 6 - start_peg - end_peg # 定义备用桩
        hanoi(n - 1, start_peg, spare_peg) # 把上面n-1个片移到备用桩
        move_disk(n, start_peg, end_peg) # 把最大的片移到结束桩
        hanoi(n - 1, spare_peg, end_peg) # 把n-1个片移到结束桩上
```

调用：`hanoi(3,1,2)`

输出：
```
Move 1 from 1 to 2
Move 2 from 1 to 3
Move 1 from 2 to 3
Move 3 from 1 to 2
Move 1 from 3 to 1
Move 2 from 3 to 2
Move 1 from 1 to 2
```

调用：`hanoi(5,1,2)`

输出：
```
Move 1 from 1 to 2
Move 2 from 1 to 3
Move 1 from 2 to 3
Move 3 from 1 to 2
Move 1 from 3 to 1
Move 2 from 3 to 2
Move 1 from 1 to 2
Move 4 from 1 to 3
Move 1 from 2 to 3
Move 2 from 2 to 1
Move 1 from 3 to 1
Move 3 from 2 to 3
Move 1 from 1 to 2
Move 2 from 1 to 3
Move 1 from 2 to 3
Move 5 from 1 to 2
Move 1 from 3 to 1
Move 2 from 3 to 2
Move 1 from 1 to 2
Move 3 from 3 to 1
Move 1 from 2 to 3
Move 2 from 2 to 1
Move 1 from 3 to 1
Move 4 from 3 to 2
Move 1 from 1 to 2
Move 2 from 1 to 3
Move 1 from 2 to 3
Move 3 from 1 to 2
Move 1 from 3 to 1
Move 2 from 3 to 2
Move 1 from 1 to 2
```

>你让它做什么，它就一定会做到，无论过程如何。
——Moiads

**你只需要无条件地信任并调用你的递归函数就可以了，而递归函数需要考虑的事情就很多了，何乐而不为呢？**


