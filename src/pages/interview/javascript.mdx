# JavaScript 面试题

## JS 有哪些数据类型？区别？存放位置？

- 基本类型有七种： null、undefined、boolean、number、string、symbol、bigint
- 引用类型有一种: object(包含 array,function,date,regexp,map,set,weakmap,weakset)
- 基本类型值存放在**栈**内存中，引用类型值存放在堆中，**栈中存放指向堆内存的指针**。

## 判断数据类型的方法有哪些？

- typeof (可以判断除了 null 的基本数据类型，引用类型都返回 object)
- instanceof (只能判断引用类型都)
- Object.prototype.toString (可以判断所有类型)
- 根据对象的构造器 constructor 进行判断
- Array.isArray (只能判断数组), NaN.isNaN(只能判断 NaN)，Number.isInteger() (只能判断整数)

## null 是对象吗？为什么？

- null 是一个基本类型，值为 null，不是对象。
- typeof null === 'object'，这是一个 JS 设计的 BUG，因为改动会影响底层故保留这个 BUG。

## 0.1+0.2!=0.3,浮点数精度问题

- 浮点数 Value = sign _ exponent bias _ fraction
- JS 采用 IEEE 754 编码，即用 64 位二进制数表示数字，**符号位 sign**1 位，**指数偏移值 exponent bias**11 位，剩余的 53 位**fraction**用来表示小数，而像 0.1 这种小数，转化成二进制是无限循环的，只能保留 53 位，所以在 ES6 前，JS 最大的数字为 2^53-1，即 9007199254740991。
- JS 的 number 都是浮点型的，可以采用 parseFloat((0.1+0.2).toFixed(10)) ===0.3 来判断

## Number 强制转换对象类型返回值？

## ‘1’.toString()为什么可以调用？

- 原始类型是没有函数可以调用的，但是对象类型有 toString 方法，所以可以调用。
- '1' 已经不是原始类型了，而是被强制转换成了 String 类型也就是对象类型，所以可以调用 toString 函数。

## [1,2,3].map(parseInt)的结果？

- 结果是：`[1,NaN,NaN]`

## ==和===的区别

- ==判断值是否相等，类型不同会进行隐式类型转换
- ===判断值和类型是否相等，不会进行类型转换
- 避免错误尽量使用===

## Object.is 和===的区别

- 都用于判断两者是否相等，Object.is 比三等能多判断 `NaN`,`+0,-0`的相等

## JS 类型转换规则

类型转换规则

- 分两种情况 : 1.强制类型转换 2.隐式类型转换
- 其实就是 Number、String、Boolean 这三个类型之间的相互转化
- 内容有点多，后续补充。。

## 对象类型转原始类型

- 对象转基本数据类型会进行以下操作
  - 如果已经为原始数据，不需要转换
  - 调用 x.valueOf() 方法，如果转换为基本数据类型，则返回转换的值
  - 调用 x.toString()方法 方法，如果转换为基本数据类型，则返回转换的值
- 对象通过 Number 强行转换为 NaN

## 让 if( a==1 && a==2 && a==3 )成立

- 重写 valueOf()方法，读取的时候进行累加操作

```js
const a = {
  valueOf() {
    this.value++;
    return this.value;
  },
};
```

## 闭包是什么？作用？优缺点？

闭包: 有权访问另一个函数作用域中变量的函数

> 函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。

- 优点: 保护函数内的变量安全 ，实现封装，防止变量名污染作用域
- 缺点: 保持着对变量的引用，作用域链得不到释放，容易造成内存泄露

## this 的绑定规则

this 优先级 new > 显式绑定 (call,apply,bind) > 隐式绑定 (obj.fn()) > 默认绑定 (fn())

- 默认绑定
- 隐式绑定
- 显式绑定
- new 绑定
- 特殊情况: 1. 箭头函数 2. 严格模式 warning this 绑定丢失

```js{1,4,8}
// 隐式绑定     obj调用，this指向obj
- obj.method()

// this绑定丢失 this指向window
var method1 = obj.method()
method1()

// 可以用bind()强绑定this，this指向不会再改变
```

## new 操作符干了什么？

new 做的四件事情

1. 创建一个空的简单 JavaScript 对象（即{}）；
1. 为步骤 1 新创建的对象添加属性，将该属性链接至构造函数的原型对象 ；proto
1. 将步骤 1 新创建的对象作为**this**的上下文 ；
1. 如果该函数没有返回对象，则返回**this**。

## 作用域和作用域链

作用域和作用域链

- 变量作用的范围叫作作用域
- 当前作用域不存在的变量和引用，就沿着作用域链继续寻找

## 原型和原型链

原型和原型链

