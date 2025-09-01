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

::: note 更值得了解的是，反向做法——令const版本调用 non-const 版本以避免重复——并不是你该做的事。记住，const成员函数承诺绝不改变其对象的逻辑状态(logical state)，non-const成员函数却没有这般承诺。如果在const函数内调用non-const 函数，就是冒了这样的风险:你曾经承诺不改动的那个对象被改动了。这就是为什么“const成员函数调用non-const成员函数”是一种错误行为:因为对象有可能因此被改动。实际上若要令这样的代码通过编译，你必须使用一个const cast将`*this`身上的 const性质解放掉，这是乌云罩顶的清晰前兆。反向调用(也就是我们先前使用的那个)才是安全的:non-const成员函数本来就可以对其对象做任何动作，所以在其中调用一个const成员函数并不会带来风险。这就是为什么本例以 static cast作用于`*this`的原因:这里并不存在 const相关危险。
:::

::: tip
- 将某些东西声明为const可帮助编译器侦测出错误用法。const可被施加于任何作用域内的对象、函数参数、函数返回类型、成员函数本体。

- 编译器强制实施 bitwise constness,但你编写程序时应该使用“概念上的常量性(conceptual constness)。

- 当const和 non-const成员函数有着实质等价的实现时，令non-const版本调用 const版本可避免代码重复。
:::

### 条款04：确定对象被使用前已先被初始化

::: note 表面上这似乎是个无法决定的状态，而最佳处理办法就是:永远在使用对象之前先将它初始化。对于无任何成员的内置类型，你必须手工完成此事。至于内置类型以外的任何其他东西，初始化责任落在构造函数(constructors)身上。规则很简单:确保每一个构造函数都将对象的每一个成员初始化。
:::

::: note 有些情况下即使面对的成员变量属于内置类型(那么其初始化与赋值的成本相同)，也一定得使用初值列。是的，如果成员变量是const或references，它们就一定需要初值，不能被赋值(见条款5)。为避免需要记住成员变量何时必须在成员初值列中初始化，何时不需要，最简单的做法就是:总是使用成员初值列。这样做有时候绝对必要，且又往往比赋值更高效。
:::

::: tip
- 为内置型对象进行手工初始化，因为C++不保证初始化它们。
- 构造函数最好使用成员初值列(memberinitializationlist)，而不要在构造函数本体内使用赋值操作(assignment)。初值列列出的成员变量，其排列次序应该和它们在 class 中的声明次序相同。
- 为免除“跨编译单元之初始化次序”问题，请以localstatic 对象替换 non-localstatic 对象。
:::

## 2 构造/析构/赋值运算

### 条款05：了解C++默默编写并调用哪些函数

::: note 什么时候 empty class(空类)不再是个empty class 呢?当C++ 处理过它之后是的，如果你自己没声明，编译器就会为它声明(编译器版本的)一个copy构造函数、一个 copy assignment操作符和一个析构函数。此外如果你没有声明任何构造函数,编译器也会为你声明一个 defaut构造函数。所有这些函数都是 public目 inline(见条款 30)。
:::

::: note 面对这个难题，C++的响应是拒绝编译那一行赋值动作。如果你打算在一个“内含reference成员”的class内支持赋值操作(assignment)，你必须自己定义coPyassignment操作符。面对“内含const成员”(如本例之obiectValue)的 classes,编译器的反应也一样。更改const成员是不合法的，所以编译器不知道如何在它自已生成的赋值函数内面对它们。最后还有一种情况:如果某个basecasses将coPassignment操作符声明为private，编译器将拒绝为其derived classes生成一个 copyassignment 操作符。毕竟编译器为derived classes所生的 copy assignment操作符想象中可以处理 base class 成分(见条款12)，但它们当然无法调用 derived class 无权调用的成员函数。编译器两手一摊，无能为力。
:::

::: tip
编译器可以暗自为 class 创建 default构造函数、copy构造函数、copyassignment 操作符，以及析构函数。
:::

### 条款 06：若不想使用编译器自动生成的函数，就该明确拒绝

::: note 答案的关键是,所有编译器产出的函数都是 public。为阻止这些函数被创建出来你得自行声明它们，但这里并没有什么需求使你必须将它们声明为public。因此你可以将copy构造函数或copyassignment操作符声明为 private。藉由明确声明一个成员函数，你阻止了编译器暗自创建其专属版本;而令这些函数为private，使你得以成功阻止人们调用它。
:::

::: note 一般而言这个做法并不绝对安全，因为member 函数和 friend 函数还是可以调用你的 private 函数。除非你够聪明，不去定义它们，那么如果某些人不慎调用任何一个，会获得一个连接错误(linkage error)。“将成员函数声明为private而且故意不实现它们”这一伎俩是如此为大家接受，因而被用在C++ iostream 程序库中阻止copying行为。是的，看看你手上的标准程序库实现码中的ios_base,basic_ios 和sentry。你会发现无论哪一个，其copy构造函数和copy assignment操作符都被声明为 private 而且没有定义。
:::

::: tip
为驳回编译器自动(暗自)提供的机能，可将相应的成员函数声明为private并且不予实现。使用像 Uncopyable这样的 base class 也是一种做法。
:::

### 条款 07：为多态基类声明 virtual 析构函数

::: note 因此，无端地将所有classes的析构函数声明为virtual，就像从未声明它们为virtual一样，都是错误的。许多人的心得是:只有当 class内含至少一个 virtual 函数,才为它声明 virtual 析构函数。
:::

::: tip
- polymorphic(带多态性质的)base classes应该声明一个virtual析构函数。如果class 带有任何 virtual函数，它就应该拥有一个 virtual析构函数。
- Classes的设计目的如果不是作为base classes使用，或不是为了具备多态性(polymorphically)，就不该声明 virtual 析构函数。
:::

### 条款 08：别让异常逃离析构函数

::: note 因为析构函数吐出异常就是危险，总会带来“过早结束程序”或“发生不明确行为”的风险。本例要说的是，由客户自己调用close并不会对他们带来负担，而是给他们一个处理错误的机会，否则他们没机会响应。如果他们不认为这个机会有用(或许他们坚信不会有错误发生)，可以忽略它，倚赖 DBConn 析构函数去调用close。如果真有错误发生-如果 close的确抛出异常--而且 DBConn吞下该异常或结束程序,客户没有立场抱怨，毕竟他们曾有机会第一手处理问题，而他们选择了放弃。
:::

