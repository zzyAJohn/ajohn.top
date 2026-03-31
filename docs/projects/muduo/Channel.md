---
title: Channel
createTime: 2026/03/27 19:15:21
permalink: /projects/dje9jj9t/
---

## Channel 简介

Channel类其实相当于一个文件描述符的保姆！

在 TCP 网络编程中，想要 IO 多路复用监听某个文件描述符，就要把这个 fd 和该 fd 感兴趣的事件通过epollctl 注册到 IO 多路复用模块（我管它叫事件监听器）上。当事件监听器监听到该 fd 发生了某个事件。事件监听器返回 [发生事件的fd集合] 以及 [每个fd都发生了什么事件]。

Channel 类则封装了一个 [fd] 和这个 [fd感兴趣事件] 以及事件监听器监听到 [该fd实际发生的事件]。同时 Channel 类还提供了设置该fd的感兴趣事件，以及将该fd及其感兴趣事件注册到事件监听器或从事件监听器上移除，以及保存了该fd的每种事件对应的处理函数。


Channel 是对一个文件描述符（fd）上感兴趣事件的封装：记录 想监听哪些事件（读/写/无），保存 事件发生后要调用的回调函数，并把这些变更告诉 EventLoop/Poller。当 Poller 检测到 fd 有事件时，EventLoop 会调用 `Channel::handleEvent`，由 Channel 去触发对应的回调。

## Channel 类重要的成员变量

### 1. 重要成员：

- `EventLoop *loop_`：指向所属的事件循环，一个 Channel 只能属于一个 EventLoop（一线程一 loop）。


- `const int fd_`：这个 Channel 对象照看的文件描述符（socket、timerfd 等）。

- `int events_`：代表 fd 感兴趣的事件类型集合，也就是当前“想要监听”的事件掩码（kReadEvent / kWriteEvent / kNoneEvent）。这是要注册到 Poller 的内容（相当于 epoll_ctl 要加的事件）。

- `int revents_`：代表事件监听器实际监听到该 fd 发生的事件类型集合，Poller 返回的“发生了哪些事件”，由 Poller 填充后，传给 handleEvent 去处理。

- `int index_`：Poller 内部的状态或索引，用于记录 Channel 在 Poller 的内部容器位置或状态。


::: code-tabs
@tab Channel.h
```C++
// 因为channel通道里可获知fd最终发生的具体的事件events，所以它负责调用具体事件的回调操作
ReadEventCallback readCallback_;
EventCallback writeCallback_;
EventCallback closeCallback_;
EventCallback errorCallback_;
```
:::

- `read_callback_`、`write_callback_`、`close_callback_`、`error_callback_` ：这些是 std:function 类型，代表着这个 Channel 为这个文件描述符保存的各事件类型发生时的处理函数。比如这个fd发生了可读事件，需要执行可读事件处理函数，这时候 Channel 类都替你保管好了这些可调用函数，要用执行的时候直接管保姆要就可以了。

  - `ReadEventCallback readCallback_`：读事件，接收 Timestamp（事件发生时间）。
  - `EventCallback writeCallback_, closeCallback_, errorCallback_`：写/关闭/错误对应回调。

### 2. 常量（对应 epoll 事件）
::: code-tabs
@tab Channel.h
```C++
static const int kNoneEvent;
static const int kReadEvent;
static const int kWriteEvent;
```

@tab Channel.cpp
```C++
const int kNoneEvent = 0;
const int kReadEvent = EPOLLIN | EPOLLPRI; // 可读、紧急数据
const int kWriteEvent = EPOLLOUT;          // 可写
```
:::

这些常量就是把 epoll 的标志封装成容易读的名字。events_ 与 revents_ 都是用这些位来表示事件集合，代码里用按位操作（|、&、~）管理它们。



## Channel 类重要的成员方法

### 1. 构造 / 析构

::: code-tabs
@tab Channel.h
```C++
Channel(EventLoop *loop, int fd);
~Channel();
```

@tab Channel.cpp
```C++
// EventLoop: ChannelList Poller
Channel::Channel(EventLoop *loop, int fd)
    : loop_(loop)
    , fd_(fd)
    , events_(0)
    , revents_(0)
    , index_(-1)
    , tied_(false)
{
}

Channel::~Channel()
{
}
```
:::

