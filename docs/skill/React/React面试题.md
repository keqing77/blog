---
id: react-interview
slug: /react-interview
title: React 面试题
date: 2022-11-29
authors: keqing
tags: [react]
keywords: [react]
sidebar_position: 4
---

:::tip 正确的学习方式比学习更重要面试题要理解背后的原理而不是光靠背 ! :::

## 什么是 React?

> React 是一个以声明式编写、通过 JSX 格式组件化方式解决视图层复用的 JavaScript 库.它的核心设计有三个特点, 分别是声明式、组件化、通用性.

- 声明式的优势在于`直观和组合`, 编写代码心智负担较低(相比命令式)
- 组件化的优势在于`视图复用`, 高内聚低耦合
- 通用性在于一次学习,随处编写.如 React Native, React-Dom

:::danger React 的缺点/劣势

- 只是库,不是框架,需要社区提供其他整合方案,也增加技术选型的困难
- React 响应式系统导致遇到性能问题时优化复杂, 也许 React.forget 能解决这个问题

:::

## React 为什么采用 JSX ?

- JSX 是一个 JavaScript 的语法拓展, 实际是通过 Babel 转译成 React.createElement 方法的一个语法糖.
- 使用 JSX 可以更直观地展示 页面结构并简化代码, 提高代码可读性,更接近传统 HTML 开发, 同时将页面分成结构、样式、逻辑三个关注点, 实现关注点分离, 提升开发体验

## Babel 插件如何实现 JSX 到 JS 的编译?

- Babel 读取代码并生成 AST(抽象语法树),根据树的结构替换 React.createElement 方法

## React 的生命周期有哪些?遇到过哪些坑?

生命周期指的是 React 类组件从挂载->更新->卸载所经过的一系列过程, 函数组件并没有这个概念, 但在 hooks 出现后, 可以通过 useEffect 模拟其中的三个生命周期

> 类组件的生命周期函数(在这个过程按特定顺序执行的函数)

- constructor
  - 是类通用的构造函数, 常用于初始化
- render
  - render 函数返回的 JSX 结构用于描述具体的渲染内容, 应该是一个纯函数
- componentDidMount
  - 主要用于组件加载完成时做某些操作
- shouldComponentUpdate
  - 浅比较仅仅比较值与引用, 并不会对 Object 中的每一项值进行比较
- ComponentDidUpdate

- componentWillUnmount
  - 主要用于执行清理工作, 要在该阶段解除事件监听/定时器以避免发生内存泄露影响性能

## React 什么情况会触发重新渲染?

- 当 state 发生变化时
- 当父级组件的 Pros 传入时(无论变没变化)

## React 类组件和函数式组件的区别?

- 用途是一样的,写法不同, 都用于展示一段 UI
- 代表两种不同设计思想与心智模型 , 类组件是 OOP ,函数式组件则是 FP
- 类组件有 this 指向问题, 业务逻辑散落在各个生命周期函数, 不易组织
- 相较类组件, 函数组件更纯粹、简单、容易测试
- 类组件可以继承, 函数组件不可以, 类组件优化依靠 shouldComponentUpdate , 函数组件依靠 React.memo
- 函数式组件成为官方主推的方案, 但也不会放弃类组件

## 如何设计 React 组件?

> 了解 React 组件设计模式

- 只做展示, 独立运行, 不额外增加功能的组件, 称为无状态组件
- 处理业务逻辑与数据状态的组件为 有状态组件
- 无状态组件的复用性更强, 有状态组件更专注于业务本身
- 不同设计模式具体使用在哪些场景, 社区推荐的方式有

## setState 是同步更新的还是异步更新的?

> setState 用于变更状态, 触发组件重新渲染, 更新视图 UI

- 通常我们认为 setState 是异步的, 但是在以下场景 case1

```js
class Test extends Component{
  state = {
    count:0
 }

componentDidMount(){
  this.setState({
      count: 1
  }, () => {
    console.log(this.state.count) //1
  })
    console.log(this.state.count) //0
}

  render(){
    ...
  }
}
```

case2

```js
class Test extends Component{
  state = {
    count:0
 }

componentDidMount(){
  thhis.setState({
  count: this.state.count + 1
  }, ()=> {
    console.log(this.state.count)
  })
  this.setState({
  count: this.state.count + 1
  }, ()=> {
    console.log(this.state.count)
  })
  render(){...}
}
```

- 是异步的, 但在某些场景下是同步的, 在最新的 XX 中,已经改为一直都是异步的, 保持内部一致性,启用并发更新
- React 的 setState 执行像是一个队列, 根据队列逐一执行, 合并 state 数据完成后执行回调, 根据结果更新虚拟 DOM 触发渲染, 批量合并处理优化渲染性能
- setState 是同步还是异步的核心关键点是: 更新队列

## React 组件如何跨层级通信

> 实则试探是否有经手大型前端项目的经验

- 父传子, 通过 props 向子组件 传递 父组件数据
- 子传父,
- 无关系, Context (i18 国际化语言包)
- 全局状态管理

## Virtual Dom 的工作原理是什么?

