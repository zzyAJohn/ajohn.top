---
title: C++面向对象高级开发（下）
createTime: 2025/09/07 17:19:29
permalink: /cpp/fe5e8w3q/
---

## 1. 转换函数

### 1.1 conversion function

@[pdf 14](https://oss.ajohn.top/blog/pdf/oop2.pdf)

在类内设计一个 `operator double()` ，可以把当前类型转换为double类型，注意要使用const。

分析：`double d = 4 + f;` 这一行代码是一个整型加 Fraction ，并返回一个 double 类型，因此会尝试把 Fraction 转换为整型或者浮点型， Fraction 内部正好设计了 `operator double()` ，因此编译可以通过。


### 1.2 non-explicit-one-argument ctor

@[pdf 15](https://oss.ajohn.top/blog/pdf/oop2.pdf)

分析：`Fraction d2 = f + 4;` 这一行代码是一个 Fraction 加整型，并返回一个 Fraction 类型，此时我们没有提供类型转换函数，注意到我们的成员函数实现了 `operator+` 的重载，但其要求右边是一个 Fraction 对象，而这里是 4 ，编译器尝试把 4 构造成一个Fraction，注意到我们的构造函数内部只有一个实参，发现 4 可以转化为4/1，因此编译也可以通过。


### 1.3 conversion function vs.non-explicit-one-argument ctor

@[pdf 16](https://oss.ajohn.top/blog/pdf/oop2.pdf)

如果同时存在转换函数和操作符重载呢？两者都是合法的，编译器不知道该怎么处理，因此报错 ambiguous ，引发歧义。

### 1.4 explicit-one-argument ctor

@[pdf 17](https://oss.ajohn.top/blog/pdf/oop2.pdf)


如果加上关键字 `explict` ，告诉编译器不要自动改变我的变量类型，那么此处 4 无法构造成一个 Fraction ，只能走转换函数把 f 转成 double ，那么两个 double 相加最后的结果也是 double ，而接受类型要一个 Fraction ，因此这里报的是 double 转 Fraction 的错误：conversion from 'double' to 'Fraction' requested

::: tip
`explict` 通常使用在构造函数的前面，极小一部分用在模板里。
:::

### 1.5 代理

@[pdf 18](https://oss.ajohn.top/blog/pdf/oop2.pdf)

这里本应该传回一个bool值，但是却传回 reference 去代表，这种手法叫做 代理(proxy)。

可以看到 reference 也就是 `_bit_reference` ，而查阅源码发现其确实是返回一个 bool 类型。

## 2. pointer-like classes

设计一个 class ，让它的行为像一个指针。

### 2.1 智能指针

@[pdf 19](https://oss.ajohn.top/blog/pdf/oop2.pdf)

智能指针接受一个普通指针来把它转化为智能指针，其内部有两个常用的运算符重载：`*` 和 `->` ，这里稍有不同的是， `*` 作用于指针就消耗掉了，但是 `->` 得到的东西要继续用 `->` 作用上去。

### 2.2 迭代器

@[pdf 20](https://oss.ajohn.top/blog/pdf/oop2.pdf)

迭代器相比智能指针，需要移动指针去遍历容器，因此需要 `++` `--` 的操作。

## 3. function-like classes

### 3.1 仿函数

@[pdf 22](https://oss.ajohn.top/blog/pdf/oop2.pdf)

设计一个 class ，让它的行为像一个函数，也就是能接受一个小括号的东西（类内定义 `operator()` ），就叫仿函数。

### 3.2 标准库中的仿函数的奇特模样

@[pdf 24](https://oss.ajohn.top/blog/pdf/oop2.pdf)


plus看似只要相加返回即可，为什么要继承？这里卖了个关子，标准库课程里再做介绍。

@[pdf 25](https://oss.ajohn.top/blog/pdf/oop2.pdf)


这里有一堆typedef，占用应该是0，但sizeof可能是1。

## 4. namespace 经验谈

@[pdf 26](https://oss.ajohn.top/blog/pdf/oop2.pdf)


不同部门的函数和名称可能冲突，因此我们使用 namespace 来分离。


## 5. class template, 类模板

@[pdf 27](https://oss.ajohn.top/blog/pdf/oop2.pdf)

在使用类模板时需指定类型。

## 6. function template, 函数模板

@[pdf 28](https://oss.ajohn.top/blog/pdf/oop2.pdf)

函数模板使用一定是调用，因此无需指定类型，如果是自定义类型，那么会继续去查找运算符重载。

## 7. 成员模板

### 7.1 pair

@[pdf 30](https://oss.ajohn.top/blog/pdf/oop2.pdf)

pair 接受任意类型的T1，T2，但是拷贝构造函数要求U1，U2类型的p可以转型成T1，T2，换成文字解释就是说，鲫鱼和麻雀可以转成鱼类和鸟类，因此是允许的，但反过来就不行。

### 7.2 shared_ptr

@[pdf 31](https://oss.ajohn.top/blog/pdf/oop2.pdf)

base 的指针可以指向 derived ，同理智能指针也应该如此，因此在源码中，我有一个指针_TP指向鱼类，那么赋初值的时候我可以给它一个鲫鱼的初值

up-cast：基类往往画在上面，指针可以向上移动。