构造时把 loop、fd 记录下来，初始 `events_ = 0`（不监听任何事件），`index_ = -1`。

### 2. 回调设置（setter）

一个文件描述符会发生可读、可写、关闭、错误事件。当发生这些事件后，就需要调用相应的处理函数来处理。外部通过调用上面这四个函数可以将事件处理函数放进 Channel 类中，当需要调用的时候就可以直接拿出来调用了。用 `std::move` 把回调对象搬进来，避免不必要拷贝。使用 `std::function` 的灵活性允许绑定成员函数、lambda 等。

::: code-tabs
@tab Channel.h
```C++
// 设置回调函数对象
void setReadCallback(ReadEventCallback cb) { readCallback_ = std::move(cb); }
void setWriteCallback(EventCallback cb) { writeCallback_ = std::move(cb); }
void setCloseCallback(EventCallback cb) { closeCallback_ = std::move(cb); }
void setErrorCallback(EventCallback cb) { errorCallback_ = std::move(cb); }
```
:::

### 3. 启用/禁用事件（修改 events_）

外部通过这几个函数来告知 Channel 你所监管的文件描述符都对哪些事件类型感兴趣，并把这个文件描述符及其感兴趣事件注册到事件监听器( IO 多路复用模块)上。这些函数里面都有一个 `update()` 私有成员方法，这个 update 其实本质上就是调用了 `epoll_ctl()` 。这些方法只是修改 events_，然后调用 `update()`，把新希望监听的事件交给 EventLoop -> Poller 去执行 epoll_ctl。
::: code-tabs
@tab Channel.h
```C++
// 设置fd相应的事件状态 相当于epoll_ctl add delete
void enableReading() { events_ |= kReadEvent; update(); }
void disableReading() { events_ &= ~kReadEvent; update(); }
void enableWriting() { events_ |= kWriteEvent; update(); }
void disableWriting() { events_ &= ~kWriteEvent; update(); }
void disableAll() { events_ = kNoneEvent; update(); }
```
:::

### 4. update() / remove()
::: code-tabs
@tab Channel.h
```C++
public:
    void remove();
private:
    void update();
```

@tab Channel.cpp
```C++
//update 和remove => EpollPoller 更新channel在poller中的状态
/**
 * 当改变channel所表示的fd的events事件后，update负责再poller里面更改fd相应的事件epoll_ctl
 **/
void Channel::update()
{
    // 通过channel所属的eventloop，调用poller的相应方法，注册fd的events事件
    loop_->updateChannel(this);
}

// 在channel所属的EventLoop中把当前的channel删除掉
void Channel::remove()
{
    loop_->removeChannel(this);
}
```
:::

Channel 本身不直接和 epoll 交互，而是委托给 EventLoop（EventLoop 再调用其 Poller）。remove() 用于把这个 fd 从 Poller 中删除（比如连接关闭时）。


### 5. `tie(const shared_ptr<void>&)`

::: code-tabs
@tab Channel.h
```C++
// 防止当channel被手动remove掉 channel还在执行回调操作
void tie(const std::shared_ptr<void> &);
```
@tab Channel.cpp
```C++
// channel的tie方法什么时候调用过?  TcpConnection => channel
/**
 * TcpConnection中注册了Channel对应的回调函数，传入的回调函数均为TcpConnection
 * 对象的成员方法，因此可以说明一点就是：Channel的结束一定晚于TcpConnection对象！
 * 此处用tie去解决TcpConnection和Channel的生命周期时长问题，从而保证了Channel对象能够在
 * TcpConnection销毁前销毁。
 **/
void Channel::tie(const std::shared_ptr<void> &obj)
{
    tie_ = obj;
    tied_ = true;
}
```
:::

**核心目的：避免在回调执行过程中（或刚要执行）被拥有对象销毁导致的悬指针/Use-after-free。**

典型场景：TcpConnection 把自己的 shared_ptr 传给 Channel::tie。当 Channel 想触发回调时，会用 tie_.lock() 暂时提升为 shared_ptr（guard）。如果提升成功，说明拥有对象还活着，安全地调用回调；如果失败（shared_ptr 已销毁），就 **不执行回调**。这样避免了回调中访问已销毁对象。

