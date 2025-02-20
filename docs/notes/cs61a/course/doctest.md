---
title: doctest
tags:
  - CS61A
  - Berkeley
  - Python
createTime: 2024/11/01 08:42:59
permalink: /cs61a/vc2a74f4/
---

>在自定义的函数下面写好注释是一个很好的习惯
——AJohn

# 通过编写样例测试来检查程序

```py
def fbnc(x):
    """
    返回斐波那契数值
    >>> fbnc(4)
    2
    >>> fbnc(5)
    3
    """
    a, b = 0, 1
    n = 1
    while n < x:
        n += 1
        a, b = b, a + b
    return a
```

可以使用

```shell
py -m doctest -v del.py
```
查看是否通过编写的样例测试

![](https://cdn.jsdelivr.net/gh/zzyAJohn/Blog-Image/2024-11-01/202411011251789.png)


