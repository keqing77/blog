---
id: react-query
slug: /react-query
title: React-Query
date: 2023-01-19
authors: keqing
tags: [react, react-query]
keywords: [react, react-query]
sidebar_position: 3
---

> React Query 是一个 集 `api 缓存` 、`插入数据自动刷新`、`分页和无限滚动`、`loading` 等一系列功能的 `增强查询库` ,它能显著提高你开发效率, 使 `React` 对服务端数据的获取，缓存，同步和更新服务器状态变得轻而易举

:::info 大多数传统状态管理库(redux , mobx, zustand..) 非常适合用于处理客户端状态，但是它们并不适合处理`异步或服务器状态`。 这是因为服务器状态完全不同

React Query 无疑是管理服务器状态的最佳库之一。它非常好用，开箱即用，无需配置，并且可以随着应用的增长而根据自己的喜好进行定制。-- <<官方文档>>

:::

- [React-Query 官方文档](https://tanstack.com/query/v4/docs/react/overview)
- [practical-react-query](https://tkdodo.eu/blog/practical-react-query)
- [React Query 的實用技巧](https://yuri-journal.me/%E8%BB%9F%E9%AB%94%E9%96%8B%E7%99%BC/2022060716/)

## usage

```tsx
const postQuery = useQuery({
  queryKey: ['posts'],
  queryFn: getPosts,
});

// 传统写法
useEffect(() => {
  setIsLoading(true);

  fetch('http://www.xxx.xxxx')
    .then((res) => res.json())
    .then(setData())
    .catch(setError)
    .fianlly(() => setIsLoading(false));
});
```

## hooks

### useQuery

1.  `queryKey`
2.  `queryFn`
3.  `refetchInterval`
4.  `enabled`

```tsx
import {useQuery} from '@tanstack/react-query';
import {getPost} from './api/posts';
import {getUser} from './api/users';

export default function Post({id}) {
  const postQuery = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ['users', postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery.data.userId),
  });

  if (postQuery.status === 'loading') return <h1>Loading...</h1>;

  if (postQuery.status === 'error') {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <>
      <h1>
        {postQuery.data.title} <br />
        <small>
          {userQuery.isLoading
            ? 'Loading User...'
            : userQuery.isError
            ? 'Error Loading User'
            : userQuery.data.name}
        </small>
      </h1>
      <p>{postQuery.data.body}</p>
    </>
  );
}
```

### useMutation

```tsx
import * as React from 'react';
import axios from 'axios';

import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const client = new QueryClient();

type Todos = {
  items: readonly {
    id: string;
    text: string;
  }[];
  ts: number;
};

async function fetchTodos(): Promise<Todos> {
  const res = await axios.get('/api/data');
  return res.data;
}

function useTodos() {
  return useQuery({queryKey: ['todos'], queryFn: fetchTodos});
}

function Example() {
  const queryClient = useQueryClient();
  const [text, setText] = React.useState('');
  const {isFetching, ...queryInfo} = useTodos();

  const addTodoMutation = useMutation({
    mutationFn: (newTodo) => axios.post('/api/data', {text: newTodo}),
    // When mutate is called:
    onMutate: async (newTodo: string) => {
      setText('');
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({queryKey: ['todos']});

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todos>(['todos']);

      // Optimistically update to the new value
      if (previousTodos) {
        queryClient.setQueryData<Todos>(['todos'], {
          ...previousTodos,
          items: [
            ...previousTodos.items,
            {id: Math.random().toString(), text: newTodo},
          ],
        });
      }

      return {previousTodos};
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todos>(['todos'], context.previousTodos);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
  });

  return (
    <div>
      <p>
        In this example, new items can be created using a mutation. The new item
        will be optimistically added to the list in hopes that the server
        accepts the item. If it does, the list is refetched with the true items
        from the list. Every now and then, the mutation may fail though. When
        that happens, the previous list of items is restored and the list is
        again refetched from the server.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodoMutation.mutate(text);
        }}>
        <input
          type="text"
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <button disabled={addTodoMutation.isLoading}>Create</button>
      </form>
      <br />
      {queryInfo.isSuccess && (
        <>
          <div>
            {/* The type of queryInfo.data will be narrowed because we check for isSuccess first */}
            Updated At: {new Date(queryInfo.data.ts).toLocaleTimeString()}
          </div>
          <ul>
            {queryInfo.data.items.map((todo) => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
          {isFetching && <div>Updating in background...</div>}
        </>
      )}
      {queryInfo.isLoading && 'Loading'}
      {queryInfo.error instanceof Error && queryInfo.error.message}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Example />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
```