::: tip
析构函数绝对不要吐出异常。如果一个被析构函数调用的函数可能抛出异常，析构函数应该捕捉任何异常，然后吞下它们(不传播)或结束程序。如果客户需要对某个操作函数运行期间抛出的异常做出反应，那么class应该提供一个普通函数(而非在析构函数中)执行该操作。
:::

### 条款 09：绝不在构造和析构过程中调用vitual函数

::: tip
在构造和析构期间不要调用 virtual函数，因为这类调用从不下降至 derived class(比起当前执行构造函数和析构函数的那层)。
:::

### 条款 10：令operator= 返回一个 reference to *this

::: tip
令赋值(assignment)操作符返回一个reference to *this。
:::

### 条款 11：在operator= 中处理“自我赋值”

::: tip
- 确保当对象自我赋值时 operator=有良好行为。其中技术包括比较“来源对象”和“目标对象”的地址、精心周到的语句顺序、以及 copy-and-swap。
- 确定任何函数如果操作一个以上的对象，而其中多个对象是同一个对象时，其行为仍然正确。
:::

### 条款 12：复制对象时勿忘其每一个成分

::: note 这时候既有的 copying函数执行的是局部拷贝(partialcopy):它们的确复制了顾客的 name，但没有复制新添加的lastTransaction。大多数编译器对此不出任何怨言——即使在最高警告级别中(见条款53)。这是编译器对“你自己写出copying函数”的复仇行为:既然你拒绝它们为你写出copying函数，如果你的代码不完全，它们也不告诉你。结论很明显:如果你为class添加一个成员变量，你必须同时修改copying函数。(你也需要修改 class 的所有构造函数(见条款4和条款 45)以及任何非标准形式的operator=(条款10有个例子)。如果你忘记，编译器不太可能提醒你。)
:::

::: tip
- Copying函数应该确保复制“对象内的所有成员变量”及“所有base class 成分”。
- 不要尝试以某个copying函数实现另一个copying函数。应该将共同机能放进第三个函数中，并由两个 coping函数共同调用。
:::

## 3 资源管理

::: important
所谓资源就是，一旦用了它，将来必须还给系统。如果不这样，糟糕的事情就会发生。C++程序中最常使用的资源就是动态分配内存(如果你分配内存却从来不曾归还它，会导致内存泄漏)，但内存只是你必须管理的众多资源之一。其他常见的资源还包括文件描述器(filedescriptors)、互斥锁(mutexlocks)、图形界面中的字型和笔刷、数据库连接、以及网络 sockets。不论哪一种资源，重要的是，当你不再使用它时，必须将它还给系统。
:::

### 条款13：以对象管理资源

::: note 当然啦，谨慎地编写程序可以防止这一类错误，但你必须想想，代码可能会在时间渐渐过去后被修改。一旦软件开始接受维护，可能会有某些人添加return语句或 continue 语句而未能全然领悟它对函数的资源管理策略造成的后果。更糟的是f的"."区域有可能调用一个“过去从未抛出异常，却在被'改善’之后开始那么做”的函数。因此单纯倚赖“f总是会执行其 delete语句”是行不通的。
为确保 createInvestment返回的资源总是被释放，我们需要将资源放进对象内，当控制流离开，该对象的析构函数会自动释放那些资源。实际上这正是隐身于本条款背后的半边想法:把资源放进对象内，我们便可倚赖C++的“析构函数自动调用机制”确保资源被释放。(稍后讨论另半边想法。)
:::

::: note 由于 auto ptr 被销毁时会自动删除它所指之物，所以一定要注意别让多个autoptr同时指向同一对象。如果真是那样，对象会被删除一次以上，而那会使你的程序搭上驶向“未定义行为”的快速列车上。为了预防这个问题，autoptrs有一个不寻常的性质:若通过copy构造函数或copy assignment操作符复制它们，它们会变成null，而复制所得的指针将取得资源的唯一拥有权!
:::

::: note auto ptr的替代方案是“引用计数型智慧指针”(reference-countingsmart pointer;RCSP)。所谓 RCSP也是个智能指针，持续追踪共有多少对象指向某资源，并在无人指向它时自动删除该资源。RCSPS提供的行为类似垃圾回收(garbagecollection)，不同的是RCSPs无法打破环状引用(cyclesofreferences，例如两个其实已经没被使用的对象彼此互指，因而好像还处在“被使用”状态)
:::

::: tip
- 为防止资源泄漏，请使用RAII对象，它们在构造函数中获得资源并在析构函数中释放资源。
- 两个常被使用的RAII classes分别是tr1::sharedptr和autoptr。前者通常是较佳选择，因为其copy行为比较直观。若选择autoptr,复制动作会使它(被复制物)指向 null。
:::

### 条款14：在资源管理类中小心coping行为

::: important
可以自定义的RAII行为：
- 禁止复制：不允许RAII对象复制。可以通过继承一个private拷贝构造接口。
- 引用计数：类似shared_ptr，资源被多个指针共享，最后一个指针消失时销毁资源。可以借用shared_ptr的第二个参数来快速实现（第二个参数表明最后一个指针消失时执行的方法）。
- 复制底部资源：类似深拷贝，每个指针指向一个独立资源。
- 转移拥有权：类似auto_ptr，新的指针拥有控制权，旧的指针丢失控制权。
:::

::: tip
- 复制 RAII对象必须一并复制它所管理的资源，所以资源的copying行为决定RAII 对象的 copying行为。
- 普遍而常见的RAII class copying行为是:抑制 copying、施行引用计数法(reference counting)。不过其他行为也都可能被实现。
:::

### 条款15：在资源管理类中提供对原始资源的访问

::: tip
- APIS往往要求访问原始资源(rawresources)，所以每一个RAII class 应该提供一个“取得其所管理之资源”的办法。
- 对原始资源的访问可能经由显式转换或隐式转换。一般而言显式转换比较安全但隐式转换对客户比较方便。
:::