### 6. handleEvent / handleEventWithGuard
::: code-tabs
@tab Channel.h
```C++
public:
    // fd得到Poller通知以后 处理事件 handleEvent在EventLoop::loop()中调用
    void handleEvent(Timestamp receiveTime);
private:
    void handleEventWithGuard(Timestamp receiveTime);
```
@tab Channel.cpp
```C++
void Channel::handleEvent(Timestamp receiveTime)
{
    if (tied_)
    {
        std::shared_ptr<void> guard = tie_.lock();
        if (guard)
        {
            handleEventWithGuard(receiveTime);
        }
        // 如果提升失败了 就不做任何处理 说明Channel的TcpConnection对象已经不存在了
    }
    else
    {
        handleEventWithGuard(receiveTime);
    }
}

void Channel::handleEventWithGuard(Timestamp receiveTime)
{
    LOG_INFO("channel handleEvent revents:%d\n", revents_);
    // 关闭
    if ((revents_ & EPOLLHUP) && !(revents_ & EPOLLIN)) // 当TcpConnection对应Channel 通过shutdown 关闭写端 epoll触发EPOLLHUP
    {
        if (closeCallback_)
        {
            closeCallback_();
        }
    }
    // 错误
    if (revents_ & EPOLLERR)
    {
        if (errorCallback_)
        {
            errorCallback_();
        }
    }
    // 读
    if (revents_ & (EPOLLIN | EPOLLPRI))
    {
        if (readCallback_)
        {
            readCallback_(receiveTime);
        }
    }
    // 写
    if (revents_ & EPOLLOUT)
    {
        if (writeCallback_)
        {
            writeCallback_();
        }
    }
}
```
:::

handleEvent 是 Poller 通知 EventLoop 后最终调用的入口。若 tied_，先 lock() 检查所有者是否还存在；若存在则进入 handleEventWithGuard。

handleEventWithGuard 的逻辑是按 revents_ 的位来依次触发对应回调：

- EPOLLHUP（挂起）且没有 EPOLLIN：调用 closeCallback_()（表明对端已经关闭写端/连接关闭）。
- EPOLLERR：调用 errorCallback_()。
- EPOLLIN | EPOLLPRI：有数据可读或紧急数据，调用 readCallback_(receiveTime)。
- EPOLLOUT：写就绪，调用 writeCallback_()。

注意：判断顺序与是否同时触发多个事件时回调的先后有关（实现上视需求可以调整）。


## Channel 源码

::: code-tabs
@tab Channel.h
```C++
#pragma once

#include <functional>
#include <memory>

#include "noncopyable.h"
#include "Timestamp.h"

class EventLoop;

/**
 * 理清楚 EventLoop、Channel、Poller之间的关系  Reactor模型上对应多路事件分发器
 * Channel理解为通道 封装了sockfd和其感兴趣的event 如EPOLLIN、EPOLLOUT事件 还绑定了poller返回的具体事件
 **/
class Channel : noncopyable
{
public:
    using EventCallback = std::function<void()>; // muduo仍使用typedef
    using ReadEventCallback = std::function<void(Timestamp)>;

    Channel(EventLoop *loop, int fd);
    ~Channel();

    // fd得到Poller通知以后 处理事件 handleEvent在EventLoop::loop()中调用
    void handleEvent(Timestamp receiveTime);

    // 设置回调函数对象
    void setReadCallback(ReadEventCallback cb) { readCallback_ = std::move(cb); }
    void setWriteCallback(EventCallback cb) { writeCallback_ = std::move(cb); }
    void setCloseCallback(EventCallback cb) { closeCallback_ = std::move(cb); }
    void setErrorCallback(EventCallback cb) { errorCallback_ = std::move(cb); }

    // 防止当channel被手动remove掉 channel还在执行回调操作
    void tie(const std::shared_ptr<void> &);

    int fd() const { return fd_; }
    int events() const { return events_; }
    void set_revents(int revt) { revents_ = revt; }

    // 设置fd相应的事件状态 相当于epoll_ctl add delete
    void enableReading() { events_ |= kReadEvent; update(); }
    void disableReading() { events_ &= ~kReadEvent; update(); }
    void enableWriting() { events_ |= kWriteEvent; update(); }
    void disableWriting() { events_ &= ~kWriteEvent; update(); }
    void disableAll() { events_ = kNoneEvent; update(); }

    // 返回fd当前的事件状态
    bool isNoneEvent() const { return events_ == kNoneEvent; }
    bool isWriting() const { return events_ & kWriteEvent; }
    bool isReading() const { return events_ & kReadEvent; }

    int index() { return index_; }
    void set_index(int idx) { index_ = idx; }

    // one loop per thread
    EventLoop *ownerLoop() { return loop_; }
    void remove();
private:

    void update();
    void handleEventWithGuard(Timestamp receiveTime);

    static const int kNoneEvent;
    static const int kReadEvent;
    static const int kWriteEvent;

    EventLoop *loop_; // 事件循环
    const int fd_;    // fd，Poller监听的对象
    int events_;      // 注册fd感兴趣的事件
    int revents_;     // Poller返回的具体发生的事件
    int index_;

    std::weak_ptr<void> tie_;
    bool tied_;

    // 因为channel通道里可获知fd最终发生的具体的事件events，所以它负责调用具体事件的回调操作
    ReadEventCallback readCallback_;
    EventCallback writeCallback_;
    EventCallback closeCallback_;
    EventCallback errorCallback_;
};
```

