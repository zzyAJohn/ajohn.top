---
title: '9. 复习String类的实现过程'
createTime: 2025/09/05 17:44:36
permalink: /cpp/ln3ncoon/
---


### 9.1 String编程示例

::: danger
待完成...
:::

### copy assignment operator (拷贝赋值函數)

拷贝赋值与拷贝构造的不同：
1. 拷贝赋值需要先删除本身的东西，拷贝构造是未初始状态无需删除
2. 拷贝赋值需要return *this，便于连续赋值
3. 拷贝赋值需要自我检测

>详情见《Effective C++》条款 10：令operator= 返回一个 reference to *this


小细节：&靠近typename的`String& str`表示引用，&靠近变量的`&str`表示取地址。