### 条款16：成对使用 new 和 delete 时要采取相同形式

::: note 游戏规则很简单:如果你调用new时使用门，你必须在对应调用delete时也使用[]。如果你调用new时没有使用[],那么也不该在对应调用 delete 时使用[]。
:::

::: tip
如果你在 new表达式中使用[ ]，必须在相应的 delete表达式中也使用[ ]。如果你在 new表达式中不使用[]，一定不要在相应的 delete 表达式中使用[]。
:::

### 条款17：以独立语句将 newed 对象置入智能指针

::: note 
```C++
processwidget(std::trl::shared_ptr<Widget>(new Widget), priority());
```
1.执行"new widget"
2.调用 priority
3.调用 tr1::shared ptr构造函数

现在请你想想，万一对 priority的调用导致异常，会发生什么事?在此情况下"new Widget"返回的指针将会遗失，因为它尚未被置入tr1::shared ptr内，后者是我们期盼用来防卫资源泄漏的武器。是的，在对processwidget的调用过程中可能引发资源泄漏，因为在“资源被创建(经由"new Widget")”和“资源被转换为资源管理对象”两个时间点之间有可能发生异常干扰，

避免这类问题的办法很简单:使用分离语句，分别写出(1)创建widge，(2)将它置入一个智能指针内，然后再把那个智能指针传给processwidget:
```C++
std::trl::shared_ptr<Widget> pw(new Widget); //在单独语句内以智能指针存储 newed 所得对象。
processwidget(pw, priority()); //这个调用动作绝不至于造成泄漏。
```
:::

::: tip
以独立语句将 newed 对象存储于(置入)智能指针内。如果不这样做，一旦异常被抛出，有可能导致难以察觉的资源泄漏。
:::

## 4 设计与声明

### 条款18：让接口容易被正确使用，不易被误用

::: tip
- 好的接口很容易被正确使用，不容易被误用。你应该在你的所有接口中努力达成这些性质。
- “促进正确使用”的办法包括接口的一致性，以及与内置类型的行为兼容。
- “阻止误用”的办法包括建立新类型、限制类型上的操作，束缚对象值，以及消除客户的资源管理责任。
- tr1::shared ptr支持定制型删除器(custom deleter)。这可防范 DLL问题，可被用来自动解除互斥锁(mutexes;见条款14)等等。
:::

### 条款19：设计 class 犹如设计 type

::: tip
Class的设计就是 type 的设计。在定义一个新type 之前，请确定你已经考虑过本条款覆盖的所有讨论主题。
:::

### 条款20：宁以 pass-by-reference-to-const 替换 pass-by-value

::: tip
- 尽量以 pass-by-reference-to-const替换 pass-by-value。前者通常比较高效，并可避免切割问题(slicing problem)
- 以上规则并不适用于内置类型，以及STL的迭代器和函数对象。对它们而言pass-by-value往往比较适当。
:::

### 条款21：必须返回对象时，别妄想返回其 reference

::: tip
绝不要返回 pointer 或reference 指向一个 local stack对象，或返回reference 指向一个 heap-allocated 对象，或返回pointer 或reference 指向一个 local static 对象而有可能同时需要多个这样的对象。条款4已经为“在单线程环境中合理返回reference指向一个 local static 对象”提供了一份设计实例。
:::

### 条款22：将成员变量声明为 private

::: note 让我们从语法一致性开始(同时请见条款18)。如果成员变量不是public，客户唯一能够访问对象的办法就是通过成员函数。如果 public 接口内的每样东西都是函数客户就不需要在打算访问class成员时迷惑地试着记住是否该使用小括号(圆括号)。他们只要做就是了，因为每样东西都是函数。就生命而言，这至少可以省下许多搔首弄耳的时间。
:::

::: note 或许你不认为一致性的理由足以令人信服，那么这个事实如何:使用函数可以让你对成员变量的处理有更精确的控制。如果你令成员变量为public，每个人都可以读写它，但如果你以函数取得或设定其值，你就可以实现出“不准访问”、“只读访问”以及“读写访问”。见鬼了，你甚至可以实现“惟写访问”，如果你想要的话。
:::

::: tip
- 切记将成员变量声明为private。这可赋予客户访问数据的一致性、可细微划分访问控制、允诺约束条件获得保证，并提供 class作者以充分的实现弹性。
- protected 并不比 public 更具封装性。
:::

### 条款23：宁以 non-member、non-friend 替换 member 函数

::: tip
宁可拿 non-member non-fiend 函数替换 member 函数。这样做可以增加封装性、包裹弹性(packaging flexibility)和机能扩充性。
:::

### 条款24：若所有参数皆需类型转换，请为此采用 non-member 函数

::: note 就本例而言答案是否定的，因为operator* 可以完全籍由Rationa1的public 接口完成任务，上面代码已表明此种做法。这导出一个重要的观察:member函数的反面是 non-member 函数，不是friend 函数。太多 C++ 程序员假设，如果-个“与某 class相关”的函数不该成为一个member(也许由于其所有实参都需要类型转换，例如先前的 Rational的 operator*函数)，就该是个 fiend。本例表明这样的理由过于牵强。无论何时如果你可以避免 fiend 函数就该避免，因为就像真实世界一样，朋友带来的麻烦往往多过其价值。当然有时候fiend有其正当性，但这个事实依然存在:不能够只因函数不该成为member，就自动让它成为fiend。
:::

::: tip
- 如果你需要为某个函数的所有参数(包括被 this 指针所指的那个隐喻参数)进行类型转换，那么这个函数必须是个 non-member。
:::

### 条款25：考虑写出一个不抛弃异常的 swap 函数

::: note
首先，如果 swap的缺省实现码对你的class或 class template 提供可接受的效率,你不需要额外做任何事。任何尝试置换(swap)那种对象的人都会取得缺省版本，而那将有良好的运作。

其次，如果 swap 缺省实现版的效率不足(那几乎总是意味你的class或template使用了某种 pimmpl手法)，试着做以下事情:
1. 提供一个public swap成员函数,让它高效地置换你的类型的两个对象值。稍后我将解释，这个函数绝不该抛出异常。
2. 在你的 class 或template 所在的命名空间内提供一个 non-member swap,并令它调用
上述 swap 成员函数。
3. 如果你正编写一个class(而非class template)，为你的cass 特化 std::swap。并3令它调用你的 swap 成员函数。
最后，如果你调用swap，请确定包含一个using声明式，以便让std::swap在你的函数内曝光可见，然后不加任何namespace修饰符，赤裸裸地调用swap。
:::

