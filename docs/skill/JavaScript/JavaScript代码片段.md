---
id: javascript-code-fragment
slug: /javascript-code-fragment
title: JavaScript 代码片段
date: 2022-11-25
authors: keqing
tags: [javascript]
keywords: [javascript]
sidebar_position: 3
---

<!-- truncate -->

## 1.数组去重

```js {1,4} showLineNumbers
//方法一: 利用ES6的Set自带去重
var unique = (arr) => [...new Set(arr)];

//方法二: indexOf返回元素的第一个下标，如果重复只会返回第一个下标
function unique(arr) {
  var res = arr.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}
```

## 2.数组扁平化

```js {1,9,20,29} showLineNumbers
//方法一: array.flat(Infinity)
const arr = [1, 2, [3, 4], [5, [6, 7]], 8, 9, 10];

function flatten(arr) {
  return arr.flat(Infinity); //Infinity是无限层级拍平
}
flatten(arr);

//方法二: 递归 + 展开
let flatDeep = (arr) => {
  return arr.reduce((res, cur) => {
    if (Array.isArray(cur)) {
      return [...res, ...flatDep(cur)];
    } else {
      return [...res, cur];
    }
  }, []);
};

//方法三: 正则替换所有[ ]
function flatten(arr) {
  let str = JSON.stringify(arr);
  // 替换数组所有的中括号，最简单除暴
  str = str.replace(/(\[|\])/g, '');
  str = '[' + str + ']';
  return JSON.parse(str);
}

//方法四: toString().split()方法 (不推荐，因为要操作字符串)
function flatten(arr) {
  return arr.toString().split(',');
  // toString()方法把数组转换为 一维字符串，最终返回的是字符串数组
}
```

## 3.手写防抖、节流

:::tip 防抖

**input 输入框，边输入边打印值，默认情况下无防抖; 加入防抖后,输入 0.5 秒后无动作才打印**

:::

```js
// html
// <input type="text" >

// js
const input = document.querySelector('input');
input.oninput = debounce(function () {
  console.log(this.value);
}, 500);

function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this);
    }, delay);
  };
}
```

:::tip 节流

**监听页面滚动事件，打印信息，加入节流后每隔一段时间后才执行打印**

:::

```js
//css
// body{height:3000px}  //让页面出现滚动条

//js
window.onscroll = throttle(function () {
  console.log('throttle节流');
}, 500);

function throttle(fn, delay) {
  let flag = true;
  return function () {
    if (flag) {
      setTimeout(() => {
        fn.call(this);
        flag = true;
      }, delay);
      flag = false;
    }
  };
}
```

## 4.事件委托

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>事件委托</title>
  </head>
  <body>
    <!-- 事件委托原理-> 将子级的事件 委托 给父级去处理 利用的是冒泡的机制
    事件执行顺序:  捕获 -> 触发事件 -> 冒泡
    给父级绑定事件，点击子级，冒泡后触发父级事件  -->
    <ul>
      <li>apple</li>
      <li>banana</li>
      <li>grape</li>
    </ul>
  </body>
</html>

<script>
  // 不利用事件委托方法
  // let li = document.querySelectorAll("li");
  // let ul = document.querySelector("ul");
  // for(let i = 0; i < li.length; i++){
  //     li[i].onclick = function(){
  //        ul.removeChild(this);
  //     }
  // }

  let ul = document.querySelector('ul');
  ul.onclick = (e) => {
    console.log(event.target);
    ul.removeChild(event.target);
  };
</script>
```

## 5.手写 new

```js
function _new() {
  let obj = {};
  let [constructor, ...args] = [...arguments];
  obj.__proto__ = constructor.prototype;
  let result = constructor.apply(obj, args);
  if ((result && typeof result === 'function') || typeof result === 'object') {
    return result;
  }
  return obj;
}
```

## 6.手写深拷贝

```js {1,11,30}  showLineNumbers
// 方法一: JSON.parse(JSON.stringify())
let obj1 = {a: 0, b: {c: 1}};
let obj2 = JSON.parse(JSON.stringify(obj1));
obj1.a = 1;
obj1.b.c = 2;
console.log(obj1); // {a: 1, b: {c: 2}}
console.log(obj2); // {a: 0, b: {c: 1}}

