---
title: '开始'
createTime: 2026/03/07 18:52:20
permalink: /projects/6nm8fbqq/
---

muduo由陈硕大佬开发，是一个基于==非阻塞IO==和==事件驱动==的==C++高并发TCP网络库==，使用的线程模型是 **one loop per thread**，所谓 **one loop per thread** 指的是：

- 一个线程只能有一个事件循环（EventLoop）
- 一个文件描述符（file descriptor，通常简称fd）只能由一个线程进行读写，换句话说就是一个TCP连接必须归属于某个EventLoop管理。但返过来不一样，一个线程却可以管理多个fd。

为什么要选one loop per thread模型：

如果一个TCP连接在多个线程中处理，会出现如下情况：

- socket被意外关闭。A线程要从socket中读/写消息，但是该socket被B线程给close了，更糟的情况是，B close后，新的连接的socket刚好使用的是B关闭的socket，那A线程再次进行读/写早已经不是原来的那个连接了（这种现象叫串话）
- 不考虑关闭，只考虑读写也有问题。比如A、B线程同时对一个TCP连接进行读操作，如果两个线程几乎同时各自收到一部分消息，那如何把数据拼接成完整的消息，如何知道哪部分数据先到达。如果同时写一个socket，每个线程只发送半条消息，接收方又该怎么处理，如果加锁，那还不如直接就让一个线程处理算了


one loop per thread优点：


- 线程数目基本固定，不用频繁创建或者销毁线程
- 可以很方便的在各个线程之间进行负载调配
- IO事件发生的线程基本是固定不变的，不必考虑TCP连接事件的并发（即fd读写都是在同一个线程进行的，不是A线程处理写事件B线程处理读事件）
- muduo采用的多Reactor结构。在muduo中，每一个线程都可以看作是一个Reactor，主线程（主Reactor）只负责监听接收新连接，并将接收的连接对应的fd分发到子Reactor中，子线程（子Reactor）就负责处理主线程分发给自己的fd上的事件，比如fd上发生的可读、可写、错误等事件，另外从fd上读取数据后，要进行的业务逻辑也是由子线程负责的。


项目采用主从多Reactor多线程模型，MainReactor 只负责监听派发新连接，在MainReactor 中通过Acceptor 接收新连接并通过设计好的轮询算法派发给 SubReactor，SubReactor 负责此连接的读写事件。

调用TcpServer的start函数后，会内部创建线程池。每个线程独立的运行一个事件循环，即SubReactor。MainReactor 从线程池中轮询获取SubReactor 并派发给它新连接，处理读写事件的SubReactor个数一般和CPU核心数相等。

使用主从Reactor 模型有诸多优点:
1. 响应快，不必为单个同步事件所阻塞，虽然Reactor本身依然是同步的;
2. 可以最大程度避免复杂的多线程及同步问题，并且避免多线程/进程的切换;
3. 扩展性好，可以方便通过增加Reactor实例个数充分利用CPU资源;
4. 复用性好，Reactor模型本身与具体事件处理逻辑无关，具有很高的复用性;

::: center
@startuml

participant Event
participant Reactor
participant Demultiplexer
participant EventHandler

== 注册阶段 ==
Event -> Reactor: 注册 Event + Handler (Channel)
Reactor -> Demultiplexer: epoll_ctl(add/mod/del)

alt 注册成功
    Reactor -> Event: 注册成功
else 注册失败
    Reactor -> Event: 注册失败
end

== 事件循环启动 ==
Reactor -> Reactor: 启动事件循环 loop()

loop 一直循环
    Reactor -> Demultiplexer: epoll_wait()

    Demultiplexer --> Reactor: 返回活跃事件列表(activeChannels)

    loop 遍历 activeChannels
        Reactor -> EventHandler: handleEvent()
        
        alt 可读事件 (EPOLLIN)
            EventHandler -> EventHandler: handleRead()
        else 可写事件 (EPOLLOUT)
            EventHandler -> EventHandler: handleWrite()
        else 关闭事件 (EPOLLHUP)
            EventHandler -> EventHandler: handleClose()
        else 错误事件 (EPOLLERR)
            EventHandler -> EventHandler: handleError()
        end
    end
end

@enduml
**Reactor 模型的时序图（Sequence Diagram）**
:::

| 图中角色          | 代码里的类                 |
| ------------- | ---------------------- |
| Event         | Channel                |
| Reactor       | EventLoop              |
| Demultiplexer | Poller / Epoll         |
| EventHandler  | TcpConnection（实际回调执行者） |


## 资源汇总

1. 陈硕大佬的 muduo 仓库，感谢作者开源：
<RepoCard repo="chenshuo/muduo" />

2. 卡码 的 muduo 服务器仓库：
<RepoCard repo="youngyangyang04/muduo-core" />

muduo-core 仅实现了 muduo 最核心的部分，这样方便大家可以在这个最基础的版本上自己做拓展。例如去实现内存池、连接池、日志库、定时器等等。

文档：
<LinkCard title="《网络库muduo-core》" href="https://www.yuque.com/chengxuyuancarl/gixnqn?#"/>

密码：khf4