- 新建一个对象，会发现除了自己添加的还有很多属性，这些都是从原型上继承下来的
- 每个 JS 对象都有 **proto** 属性(浏览器实现，非标准)，这个属性指向了原型，实例对象.**proto** === 原型对象.constructor
- 当在实例对象上找不到时，就会去原型上找，原型也有自己的原型，查找的过程就形成一条了原型链。

## Function 和 Object 的关系

- Object 是所有对象的底层原型，所有对象都可以通过 **proto** 找到它
- Function 是所有函数的顶层爸爸，所有函数都可以通过 **proto** 找到它
- 函数的 prototype 是一个对象

## 构造函数和原型对象的关系

- 在 new 关键词后面的函数就是 构造函数
- 原型的 constructor 属性指向构造函数，构造函数又通过 prototype 属性指回原型

## JS 同名变量的优先级(函数名，函数参数名，内部变量)

- 函数形参可以看做是函数的局部变量，如果形参赋值，则()是一个单独的作用域，外层作用域是函数的作用域
- 函数名会覆盖形参名，变量名不会

## JS 实现继承的方法汇总，优缺点分析

1. 构造函数继承
2. 原型继承
3. 组合继承
4. 寄生组合继承
5. 圣杯继承
6. class 继承(语法糖)

## JS 数组/字符串等方法考察

- 会改变数组自身的七个方法: pop push shift unshift reverse sort splice
- ...后续更新

## 深拷贝/浅拷贝？...是深拷贝吗？

深浅拷贝

- 就是拷贝的层级，只能拷贝第一次则是浅拷贝，嵌套层级也能拷则是深拷贝(或者拷贝的数据是否和源对象共享)
- 除了深拷贝(1.JSON.parse(JSON.stringify() 2.手写深拷贝)) 都是浅拷贝
- 浅拷贝(1. ...拓展运算符 2.array.map 3. array.concat 4.Object.assign()等等都是)

## 模块化

模块化

- 防止命名冲突
- 可复用代码
- 拆分成不同模块方便维护

> 模块化方案:

- AMD 和 CMD(历史方案)
- CommonJS(node.js 专用，不属于 JS 规范)
- Esmodule(js 原生实现的模块化方案)

## V8 引擎如何进行垃圾回收？

这个有点复杂,至今还未完全理解

- 标记清除算法
- 标记压缩算法

## 事件循环 Event Loop

1. 执⾏同步代码，这属于宏任务
2. 执⾏栈为空，查询是否有微任务需要执⾏
3. 执⾏所有微任务
4. 必要的话渲染 UI
5. 然后开始下⼀轮 Event loop，执⾏宏任务中的异步代码

## 异步编程发展史

回调函数(callback) -> 期约(Promise) -> 生成器 generator -> async/await

- 这里内容有点多，先列个大纲
- 回调地狱
- Promise 不够优雅
- await 到底在等什么

## await 和 promise 的异常处理，

```js
new Promise((rs) => {
  throw new Error('Error');
}).catch((e) => {
  console.log('异常被捕获到了1');
});

new Promise(async (rs) => {
  throw new Error('Error');
}).catch((e) => {
  console.log('异常被捕获到了2');
});
```

> 第一个 Promise 里的异常能被捕获，因为 Promise 里同步抛出的异常，也会被视为 Promise.reject。但第二个 Promise，由于里面的函数是 async 的，异常是异步抛出的，所以并不会触发 Promise 的 reject ，因此 Promise.catch 也就捕获不到

## 异步编程方案？优缺点分析

1. 回调函数
2. Promise
3. Generator
4. async/await

## 事件冒泡/捕获/委托

这些是浏览器的事件机制

1. 事件冒泡是从里到外依次触发
2. 事件捕获是从外到里依次触发
3. 事件委托利用的事件冒泡机制

## 跨域，原因和解决

跨域是由于浏览器的同源策略

> 同源策略

- 域名、协议、端口号要一致，否则 ajax 请求失败

> 为什么要有同源策略？

- 只有**浏览器**才会存在跨域,服务器或者小程序这些是不存在跨域的。
- 是出于安全考虑，没有同源策略限制，你网站的 cookie 就会被任意来源的 ajax 获取，泄露信息。

> 跨域解决方案

- jsonp
- cors
- node.js 正向代理
- nginx 反向代理
- webpack/vite/axios 配置 proxy
- websocket(本身不存在跨域限制)
- iframe + windows.postmessage
- iframe + windows.document.domain
- iframe + location.hash
- 浏览器开启跨域，不推荐

# es6 考察

## let 和 const

- let 和 const 拥有块级作用域， 只要{} 里面有 let 就是块级作用域
- 存在 TDZ(Temporal Dead Zone),不能在声明前访问
- 因为 TDZ 的原因，表现得没有‘提升’,实际上在 JavaScript 中，任何声明都有提升
- 不能重复声明,let 声明变量，const 声明常量，const 定义对象，对象值可以修改
- danger JavaScript 所有声明都有提升包括 var、let、const、class、function，其中函数声明提升 优先于 变量声明提升

