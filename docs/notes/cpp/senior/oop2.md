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

### 7.3 specialization, 模板特化

@[pdf 32](https://oss.ajohn.top/blog/pdf/oop2.pdf)

特化可以有任意个版本，运行时会优先匹配特化的版本，没有符合的特化版本则改为使用泛化版本。

### 7.4 partial specialization, 模板偏特化（局部特化）

@[pdf 33](https://oss.ajohn.top/blog/pdf/oop2.pdf)

1. 个数的偏：只绑定一个或部分，其他参数仍然使用泛化模板的默认参数

@[pdf 34](https://oss.ajohn.top/blog/pdf/oop2.pdf)

2. 范围的偏：如果是指针类型，我们使用指针专属模板，非指针类型使用泛化版本。因此 obj1 使用上面的，obj2 使用下面的。


### 7.5 template template parameter, 模板模板参数

@[pdf 35](https://oss.ajohn.top/blog/pdf/oop2.pdf)

即模板的参数也是一个模板

### 7.6 template template parameter

@[pdf 37](https://oss.ajohn.top/blog/pdf/oop2.pdf)

这里的参数 `list<int>` 已经被确定了，已经绑定了，因此这种写法不能叫模板模板参數。


## 8. 关于C++标准库

侯捷老师建议每个算法和容器都使用过

## 9. C++11的三个主题


C++11的一部分内容

### 9.1 variadic templates (since C++11)数量不定的模板参数

@[pdf 43](https://oss.ajohn.top/blog/pdf/oop2.pdf)


`typename...` 表示支持任意数量的类型

`print(args...)` 递归调用自己，每次都把第一个参数打印出来，然后把剩下的一包再次分成一个和一包，直到分成一个和0个，打印完最后一个参数，我们还提供了一个空参数的 `print()` 。

`sizeof...(args)` 可以知道这一包到底有多少变量。

### 9.2 auto 

@[pdf 44](https://oss.ajohn.top/blog/pdf/oop2.pdf)


一种自动类型，适用那些肉眼很难推测出类型的变量，让编译器来帮忙推测


### 9.3 ranged-base for 

@[pdf 45](https://oss.ajohn.top/blog/pdf/oop2.pdf)


```C++
for (decl:coll) {
    statement
}
```

每一轮从 coll 中取出一个容器内的元素 decl ，类似 python 的 `for num in nums:`，也是 pass by value，就是修改 decl 不会影响容器内的元素，除非使用&。


## 10. reference

@[pdf 46](https://oss.ajohn.top/blog/pdf/oop2.pdf)


引用和 const 一但赋予就不能改变

### 10.1 reference 的常见用途

@[pdf 48](https://oss.ajohn.top/blog/pdf/oop2.pdf)

可以看出与传指针相比，传引用和传值操作非常统一，而且传引用无需创建副本，并在原数据直接修改，因此传引用的效率更高。

## 11. 复合、继承、复合 + 继承关系下的构造和析构

之前讲过，同前

## 12. 对象模型（Object Model）

### 12.1 关于vptr和vtbl

@[pdf 53](https://oss.ajohn.top/blog/pdf/oop2.pdf)


先来看三个类：class A有两个虚函数v1，、v2，两个成员函数f1、f2；class B重写了v1，没有重写v2，因此这里v2实际是A的v2，同时这里还重写了A的f1（理想情况子类不应该重写父类的非虚函数，但这里为了举例子这样写了），因此B内的函数为 B\::v1、A\::v2、A\::f1、B\::f2；同理class C重写了v1，没有重写v2，因此C内的函数为 C\::v1、A\::v2、A\::f1、C:\:f2。因此一共有8种不同的函数，其中四种虚函数，那么当一个对象创建时，其内部会生成一个虚指针，指向该类的虚函数表，虚函数表内的地址决定了调用哪个虚函数。

`(*(p->vptr)[n])(p)`：一层层来看，p指向一个C类对象，`p->vptr` ，调用内部的虚指针，此时来到虚函数表，`vbtl[n]` 从中取出某一个虚函数地址，`*` 通过地址解引用出要执行的虚函数，最后传递参数 `(p)` 到虚函数。

@[pdf 54](https://oss.ajohn.top/blog/pdf/oop2.pdf)


`list<A*> myLst;`：这样的好处是可以用 base 指针把所有子类放进一个容器内存储，当需要实例化的时候，只需要依次遍历，取出每一个指针，调用各自的 `draw()` 即可。

多态就是在函数运行时进行动态绑定，要看 p 在 vptbl 中实际指向的是谁


### 12.2 关于this

之前也讲过，省流：只用 vitual 重写我需要重写的方法，其他的按照 base 类提前写好的执行。


## 13. 谈谈const

@[pdf 59](https://oss.ajohn.top/blog/pdf/oop2.pdf)


在成员函数后面加 const ，表明成员函数不打算改变 class 的 data ，并请求编译器来检查。

@[pdf 60](https://oss.ajohn.top/blog/pdf/oop2.pdf)



出错的情况：如果客户想使用一个 const 对象，而我们没有提供const成员函数，那么这种情况会报错。但反过来客户不使用const对象，而我们设计成员函数使用 const ，这是允许的，因此经常要考虑给成员函数加 const 。