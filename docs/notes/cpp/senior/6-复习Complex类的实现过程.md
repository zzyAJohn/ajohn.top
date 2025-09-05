---
title: '6. 复习Complex类的实现过程'
createTime: 2025/09/05 17:44:12
permalink: /cpp/0zenpx4n/
---

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