::: tip
- 当std::swap对你的类型效率不高时，提供一个swap成员函数，并确定这个函数不抛出异常。
- 如果你提供一个 member swap，也该提供一个non-member swap用来调用前者。对于classes(而非templates)，也请特化 std::swap。
- 调用 swap时应针对 std::swap使用using声明式,然后调用 swap并且不带任何“命名空间资格修饰”。
- “用户定义类型”进行 std templates 全特化是好的，但千万不要尝试在 std内加入某些对 std而言全新的东西。
:::


## 5 实现

### 条款26：尽可能地延后变量定义式的出现时间

::: note 只要你定义了一个变量而其类型带有一个构造函数或析构函数，那么当程序的控制流(controlfow)到达这个变量定义式时，你便得承受构造成本;当这个变量离开其作用域时，你便得承受析构成本。即使这个变量最终并未被使用，仍需耗费这些成本，所以你应该尽可能避免这种情形。
:::

::: note 这让我们联想起本条款所谓“尽可能延后”的真正意义。你不只应该延后变量的定义，直到非得使用该变量的前一刻为止，甚至应该尝试延后这份定义直到能够给它初值实参为止。如果这样，不仅能够避免构造(和析构)非必要对象，还可以避免无意义的 default构造行为。更深一层说，以“具明显意义之初值”将变量初始化，还可以附带说明变量的目的。
:::

::: note
```C++
//方法 A:定义于循环外
Widget w;
for(inti=0;i<n;++i) {
  w=取决于i的某个值;
  ...
}
```

```C++
//方法 B:定义于循环内
for(inti=0;i<n;++i) {
  widget w(取决于i的某个值);
}
```

这里我把对象的类型从 string改为 widget，以免造成读者对于“对象执行构造、析构、或赋值动作所需的成本”有任何特殊偏见。
在 widget函数内部，以上两种写法的成本如下
- 做法A:1个构造函数+1个析构函数+n个赋值操作做法 
- 做法B:n个构造函数+n个析构函数
如果 classes 的一个赋值成本低于一组构造+析构成本，做法A大体而言比较高效。尤其当n值很大的时候。否则做法B或许较好。此外做法A造成名称w的作用域(覆盖整个循环)比做法B更大，有时那对程序的可理解性和易维护性造成冲突。因此除非(1)你知道赋值成本比“构造+析构”成本低，(2)你正在处理代码中效率高度敏感(performance-sensitive)的部分，否则你应该使用做法B。
:::

### 条款27：尽量少做转型动作

::: note 不幸的是，转型(casts)破坏了类型系统(typesystem)。那可能导致任何种类的麻烦，有些容易辨识，有些非常隐晦。如果你来自C，Java或C#阵营，请特别注意，因为那些语言中的转型(casting)比较必要而无法避免，也比较不危险(与C++相较)。但C++不是C，也不是Java或C#。在C++ 中转型是一个你会想带着极大尊重去亲近的一个特性。
:::

::: note
- const_cast通常被用来将对象的常量性转除(cast away the constness)。它也是唯一有此能力的 C++-style 转型操作符,
- dynamic_cast主要用来执行“安全向下转型”(safe downcasting)，也就是用来决定某对象是否归属继承体系中的某个类型。它是唯一无法由旧式语法执行的动作，也是唯一可能耗费重大运行成本的转型动作(稍后细谈)。
- reinterpret_cast意图执行低级转型，实际动作(及结果)可能取决于编译器这也就表示它不可移植。例如将一个 pointer to int转型为一个 int。这一类转型在低级代码以外很少见。本书只使用一次,那是在讨论如何针对原始内存(raw memory)写出一个调试用的分配器(debugging allocator)时，见条款50。
- static_cast用来强迫隐式转换(implicit conversions)，例如将non-const对象转为 const对象(就像条款3所为)，或将int转为double等等。它也可以用来执行上述多种转换的反向转换，例如将void*指针转为typed指针，将pointer-tobase 转为 pointer-to-derived。但它无法将 const转为 non-const——这个只有 const cast才办得到。
:::

::: tip
- 如果可以，尽量避免转型，特别是在注重效率的代码中避免dynamiccasts。
- 如果有个设计需要转型动作，试着发展无需转型的替代设计。如果转型是必要的，试着将它隐藏于某个函数背后。客户随后可以调用该函数，而不需将转型放进他们自己的代码内。
- 宁可使用 C++-style(新式)转型，不要使用旧式转型。前者很容易辨识出来而且也比较有着分门别类的职掌。
:::

### 条款28：避免返回 handles 指向对象内部成分

::: note 避免返回handles(包括references、指针、迭代器)指向对象内部。遵守这个条款可增加封装性，帮助const 成员函数的行为像个const，并将发生“虚吊号码牌”(dangling handles)的可能性降至最低。
:::

### 条款29：为“异常安全”而努力是值得的

::: note
从“异常安全性”的观点来看，这个函数很糟。“异常安全”有两个条件，而这个函数没有满足其中任何一个条件。

当异常被抛出时，带有异常安全性的函数会:
- 不泄漏任何资源。上述代码没有做到这一点,因为一旦“newImage(imgSrc)”导致异常，对un1ock的调用就绝不会执行，于是互斥器就永远被把持住了。
- 不允许数据败坏。如果"new Image(imgSrc)"抛出异常，bgImage 就是指向个已被删除的对象，imagechanges也已被累加，而其实并没有新的图像被成功安装起来。(但从另一个角度说，旧图像已被消除，所以你可能会争辩说图像还是“改变了”)。
:::