// 方法二: 简易版深拷贝
const _sampleDeepClone = (target) => {
  if (target === null) return target;
  if (typeof target !== 'object') return target;

  const newTarget = Array.isArray(target) ? [] : {};

  for (let key in target) {
    let value = target[key];
    if (typeof value === 'object') {
      newTarget[key] = _sampleDeepClone(value);
    } else {
      newTarget[key] = value;
    }
  }

  return newTarget;
};

// 方法三： 完美版手写深拷贝(参考loadsh)
const _completeDeepClone = (target, map = new Map()) => {
  if (target === null) return target;
  if (typeof target !== 'object') return target;
  const constructor = target.constructor;
  if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))
    return new constructor(target);
  if (map.get(target)) return map.get(target);
  map.set(target, true);
  const cloneTarget = Array.isArray(target) ? [] : {};
  for (prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = _completeDeepClone(target[prop], map);
    }
  }
  return cloneTarget;
};
```

## 7.手写 typeof、instanceof

```js {1,15,25}  showLineNumbers
// typeof
function myTypeof(params) {
  const type = Object.prototype.toString
    .call(params)
    .slice(8, -1)
    .toLowerCase();
  const map = {
    number: true,
    string: true,
    boolean: true,
    undefined: true,
    bigint: true,
    symbol: true,
    function: true,
  };
  return map[type] ? type : 'object';
}
// instanceof
const _instanceof = (target, Fn) => {
  let proto = target.__proto__;
  let prototype = Fn.prototype;
  while (true) {
    if (proto === Fn.prototype) return true;
    if (proto === null) return false;
    proto = proto.__proto__;
  }
};
// 实现getType返回所有类型
function getType(arg) {
  return Object.prototype.toString.call(arg);
}
```

## 8.手写 Object.create

```js
const _create = (proto) => {
  if (typeof proto !== 'object' || proto === null) return;
  const fn = function () {};
  fn.prototype = proto;
  return new fn();
};
```

## 9.手写 call、apply、bind()

> call 实现步骤

- 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
- 处理传入的参数，截取第一个参数后的所有参数。
- 将函数作为上下文对象的一个属性。
- 使用上下文对象来调用这个方法，并保存返回结果。
- 删除刚才新增的属性。
- 返回结果。

```js
//call
Function.prototype._Call = function (context) {
  // 判断调用对象
  if (typeof this !== 'function') {
    console.error('type error');
  }
  // 获取参数
  let args = [...arguments].slice(1),
    result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;
  return result;
};
```

> apply 实现步骤

- 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
- 将函数作为上下文对象的一个属性。
- 判断参数值是否传入
- 使用上下文对象来调用这个方法，并保存返回结果。
- 删除刚才新增的属性
- 返回结果

```js
//apply
Function.prototype._apply = function (context) {
  // 如果没有传或传的值为空对象 context指向window
  if (typeof context === 'undefined' || context === null) {
    context = window;
  }
  let fn = mySymbol(context);
  context[fn] = this; //给context添加一个方法 指向this
  // 处理参数 去除第一个参数this 其它传入fn函数
  let arg = [...arguments].slice(1); //[...xxx]把类数组变成数组，arguments为啥不是数组自行搜索 slice返回一个新数组
  context[fn](arg); //执行fn
  delete context[fn]; //删除方法
};
```

> bind 实现步骤

- 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
- 保存当前函数的引用，获取其余传入参数值。
- 创建一个函数返回
- 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

```js
//bind
Function.prototype._bind = function (target, ...arguments1) {
  const _this = this;
  return function (...arguments2) {
    return _this.apply(target, arguments1.concat(arguments2));
  };
};
```

## 10.手写函数柯里化(currying)、偏函数(partial)

> 柯里化

- 柯里化能将一个接受多个参数的函数转换成一次只接受一个参数的函数，没接收一个新的参数，将会返回一个新的函数等待接下来的一个参数

> 偏函数

- 偏函数就是提前设定好了某个函数需要的部分参数，并返回一个新的函数来等待接下来的参数传入

```js
//柯里化
let currying = (fn, ...args) =>
  fn.length > args.length
    ? (...arguments) => currying(fn, ...args, ...arguments)
    : fn(...args);

