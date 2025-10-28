---
title: 第十五届真题
tags:
    - Python
createTime: 2025/02/26 16:18:05
permalink: /leetcode/lanqiao-15/
---
## 第十五届真题

[第十五届真题](https://www.lanqiao.cn/paper/4407/result/?backPath=%2Fcup%2F)


### 1. 劲舞团

[劲舞团蓝桥页面](https://www.lanqiao.cn/problems/19697/learning/)

~~音游玩家狂喜~~

::: tip
本题主要考察文件读取和逻辑推理
:::

```py
with open('D:\log.txt') as file:
    content = file.read().split('\n')
res = 0
temp = 0
is_first = True
for i in range(len(content)):
    true_s, blue_s, time = content[i].split(" ")    
    # print(content[i].split(" "))
    time = int(time)
    if true_s != blue_s: # 如果敲得不正确，结束当前的计数
        res = max(res, temp) #计算结果
        temp = 0 # 重置计数，从0开始
        is_first = True # 重置第一次
    else: # 如果敲得正确
        if is_first: # 如果是第一次敲对
            is_first = False # 第一次用掉
            temp = 1 # 从1开始计数
        elif time - last <= 1000: # 不是第一次敲对，且时间间隔小于1000，可以续上
            temp += 1 # 继续计数
        elif time - last > 1000: # 时间间隔大于1000
            res = max(res, temp) # 结束当前计数
            is_first = False # 但是可以从这里开始计数
            temp = 1 # 这次是对的，从1开始
        last = time # 记录上次时间
print(res)
```

### 2. 召唤数学精灵

[召唤数学精灵蓝桥页面](https://www.lanqiao.cn/problems/19700/learning/)
::: tip
大阶乘不可能暴力枚举，一定是找规律，可以先输出前1000个看一下
:::
```py
from math import factorial 

for i in range(1, 1001): 
    if (factorial(i) - (1 + i) * i // 2) % 100 == 0: 
        print(i, end=', ') 
```
输出：
```bash
1, 3, 24, 175, 199, 200, 224, 375, 399, 400, 424, 575, 599, 600, 624, 775, 799, 800, 824, 975, 999, 1000, 
```
抛开1和3，显而易见，每200增加4个元素，注意超过24、175、199需要对应加上

```py
print(2024041331404202 // 200) # 算一下大概是200的多少倍，是10120206657021倍
print(10120206657021 * 200) # 算一下有没有超过24，是2024041331404200，没有超过24，不需要加
print(2024041331404200 // 200 * 4) # 算一下有多少个精灵，有40480826628084个
print(40480826628084 + 2) # 加上开头的两个，最后的答案是40480826628086
```

### 3. 封闭图形个数

[封闭图形个数蓝桥页面](https://www.lanqiao.cn/problems/19733/learning/)

::: tip
- `sort()` 函数的 key 参数可以接受一个多重排序的情况。实际上，key 接受的是一个函数，这个函数的返回值可以是一个元组，当你返回一个元组时，Python 会按顺序依次比较元组中的各个元素。

例如：
```py
data = [(1, 2), (1, 1), (2, 3), (1, 3)]
data.sort(key=lambda x: (x[0], x[1]))
```

- `*l` 是一个 解包操作符，它会把 `l` 列表中的元素作为独立的参数传递给 `print()` 函数。

```py
l = [1, 2, 3, 4]
print(*l)
```
输出
```
1 2 3 4
```
:::



```py
import os
import sys

# 请在此输入您的代码
dic = {'0': 1, '1': 0, '2': 0, '3': 0, '4': 1, '5': 0, '6': 1, '7': 0, '8': 2, '9': 1}

n = input()
l = list(map(str, input().split()))
def com(x):
    res = 0
    for c in x:
        res += dic[c]
    return res, int(x)

l.sort(key = com)
print(*l)
```

### 4. 商品库存管理

::: tip
一开始的想法是复制一份副本，然后每次使用 `count()` 方法计算 0 的数量，这样做是 O(n) 会超时。

可以使用前缀和的思想，用一个变量 `res` 保存初始 0 的数量，然后检查减少的类别是否减到 0 即可。
```py
# 错误想法
for op in oper:
    temp = kucun.copy()
    for i in range(int(op[0]), int(op[1]) + 1):
        temp[i] -= 1

    print(temp.count(0) - 1)
```
:::
```py
n, m = map(int, input().split())
oper = []

for _ in range(m): # 读入操作
    row = list(map(int, input().split()))
    oper.append(row)


kucun = [0] * (n + 1) # 初始化库存，全0


for op in oper: # 根据操作计算最终库存
    for i in range(op[0], op[1] + 1):
        kucun[i] += 1


res = kucun.count(0) - 1
for op in oper:
    temp = res
    for i in range(op[0], op[1] + 1):
        kucun[i] -= 1
        if kucun[i] == 0: # 检查库存到 0 了没
            temp += 1
        kucun[i] += 1 # 恢复库存
    print(temp)
```