# TypeScript

## 安装

```
npm install -g typescript
```

## 编译

```
tsc hello.ts
```

TypeScript 中，使用 `:` 指定变量的类型

## 原始数据类型

### 布尔值

```
let isDone: boolean = false;
```

### 数值

```
let decLiteral: number = 6;
```

### 字符串

```
let myName: string = 'Tom';
```

### 空值

使用 `void` 表示没有返回值的函数

```
function alertName(): void {
    alert('My name is Tom');
}
```

### Null 和 Undefined

```
let n: null = null;
let u: undefined = undefined;
```

`null` 和 `undefined` 是所有类型的子类型

```
// 这样不会报错
let num: number = undefined;

// 这样也不会报错
let u: undefined;
let num: number = u;
```

`void` 类型的变量不能赋值给 `number` 类型的变量

```
let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.
```

## 任意值类型

任意值 `any` 用来表示允许赋值为任意类型

普通类型的变量在赋值时改变数据类型会报错

```
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

`any` 类型可以在赋值时改变数据类型

```
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值**

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**

```
let something;
```

等价于

```
let something: any;
```

## 类型推论

如果变量定义的时候有赋值，会根据该值做类型推论；而如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查

```
let myFavoriteNumber = 'seven';
```

等价于

```
let myFavoriteNumber: string = 'seven';
```

## 联合类型（多种类型）

```
let myFavoriteNumber: string | number;
```

### 访问联合类型的属性和方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**

以下 `length` 不是 `string` 和 `number` 的共有属性，所以会报错

```
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
// Property 'length' does not exist on type 'number'.
```

## 对象的类型 —— `interface`

```
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};
```

**赋值的时候，变量的形状必须和接口的形状保持一致，不能少属性或多属性。若要允许不完全匹配，使用可选属性**

### 可选属性

```
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
```

**可选属性仍然不允许添加未定义的属性。若希望添加未定义的属性，使用任意属性**

### 任意属性

```
interface Person {
    name: string;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

```
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

### 只读属性

使用 `readonly` 限定对象的某些属性只能在创建的时候赋值

```
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

// 此时赋值会报错
tom.id = 9527;
```

**只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：对象赋值时其只读属性需要被赋值，对象赋值后不能再给只读属性赋值**

## 数组类型

### 类型 + 方括号 表示法

```
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

### 数组泛型

```
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

### 用接口表示数组

```
interface NumberArray {
    [index: number]: number;
}

let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

### 类数组

```
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

常用的类数组在 TypeScript 中有内置的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等

```
function sum() {
    let args: IArguments = arguments;
}
```

其中 `IArguments`

```
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

### 数组中的 any

用 `any` 表示数组中可以出现任意类型

```
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```

## 函数类型

### 函数声明

```
function sum(x: number, y: number): number {
    return x + y;
}
```

此时，**输入多余的（或者少于要求的）参数，是不被允许的，参数数量须一致**

### 函数表达式

```
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

### 用接口定义函数的形状

```
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

### 可选参数

```
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

可选参数必须接在必需参数后面，**可选参数后面不允许再出现必需参数**

### 参数默认值

**TypeScript 会将添加了默认值的参数识别为可选参数**

```
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

### 剩余参数

```
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```

### 重载

```
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

## 类型断言

### 语法

```
值 as 类型
```

### 将一个联合类型断言为其中一个类型

```
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```

### 将一个父类断言为更加具体的子类

```
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

### 将任何一个类型断言为 `any`

```
window.foo = 1;

// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```

上面的例子中，我们需要将 `window` 上添加一个属性 `foo`，但 TypeScript 编译时会报错，提示我们 `window` 上不存在 `foo` 属性

```
(window as any).foo = 1;
```

### 将 `any` 断言为一个具体的类型

```
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

## 内置对象

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当作定义好的类型

### ECMAScript 的内置对象

`Boolean`, `Error`, `Date`, `RegExp` 等

```
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

### DOM 和 BOM 的内置对象

`Document`, `HTMLElement`, `Event`, `NodeList` 等

```
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

### 用 TypeScript 写 Node.js

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件

```
npm install @types/node --save-dev
```
