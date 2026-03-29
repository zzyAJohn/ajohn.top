---
title: 设计模式笔记
createTime: 2026/02/03 17:36:08
permalink: /design_pattern/
---

>设计模式（Design Patterns）并不是某种固定的代码模板，也不是必须遵守的“标准答案”。它更像是软件工程中反复被验证过的经验总结，用来描述在特定场景下，如何组织代码结构，使系统更加 可维护、可扩展、可复用。


## 设计模式类别

### 1. 创建型设计模式
创建型设计模式专注于处理对象创建机制，以适合给定情况的方式来创建对象。

创建对象的基本方法可能导致项目复杂性增加，而这些模式旨在通过控制创建过程来解决这种问题。

创建型设计模式包括：

- [Factory - 工厂](./1.Factory.md)
- [Prototype - 原型](./9.Prototype.md)
- [Builder - 建造者](./13.Bulider.md)
- [Abstract Factory - 抽象工厂](./15.Abstract%20Factory.md)
- [Singleton - 单例](./21.Singleton.md)


### 2. 结构型设计模式

结构型模式与对象组合有关，通常可以用于找出在不同对象之间建立关系的简单方法。

这种模式有助于确保在系统某一部分发生变化时，系统的整个结构不需要同时改变。 同时对于不适合因某个特定目的而改变的系统部分，这种模式也能够帮助它们完成重组。

结构型设计模式包括：

- [Decorator - 装饰](./6.Decorator.md)
- [Proxy - 代理](./7.Proxy.md)
- [Facade - 外观](./12.Facade.md)
- [Adapter - 适配器](./17.Adapter.md)
- [Bridge - 桥接](./22.Bridge.md)
- [Composite - 组合](./19.Composite.md)
- [Flyweight - 享元](./26.Flyweight.md)

### 3. 行为型设计模式

行为模式专注于改善或简化系统中不同对象之间的通信。

行为模式包括：

- [Template Method - 模板方法](./10.Template%20Method.md)
- [Observer - 观察者](./14.Observer.md)
- [State - 状态](./16.State.md)
- [Command - 命令](./23.Command.md)
- [Chain of Responsibility - 职责链](./24.Chain%20of%20Responsibility.md)
- [Strategy - 策略](./2.Strategy.md)
- [Memento - 备忘录](./18.Memento.md)
- [Iterator - 迭代器](./20.Iterator.md)
- [Mediator - 中介者](./25.Mediator.md)
- [Interpreter - 解释器](./27.Interpreter.md)
- [Visitor - 访问者](./28.Visitor.md)


## 参考资料

- 大话设计模式（最后一章模式大赛写的很有意思，强推！）