```js
var x = 'parent value';
(function() {
  console.log(x); // Uncaught ReferenceError: x is not defined
  let x = 'child value'
}())

如果let不存在变量提升的话， console.log(x)中的x会顺着作用域链找到上一层作用域的var x，打印出
'parnent value'，但实际上是报了ReferenceError的错，也就证明let是存在变量提升的
```

## symbol 和 bigint

symbol 是 ES6 加入的，bigint 是 ES10 加入的

> Symbol

- **防止变量名起冲突**
- **symbol 作为键名时，不会被常规方法遍历出来，所以可以作对象私有属性和方法**

> biging

- **解决 JavaScript 最大只能表示 2^53 - 1 个数字的问题**

## Map 和 Set 区别？和 Object 区别？

Map 叫字典/哈希表，Set 叫集合

> Map 和 Set 区别

- Map 和 Set 都可以储存不重复的 key，不过 Map 是[key,value]，Set 是[value] 或者[value,value]

> Map 和 Object 的区别

- Object 的 key 只能是 string 类型或者 symbol，而 set 和 map 可以是任意类型
- Map 是可以被迭代(iterable)的，Object 不可以。

## WeakMap 和 WeakSet

- 其中的键是弱引用的,其键 key 必须是对象，而值 value 可以是任意的。
- 原生的 WeakMap 持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行。
- 正由于这样的弱引用，WeakMap 的 key 是不可枚举的

## 箭头函数

- 没有 argument，没有构造函数，不能 new
- 没有自己的 this，this 继承外层普通函数 function，this 指向不会改变

## 字符串/数组等拓展方法

- 这个太多了

## Promise 串行和并行及异常处理？

> 串行: promise.then() 链式操作并行: promise.all()

## async/awiat

> async

- ⼀个函数如果加上 async ，那么该函数就会返回⼀个 Promise
  > await
- await 只能在 async 函数中使⽤
- await 下面的代码可以看做是 promise.then()

## Proxy 和 Reflect

# 场景题

## 文件上传(拖拽/断点续传/妙传)

- 获取文件对象 转换成二进制(blob/stream/buffer)
- 拖拽 API
- 状态码 206 分片上传断点续传

## 无缝轮播图

- 设置 2 个 index，12345 -> 23451-> 34512 -> 45123 -> 51234 -> 12345
- 多复制一份原有容器的图片数量，到最后一张偏移位置置位 0
- 用 swiper 插件 🤣

## 虚拟滚动，延迟加载如何做？判断一个元素是否在可视区域中

> 懒加载就是将不关键的资源延后加载。

原理就是只加载页面的可视区域，不断动态替换页面可视区域的 DOM 节点。

- 对于图片来说，src 属性可以先给个小体积的，真正的图片地址用自定义属性 data-url 存储，当图片出现在可视区域的时候才去下载真正地图片，实现了图片懒加载。
- 懒加载除了用在图片，也可以使用在其他资源。比如进入可视区域才开始播放视频等等。

## 获取 DOM 所有节点的数量

`document.querySelectorAll('*').length`

## 下拉刷新/加载

## 单点登录

> 得分情况，在同域名下的单点登录，和不同域名下的单点登录

- 认证中心

## webpack 优化

webpack

- 优化 Loader 的文件搜索范围
- Loader 已经编译过的代码不改变直接缓存起来
- 代码压缩
- 按需加载
- Tree Shaking(需要 ESmodule 支持)

## JS 的各种位置 的 区别?

clienHeight、scrollHeight、 offsetHeight 以及 scrollTop、offsetTop、clientTop

- clientHeight: 表示的是可视区域的高度, 不包含 border 和滚动条
- offsetHeight: 表示可是区域的高度, 包含了 border 和滚动条
- scrollHeight: 表示了所有区域的高度, 包含了滚动条被隐藏的部分
- clientTop: 表示边框 border 的厚度, 在为指定的情况下,一般为 0
- scrollTop: 滚动后被隐藏的高度, 获取对象相对于
- offsetParent 属性指定 的父坐标距离顶部的距离

## 面向过程、面向对象 OOP、函数式编程 FP 各自区别

> 面向过程 (Procedure-Oriented Programming) 代表语言: C / Golang 面向对象 (Object Oriented Programming) 代表语言: C++ / C# / Java / Python / Golang 函数式编程 (Function Programming) 代表语言: Lisp,JS,Rust

编程方式区别

- 程序本质就是操作数据，oop 和 fp 都把数据封装到属性中，
- oop 通过对象封装和操作属性。fp 通过函数来操作属性
- 函数式编程对开发者要求更高一些，需要对程序的理解更深入。面向对象则更浅显，所以为了让公司里面良莠不齐的开发人员统一协作，就逐渐采用了以面向对象为主的开发模式。
