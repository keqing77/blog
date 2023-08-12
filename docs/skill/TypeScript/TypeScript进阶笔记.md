---
id: typescript-advanced-grammar
slug: /typescript-advanced-grammar
title: TypeScript 进阶笔记
date: 2022-12-25
authors: keqing
tags: [typescript]
keywords: [typescript]
sidebar_position: 2
---

推荐在线运行 `TypeScript` [https://www.typescriptlang.org/play](https://www.typescriptlang.org/play)

<!-- truncate -->

## 基础类型

```ts
// Typescript 可以显式声明类型, 否则TS会根据赋值的值类型自动推断
let num: number;
let str: string;
let bool: boolean;
let arr: string[];

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error

arr = ['a', 'b', 'c'];
arr = [1, 2, 3]; // Error
```

## typeof

:::tip `typeof`用于在 `JS/TS` 中获取对象的类型 , 用法: ` typeof val`

不同的是, `Js` 返回的是表示`该类型的字符串` , 而 `TS` 是返回该类型

:::

1.  **通过 typeof 获取变量类型 **

```typescript
const str = 'foo';
typeof str === 'string'; // true

const user = {
  name: 'keqing',
  age: 18,
  address: {
    province: '广东',
    city: '深圳',
  },
};

type User = typeof user;
// {
//   name: string;
//   age: number;
//   address: {
//      province: string;
//      city: string;
//   };
// }

type Address = typeof user['address'];
// {
//    province: string;
//    city: string;
// }
```

2. ** 获取函数的类型（参数类型与返回值类型) **

```ts {5,9,13}
function add(a: number, b: number): number {
  return a + b;
}

type AddType = typeof add;
// (a: number, b: number) => number
// 参数类型与返回值类型

type AddReturnType = ReturnType<typeof add>;
// number
// 返回值类型

type AddParameterType = Parameters<typeof add>;
// [a: number, b: number]
// 参数类型
```

## keyof

:::tip `keyof` 可以获取该类型的所有 `key` , 类似与 `Object.keys()`

用法 : `keyof T` , 获取 T 类型的所有键名

:::

**根据 key 获取对象其属性的例子**

```typescript
function getProperty<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

上面代码有很好的代码提示，并且如果获取的 key 不在其对象中，将会直接报错。

对于一些常用类型的 keyof 值

```typescript
type K0 = keyof string;
// number | typeof Symbol.iterator | "toString" | "charAt" | ... more
type K1 = keyof boolean;
// "valueOf"
type K2 = keyof number;
// "toString" | "valueOf" | "toFixed" | "toExponential" | "toPrecision" | "toLocaleString"
type K3 = keyof any;
// string | number | symbol
```

## turple

> 元组其实就是一个数组, 但 TS 和其他强类型语言一样, 数组只能有一种类型, 而元组里不同元素可以有不同的类型

```ts
// Type 'number' is not assignable to type 'string'.
let arr: string[] = [1, 2, '3'];

// 定义元组及其类型
let ourTuple: [number, boolean, string];

// 初始化
ourTuple = [5, false, 'Coding God was here'];
```

## Casting

> Casting is the process of overriding a type. 有的时候我们需要转换类型, casting 就是重写一个类型的过程

转换类型我们有 3 种 方法:

1. 通过 `as`
2. 通过 `<>`
3. 强制类型转换 Force casting

```ts
// casting with  as
let x: unknown = 'hello';
console.log((x as string).length);

// casting with <>
let x: unknown = 'hello';
console.log((<string>x).length);

// warning!!! <. 在 tsx 中是不起作用的

// force casting
let x = 'hello';

console.log((x as unknown as number).length); // x is not actually a number so this will return undefined
```

## 交叉类型

& 交叉运算符

类似集合中的交集，满足以下特性

1. 唯一性：A & A 等价于 A
2. 满足交换律：A & B
3. 满足结合律：(A & B) & C 等价于 A & (B & C)
4. 父类型收敛：如果 B 是 A 的父类型，那么 A & B 将收敛为 A 类型.

任何与 never 交叉的类型都是 nerver，any 交叉的类型为 any（除了 nerver）

```typescript
type A0 = any & 1; // any
type A1 = any & boolean; // any
type A2 = any & never; // never

type A3 = string & number; // never
```

## 映射类型

```typescript
{ [P in K]: T }
```

其中 in 类似与 for ...in 语句，而 T 类型表示任意类型。遍历 K 类型的所有 key，生成 P : T，例如

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type Demo<T> = {[P in keyof T]: T};
type Todo1 = Demo<Todo>;
// {
//   title: string
//   description: string
//   completed: boolean
// }
```

上面代码看似没有任何映射关系，因为在映射类型中可以给对其添加`readonly `和 `?` 只读与可选修饰符，以及`+` `-` 增加与删除修饰符（默认为+）例如

```typescript
{ [ P in K] :T }
{ [ P in K] ?:T }
{ [ P in K] -?:T }

{ readonly [ P in K] :T }
{ readonly [ P in K] ?:T }
{ -readonly [ P in K] ?:T }

```

