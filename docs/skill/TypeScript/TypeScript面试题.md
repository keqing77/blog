---
id: typescript-interview
slug: /typescript-interview
title: TypeScript面试题
date: 2022-11-15
authors: keqing
tags: [typescript]
keywords: [typescript]
sidebar_position: 4
---

## `type A = {name:string}` 代表什么?

只是限制了这个对象 **属性** `name` 的 **类型**为 `string`, 而不是 **这个对象只有一个属性name 类型为 string**

## 怎么理解泛型?

> 可以理解为`类型的变量`, 你一定使用过`函数参数`, 可以通过提前定义参数, 然后使用的时候才给函数 `传值`
> 
> `泛型`也是类似的, 你可以用任意字符来占位表示类型,在使用的时候才传入 `类型`  

```ts {1,6-8}
const add = (a:number,b:number) => a + b;

add(1,2) 
// 使用 add()函数才给函数参数传入具体的值 1, 2

function identity<T>(arg: T): T {
    return arg;
}

const output = identity<string>("myString");  // type of output will be 'string'
```
使用 T 来占位,而使用的时候定义具体类型, 泛型使得`增强代码复用性`的同时并且保证`类型安全` 

泛型表示宽泛的类型, 所以使用的时候通常搭配 `keyof` 等等其他类型约束关键字约束类型后使用来保证类型安全


## ? 和 ?? 代表什么?

- `?` 表示该属性是可选的, 比如函数参数可传可不传 (可以多传, 但不可以少传)

- `?? `是空值合并运算符。它用于在左侧表达式的值为 null 或 undefined 时返回右侧表达式的值，否则返回左侧表达式的值

```ts {1,8}
//  ?
type Dinner = {
  chicken? : string,
  fish?: string,
  rice: string
} // 一顿晚餐一定有米饭, 鱼和鸡肉都是可选的, 万一吃牛肉呢😄

//  ??
let x = null;
let y = x ?? "default"; // y = "default"
```

## TS中类型层级有哪几层?

> 类型通常只能`收窄` , 除了 `interface` 和 `type` 可以拓展 , `type` 一旦定义则无法改变

- any
- unknown
- Object,object,{}
- String,Boolean,Number
- string,boolean,number
- ...补充图片, `集合图` or `层级图`

`string,boolean,number` 又被称为`包装类型`, JS 会`自动装箱/拆箱`

## 类型约束有哪些方法?

> `TypeScript` 拥有图灵完备的类型系统
 
- if/else
- typeof
- keyof
- in
- is
- extends
- interface/type
- ...etc 
## interface 和 类型别名 的区别?

> 有两种方法去定义一个对象的形状: 接口 interface 和 类型别名 type aliases

它们非常相似, 并且在大多数情况下是相同的, 但还是有一些细微的区别

- `interface` 可以**同名并且自动合并**, 而 `type` 不行, 且定义后**无法改变**, 需要通过 `&` 拓展一个新的 `type`
- `interface` 不可以定义**基本类型**, 而 `type` 可以
- `interface` 更适合**第三方库**使用, 而 `type` 适合在**内部项目**


## unknown 和 any 的区别?

- `any` 相当于万能类型, **跳过类型检查**, 和写普通的 `JavaScript` 一样

- `unknown` 表示位置类型, 比如一个 `axios 请求的返回结果` , 你并不知道返回的数据形状是什么, 则可以定义为 `unknown`, 随后再 通过 `as` 或 `infer`  **断言或者推断** 为具体类型保证类型安全

## exclude 和 Omit 的区别?

> `Exclude` 用于**从联合类型中排除某些类型**，而 `Omit` 用于**从对象类型或接口中排除某些属性**

```ts {1,6}
// Exclude 排除 union type 中某个类型
type T = 'a' | 'b' 

type U = Exclude<T, 'a'> // type U = 'b'

// Omit 排除 type / interface 其中的某个属性
type T = { 
  a: string,
  b: string, 
}

type U = Omit<T, 'a'> // type U = { b: string; }
```

