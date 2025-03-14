---
title: 蓝桥杯之赛前总动员-第十四届真题
tags:
    - Python
createTime: 2025/03/14 14:13:34
permalink: /article/lanqiao-14/
---

[第十四届真题](https://www.lanqiao.cn/paper/3928/result/?backPath=%2Fcup%2F)


## 1. 工作时长

[工作时长蓝桥页面](https://www.lanqiao.cn/problems/3494/learning/)



~~社畜泪目~~

```py
from datetime import datetime

with open('D:/daka.txt') as file:
    content = file.read().splitlines()

# 将 date 格式转换为秒
def date_to_sec(date):
    return int(datetime.strptime(date, '%Y-%m-%d %H:%M:%S').timestamp())

time = [0] * len(content)
for i in range(len(content)):
    time[i] = date_to_sec(content[i])

time.sort()


res = 0
for i in range(0, len(content), 2):
    res += time[i + 1] - time[i] # 成对计算上班时间
res
```


## 3. 填充

[填充蓝桥页面](https://www.lanqiao.cn/problems/3519/learning/)

```py
s = input()

need = ['00', '11', '0?', '?0', '1?', '?1', '??'] # 记录合法字符
res = 0
i = 1 # 从第二个字符开始
while i < len(s):
    if s[i - 1: i + 1] in need: # 如果前一个字符和当前字符组成的一对，是所需字符串
        i += 2
        res += 1
    else:
        i += 1
print(res)
```

## 4. 互质数的个数



## 5. 阶乘的和

[阶乘的和蓝桥页面](https://www.lanqiao.cn/problems/3527/learning/)

为什么我感觉蓝桥的题全是数学技巧？

举个例子：
排序后的列表 `A = [3,3,3,3,4,5]`，要求 $3! + 3! + 3! + 3! + 4! + 5!$ 的最大阶乘因数，因为 $4!=4 \times 3!$ ， $5! = 5 \times 4 \times 3!$ ，它们都包含 $3!$ 。

所以很显然，我们可以把列表最小值 `3` 作为初始的 `res` ，再一个一个往上找。

那么什么情况下可以往上找呢？

因为 $4!=4 \times 3!$ ，所以 `res` 要想从 `3` 变成 `4` ， 就必须集齐 4 个 $3!$ ， 

从而把 $3! + 3! + 3! + 3! + 4! + 5!$ 变成 $4! + 4! + 5!$，

可见，判断语句应该写 `4 % 4 == 0` 这样的形式，不能有余数，否则会导致有单独的 $3!$ 。

```py
import os
import sys

# 请在此输入您的代码
from collections import defaultdict

n = input()
A = list(map(int, input().split()))
A.sort() # 排序
cnt = defaultdict(int) # 初始化计数器

# 把A存入计数器
for num in A:
    cnt[num] += 1

res = A[0] # 从最小的 res = 3 开始往上尝试

# 此时的cnt: {3: 4, 4: 1, 5: 1})
while 1:
    if cnt[res] % (res + 1) == 0: # 如果 4 % 4 == 0，可以往上走
        cnt[res + 1] += cnt[res] // (res + 1) # 下一位加上可以升星的个数，这里4 // 4 = 1，+1
        res += 1 # 更新答案
    else:
        break

print(res)
```