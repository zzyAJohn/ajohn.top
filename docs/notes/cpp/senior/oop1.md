---
title: 'C++面向对象高级开发（上）'
createTime: 2025/09/04 17:43:17
permalink: /cpp/k43y0tzt/
---


## 1. C++编程简介

@[pdf](https://oss.ajohn.top/blog/pdf/oop1.pdf)


略

## 2. 头文件与类的声明

### 2.1 Header (头文件) 中的防御式声明

@[pdf 18](https://oss.ajohn.top/blog/pdf/oop1.pdf)

### 2.2 inline  (内联) 函數

@[pdf 22](https://oss.ajohn.top/blog/pdf/oop1.pdf)

>参考《Effective C++》条款30：透彻了解 inlining 的里里外外

## 3. 构造函数

### 3.1 constructor (ctor, 构造函数)

构造函数最好使用成员初值列(member initialization list)，而不要在构造函数本体内使用赋值操作(assignment)。初值列列出的成员变量，其排列次序应该和它们在 class 中的声明次序相同。

>参考《Effective C++》条款04：确定对象被使用前已先被初始化

### 3.2 ctors放在private 区

构造函数绝大多数都是 public 的，除非只想使用一个对象，也就是设计模式中的单例模式(Singleton)。

### 3.3 constmember functions (常量成员函数)

将某些东西声明为const可帮助编译器侦测出错误用法。const可被施加于任何作用域内的对象、函数参数、函数返回类型、成员函数本体。

>参考《Effective C++》条款03：尽可能使用 const

## 4. 参数传递与返回值

### 4.1 参数传递：pass by value vs. pass by reference (to const)

尽量以 pass-by-reference-to-const 替换 pass-by-value。前者通常比较高效，并可避免切割问题(slicing problem)。当然，以上规则并不适用于内置类型，以及STL的迭代器和函数对象。对它们而言 pass-by-value 往往比较适当。

>参考《Effective C++》条款20：宁以 pass-by-reference-to-const 替换 pass-by-value

### 4.2 返回值传递：return by value vs. return by reference (to const)

和上小节一样，通常也建议返回reference，除非是需要返回一个local object，在经过作用域后局部对象的生命已经结束了，此时返回指向它的指针没有意义。因此绝不要返回 pointer 或 reference 指向一个 local stack 对象，或返回 reference 指向一个 heap-allocated 对象，或返回 pointer 或 reference 指向一个 local static 对象而有可能同时需要多个这样的对象。

>参考《Effective C++》条款21：必须返回对象时，别妄想返回其 reference

### 4.3 相同 class 的各个 objects 互为 friends (友元)

很怪，object c1可以调用object c2的成员函数，而不涉及到c2的计算，但也被允许。

## 5. 操作符重载与临时对象

### 5.1 operator overloading (操作符重载-1, 成员函数)   this

对于成员函数，都有一个隐藏的参数this，谁调用，this就指向谁。

### 5.2 return by reference 语法分析

传输者无需知到接受者是以reference形式接受。

为了能够保持C语言风格的连续赋值，需要把 += << == 这类操作符重载的返回类型设置为对应类型的 `complex&` `ostream&` 。

### 5.3 operator overloading (操作符重载-2, 非成员函数) (无this)

非成员函数主要是操作传进来的参数，注意返回时很可能是新创建一个local objec，因此要以value形式返回。

## 6. 复习Complex类的实现过程


### 6.1 complex 编程示例：

这是一个有关 Class without pointer member(s) 的例子：

- 定义复数（complex）class
- 要求有实部和虚部，获取实部和虚部，
- 成员重载+=运算符，非成员重载三种+，重载cout

```C++
// 测试用例
int main() {
	cout << "hello" << endl;
	complex c1(9,8);
	complex c2(5,4);
	c1 += c2;
	c1 + c2;
	5 + c2;
	c1 + 10;
	cout << c1 << c2 << endl;
	cout << c1 + c2 << endl;
}
```

::: details 参考答案
```C++
#include <iostream>
using namespace std;

class complex {
public:
	complex(double r, double i): real(r), imag(i) {}
	double getReal() const {
		return real;
	}
	double getImag() const {
		return imag;
	}
	complex& operator+= (const complex&);

private:
	double real;
	double imag;

};

complex& complex::operator+= (const complex &c) {
	this->real += c.getReal();
	this->imag += c.getImag();
	return *this;
}

complex operator+ (const complex &c1, const complex &c2) {
	return complex(c1.getReal() + c2.getReal(), c1.getImag() + c2.getImag());
}

complex operator+ (const complex &c1, double d) {
	return complex(c1.getReal() + d, c1.getImag());
}

complex operator+ (double d, const complex &c2) {
	return complex(c2.getReal() + d, c2.getImag());
}

ostream& operator<< (ostream& os, const complex &c) {
	return os << "(" << c.getReal() << "," << c.getImag() << ")";
}

int main() {
	cout << "hello" << endl;
	complex c1(9,8);
	complex c2(5,4);
	c1 += c2;
	c1 + c2;
	5 + c2;
	c1 + 10;
	cout << c1 << c2 << endl;
	cout << c1 + c2 << endl;
}
```
:::

## 7. 三大函数：拷贝构造，拷贝赋值，析构


接下来是一个有关 Class with pointer member(s) 的例子：

@[pdf 50](https://oss.ajohn.top/blog/pdf/oop1.pdf)

### 7.1 Big Three, 三個特殊函數

这里介绍了构造函数、拷贝构造、拷贝赋值构造(copy assignment)

### 7.2 ctor和dtor(构造函數和析构函數)

在构造函数内申请开辟内存后要在析构函数手动释放内存。

### 7.3 class with pointer members 必须有 copy ctor 和 copy op=

编译器可以暗自为 class 创建 default构造函数、copy构造函数、copy assignment 操作符，以及析构函数，而类带指针需要自己设计拷贝构造和拷贝赋值，不能使用默认提供的copy构造函数、和copy assignment 操作符，避免浅拷贝

>详情见《Effective C++》条款05：了解C++默默编写并调用哪些函数

### 7.4 copy ctor (拷贝构造函數)

设计拷贝构造的时候，可以直接取另一个传进来 object 的 private data，因为兄弟之间互为 friend

### 7.5 copy assignment operator (拷贝赋值函数)

```C++
inline
String& String::operator=(const String& str)
{
    if (this == &str)
        return *this;

    delete[] m_data;
    m_data = new char[ strlen(str.m_data) + 1 ];
    strcpy(m_data, str.m_data);
    return *this;
}
```

拷贝赋值操作顺序：
1. 删除原有数据
2. 新开辟一段拷贝内容大小的空间
3. 将拷贝内容复制到开辟的空间

### 7.6 一定要在operator= 中檢查是否self assignment

拷贝赋值中注意需要检测自我赋值，直接返回即可，确保效率和正确性

>详情见《Effective C++》条款 11：在operator= 中处理“自我赋值”


## 8. 堆，栈与内存管理


### 8.1 所谓stack (栈), 所谓 heap (堆)

普通变量存放于栈区，关键字 new 开辟出的变量存放于堆区。

### 8.2 stack objects 的生命期
所谓stack object，其生命在作用域(scope) 结束之际结束。又称为auto object，因为它会被「自动」清理。

### 8.3 static local objects 的生命周期

static object，其生命在作用域(scope) 结束之后仍然存在，直到整个程序结束。

### 8.4 global objects 的生命周期

global object，其生命在整个程序结束之后
才结束。你也可以把它视为一种static object，其作用域
是「整个程序」。

### 8.5 heap objects 的生命周期

指针P 指向一个new创建的对象便是heap object，其生命在它被deleted之际结束。

如果当作用域结束，p所指的heap object 仍然存在，但指针p的生命却结束了，作用域之外再也看不到p (也就没机会delete p）

### 8.6 new：先分配memory, 再调用ctor

@[pdf 66](https://oss.ajohn.top/blog/pdf/oop1.pdf)

这一行代码可以分解成三个步骤：
1. 分配内存，底层使用C语言的 malloc 函数实现
2. 转型，void* 转成 Complex*
3. 构造函数

### 8.7 delete：先调用dtor, 再释放memory

@[pdf 67](https://oss.ajohn.top/blog/pdf/oop1.pdf)

这一行代码可以分解成三个步骤：
1. 调用析构函数
2. 操作符delete释放内存，底层使用C语言的 free 函数实现


### 8.8 array new 一定要搭配array delete

delete [] 泄露的不是整块内存空间，而是array内部元素的析构函数只会被调用一次

>详情见《Effective C++》条款16：成对使用 new 和 delete 时要采取相同形式

## 9. 复习String类的实现过程


### 9.1 String编程示例


这是一个有关 Class with pointer member(s) 的例子，要求：

- 定义String class，声明默认构造、拷贝构造、拷贝赋值、析构函数、获取字符串函数，字符指针m_data。
- 实现默认构造：如果传进来的有初值，创建字符串大小+1的空间，再把字符串拷贝到开辟的空间；如果无初值，则开辟一个大小存放"\0"。
- 拷贝构造：类似默认构造，把str的数据复制到m_data。
- 拷贝赋值：先自检，通过自检删除自己的数据，然后类似拷贝构造。
- 析构函数：直接删除数据。

测试用例：

```C++
int main() {
    cout << "hello" <<endl;
    String str1("str1");
    String str2(str1);
    String str3 = str2;
    cout << str1 << str2 << str3 << endl;
}
```

::: details 参考答案
```C++
#include <iostream>
#include <cstring>
using namespace std;

class String {
public:
    String(const char* str = 0);
    String(const String &cstr);
    String& operator=(const String& cstr);
    ~String();
    char* get_str() const {return m_data;}
    
private:
    char* m_data;
};

ostream& operator<<(ostream& os, const String &cstr) {
        return os << cstr.get_str();
    }

inline String::String(const char* str) {
    if (str) {
        m_data = new char[strlen(str) + 1];
        strcpy(m_data, str);
    }
    else {
        m_data = new char[1];
        strcpy(m_data, "\0");
    }
}

inline String::String(const String &cstr) {
    m_data = new char[strlen(cstr.m_data) + 1];
    strcpy(m_data, cstr.m_data);
}

inline String& String::operator=(const String &cstr) {
    if (&cstr == this) {
        return *this;
    }
    else {
        delete[] m_data;
        m_data = new char[strlen(cstr.m_data) + 1];
        strcpy(m_data, cstr.m_data);
    }
}

String::~String() {
    delete[] m_data;
}

int main() {
    cout << "hello" <<endl;
    String str1("str1");
    String str2(str1);
    String str3 = str2;
    cout << str1 << str2 << str3 << endl;
}
```
:::



### 9.2 copy assignment operator (拷贝赋值函數)

拷贝赋值与拷贝构造的不同：
1. 拷贝赋值需要先删除本身的东西，拷贝构造是未初始状态无需删除
2. 拷贝赋值需要return *this，便于连续赋值
3. 拷贝赋值需要自我检测

>详情见《Effective C++》条款 10：令operator= 返回一个 reference to *this


小细节：&靠近typename的`String& str`表示引用，&靠近变量的`&str`表示取地址。

## 10. 扩展补充：类模板，函数模板，及其他


@[pdf 79](https://oss.ajohn.top/blog/pdf/oop1.pdf)

### 10.1 进一步补充：static

静态的数据和函数都只有一份，比如银行的利率，此外，静态成员函数没有this指针，只能处理静态数据。

调用static函数的方式：
1. object调用  `a.set_rate(7.0);`
2. class name调用  `Account::set_rate(5.0);`

### 10.2 进一步补充：cout

cout是一种输出流(ostream)对象，有巨多重载，因此可以打印诸如字符串、整型、无符号数各种各类的数据。

### 10.3 进一步补充：class template, 类模板

这里只做了简单介绍，用真实数据类型去替换T，比如类内的属性类型、成员函数返回类型、成员函数参数

### 10.4 进一步补充：function template, 函数模板

函数的返回类型和参数也可以模板化，比如比大小

### 10.5 进一步补充：namespace

使用关键字 `using` 来使用命名空间

## 11. 组合与继承


@[pdf 89](https://oss.ajohn.top/blog/pdf/oop1.pdf)

### 11.1 Composition (复合), 表示has-a

这里用queue（队列）和deque（双端队列）来举例子，class queue内声明了一个class deque，这是一种复合关系，用一个黑色实心菱形来表示。

@startuml
skinparam rectangle {
  roundCorner 25
}

rectangle "Queue" as queue
rectangle "Deque" as deque

queue *--> deque
@enduml



deque有很多功能，而queue只想取用一部分功能，而隐藏不需要的功能，这可以通过Adapter来实现。

复合(composition)的意义和public 继承完全不同在应用域(application domain)，复合意味has-a(有一个)。在实现域(implementation domain)，复合意味is-implemented-in-terms-of(根据某物实现出)。

>详情见《Effective C++》条款38：通过复合塑模出 has-a或"根据某物实现出"

### 11.2 Composition (复合) 关系下的构造和析构

class Container 复合 class Component，那么构造由内而外，即先构造Component才能构造Container，析构由外而内，即先析构Container才能析构Component。

@startuml
skinparam rectangle {
  roundCorner 25
}

rectangle "Container" as Container
rectangle "Component" as Component

Container *--> Component
@enduml

::: card title="Container"

::: card title="Component"
:::


### 11.3 Delegation (委托). Composition by reference

class String内有一个指针指向class StringRep，但是什么时候拥有这个class StringRep，还不知道，但我可以在任何我想要使用的时候，把任务委托给class StringRep，这就叫Delegation，也可以叫Composition by reference（术语通常把指针也叫reference）。

这种写法也叫编译防火墙，在客户端看来String没有变动，我们只需要修改StringRep，编译StringRep。

@startuml
skinparam rectangle {
  roundCorner 25
}

rectangle "String" as String
rectangle "StringRep" as StringRep

String o--> StringRep
@enduml

### 11.4 Inheritance (继承), 表示is-a

public 继承意味is-a。适用于base classes身上的每一件事情一定也适用于derived classes身上，因为每一个 derived class 对象也都是一个 base class 对象。

::: tip
尽可能使用复合，必要时才使用private 继承。
:::

>详情见《Effective C++》条款32：确定你的 public 继承塑模出 is-a 关系  
>详情见《Effective C++》条款39：明智而审慎地使用 private 继承


## 12. 虚函数与多态


@[pdf 96](https://oss.ajohn.top/blog/pdf/oop1.pdf)

### 12.1 Inheritance (继承) with virtual functions (虛函数)

- non-virtual 函数：你不希望derived class 重新定义 (override, 覆写) 它.

- virtual 函数：你==希望==derived class 重新定义 (override, 覆写) 它，且你对它已有默认定义。

- pure virtual 函数：你希望 derived class ==一定==要重新定义 (override, 覆写) 它，你对它没有默认定义

>详情见《Effective C++》条款34：区分接口继承和实现继承

### 12.2 Inheritance (继承) with virtual

前人实现了一个 CDocument ，把固定可以写的先写好，特殊化的操作留到 Serialize ，留给子类自己实现

CMyDoc 继承 CDocument ，仅需要根据自己的需求实现 Serialize 即可，这种写法是设计模式的Template Method。

@startuml
abstract class CDocument {
  +OnFileOpen()
  {abstract}+Serialize()
}

class CMyDoc {
  +Serialize()
}

CDocument <|-- CMyDoc
@enduml

### 12.3 Inheritance + Composition 关系下的构造和析构

1. 派生类内部有复合

:::: card-grid

@startuml
skinparam rectangle {
  roundCorner 25
}

rectangle "Base"
rectangle "Derived"
rectangle "Component"

Base <|-- Derived
Derived *--> Component
@enduml



::: card title="Derived"
::: card title="Base & Component"
:::

::::

构造由内而外，Derived 的构造函数首先调用 Base 的 default 构造函数，然后调用 Component 的 default 构造函数，最后才执行自己。

析构由外而内，Derived 的析构函数首先执行自己，然后调用 Component 的析构函数，最后调用 Base 的析构函数。

2. 基类内部有复合

:::: card-grid

@startuml
skinparam rectangle {
  roundCorner 25
}

rectangle "Base"
rectangle "Derived"
rectangle "Component"

Base <|-- Derived
Base *--> Component
@enduml

::: card title="Derived"
::: card title="Base"
::: card title="Component"
:::

::::

这种就比较直观，构造由内而外，析构由外而内


## 13. Delegation (委托) + Inheritance (继承)

委托相关设计

### 13.1.1 Observer

@[pdf 102](https://oss.ajohn.top/blog/pdf/oop1.pdf)

在 观察者模式 中，一个对象被称为 被观察者（Subject） ，它维持着一系列的依赖于它（观察者）的对象， 将有关状态的任何变更自动通知给他们（观察者）。

当一个目标需要告诉观察者发生了什么事情，它会向观察者广播一个通知（可以包括与通知主题相关的特定数据）。

当我们不在希望某个特定的观察者获得其注册目标发出的改变通知时，该目标可以将它从观察者列表中删除。

### 13.1.2 Composite

@[pdf 105](https://oss.ajohn.top/blog/pdf/oop1.pdf)

Composite（组合）模式 是一种结构型设计模式。

它用于将对象组织成树形结构，以表示 “部分-整体” 的层次关系。 它允许客户端以统一的方式处理单个对象和组合对象，忽略对象层次结构的差异。

### 13.1.3 Prototype

@[pdf 106](https://oss.ajohn.top/blog/pdf/oop1.pdf)

Prototype(原型)模式 是一种 创建型设计模式。

其核心思想是通过 复制现有对象（原型对象）来创建新对象，而不是通过类实例化。