## infer 如何使用?

> `infer`用于在条件类型中声明一个**待推断的类型变量**, 必须前置搭配 `extends` 使用

可以使用infer来推断函数参数的类型
```ts {2,5}
type ParamType<T> = T extends (arg: infer P) => any ? P : T
```
`infer P` 表示待推断的函数参数。整句表示为：如果 `T` 能赋值给`(arg: infer P) => any`，则结果是 `(arg: infer P) => any`类型中的 `参数P`，否则返回为 `T`

---

> 除了推断**函数参数的类型**，`infer`还可以用于**推断函数返回值的类型**

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
```
在这个条件语句 `T extends (...args: any[]) => infer R ? R : any` 中，`infer R`表示待推断的函数返回值。整句表示为：如果 `T` 能赋值给`(...args: any[]) => infer R`，则结果是 `(...args: any[]) => infer R`类型中的`返回值R`，否则返回为`any`

## 怎么理解装饰器?
> 装饰器本身是一个**函数**，它可以**接收被装饰的目标作为参数**，并返回**装饰后的结果**

在 `nest.js` 中, 可以通过`@Get` 定义一个 `Get 请求`, 这实际上使用 `typescript` 的**装饰器** (decortor)

是不是觉得很眼熟, `@装饰器` 看起来很类似 java 中的 **注解**, 但其实是两个不同的东西
```ts
import { Controller, Get } from '@nestjs/common';

@Controller('my-route')
export class MyController {
  @Get()
  myMethod() {
    // 处理GET请求
  }
}
```

>简化版的@Get()装饰器实现示例, 实际上`nestjs` 实现更加复杂

它是一个函数，接收三个参数：**目标对象**、**属性名**和**属性描述符**。在`@Get()`装饰器函数内部，它会使用TypeScript提供的`Reflect API`来获取和设置**被装饰方法的元数据信息**
```ts
function Get(path?: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    // 获取原始方法
    const originalMethod = descriptor.value;
    // 设置元数据信息
    Reflect.defineMetadata('path', path, descriptor.value);
    Reflect.defineMetadata('method', 'GET', descriptor.value);
    // 返回属性描述符
    return descriptor;
  };
}
```
在这个例子中，我们定义了一个名为Get的函数，它接收一个可选的路径参数，并返回一个方法装饰器函数。在方法装饰器函数内部，我们使用`Reflect.defineMetadata`方法来设置被装饰方法的元数据信息

## 怎么理解类型兼容?

> 在[官网](https://www.typescriptlang.org/docs/handbook/type-compatibility.html#any-unknown-object-void-undefined-null-and-never-assignability)的解释中，`Typescript` 存在两种「类型兼容」方式：`Subtype`、`Assignment`

:::tip **集合论中，如果一个集合的所有元素在集合B中都存在，则A是B的子集**
`ts 中的类型系统`实际上是**不同类型**之间的`集合运算` , 如交集、并集、包含于、被包含于...

:::


### Subtype

:::tip 子类型(Subtype) 
类型系统中，如果**一个类型的属性更具体**，则该类型是**子类型**（因为属性更少则说明该类型约束的更宽泛，是父类型）
- 子类型更具体，父类型更宽泛
- 子类型可以赋值给父类型
- 可以通过 `extends` 来判断是否是该类型的子类型
:::

```ts {13,14}
type A = {
  name:string,
  age:number
}

type B = {
  name: string,
}

let a: A = {name:'keqing',age:20}
let b: B = {name:'ganyu'};

b = a; // OK
a = b // Error Property 'age' is missing in type 'B' but required in type 'A'

function fn( name: A extends B ? string : number ) {
  console.log(typeof name) // typeof name 返回的类型是 string, A 是 B 的子类型
}
```
### Assignment

## 怎么理解 协变/逆变 ?

> 这部分太难太烧脑了 , 后续理解再补充
### 协变

### 逆变

### 双向协变
