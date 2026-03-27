---
title: Channel
createTime: 2026/03/27 19:15:21
permalink: /projects/dje9jj9t/
---

Channel 是对一个文件描述符（fd）上感兴趣事件的封装：记录 想监听哪些事件（读/写/无），保存 事件发生后要调用的回调函数，并把这些变更告诉 EventLoop/Poller。当 Poller 检测到 fd 有事件时，EventLoop 会调用 Channel::handleEvent，由 Channel 去触发对应的回调。

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