- Virtual Dom 是 一个 JavaScript 对象, 对 DOM 结构的一个映射组成虚拟 DOM 树,
- diff,新旧虚拟 DOM 树进行差异比较,生成的结构称为 patch...
- 根据 `diff函数` 去计算状态变更前后的虚拟 DOM 树差异, `渲染函数` 渲染整个虚拟 DOM 树或者处理差异点
- 较低的成本实现跨平台开发, 批量处理状态更新, 高性能场景难以优化

## 与其他框架相比, React 的 diff 算法有何不同?

> diff 算法
>
> ## 真实的 DOM 会映射为虚拟 DOM
>
> 2.  虚拟 DOM 变化后会根据差异计算生成 patch,patch 是结构化的数据包含增加、更新、移除等
> 3.  根据 patch 去更新真实的 DOM,反馈到界面上

- 核心点有三个: ## 更新时机 2. 遍历算法 3. 优化策略
  - 更新时机是 触发更新, 进行差异对比的时机
  - 遍历算法指 要进行比对就要遍历 DOM 树, React diff 算法采用深度优先遍历 (DFS)
  - 优化策略, DFS 默认为 o(n^3) , 采用分治优化到 O(n) , 标记 key, React.memo,
  - React Fiber , Fiber 机制下节点与树分别采用 FiberNode 和 FiberTree 进行重构 , FiberNode 采用双链表结构, 使得过程可以随时暂停恢复, 整个更新过程由 current 与 workInProgress 两株树双缓冲完成
  - Fiber Reconciler 是 React 16 及以后版本的渲染方案, 核心设计是 增量渲染, 将渲染工作分割为多区块,将其分散到多个帧中执行

## React 的渲染流程是怎样的?如何避免重复渲染?

> ## 优化实际 2. 定位方式 3. 常见的坑 4. 处理方案

- 虚拟滚动
  - react-virtualized
  - react-window

> 渲染流程

## React 会构建并维护一套内部的虚拟 DOM 树, 因操作 DOM 相对操作 JavaScript 对象更慢, 所以根据虚拟 DOM 树生成的差异更新真实 DOM

2. 每当一个组件的 props 或者 state 发生变更时, React 都会将最新返回的元素与之前渲染的元素进行对比, 来判断是否更新真实的 DOM, 不相同时, React 会更新该 DOM
3. 这个过程称为 `协调`, 如果一次性引发重新渲染层级足够多、足够深会阻塞 UI 主线程执行, 造成卡顿, 引起页面帧率下降

4. 如何分析和调优性能瓶颈

- 基准测试, 建立前端性能指标
  - 通过 `Chrome` 自带的 `Performance` 分析, 主要用于查询 JavaScript 执行栈中的耗时, 确认函数卡顿点.
  - 如果 `React Developer Tools` 中的 `Profiler` 分析组件渲染次数、开始时间及耗时, 如需查看页面上的组件是否有重新小渲染, 可在配置项里开启 `Hightlight updates when components render`
  - 通过 `LightHouse` 等工具分析

## React Hook 的使用限制有哪些?

在类组件时代, 组件复用逻辑需要 `Mixin` 或 `高阶组件` 等方案, 非常复杂. 多级组件共享状态需要 `Redux` 或 `Mobx`等, 组件的逻辑分散在各个生命周期, 导致大型复杂组件难以理解,

> 不能在 React 的循环、条件或嵌套函数中调用 hook , 只能在 React 的函数式组件中调用 hook

- 可以引入 `eslint-plugin-react-hooks` 以完成对错误 hooks 用法的自动化检查

hooks 设计是基于数组实现的, 在调用时按顺序加载到数组中,如果使用循环、条件、嵌套函数很有可能造成数组的取值错位, 但 React 源码实现采用链表 给开发者增加额外心智负担

## useEffect 和 useLayoutEffect 的区别?

> 共同点

- 使用方式
- 运用效果

两者都用于处理副作用, 这些副作用包括改变 DOM, 设置订阅, 操作定时器等大多数场景可以使用 `useEffect` , 但如果代码引起页面闪烁则使用 `useLayoutEffect` 处理, 就是有直接操作 `DOM样式` 或引起 `DOM样式` 更新的场景更推荐使用 `useLayoutEffect`

> 不同点

- 使用场景
- 独有能力
- 设计原理
- 未来趋势

`useEffect` 是异步处理副作用, `useLayoutEffect` 是同步处理副作用, 所以使用条件较为苛刻, 计算量大的时候需要考虑阻塞的情况

## React Hook 的设计模式?

由于函数组件每次渲染时都会重新执行, 所以常量应放置到函数外部去, 避免每次都重新创建, 而如果定义的常量是一个函数且需使用组件内部的变量做计算, 你那么一定要使用 `useCallback` 缓存函数

## React Router 的实现原理及工作方式分别是什么?

- `pushState` 修改当前浏览器地址栏的网址路径
- `replaceState` 替换网址路径

> history 将所有 404 请求响应到 index.html , 需要在 Nignx 或 node 层配置 historyApiFallback

## React 常用的工具库有哪些?

## 为什么 Webpack / Babel 的 Plguin 配置项是逆序的?

因为是一个栈, 先进后出

## React 采用虚拟 DOM 的原因 ?

采用虚拟 DOM(其实更应该被称为 UI Tree)可以面向其他平台, 不再局限于 web 平台, 同时提供比较流畅的开发体验和还不错的性能

# 项目开发模式

> Monorepo

> Multirepo 一个仓库对应一个工程, 子团队自行维护
