---
title: control
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2024/11/04 08:42:59
permalink: /cs61a/va2a74d4/
---

>控制语句知多少

# Question：
下面是 if-else 的函数写法，通过调用if_函数可以一行实现控制语句，显然调用函数形式更加简洁，那为什么我们很少使用这种写法呢？

```py
def if_(c, t, f):
    if c:
        return t
    else:
        return f
```

**for example：实现real_sqrt()函数，要求输入是正数时返回输入的平方根，输入是负数时返回0.0**

## 控制语句写法
```py
from math import sqrt
def real_sqrt(x):
    if x > 0:
        return sqrt(x)
    else:
        return 0.0
```

调用：`real_sqrt(4)`
输出：`2.0`

调用：`real_sqrt(-4)`
输出：`0.0`

## 调用函数写法

```py
def if_(c, t, f):
    if c:
        return t
    else:
        return f

from math import sqrt
def real_sqrt(x):
    return if_(x > 0, sqrt(x), 0.0)
```

调用：`real_sqrt(4)`
输出：`2.0`

调用：`real_sqrt(-4)`
输出：
```
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
Cell In[12], line 11
      8 def real_sqrt(x):
      9     return if_(x > 0, sqrt(x), 0.0)
---> 11 real_sqrt(-4)

Cell In[12], line 9
      8 def real_sqrt(x):
----> 9     return if_(x > 0, sqrt(x), 0.0)

ValueError: math domain error
```

**为什么调用函数写法输入负数时会报错呢？**

原因：`if_(x > 0, sqrt(x), 0.0)`是一个调用表达式，在调用它之前，会对内部的三个表达式都进行评估，包括`sqrt(-4)`，这会导致程序崩溃

综上，函数总是计算他们的组件，但是使用控制语句可以让我们选择是否计算某个表达式，跳过某些部分或重复某些部分，这不是调用表达式能做的。因此，我们通常使用控制语句写法。