::: note
异常安全函数(Exception-safe functions)提供以下三个保证之一:
- 基本承诺:如果异常被抛出，程序内的任何事物仍然保持在有效状态下。没有任何对象或数据结构会因此而败坏，所有对象都处于一种内部前后一致的状态(例如所有的 class约束条件都继续获得满足)。然而程序的现实状态(exactstate)恐怕不可预料。举个例子，我们可以撰写 changeBackground 使得一旦有异常被抛出时，PrettyMenu对象可以继续拥有原背景图像，或是令它拥有某个缺省背景图像，但客户无法预期哪一种情况。如果想知道，他们恐怕必须调用某个成员函数以得知当时的背景图像是什么。
- 强烈保证:如果异常被抛出，程序状态不改变。调用这样的函数需有这样的认知:如果函数成功，就是完全成功，如果函数失败，程序会回复到“调用函数之前”的状态。
和这种提供强烈保证的函数共事，比和刚才说的那种只提供基本承诺的函数共事，容易多了，因为在调用一个提供强烈保证的函数后，程序状态只有两种可能:如预期般地到达函数成功执行后的状态，或回到函数被调用前的状态与此成对比的是，如果调用一个只提供基本承诺的函数，而真的出现异常，程序有可能处于任何状态--只要那是个合法状态，
- 抛掷(nothrow)保证，承诺绝不抛出异常，因为它们总是能够完成它们原先承诺的功能。作用于内置类型(例如ints，指针等等)身上的所有操作都提供nothrow 保证。这是异常安全码中一个必不可少的关键基础材料。
:::

::: note 第二，我们重新排列 changeBackground内的语句次序，使得在更换图像之后才累加 imagechanges。一般而言这是个好策略：不要为了表示某件事情发生而改变对象状态，除非那件事情真的发生了。
:::

::: note
没有理由让这种情况永垂不朽。当你撰写新码或修改旧码时，请仔细想想如何让它具备异常安全性。首先是“以对象管理资源”(条款13)，那可阻止资源泄漏。然后是挑选三个“异常安全保证”中的某一个实施于你所写的每一个函数身上。你应该挑选“现实可施作”条件下的最强烈等级，只有当你的函数调用了传统代码，才别无选择地将它设为“无任何保证”。将你的决定写成文档，这一来是为你的函数用户着想，二来是为将来的维护者着想。函数的“异常安全性保证”是其可见接口的一部分，所以你应该慎重选择，就像选择函数接口的其他任何部分一样。

四十年前，满载 goto的代码被视为一种美好实践，而今我们却致力写出结构化控制流(structured controlflows)。二十年前，全局数据(globally accessible data)被视为一种美好实践，而今我们却致力于数据的封装。十年前，撰写“未将异常考虑在内”的函数被视为一种美好实践，而今我们致力于写出“异常安全码”。

时间不断前进。我们与时俱进!
:::

::: tip
- 异常安全函数(Exception-safe functions)即使发生异常也不会泄漏资源或允许任何数据结构败坏。这样的函数区分为三种可能的保证:基本型、强烈型、不抛异常型。
- “强烈保证”往往能够以 copy-and-swap 实现出来，但“强烈保证”并非对所有函数都可实现或具备现实意义。
- 函数提供的“异常安全保证”通常最高只等于其所调用之各个函数的“异常安全保证”中的最弱者。
:::

### 条款30：透彻了解 inlining 的里里外外

::: note 现在让我们先结束“inline是个申请，编译器可加以忽略”的观察。大部分编译器拒绝将太过复杂(例如带有循环或递归)的函数inlining，而所有对virtual函数的调用(除非是最平淡无奇的)也都会使inlining落空。这不该令你惊讶，因为virtua1 意味“等待，直到运行期才确定调用哪个函数”，而 inline 意味“执行前，先将调用动作替换为被调用函数的本体”。如果编译器不知道该调用哪个函数，你就很难责备它们拒绝将函数本体imnlining。
:::

::: tip
- 将大多数 inlining 限制在小型、被频繁调用的函数身上。这可使日后的调试过程和二进制升级(binary upgradability)更容易，也可使潜在的代码膨胀问题最小化，使程序的速度提升机会最大化。
- 不要只因为 function templates 出现在头文件，就将它们声明为inline。
:::

### 条款31：将文件间的编译依存关系降至最低

::: tip
- 支持“编译依存性最小化”的--般构想是:相依于声明式，不要相依于定义式。基于此构想的两个手段是Handleclasses和Interface classes。
- 程序库头文件应该以“完全且仅有声明式”(full and declaration-onlyforms)的形式存在。这种做法不论是否涉及templates 都适用。
:::

## 6 继承与面向对象设计

### 条款32：确定你的 public 继承塑模出 is-a 关系

::: note 这就是为什么现在我要戒慎恐惧地对你声明，以C++进行面向对象编程，最重要的一个规则是:public inheritance(公开继承)意味"is-a"(是一种)的关系。把这个规则牢牢地烙印在你的心中吧!
:::

::: note 如果你令 class D("Derived")以 public 形式继承 class B("Base")，你便是告诉C++编译器(以及你的代码读者)说，每一个类型为D的对象同时也是一个类型为B的对象，反之不成立。你的意思是B比D表现出更一般化的概念，而D比B表现出更特殊化的概念。你主张“B对象可派上用场的任何地方，D对象一样可以派上用场”(译注:此即所谓Liskov Substitution Principle)，因为每一个D对象都是一种(是一个)B对象。反之如果你需要一个D对象，B对象无法效劳，因为虽然每个D对象都是一个B对象，反之并不成立。
:::

::: note 这和采取“令程序于运行期发生错误”的解法极为不同。若以那种做法，编译器不会对 p.fly调用式发出任何抱怨。条款18说过:好的接口可以防止无效的代码通过编译，因此你应该宁可采取“在编译期拒绝企鹅飞行”的设计，而不是“只在运行期才能侦测它们”的设计。
:::

::: tip
public 继承”意味is-a。适用于base classes身上的每一件事情一定也适用于derived classes身上，因为每一个 derived class 对象也都是一个 base class 对象。
:::

### 条款33：避免遮掩继承而来的名称

::: note 关于“名称”，莎士比亚说过这样一句话:“名称是什么呢?”他问，“一朵玫瑰叫任何名字还是一样芬芳。”吟游诗人也写过这样的话:“偷了我的好名字的人呀……害我变得好可怜。”完全正确。这把我们引到了C++“继承而来的名称”。
:::

