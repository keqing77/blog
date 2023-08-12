---
id: react-note
slug: /react-note
title: React 学习笔记
date: 2022-11-26
authors: keqing
tags: [react]
keywords: [react]
sidebar_position: 2
---

## 创建项目

### Vite

> `Vite` 创建 React 项目 (推荐)

```bash
pnpm create vite
# 选择 react-ts 模板
```

### CRA

> `Create React App `创建 React 项目 (不推荐)

```bash
npx create-react-app `name-of-app` --template typescript
```

### Next.js

```bash
 npx create-next-app@latest --ts
```

## 函数式编程

### immutable

:::note 不可变

在函数式编程中, 变量的值是不可变的（immutable), 如果你要修改它的值不能重写它, 而是使用修改后的值来创建一个新的对象，并把你的引用指向它

:::

> 不可变能避免许多问题

- 并发的情况下比较安全。缺点就是比较耗费内存
- 当使用纯函数的时候, 不可变数据优势明显
- 容易追踪变动, 每个数据其实相当于一张快照

> 不可变结构性能需要不断创建新的数据结构, 大部分情况下不如原始类型, 但可以通过一些优化过的数据结构和算法来"保证性能"

### 纯函数

:::tip

`纯函数`是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的`副作用`

:::

```js
const sum = (x, y) => x + y;

sum(1, 2); // 3

// sum 就是一个纯函数, 只要参数是 1 和 2, 那么返回的结果永远是 3
```

> `函数不纯` 的一个例子

```js
let number = 1;

const changeNumber = (num) => {
  return number + 1;
};

changeNumber(number);
// 函数 changeNumber 执行后 改变了外部变量 number 的值, 这就是一个非纯函数
```

:::caution 为什么要保持函数的纯的?

- 使函数更易测试,结果只依赖输入，测试时可以确保输出稳定
- 更容易维护和重构，我们可以写出质量更高的代码
- 更容易调用，我们不用担心函数会有什么副作用
- 结果可以缓存(memoize)，因为相同的输入总是会得到相同的输出

:::

### 副作用

:::info 副作用指的是函数在执行过程中产生了外部可观察变化。

- 发起 HTTP 请求
- 操作 DOM
- 修改外部数据
- console.log()打印数据
- 调用 Date.now()或者 Math.random()

:::

```js
// useEffect 是 react 提供的可以在里面执行副作用函数
useEffect(() => {
  // do something sideEffect , such as Axios request, console.log()
}, []);
```

### 其他概念

- 高阶函数(High Order Function)
- 偏函数(Partially Applied Functions)
- 函数柯里化(Curring)
- 闭包(Closure)

## React 组件

> ` React 组件`就是 一部分 UI, 一个页面可以由 `1 到 N 个组件` 组成 , 组件拥有自己的状态 `state` , `state` 改变则组件会重新渲染, 展现最新的值, 如果使用 `hooks`, 一个 `react 组件 `就是 一个 `JavaScript 函数`

:::tip React 拆分组件的最佳时机

1. 组件重新渲染过于频繁
2. 单元测试变得难写, 不得不写集成测试
3. `state` 和 `lifecycle` 难以维护的时候
4. 某些代码重复三遍以上

:::

### props

> `props` 指的是 `React 组件`从外部接受的数据, 类似于函数的形参 , props 是不可修改的

### state

> `props` 和 `state` 都是普通的 `js 对象`, 区别在于 `props` 从外部接受, `state` 是组件内部维护, 通过 `setState` 更新状态值

<!--
```jsx
const user = {
  name: 'keqing',
  age: '15',
  skill: {
    sing: 100,
    jump: 100,
    rap: 100,
  },
};
``` -->

## React hooks

> React Hooks 是简单的 JavaScript 函数，我们可以用它来把可重用的部分从功能组件中隔离出来。钩子可以是有状态的，可以管理副作用

React 官方内置了一些 hook

### useState

> `const [state, setState] = useState(initialState) `参数 1 是 state 的名字, 参数 2 是更新 state 的函数

```tsx {5,9}
interface IUser {
  name: string;
}

const [user, setUser] = useState<IUser>({name: 'keqing'});

console.log(user); // keqing

setUser('刻晴');
console.log(user); // 刻晴
```

### useEffect