//偏函数
function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  };
}
```

## 11.手写 Promise、Promise.then、Promise.all、Promise.race

> Promise 实现

```js
//promise
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  // 保存初始化状态
  var self = this;

  // 初始化状态
  this.state = PENDING;

  // 用于保存 resolve 或者 rejected 传入的值
  this.value = null;

  // 用于保存 resolve 的回调函数
  this.resolvedCallbacks = [];

  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = [];

  // 状态转变为 resolved 方法
  function resolve(value) {
    // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }

    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变，
      if (self.state === PENDING) {
        // 修改状态
        self.state = RESOLVED;

        // 设置传入的值
        self.value = value;

        // 执行回调函数
        self.resolvedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    }, 0);
  }

  // 状态转变为 rejected 方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED;

        // 设置传入的值
        self.value = value;

        // 执行回调函数
        self.rejectedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    }, 0);
  }

  // 将两个方法传入函数执行
  try {
    fn(resolve, reject);
  } catch (e) {
    // 遇到错误时，捕获错误，执行 reject 函数
    reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved =
    typeof onResolved === 'function'
      ? onResolved
      : function (value) {
          return value;
        };

  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (error) {
          throw error;
        };

  // 如果是等待状态，则将函数加入对应列表中
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }

  // 如果状态已经凝固，则直接执行对应状态的函数

  if (this.state === RESOLVED) {
    onResolved(this.value);
  }

  if (this.state === REJECTED) {
    onRejected(this.value);
  }
};
```

> Promise.then()实现

```js
// promise.then
then(onFulfilled, onReject){
    // 保存前一个promise的this
    const self = this;
    return new MyPromise((resolve, reject) => {
      // 封装前一个promise成功时执行的函数
      let fulfilled = () => {
        try{
          const result = onFulfilled(self.value); // 承前
          return result instanceof MyPromise? result.then(resolve, reject) : resolve(result); //启后
        }catch(err){
          reject(err)
        }
      }
      // 封装前一个promise失败时执行的函数
      let rejected = () => {
        try{
          const result = onReject(self.reason);
          return result instanceof MyPromise? result.then(resolve, reject) : reject(result);
        }catch(err){
          reject(err)
        }
      }
      switch(self.status){
        case PENDING:
          self.onFulfilledCallbacks.push(fulfilled);
          self.onRejectedCallbacks.push(rejected);
          break;
        case FULFILLED:
          fulfilled();
          break;
        case REJECT:
          rejected();
          break;
      }
    })
   }
```

> Promise.all()实现

```js
//promise.all
function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`argument must be a array`);
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedResult = [];
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          resolvedCounter++;
          resolvedResult[i] = value;
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedResult);
          }
        },
        (error) => {
          return reject(error);
        },
      );
    }
  });
}
// test
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3);
  }, 3000);
});
promiseAll([p3, p1, p2]).then((res) => {
  console.log(res); // [3, 1, 2]
});
```

> Promise.race()实现

```js
// promise.race
Promise.race = function (args) {
  return new Promise((resolve, reject) => {
    for (let i = 0, len = args.length; i < len; i++) {
      args[i].then(resolve, reject);
    }
  });
};
```

## 12.排序算法(冒泡和快速排序)

```js {3,15} showLineNumbers
const arr = [2,12,46,657,23,67,15,6]

//冒泡排序  比较相邻的，每次循环排好一个元素
function  bubbleSort(arr) {
    for(let i = 0;i<arr.length;i++) {
        for(let j = i+1; j<arr.length;j++) {
            if(arr[i] > arr[j]) {
                [arr[i],arr[j]] = [arr[j],arr[i]] //交换两者位置
            }
        }
    }
    return arr;
}

//快速排序， 设定基准值，小的放在左边，大的放右边，每次排好基准值。
function quickSort(arr) {
    if(arr.length <= 1) return  arr;
    const left = [];
    const right = [];
    let pivot = arr[0];
    for(let i = 1; i<arr.length;i++) {
        if(arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return [...quickSort(left),pivot,...quickSort(right)]
    return quickSort(left).
}
```

[//]: # '## 10.数组扁平化'
