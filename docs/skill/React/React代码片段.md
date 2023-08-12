---
id: react-code-fragment
slug: /react-code-fragment
title: React 代码片段
date: 2022-11-25
authors: keqing
tags: [react]
keywords: [react]
sidebar_position: 3
---

> `这里收集一些常用的 React 代码片段, 不定期更新`....

:::tip 推荐扩展

- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=rodrigovallades.es7-react-js-snippets)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

:::

## React 代码组织

:::info 组件结构组件结构建议分为四大块（有顺序）：

1. 状态 Hook 调用（useState）
2. 副作用 Hook 调用（useEffect）
3. 方法定义
4. 渲染逻辑。

:::

```jsx {2,8,11,14}
function Component({children}) {
  // 1. 状态 Hook 调用
  const [state, setState] = useState(false);

  // 也可以在这里定义 Effect 要用到的纯函数，记住不能使用任何函数外的变量
  // 纯函数也可以考虑单独拆出来，可能将来在别的组件也会用到

  // 2.副作用 Hook 调用
  useEffect(() => {}, []);

  // 3.方法定义，尽量使用箭头函数
  const fn = () => {};

  // 4.渲染逻辑

  // 如果后面渲染表达式过于复杂，可以单独抽出来放着，命名为 renderXXX , 更好的做法还是单独抽出一个组件
  const renderXXX = () => <p></p>;

  return <p>{children}</p>;
}
```

## 自定义 hook

:::tip 自定义 hook 其实就是把可复用的逻辑单独抽离出来，方便维护。

不知道什么时候该自定义 hook? 如果实现一个逻辑需要用到多个 Hook、多个变量，而且这个逻辑还可能在别的组件中复用, 那么就是自定义 hook 的好时机.

:::

比如 `localStorage` 可能在多个组件会使用到, 那么我们可以创建自定义 hooks - `useLocalStorage` 抽取出来供其他组件使用

```tsx {4,18}
// App.tsx
import {useState} from 'react';
function App() {
  const [name, setName] = useLocalStorage<string>('name', 'Bob');
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

// src/hooks/useLocalStorage.tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // 在 localstorage 中 通过 key 获取 item 值
      const item = window.localStorage.getItem(key);

      // 解析 json , item 不是 json 格式则不作转化
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // 如果报错也返回初始值
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许值是一个函数,  这样可以使得我们像使用 useState 一样使用 该自定义 hook
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // 保存状态
      setStoredValue(valueToStore);

      // 保存到 localStorage 中
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // 异常需要处理, 这里就打个 log 占位了
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
```

## useEffect 片段

### useEffect 中使用异步

:::danger 不能在 `useEffect` 中直接使用 `async/awiat`

:::

因为`一个 JS函数 前加了 async` 的话, 表示这个函数是一个`异步函数`, 这个函数的返回结果是一个 `Promise` !!!!

而 `useEffect` 的 第一个参数, 也就是执行副作用函数的地方, 不应该返回一个 `Promise`, 它应该 `什么都不返回` 或者 `返回一个函数`

:::tip `useEffect` 正确使用异步的方法

:::

**在 `useEffect` 内部定义 `async` 函数**

```tsx
useEffect(() => {
  const fetchData = async () => {
    const data = await getData();

    return data;
  };
  fetchData();
}, []);
```

**在 `useEffect` 外部定义 `async` 函数**

```tsx {3}
const [state, setState] = useState(0);

const fetchData = useCallback(async () => {
  const data = await getData();
  setState(data);
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

- 在这种情况下，我们需要将我们的异步函数包裹在 `useCallback` 中，将其与依赖数组进行映射。
- **注意**--如果我们不使用 `useCallback` 钩子来包装这个函数，它将在每次更新时重新渲染，这将导致 `再次触发 useEffect钩子` 。

### componentDidMount

```jsx
useEffect(() => {
  console.log('页面挂载时调用');
}, []);

// 第二个参数是空数组, 只会在页面挂载的时候执行, 执行次数 1
```

### componentDidUpdate

没有第二个参数代表监听**所有的属性更新**

```jsx
useEffect(() => {
  console.log('任意属性该改变');
});
```

监听多个属性的变化需要**将属性作为数组**传入第二个参数。

```jsx
useEffect(() => {
  console.log('n变了');
}, [n, m]);
```

### componentWillUnmount

```js {4,7}
useEffect(()=>{
	const timer = setTimeout(()=>{ ... },1000)

	return ()=>{
	   console.log('页面销毁了')
	   clearTimerout(timer)
	}
})
```