@tab Channel.cpp
```C++
#include <sys/epoll.h>

#include "Channel.h"
#include "EventLoop.h"
#include "Logger.h"

const int Channel::kNoneEvent = 0; //空事件
const int Channel::kReadEvent = EPOLLIN | EPOLLPRI; //读事件
const int Channel::kWriteEvent = EPOLLOUT; //写事件

// EventLoop: ChannelList Poller
Channel::Channel(EventLoop *loop, int fd)
    : loop_(loop)
    , fd_(fd)
    , events_(0)
    , revents_(0)
    , index_(-1)
    , tied_(false)
{
}

Channel::~Channel()
{
}

// channel的tie方法什么时候调用过?  TcpConnection => channel
/**
 * TcpConnection中注册了Channel对应的回调函数，传入的回调函数均为TcpConnection
 * 对象的成员方法，因此可以说明一点就是：Channel的结束一定晚于TcpConnection对象！
 * 此处用tie去解决TcpConnection和Channel的生命周期时长问题，从而保证了Channel对象能够在
 * TcpConnection销毁前销毁。
 **/
void Channel::tie(const std::shared_ptr<void> &obj)
{
    tie_ = obj;
    tied_ = true;
}
//update 和remove => EpollPoller 更新channel在poller中的状态
/**
 * 当改变channel所表示的fd的events事件后，update负责再poller里面更改fd相应的事件epoll_ctl
 **/
void Channel::update()
{
    // 通过channel所属的eventloop，调用poller的相应方法，注册fd的events事件
    loop_->updateChannel(this);
}

// 在channel所属的EventLoop中把当前的channel删除掉
void Channel::remove()
{
    loop_->removeChannel(this);
}

void Channel::handleEvent(Timestamp receiveTime)
{
    if (tied_)
    {
        std::shared_ptr<void> guard = tie_.lock();
        if (guard)
        {
            handleEventWithGuard(receiveTime);
        }
        // 如果提升失败了 就不做任何处理 说明Channel的TcpConnection对象已经不存在了
    }
    else
    {
        handleEventWithGuard(receiveTime);
    }
}

void Channel::handleEventWithGuard(Timestamp receiveTime)
{
    LOG_INFO("channel handleEvent revents:%d\n", revents_);
    // 关闭
    if ((revents_ & EPOLLHUP) && !(revents_ & EPOLLIN)) // 当TcpConnection对应Channel 通过shutdown 关闭写端 epoll触发EPOLLHUP
    {
        if (closeCallback_)
        {
            closeCallback_();
        }
    }
    // 错误
    if (revents_ & EPOLLERR)
    {
        if (errorCallback_)
        {
            errorCallback_();
        }
    }
    // 读
    if (revents_ & (EPOLLIN | EPOLLPRI))
    {
        if (readCallback_)
        {
            readCallback_(receiveTime);
        }
    }
    // 写
    if (revents_ & EPOLLOUT)
    {
        if (writeCallback_)
        {
            writeCallback_();
        }
    }
}
```
:::