> `useEffect(setup, dependencies?)` 参数 1 是要执行的副作用函数, 参数 2 是依赖项, 依赖项发生变化的话, 则会重新执行副作用函数 , 如 `API 调用、订阅、定时器、Dom 操作等,

:::tip useEffect() 的作用就是指定一个副作用函数

- 组件每渲染一次，该函数就自动执行一次。 组件首次在网页 DOM 加载后，副效应函数也会执行
- 不要在 `useEffect` 里面直接使用 `async` / `await`

:::

```tsx
useEffect(() => {
  let interval = setInterval(() => setTime(1), 1000);

  return () => {
    // 当组件卸载时, 会执行 clearInterval 函数清除定时器防止内存泄露
    clearInterval(interval);
  };
}, []);
```

:::note 与 `useEffect` 相似的还有 `useLayoutEffect`

两者区别是 `useLayoutEffect` 是 `useEffect` 的一个版本，在浏览器重绘屏幕之前启动

尽可能地使用 `useEffect`, 使用 `useLayoutEffect` 会损害性能

:::

### useRef

> 它返回一个 带有`current 属性`的 `ref对象` , **值为传入的参数**

- 返回的 ref 对象在组件的整个生命周期内保持不变
- ref 的值是可以改变的,可以`访问子组件`
- ref 的值改变不会像 `state` 一样引起 `页面重新渲染` , 所以我们一般不会让 `current` 显示在视图中

```tsx {6}
import React, {useState, useRef} from 'react';

const App = () => {
  const [count, setCount] = useState<number>(0);

  const ref = useRef<number>(0);

  const handleIncrement = () => {
    ref.current++;
    setCount(count + 1);
  };

  const handleDecrement = () => {
    ref.current++;
    setCount(count - 1);
  };

  return (
    <React.Fragment>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>

      <div>Count: {count}</div>
      <div>Buttons {ref.current} times clicked</div>
    </React.Fragment>
  );
};

export default App;
```

- 只要把 ref 挂到某个 react 元素上，**就可以拿到它的 dom**
  1. `useRef 创建一个 ref 对象`
  2. `ref={xx} 挂到 react 元素上`

```tsx {4,12}
import React, {useRef, useEffect} from 'react';

const App = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return <input ref={ref} />;
};

export default App;
```

### useMemo

> `const cachedValue = useMemo(calculateValue, dependencies)`

> `useMemo` 返回一个被缓存的值, 通常作为优化性能的手段被使用。他们可以用来缓存函数、组件、变量，以避免两次渲染间的重复计算。

`const cachedValue = useMemo(calculateValue, dependencies)`

:::tip

`React 组件` 的 `state` 变化时会重新渲染? 但是 `props` 也会导致, 因为 `props` 来自父组件 , `props` 改变意味着父组件调用了 `setState`, 父组件变化连带子组件重新渲染

:::

```tsx
const memoizedValue = React.useMemo<string>(() => {
  computeExpensiveValue(a, b);
}, [a, b]);
```

### useCallback

> `useCallback` 和 `useMemo` 一样 只不过返回值是`被缓存的函数` , `useMemo` 返回`被缓存的值(函数执行的结果)`

```tsx
type CallbackType = (...args: string[]) => void;

const memoizedCallback = React.useCallback<CallbackType>(() => {
  doSomething(a, b);
}, [a, b]);
```

### useContext

> const value = useContext(SomeContext)

`useContext` 可以使得 `读取和订阅` 来自你的组件的上下文(context) , 这样跨层级组件通信就不需要通过逐层 `props` 传递

:::info 使用方法

1. 定义你要传递的 `context` 上下文
2. 通过 `provider` 包裹根组件`App` 提供上下文
3. `useContext` 订阅该上下文使用

:::

<!-- 做成 tab 栏 的形式 -->

[代码可以看这个 demo](https://codesandbox.io/s/react-context-typescript-vk41i7?file=/src/components/ThemeWrapper.tsx)

### useReducer

> `const [state, dispatch] = useReducer(reducer, initialArg, init?)`

:::tip useReducer 和 useContext 可以在大部分情况下代替 redux

- `useReducer` 和 `useState` 类似, 可以给你的应用添加一个 `reducer` , 通过 `dispatch` 去分发 `action` 通知修改 `state`, 和 `redux` 类似

- `Store` 收到 `Action` 以后，必须给出一个新的 `State`，这样 View 才会发生变化。这种 `State` 的计算过程就叫做 `Reducer`。

- `Reducer` 是一个函数，它接受 `Action` 和当前 `State` 作为参数，返回一个新的 `State`

:::

```tsx
import * as React from 'react';

enum ActionType {
  INCREMENT_COUNTER = 'INCREMENT_COUNTER',
  DECREMENT_COUNTER = 'DECREMENT_COUNTER',
}

interface IReducer {
  type: ActionType;
  count: number;
}

interface ICounter {
  result: number;
}

const initialState: ICounter = {
  result: 0,
};

const countValue: number = 1;

const reducer: React.Reducer<ICounter, IReducer> = (state, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_COUNTER:
      return {result: state.result + action.count};
    case ActionType.DECREMENT_COUNTER:
      return {result: state.result - action.count};
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer<React.Reducer<ICounter, IReducer>>(
    reducer,
    initialState,
  );

  return (
    <div className="App">
      <h1>Result: {state.result}</h1>
      <button
        onClick={() =>
          dispatch({type: ActionType.INCREMENT_COUNTER, count: countValue})
        }>
        {' '}
        +
      </button>
      <button
        onClick={() =>
          dispatch({type: ActionType.DECREMENT_COUNTER, count: countValue})
        }>
        {' '}
        -
      </button>
    </div>
  );
}
```