就可以实现一些 TypeScript 的内置工具类（给对象属性只读，可选等等）

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
}

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

...
```

## 条件类型

```typescript
T extends U ? X : Y
```

其代码语法类似与三元运算符，

1. 如果 T 和 U 都为基本类型两侧相同，则 extends 在语义上可以理解为 ===

```typescript
type Demo1 = 'foo' extends 'bar' ? true : false; // false
type Demo2 = 'c' extends 'c' ? true : false; // true
```

2. 若位于 extends 右侧的类型包含位于 extends 左侧的类型(即**狭窄类型 extends 宽泛类型**)时，结果为 true，反之为 false。

```typescript
type Demo3 = string extends string | number ? true : false; // true
```

3. 当 extends 作用于**对象**时，若在对象中指定的 key 越多，则其类型定义的范围越狭窄。

```typescript
type Demo4 = {a: true; b: false} extends {a: true} ? true : false; // true
```

4. 作用于联合类型中，且 T 为**裸类型参数**(无`T[] [T] Promise<T>` 等类型包装过)，那么则为**分布式条件类型**，对于该类型来说，当 T 为联合类型时，运算过程会被分解为多个分支（类似于乘法分配律），那么返回的类型也将是多个类型。

分布式条件类型的特点：“裸”类型、类型参数、联合类型参数会触发分支。

```typescript
type Demo5<T, U> = T extends U ? never : T;
type Demo6 = Demo5<'a' | 'b' | 'c' | 'd', 'c' | 'd'>; // 'a' | 'b'
```

例如上面定义的 Demo5，其实也就是 TypeScript 内置工具类的[Exclude<UnionType, ExcludedMembers>](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)的实现，所返回的结果是 `'a' | 'b'`，其内部的实现相当于

```typescript
'a' extends 'c' | 'd' ? never : 'a' // 'a'
'b' extends 'c' | 'd' ? never : 'b' // 'b'
'c' extends 'c' | 'd' ? never : 'c' // never
'd' extends 'c' | 'd' ? never : 'd' // never
// 执行四次条件类型,最终合并得到 'a' | 'b'

```

但如果 T 不能**裸类型参数**类型，那么便不会做**分布式条件类型**，返回的结果便只有一个。

## 类型推断

```typescript
type Demo<T> = T extends (infer U)[] ? U : T;
```

如果 T 为`string[]`类型，那么 infer 可以推导出 U 为 string 类型

注：infer 只能在**条件类型的`extends`子句**中才允许`infer`声明，且只能**在条件分支中 true 中**使用

下列语句都将报错

```typescript
type Wrong1<T extends (infer U)[]> = T[0];

type Wrong2<T> = (infer U)[] extends T ? U : T;

type Wrong3<T> = T extends (infer U)[] ? T : U;
```

一些例子

```typescript
type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

type T0 = Unpacked<string>; // string
type T1 = Unpacked<string[]>; // string
type T2 = Unpacked<() => string>; // string
type T3 = Unpacked<Promise<string>>; // string
type T4 = Unpacked<Promise<string>[]>; // Promise<string>
type T5 = Unpacked<Promise<string> | string>; // string | Promise<string>
```

通过 infer 就可以推导出函数的参数类型与返回值类型

```typescript
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type MyParameterType<T> = T extends (...args: infer P) => any ? P : any;

type FnReturnType = MyReturnType<typeof fn>;
// 1 | 2
type FnParameterType = MyParameterType<typeof fn>;
// [v: boolean]
```

## 声明文件

我个人习惯会在根目录创建 types 文件夹，里面存放 d.ts 声明文件，同时 tsconfig.json 中配置 `"include": ["src/**/*.ts", "types/**/*.d.ts"]`

创建一个全局声明文件`global.d.ts`，使用 declare 关键字来声明

```typescript title="global.d.ts"
declare module 'foo' {
  export var bar: number;
}
```

此时就可以在其他文件中`import * as foo from 'foo'`，即便没有安装 foo 模块，但是 foo 依然有 bar 属性提示，这在一些第三方使用 js 所编写的库中经常遇到。在例如我想给我的 axios 封装些自己定义的代码，同时还带有类型提示，那么就可以使用声明文件，如下

```typescript title="global.d.ts"
import * as axios from 'axios';

declare module 'axios' {
  export interface Axios {
    myget: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse>;
  }
}
```

```typescript title="demo.ts"
import axios, {AxiosRequestConfig} from 'axios';

axios.myget = async (url: string, config?: AxiosRequestConfig) => {
  console.log(url);
  return axios.get(url, config);
};
```

## type 和 interface 区别

### 相同点

1. 都可以用来描述对象或函数

2. 类型别名和接口都支持扩展

```typescript
type User = {
  name: string;
};

type User1 = User & {age: number};
```

```typescript
interface User {
  name: string;
}

interface User1 extends User {
  age: number;
}
```

### 不同点

1. 同名接口会自动合并，而类型别名不会

```typescript
interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: 'keqing',
  age: 20,
};
```

```typescript
type User = {
  name: string;
};

