---
title: 《Effective C++》——在读
createTime: 2025/08/07 15:44:56
permalink: /read/w5p9tijn/
---


<p align="center">
  <img src="https://t13.baidu.com/it/u=4053926793,3613387764&fm=224&app=112&f=JPEG?w=500&h=500
  " width="300"><br>
  <b>《Effective C++》 - [美] Scott Meyers</b>
</p>

>有人说 C++程序员可以分成两类，读过 EfcciveC++的和没读过的。世界顶级C++大师Scont Meyers 成名之作的第三版的确当得起这样的评价。当您读过这本书之后，就获得了迅速提升自己C++功力的一个契机。

>在国际上,本书所引起的反响,波及整个计算技术出版领域,余音至今未绝。几乎在所有C++书籍的推荐名单上,本节都会位于前三名。作者高超的技术把握力、独特的视角、诙谐轻松的写作风格、独具匠心的内容组织,都受到极大的推崇和仿效。这种奇特的现象，只能解释为人们对这本书衷心的赞美和推崇。

>这本书不是读完一遍就可以束之高阁的快餐读物，也不是用以解决手边问题的参考手册，而是需要您去反复阅读体会的，C++是真正程序员的语言，背后有着精深的思想与无与伦比的表达能力，这使得它具有类似宗教般的魅力。希望这本书能够帮助您跨越 C++的重重险阻，领略高处才有的壮美风光，做一个成功而快乐的C++程序员。

<LinkCard title="Z-Library: 《Effective C++》" href="https://zh.z-lib.gd/book/11368290/b56aad/effective-c.html"/>

## 序

> 按孙中山先生的说法，这个世界依聪明才智的先天高下得三种人:先知先觉得发明家，后知后觉得宣传家，不知不觉得实践家。三者之中发明家最少最稀珍，最具创造力。正是匠心独具的发明家创造了这个花花绿绿的计算机世界。

> 世上没有白吃的午餐!又要有效率，又要有弹性，又要前瞻望远，又要回溯相又要治大国，又要烹小鲜，学习起来当然就不可能太简单。在庞大复杂的机制下，万千使用者前仆后继的动力是:一旦学成，妙用无穷。

## 1 让自己习惯C++

### 条款01：视 C++ 为一个语言联邦

::: note
一开始，C++只是C加上一些面向对象特性。C++最初的名称CwithClasses也反映了这个血缘关系。

但是当这个语言逐渐成熟，它变得更活跃更无拘束，更大胆更冒险，开始接受不同于Cwith Classes 的各种观念、特性和编程战略。Exceptions(异常)对函数的结构化带来不同的做法(见条款29)，templates(模板)将我们带到新的设计思考方式(见条款 41)，STL 则定义了一个前所未见的伸展性做法。

今天的 C++已经是个多重范型编程语言(multiparadigm programming language)，一个同时支持过程形式(procedural)、面向对象形式(object-oriented)函数形式(functional)、泛型形式(generic)、元编程形式(metaprogramming)的语言。这些能力和弹性使C++ 成为一个无可匹敌的工具，但也可能引发某些迷惑:所有“适当用法”似乎都有例外。我们该如何理解这样一个语言呢?
:::

::: note
- C。说到底C++仍是以C为基础。区块(blocks)、语句(statements)、预处理器(preprocessor)、内置数据类型(built-indatatypes)、数组(arrays)指针(pointers)等统统来自C。许多时候C++对问题的解法其实不过就是较高级的C解法(例如条款2谈到预处理器之外的另一选择，条款13谈到以对象管理资源)，但当你以C++内的C成分工作时，高效编程守则映照出C语言的局限: 没有模板(templates),没有异常(exceptions),没有重载(overloading)……
- Object-Oriented C++。这部分也就是Cwith Classes所诉求的:classes(包括构造函数和析构函数)，封装(encapsulation)、继承(inheritance)、多态(polymorphism)、virtual函数(动态绑定)……等等。这一部分是面向对象设计之古典守则在 C++ 上的最直接实施。
- Template C++。这是C++ 的泛型编程(generic programming)部分，也是大多数程序员经验最少的部分。Template相关考虑与设计已经弥漫整个C++，良好编程守则中“惟template 适用”的特殊条款并不罕见(例如条款46谈到调用template functions 时如何协助类型转换)。实际上由于templates 威力强大，它们带来崭新的编程范型(programmingparadigm)，也就是所谓的templatemetaprogramming(TMP，模板元编程)。条款48对此提供了一份概述，但除非你是 template 激进团队的中坚骨干，大可不必太担心这些。TMP 相关规则很少与 C++ 主流编程互相影响。
- STL。STL是个template 程序库，看名称也知道，但它是非常特殊的一个。它对容器(containers)、迭代器(iterators)、算法(algorithms)以及函数对象(functionobjects)的规约有极佳的紧密配合与协调，然而templates及程序库也可以其他想法建置出来。STL有自己特殊的办事方式，当你伙同STL一起工作，你必须遵守它的规约。
:::

