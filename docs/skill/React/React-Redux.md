---
id: react-redux
slug: /react-redux
title: React-Redux
date: 2023-02-07
authors: keqing
tags: [react, react-redux]
keywords: [react, react-redux]
sidebar_position: 3
---

## Redux

### Redux & React-redux

- `Redux` 是一种思想, `Redux` 适用于 多个框架
- `React-redux` 是 **redux 作者** 对 `react` 版本 `redux` 的实现
- 学习 `React-redux` 需要先了解 `redux` 基础概念

### Redux-toolkit

> `Redux Toolkit` 是现在官方推荐在 React 项目编写 Redux 的方法

`Redux Toolkit` 本质上就是对原生 `Redux` 的二次封装, 使得使用 `Redux` 变得更加容易, `Redux Toolit`通常以 `RTK` 代指, `RTK` 集成了 `React-redux` 的功能, 也就是 `RTK` 依赖于 `React-redux`, 所以需要一起安装, 所以本文也着重介绍 [基于 RTK 的使用方法](#redux-toolkit-1)

```bash
pnpm install @reduxjs/toolkit react-redux
```

:::tip 学习资源

- [Redux 官方文档](https://redux.js.org/)
- [React-Redux 官方文档](https://react-redux.js.org/)
- [Redux Toolkit 官方文档](https://redux-toolkit.js.org/)

:::

:::caution 我真的需要 `redux` 吗?

1. 首先 `useContext` 和 `useReducer` 可以替代大部分 `reudx` 的功能
2. 其次 `redux` 是在 `class Component` 时期普及较早的状态管理库, `redux` 使用较为繁琐复杂, 需要写一大堆重复模板代码 😠
3. 如今 `react` 状态管理库选择非常多, 且简单易上手,也能满足大部分需求, 如 `mobx`, `recoil`, `jotai....` , 还有目前社区最受欢迎的 `zustand`, 相比之下隔壁 `Vue` 从 `VueX` 过渡到 `Pinia` 一统天下该多幸福啊
4. 尽管如此, 从 npm 下载量 来看 `React Redux` 要比其他状态管理库加起来还要多, 甚至 `redux` 作者之一的 `dan` 也曾抱怨许多人在滥用 `redux`

> `<<你也许不需要 Redux>>` [You Might Not Need Redux - Dan Abramov](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

:::

**2023 年了还在用 redux, 没办法呀, 面试官就只会问这个呀** 😌

非得使用 redux 的话 使用 ` redux-toolkit` + `react-redux`

## Redux basic

![redux 关系](https://d33wubrfki0l68.cloudfront.net/73bb62ebc338fcd64ee95bde18684ffe3b3bb379/dac4f/assets/images/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png)

### store

- `store` 就是保存数据的地方, 可以看做是一个数据仓库, 需要用的时候从里面取, 理论上整个应用只能有一个 `store`

### view

- `view` 就是 `视图层` 或者 `UI`, 也就是我们看到的页面

### state

- `state` 可以理解为 `store` 某个时刻的 数据 , `Store`对象包含所有数据
- `state` 和 `view` 是一一对应的, 一个 `state` 对应一个 `view` , 换句话说你知道了 `state` 也就知道了 `view`

### action

- `state` 的变化 会导致 `view` 的变化, `action` 就是 `view` 要改变 `state` 发出的动作
- `action` 是一个对象, `type` 是 `action` 的名称 , 用于区分不同的 `action`
- 改变 `state` 的唯一办法 就是 通过 `action` 通知 `store`

### dispatch

- `dispatch()` 是 `View` 发出 `Action` 的唯一方法

### reducer

- `Store` 收到 `Action` 以后，必须给出一个新的 `State`，这样 `View` 才会发生变化。这种 `State` 的计算过程就叫做 `Reducer`。

- `Reducer` 是一个函数，它接受 `Action` 和当前 `State` 作为参数，返回一个新的 `State`

### playload

- 其实 `action` 就是一个单纯的包含 `{ type, payload }` 的对象，`type` 是 `一个常量` 用来表示动作类型( action type)
- `payload` 是这个动作携带的数据。`action` 需要通过 `store.dispatch()` 方法来发送。

### Provider

> `Provider` 实际上是利用了 `react` 的 `contexts` 机制 , 在顶层组件提供了 名为 `store` 的 全局上下文, 使得其他组件可以访问 **(可以通过 hooks 和 Connect api 访问, 更推荐 hooks , Connect 预想会被废弃)** 需要用 `<Provider />` 包裹整个组件, 来使 `store` 在整个组件树可用

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import {Provider} from 'react-redux';
import store from './store';

import App from './App';

// React18 根节点挂载 写法变化
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// Provider 的唯一作用 就是 传入 store 对象
```

## React redux

> 怎么理解 `hooks` ? `Hooks API` 给了 **函数组件** 使用本地组件状态的能力，执行副作用，以及更多。 `React` 还允许我们编写自定义钩子，让我们提取可重用的钩子，在 `React` 的内置钩子之上添加我们自己的行为。
>
> `React-redux` 内置的 hooks 允许你的 React 组件订阅 Redux 商店和调度行动

### useSelector

- `useSelector` 从 `store` 读取一个值并订阅更新 (使用一个 `selector` 函数)
- 可以对应于 `Connect` 的一个参数 `mapStateToProps`

### useDispatch

- `useDispatch` 返回 `store` 的调度方法( `dispatch method` )，让你调度行动 ( `dispatch actions` )
- 这个钩子返回一个对 `Redux store` 的调度函数的引用。你可以根据需要使用它来调度行动。

### useStore

- `useStore` 返回一个 store 的引用, 理论上不应该经常被使用, 因为有 useSelector , 但某些情况会有用处, 比如 替换 reducer
- This hook returns a reference to the same Redux store that was passed in to the `<Provider>` component.

### useActions & useShallowEqualSelector()​

- 根据[Dan Abramov's suggestion](https://github.com/reduxjs/react-redux/issues/1252#issuecomment-488160930). Redux 新版本应致力于更简单的 Api , 所以这些 hooks 不建议使用, 因为造成了太多的概念开销和句法复杂性, 但目前还是保留在了现版本

## Connect

:::info 建议使用 hooks API 代替 Connect , 尽管目前依然可用 (不推荐)

The connect() function connects a React component to a Redux store.

:::

```js
function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)

// Connect 是一个高阶函数 , 即调用一个函数返回另一个函数
// 有四个参数 都是可选
```

## Redux-Toolkit

> 下文将介绍如何通过 `RTK` 使用 `Redux`

### configureStore

> configureStore: 封装了 createStore，提供简化的配置选项和良好的默认值。它可以自动组合你的 reducer

### createSlice

> 受 reducer 函数的对象、切片名称和初始状态值，并自动生成切片 reducer，并带有相应的 actions

### createAsyncThunk

> 一个函数，其接受一个 Redux action type 字符串和一个应当返回 promise 对象的回调函数。根据传入的 action type 的前缀，它会生成关于 promise 生命周期的 action types，并且返回一个会运行 promise 回调函数、且根据返回的 promise 派发生命周期 actions 的 thunk action creator。

### demo

:::tip 接下来将一步步地用 RTK 做个 demo

1. 使用 `configureStore` 创建 `store` 存储所有 `reducer` 并导出
2. 把 `store` 挂载的根组件 `App` 以供`全局使用`
3. 使用 `createSlice 函数` 创建 `reducer`
4. 创建完 `reducer` 后, 添加到 store 中
5. 随后 在`组件内`则可以使用 `redux` 的 `state` 和 `action` 通知 `store` 修改 `state`
6. 读取数据，使用 `useSelector` 函数，对于调度动作，使用 `useDispatch` 函数。

> createSlice 函数需要设置 三个属性 1.name 2.initialState 3.reducers

1. name: Used in action types (String)
2. initialState: Initial state for the respective reducer (any)
3. reducers: An object of reducer functions. Key names will be used to generate actions.(Object<string, function>)

:::

> `目录结构`

```bash {3,6-7,9-10,13}
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── Features
│   │   └── counter
│   │       ├── counterSlice.ts
│   │       └── Counter.tsx
│   ├── app
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── assets
│   ├── index.css
│   ├── main.tsx

# 高亮的是需要修改的文件
```

> `src/store/index.tsx`

```ts {1,4}
import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './modules/counter';

// 使用 configureStore 生成store 并将其导出
export const store = configureStore({
  // 将所有子模块匹配值在这里
  reducer: {
    counter: counterReducer,
    // xxx: xxxReducer,
    // etc... 在这里添加 所有 reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

> `src/index.ts` 入口文件, 如果是 vite 启动的是 main.tsx

```ts {10,12}
//  把创建的 redux-store 通过 provider 提供到根组件App 以供全局使用
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
```

> `src/store/Features/counter/CounterSlice.tsx`

```tsx
// 通过 createSlice 创建 reduer 并导出
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export const selectCount = (state: RootState): number => state.counter.value;

export default counterSlice.reducer;
```

> `src/store/Features/counter/Counter.tsx`

```tsx
//  通过 useAppSelector 获取 state
//  通过 useAppDispatch 分发 action 更新 state
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {decrement, increment, selectCount} from './counterSlice';

export default function Counter(): JSX.Element {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
    </div>
  );
}
```

> `src/app.tsx`

```tsx
import React from 'react';
import Counter from './feature/counter/Counter';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Counter />
    </div>
  );
};

export default App;
```