type User = {
  age: number;
};
// 标识符“User”重复。
```

### 使用场景

#### type 的使用场景

- 定义基本类型
- 定义元组类型
- 定义函数类型
- 定义联合类型
- 定义映射类型

#### interface 的使用场景

- 利用接口自动合并特性，在第三方库中可以对其进行接口扩展

- 定义对象类型且无需使用 type 时

## Record

> Record 可以简单地定义一个对象类型

```ts
// Record<string, number>等同于 { [key: string]: number }

const nameAgeMap: Record<string, number> = {
  Alice: 21,
  Bob: 25,
};
```

## Partial

`Partial` changes all the properties in an object to be optional. Partial 可以使得一个对象里的所有属性变为可选属性

```ts
interface Point {
  x: number;
  y: number;
}

// `Partial` 使得  x 和 y 变为可选属性
let pointPart: Partial<Point> = {};
pointPart.x = 10;
```

## Generics

> 泛型允许创建 "类型变量"，可以用来创建类、函数和类型别名，不需要明确定义它们使用的类型。 泛型可以提高保证类型安全的同时提高函数的复用性

```ts
function createPair<S, T>(v1: S, v2: T): [S, T] {
  return [v1, v2];
}

console.log(createPair<string, number>('hello', 42)); // ['hello', 42]

function createLoggedPair<S extends string | number, T extends string | number>(
  v1: S,
  v2: T,
): [S, T] {
  console.log(`creating pair: v1='${v1}', v2='${v2}'`);
  return [v1, v2];
}
```

## Decorator

> 装饰器的三个能力

1.  **替换**：将所修饰的元素替换成其他值（用其他方法替换所修饰的方法，用其他属性替换所修饰的属性等等） ；
2.  **访问**：通过访问器来访问所修饰元素的能力；
3.  **初始化**：初始化所修饰的元素。

装饰器起到了对数据的装饰(加工的)作用，可以被附加到**类、方法、访问器、属性、参数** 上。

### usage

装饰器通过 `@expression` 的 形式使用, `expression`  是一个函数，会在运行时被调用，被装饰的数据会作为参数传入到这个函数中

```ts
1. 下述代码中的 decorator 就是一个装饰器函数，
2. 接收一个 target 参数，decorator 装饰器修饰了 Animal 这个类，
3. Animal 类就被作为 target 参数传入到了 decorator 函数中。

function decorator(target: any) {
  target.say = function () {
    console.log('hello!')
  }
}

@decorator
class Animal {
  static say: Function;
  constructor() {
  }
}

Animal.say() // hello!
```

### 装饰器工厂

单独装饰器本身有一种缺点，就是除了传入要装饰的数据之外，装饰器本身的功能不能通过传参去自定义，想要通过传参自定义装饰器的功能，我们可以使用装饰器工厂。

装饰器工厂通过 `@expression(args)` 形式使用，装饰器工厂中的 `expression` 会返回一个装饰器函数，`args` 是用户想自定义传入的参数

```ts
// giveSay 就是一个装饰器工厂，接收一个参数 name，通过这个参数用户可以传入自定义想传入的数据。

// 返回的装饰器函数接收 target 参数，使用装饰器工厂所修饰的数据（如下面代码中的 Animal1 和 Animal2） 会被作为 target 参数传入。

function giveSay(name: string) {
  return function (target: any) {
    target.say = function () {
      console.log('hello! My name is ' + name);
    };
  };
}

@giveSay('Yuanbao')
class Animal1 {
  static say: Function;
  constructor() {}
}

Animal1.say(); // hello! My name is Yuanbao

@giveSay('Facai')
class Animal2 {
  static say: Function;
  constructor() {}
}

Animal2.say(); // hello! My name is Facai
```


## 工具类型
### `Partial<Type>`

> 构造一个类型，其中Type的所有属性都设置为可选的

```tsx

```

### `Required<Type>`

> 构造一个类型，其中Type的所有属性都设置为必需的

```tsx

```

### `Readonly<Type>`

> 构造一个类型，其中Type的所有属性都设置为只读的

```tsx

```

### `Record<Type>`

> 构造一个对象类型，其属性键为Keys，其属性值为Type

> 常用于将**类型的属性** 映射到 **另一种类型** 

```tsx

```

### `Exclude<UnionType, ExcludeUnionType>`

> 构造一个类型，从一个联合类型中排除某些类型

```tsx

```

### `Extract<Type, UnionType>`

> 构造一个类型，从一个联合类型中选取某些类型

```tsx

```

### `Pick<Type, Keys>`

> 通过从`Type`中`选择一组属性Keys`（字符串文字或字符串文字联合）来构造一个类型

```tsx

```

### `Omit<Type, Keys>`

> 通过从`Type`中排除某些`属性Keys`（字符串文字或字符串文字联合）来构造一个类型

```tsx

```

### `Parameters<Type>`

> 获取函数参数类型

```tsx

```

### `ReturnType<Type>`
> 获取函数返回值类型

```tsx

```