::: tip
- derived classes内的名称会遮掩base classes内的名称。在 public 继承下从来没有人希望如此。
- 为了让被遮掩的名称再见天日，可使用using声明式或转交函数(forwardingfunctions )
:::

### 条款34：区分接口继承和实现继承

::: tip
- 接口继承和实现继承不同。在public继承之下,derived classes总是继承 base class的接口。
- pure virtual函数只具体指定接口继承。
- 简朴的(非纯)impure virtual函数具体指定接口继承及缺省实现继承。
- non-virtual函数具体指定接口继承以及强制性实现继承。
:::

### 条款35：考虑 virtual函数以外的其他选择

::: note
本条款的根本忠告是,当你为解决问题而寻找某个设计方法时,不妨考虑 virtual函数的替代方案。下面快速重点复习我们验证过的几个替代方案:

- 使用 non-virtual interface(NVI)手法，那是 Template Method 设计模式的一种特殊形式。它以 public non-virtual 成员函数包裹较低访问性(private 或protected)的 virtual 函数。
- 将 virtual函数替换为“函数指针成员变量”，这是Strafegy 设计模式的一种分解表现形式。
- 以tr1::function成员变量替换virtual函数，因而允许使用任何可调用物(callable entity)搭配一个兼容于需求的签名式。这也是 Strategy 设计模式的某种形式。
- 将继承体系内的virtual函数替换为另一个继承体系内的virtual函数。这是Strategy 设计模式的传统实现手法。

以上并未彻底而详尽地列出 virtual函数的所有替换方案,但应该足够让你知道的确有不少替换方案。此外，它们各有其相对的优点和缺点，你应该把它们全部列入考虑。
为避免陷入面向对象设计路上因常规而形成的凹洞中，偶而我们需要对着车轮猛推一把。这个世界还有其他许多道路，值得我们花时间加以研究。
:::

::: tip
virtual 函数的替代方案包括 NVI手法及 Strategy 设计模式的多种形式。NVI手法自身是一个特殊形式的 Template Method 设计模式。将机能从成员函数移到class外部函数，带来的一个缺点是，非成员函数无法访问 class 的 non-public 成员。
tr1::function 对象的行为就像一般函数指针。这样的对象可接纳“与给定之目标签名式(target signature)兼容”的所有可调用物(callable entities)。
:::

### 条款36：绝不重新定义继承而来的 non-virtual函数

::: note 现在，如果了重新定义mf，你的设计便出现矛盾。如果D真有必要实现出与B不同的 mf,并且如果每一个B对象--不管多么特化--真的必须使用B所提供的mf实现码，那么“每个D都是一个 B”就不为真。既然如此D就不该以 public 形式继承 B。另一方面，如果D真的必须以public方式继承B，并且如果D真有需要实现出与B不同的mf，那么m就无法为B反映出“不变性凌驾特异性”的性质。既然这样 mf应该声明为 virtual 函数。最后，如果每个D真的是一个 B，并且如果 mf真的为B反映出“不变性凌驾特异性”的性质，那么D便不需要重新定义mf，而且它也不应该尝试这样做。
:::

::: tip
绝对不要重新定义继承而来的 non-virtual函数。
:::

### 条款37：绝不重新定义继承而来的缺省参数值

::: note 这种情况下，本条款成立的理由就非常直接而明确了:virtual函数系动态绑定(dynamically bound)，而缺省参数值却是静态绑定(statically bound)。那是什么意思?你说你那负荷过重的脑袋早已忘记静态绑定和动态绑定之间的差异?(为了正式记录在案，容我再说一次，静态绑定又名前期绑定，earbinding;动态绑定又名后期绑定,late binding。)现在让我们来一趟复习之旅吧!
:::

::: note 但是当你考虑带有缺省参数值的 virtual 函数，花样来了，因为就如我稍早所说，virtual 函数是动态绑定，而缺省参数值却是静态绑定。意思是你可能会在“调用一个定义于 derived class 内的 virtual 函数”的同时，却使用 base class 为它所指定的缺省参数值。
:::

::: note
当你想令 virtual 函数表现出你所想要的行为但却遭遇麻烦，聪明的做法是考虑替代设计。条款 35列了不少 virtual函数的替代设计，其中之一是NVI(non-virtualinterace)手法:令base class 内的一个 public non-virtual 函数调用 private virtual 函数，后者可被 derived classes 重新定义。这里我们可以让 non-virtual 函数指定缺省参数，而private virtual函数负责真正的工作:
```C++
class Shape {
public:
  enum ShapeColor{Red，Green，Blue};
  void draw(ShapeColor color=Red) const //如今它是 non-virtual
  {
    doDraw(color); //调用一个 virtual
  }
private:
  virtual void doDraw(shapeColor color) const = 0;//真正的工作//在此处完成
};

class Rectangle:public Shapepublic {
private:

virtual void doDraw(ShapeColor color)const; //注意，不须指定缺省参数值。
}

```
由于 non-virtual函数应该绝对不被derived classes覆写(见条款36)，这个设计很清楚地使得 draw函数的 color 缺省参数值总是为 Red。
:::

::: tip
绝对不要重新定义一个继承而来的缺省参数值，因为缺省参数值都是静态绑定而 virtual 函数——你唯一应该覆写的东西——却是动态绑定。
:::

### 条款38：通过复合塑模出 has-a或"根据某物实现出"

::: note 条款 32曾说，“public继承”带有is-a(是一种)的意义。复合也有它自己的意义。实际上它有两个意义。==复合意味 has-a(有一个)或 is-implemented-in-terms-of(根据某物实现出)==。那是因为你正打算在你的软件中处理两个不同的领域(domains)。程序中的对象其实相当于你所塑造的世界中的某些事物，例如人、汽车、一张张视频画面等等。这样的对象属于应用域(applicalion domain)部分。其他对象则纯粹是实现细节上的人工制品,像是缓冲区(bufers)、互斥器(mutexes)、查找树(searchtrees)等等。这些对象相当于你的软件的实现域(implementation domain)。当复合发生于应用域内的对象之间，表现出has-a的关系:当它发生于实现域内则是表现is-implemented-in-terms-of 的关系。
:::