::: note
记住这四个次语言，当你从某个次语言切换到另一个，导致高效编程守则要求你改变策略时，不要感到惊讶。

例如对内置(也就是C-like)类型而言pass-by-value通常比 pass-by-reference高效，但当你从Cpart ofC++ 移往 Object-Oriented C++,由于用户自定义(user-defined)构造函数和析构函数的存在，pass-by-reference-to-const往往更好。运用Template C++ 时尤其如此，因为彼时你甚至不知道所处理的对象的类型。然而一旦跨入STL你就会了解，迭代器和函数对象都是在C指针之上塑造出来的，所以对STL的选代器和函数对象而言，旧式的Cpass-by-value守则再次适用(参数传递方式的选择细节请见条款20)。

因此我说，C++并不是一个带有一组守则的一体语言;它是从四个次语言组成的联邦政府,每个次语言都有自己的规约。记住这四个次语言你就会发现C++容易了解得多。
:::

::: tip
C++高效编程守则视状况而变化，取决于你使用C++的哪一部分。
:::

### 条款02：尽量以 const, enum, inline 替换 #define

::: note
这个条款或许改为“宁可以编译器替换预处理器”比较好，因为或许 `#define` 不被视为语言的一部分。那正是它的问题所在。当你做出这样的事情:
```C++
#define ASPECT RATIO 1.653
```
记号名称 `ASPECT_RATIO` 也许从未被编译器看见;也许在编译器开始处理源码之前它就被预处理器移走了。于是记号名称 `ASPECT_RATIO` 有可能没进入记号表(symboltable)内。于是当你运用此常量但获得一个编译错误信息时，可能会带来困惑，因为这个错误信息也许会提到1.653而不是 `ASPECT_RATIO` 。如果 `ASPECT_RATIO` 被定义在一个非你所写的头文件内，你肯定对1.653 以及它来自何处毫无概念，于是你将因为追踪它而浪费时间。这个问题也可能出现在记号式调试器(symbolic debugger)中,原因相同:你所使用的名称可能并未进入记号表(symboltable)。
:::

::: tip
对于单纯常量，最好以`const`对象或`enums`替换`#defines`。
对于形似函数的宏(macros)，最好改用`inline`函数替换`#defines`。
:::

### 条款03：尽可能使用 const

::: note
令函数返回一个常量值，往往可以降低因客户错误而造成的意外，而又不至于放弃安全性和高效性。举个例子，考虑有理数(rationalnumbers，详见条款24)的`operator*`声明式:
```C++
Class Rational.{ ...};
const Rational operator*(const Rational& lhs, const Rational& rhs);
```
许多程序员第一次看到这个声明时不免斜着眼睛说,唔,为什么返回一个`const`对象?原因是如果不这样客户就能实现这样的暴行:
```C++
Rational a,b,c;
...
(a * b) = c; //在a*b的成果上调用operator=
```
我不知道为什么会有人想对两个数值的乘积再做一次赋值(assignment)，但我知道许多程序员会在无意识中那么做，只因为单纯的打字错误(以及一个可被隐式转换为`bool`的类型):
```C++
if(a *b= c).. //喔欧，其实是想做一个比较(comparison)动作!
```
如果a和b都是内置类型，这样的代码直截了当就是不合法。而一个“良好的用户自定义类型”的特征是它们避免无端地与内置类型不兼容(见条款18)，因此允许对两值乘积做赋值动作也就没什么意思了。将`operator*`的回传值声明为`const`可以预防那个“没意思的赋值动作”，这就是该那么做的原因。
:::