::: tip
- 复合(composition)的意义和public 继承完全不同在应用域(application domain)，复合意味has-a(有一个)。
- 在实现域(implementation domain)，复合意味is-implemented-in-terms-of(根据某物实现出)。
:::

### 条款39：明智而审慎地使用 private 继承

::: note 够了，现在让我们开始讨论其意义。==Private 继承意味implemented-in-terms-of(根据某物实现出)==。如果你让classD以private形式继承 class B，你的用意是为了采用 classB内已经备妥的某些特性,不是因为B对象和D对象存在有任何观念上的关系。private 继承纯粹只是一种实现技术(这就是为什么继承自一个private baseclass的每样东西在你的class内都是 private:因为它们都只是实现枝节而已)。借用条款 34 提出的术语，private 继承意味只有实现部分被继承，接口部分应略去。==如果 D以 private 形式继承 B，意思是D对象根据B对象实现而得==，再没有其他意涵了。Private 继承在软件“设计”层面上没有意义，其意义只及于软件实现层面。
:::

::: note Private 继承意味 is-implemented-in-terms-of(根据某物实现出)，这个事实有点令人不安，因为条款38才刚指出复合(composition)的意义也是这样。你如何在两者之间取舍?答案很简单：==尽可能使用复合，必要时才使用private 继承==。何时才是必要?主要是当 protected 成员和/或 virtual 函数牵扯进来的时候。其实还有一种激进情况，那是当空间方面的利害关系足以踢翻 private 继承的支柱时。稍后我们再来操这个心，毕竟它只是一种激进情况。
:::

::: note

以 private 形式继承 Timer:
```C++
class widget: private Timer {
private:
  virtual void onTick() const; //查看 widget 的数据...等等
};
```

以复合形式继承 Timer:
```C++
class widget {
private:
  class WidgetTimer: public Timer {
  public:
    virtual void onTick() const;
  };
  WidgetTimer timer;
};
```

首先，你或许会想设计 widget 使它得以拥有 derived classes，但同时你可能会想阻止 derived classes 重新定义 onTick。如果 Widget继承自 Timer，上面的想法就不可能实现,即使是 private 继承也不可能。(还记得吗,条款 35 曾说 derived classes可以重新定义 virtual 函数,即使它们不得调用它。)但如果 widgetrimer是 widget 内部的一个private成员并继承Timer，widget的derived classes 将无法取用widgetTimer，因此无法继承它或重新定义它的 virtual 函数。如果你曾经以 Java 或C# 编程并怀念“阻止 derived classes重新定义 virtual函数”的能力(也就是 Java的 final和 C#的sealed)，现在你知道怎么在 C++ 中模拟它了。

第二，你或许会想要将widget的编译依存性降至最低。如果widget继承Timer，当 widget 被编译时 Timer的定义必须可见，所以定义 widget 的那个文件恐怕必须#include rimer.h,但如果 widgetrimer 移出 widget 之外而 widget 内含指针指向一个 widgetTimer，widget 可以只带着一个简单的 widgetTimer 声明式,不再需要#include任何与Timer有关的东西。对大型系统而言，如此的解耦(decouplings)可能是重要的措施。关于编译依存性的最小化，详见条款31。
:::

::: note
有一种激进情况涉及空间最优化，可能会促使你选择“private 继承”而不是“继承加复合”。空类的复合会产生额外内存，而private继承一个空类不会增加额外空间。
:::

::: tip Private 继承意味is-implemented-in-termsof(根据某物实现出)。它通常比复合(composition)的级别低。但是当derived class需要访问 protected base class 的成员，或需要重新定义继承而来的 virtual函数时，这么设计是合理的。和复合(composition)不同，private继承可以造成emptybase最优化。这对致力于“对象尺寸最小化”的程序库开发者而言，可能很重要。
:::

### 条款40：明智而审慎地使用多重继承

::: note 注意此例之中对 checkOut 的调用是歧义(模棱两可)的，即使两个函数之中只有一个可取用(BorrowableItem内的checkOut是public，ElectronicGadget内的却是 private)。这与C++用来解析(resolving)重载函数调用的规则相符:在看到是否有个函数可取用之前，C++首先确认这个函数对此调用之言是最佳匹配。找出最佳匹配函数后才检验其可取用性。本例的两个checkouts有相同的匹配程度(译注:因此才造成歧义),没有所谓最佳匹配。因此ElectronicGadget::checkOut的可取用性也就从未被编译器审查。
:::

::: tip
多重继承比单一继承复杂。它可能导致新的歧义性，以及对virtual 继承的需要virtual 继承会增加大小、速度、初始化(及赋值)复杂度等等成本。如果 virtualbase classes不带任何数据，将是最具实用价值的情况。多重继承的确有正当用途。其中一个情节涉及“public继承某个Interface class和“private 继承某个协助实现的 class”的两相组合。
:::

## 7 模板与泛型编程

### 条款41：了解隐式接口和编译期多态

::: note 注意此例之中对 checkOut 的调用是歧义(模棱两可)的，即使两个函数之中只有一个可取用(BorrowableItem内的checkOut是public，ElectronicGadget内的却是 private)。这与C++用来解析(resolving)重载函数调用的规则相符:在看到是否有个函数可取用之前，C++首先确认这个函数对此调用之言是最佳匹配。找出最佳匹配函数后才检验其可取用性。本例的两个checkouts有相同的匹配程度(译注:因此才造成歧义),没有所谓最佳匹配。因此ElectronicGadget::checkOut的可取用性也就从未被编译器审查。
:::

::: tip
- classes和templates都支持接口(interfaces)和多态(polymorphism)。
- 对 classes 而言接口是显式的(explicit),以函数签名为中心。多态则是通过 virtual函数发生于运行期。
- 对 template 参数而言，接口是隐式的(implicit)，奠基于有效表达式。多态则是通过 template 具现化和函数重载解析(function overloadingresolution)发生于编译期。
:::

### 条款42：了解 typename 的双重意义

::: note 一般性规则很简单:任何时候当你想要在template中指涉一个嵌套从属类型名称，就必须在紧临它的前一个位置放上关键字typename。(再提醒一次，很快我会谈到一个例外。)
:::

::: note typename 必须作为嵌套从属类型名称的前缀词”这一规则的例外是，typename 不可以出现在base classes list 内的嵌套从属类型名称之前，也不可在member initialization list(成员初值列)中作为 base class 修饰符。
:::

::: tip
- 声明 template 参数时，前缀关键字 class和 typename 可互换。
- 请使用关键字 typename标识嵌套从属类型名称;但不得在 base class lists(基类列)或 member initialization list(成员初值列)内以它作为 base class 修饰符。
:::

### 条款43：学习处理模板化基类内的名称

::: note 注意 class 定义式最前头的"template<>'语法象征这既不是 template 也不是标准 class，而是个特化版的 MsgSender template，在 template 实参是 Companyz 时被使用。这是所谓的模板全特化(total template specialization):template MsgSender针对类型Companyz特化了，而且其特化是全面性的，也就是说一旦类型参数被定义为 Company2，再没有其他 template 参数可供变化。
:::

::: tip
可在 derived class templates 内通过"this->" 指涉 base class templates 内的成员名称，或藉由一个明白写出的“base class 资格修饰符”完成。
:::

### 条款44：将与参数无关的代码抽离 templates

::: tip
- Templates生成多个 classes 和多个函数,所以任何 template 代码都不该与某个造成膨胀的 template 参数产生相依关系。
- 因非类型模板参数(non-type templateparameters)而造成的代码膨胀，往往可消除，做法是以函数参数或class成员变量替换template 参数。
- 因类型参数(typeparameters)而造成的代码膨胀，往往可降低，做法是让带有完全相同二进制表述(binary representations)的具现类型(instantiation types)共享实现码。
:::

### 条款45：运用成员函数模板接受所有兼容类型

::: tip
- 请使用 member function templates(成员函数模板)生成“可接受所有兼容类型的函数。
- 如果你声明 member templates 用于“泛化 copy构造”或“泛化 assignment操作”你还是需要声明正常的copy构造函数和copyassignment操作符。
:::

### 条款46：需要类型转换时请为模板定义非成员函数

::: note 这项技术的一个趣味点是，我们虽然使用fiend，却与fiend的传统用途“访问 class 的 non-public 成分”毫不相干。为了让类型转换可能发生于所有实参身上我们需要一个 non-member函数(条款24);为了令这个函数被自动具现化，我们需要将它声明在 class 内部;而在class 内部声明non-member 函数的唯一办法就是令它成为一个 fiend。因此我们就这样做了。不习惯?是的。有效吗?不必怀疑。
:::

::: tip
当我们编写一个 class template，而它所提供之“与此 template 相关的”函数支持“所有参数之隐式类型转换”时，请将那些函数定义为“classtemplate 内部的 friend 函数”
:::

### 条款47：请使用 traits classes 表现类型信息

::: tip
Traits classes 使得“类型相关信息”在编译期可用。它们以templates 和“templates特化”完成实现。
整合重载技术(overloading)后，traitsclasses有可能在编译期对类型执行if...else 测试。
:::

### 条款48：认识 template 元编程

::: tip
- Template metaprogramming(TMP,模板元编程)可将工作由运行期移往编译期，因而得以实现早期错误侦测和更高的执行效率。
- TMP 可被用来生成“基于政策选择组合”(basedoncombinations ofpolicychoices)的客户定制代码，也可用来避免生成对某些特殊类型并不适合的代码。
:::

## 8 定制 new 和 delete

::: note 另外要记住的是，operatornew和operator delete只适合用来分配单一对象。Arrays 所用的内存由 operator new[]分配出来，并由operator delete[]归还(注意两个函数名称中的11)。除非特别表示，我所写的每一件关于operatornew和 operator delete的事也都适用于operator new[]和 operator delete[]。
:::

::: note 最后请注意，STL容器所使用的heap内存是由容器所拥有的分配器对象(allocator objects)管理，不是被 new和 delete直接管理。本章并不讨论 STL 分配器。
:::

### 条款49：了解 new-handler 的行为

::: note
```C++
int main() {
  std::set_new_handler(outOfMem);
  int* pBigDataArray = new int[100000000L];
}
```
就本例而言，如果 operator new无法为 100,000,000个整数分配足够空间，outofMem 会被调用，于是程序在发出一个信息之后天折(abort)。（顺带一提如果在写出错误信息至cerr过程期间必须动态分配内存，考虑会发生什么事…）

当 operator new无法满足内存申请时，它会不断调用 new-handler 函数，直到找到足够内存。引起反复调用的代码显示于条款51，这里的高级描述已足够获得一个结论，那就是一个设计良好的new-handler函数必须做以下事情:

- 让更多内存可被使用。这便造成 operatornew内的下一次内存分配动作可能成功。实现此策略的一个做法是，程序一开始执行就分配一大块内存，而后当new-handler 第一次被调用，将它们释还给程序使用。
- 安装另一个 new-handler。如果目前这个 new-handler 无法取得更多可用内存,或许它知道另外哪个 new-handler有此能力。果真如此，目前这个new-handler就可以安装另外那个 new-handler 以替换自己(只要调用set new handler)下次当 operator new调用 new-handler，'调用的将是最新安装的那个。(这个旋律的变奏之一是让 new-handler 修改自己的行为，于是当它下次被调用，就会做某些不同的事。为达此目的，做法之一是令new-handler 修改“会影响new-handler 行为”的 static 数据、namespace 数据或 global 数据。)
- 卸除new-handler，也就是将null指针传给set new handler。一旦没有安装任何 new-handler，operator new会在内存分配不成功时抛出异常，
- 抛出 bad alioc(或派生自 bad alloc)的异常。这样的异常不会被 operatornew捕捉，因此会被传播到内存索求处。
- 不返回，通常调用 abort或exit。

:::

::: note 需要结论吗?结论就是:使用nothrow new只能保证operator new不抛掷异常，不保证像"new(std::nothrow)widget"这样的表达式绝不导致异常。因此你其实没有运用 nothrow new的需要。
:::

::: tip
- set_new_handler允许客户指定一个函数，在内存分配无法获得满足时被调用。
- Nothrow new是一个颇为局限的工具，因为它只适用于内存分配;后继的构造函数调用还是可能抛出异常。
:::

