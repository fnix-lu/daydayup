# Vue3

## 响应式

### `reactive()`

从 JS 对象中创建响应式状态，组件的 `data()` 返回的状态也在内部调用了 `reactive()`

```
import { reactive } from 'vue'

// reactive state
const state = reactive({
  count: 0
})
```

### `ref()`

将独立的值包装为响应式对象，该对象仅包含一个 `value` 属性

```
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

该对象通过 `setup()` 返回作为渲染上下文的属性或者在模板中使用时会自动解包，无需添加 `.value`

```
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="count ++">Increment count</button>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    setup() {
      const count = ref(0)
      return {
        count
      }
    }
  }
</script>
```

在响应式对象中访问 `ref` 生成的对象时，也会自动解包

```
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

如果将一个新的 ref 指定给一个已指向已有 ref 的属性，新的 ref 会替换旧的指向

```
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
console.log(count.value) // 1
```

ref 仅会在响应式的 **Object** 中自动解包，在 Array 或 Map 中需要使用 `.value` 访问属性值

```
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```

### `toRefs()`

使用解构赋值时，赋值后的变量会丢失数据的响应式，使用 `toRefs()` 可以将响应式对象转换为 ref 集合，之后再解构，将保持被赋值变量的响应式

```
import { reactive, toRefs } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free'
})

let { author, title } = toRefs(book)

title.value = 'Vue 3 Detailed Guide' // we need to use .value as title is a ref now
console.log(book.title) // 'Vue 3 Detailed Guide'
```

### `readonly()`

```
import { reactive, readonly } from 'vue'

const original = reactive({ count: 0 })

const copy = readonly(original)

// mutating original will trigger watchers relying on the copy
original.count++

// mutating the copy will fail and result in a warning
copy.count++ // warning: "Set operation on key 'count' failed: target is readonly."
```

## Composition API (setup)

当一个组件中的业务越来越多，Vue 2 的组件代码组织会使得同一个业务相关的代码被分散在组件的不同位置，不便于理解和维护，Vue 3 的 Composition API 允许代码按业务进行拆分，在组件的 `setup` 选项中统一引入。

`setup` 在组件被创建之前执行，所以 `setup` 选项中无法访问 `this` ，这意味着也无法访问组件的本地状态 `data`，计算属性 `computed`，方法 `methods`。

### setup()

接收两个参数：`props`, `context`

```
setup (props, { attrs, slots, emit }) {
}
```

#### `props`

传入组件的属性，并且是响应式的，如果使用解构语法，需要使用 `toRefs` 保持响应式

```
import { toRefs } from 'vue'

setup(props) {
  const { title } = toRefs(props)
  console.log(title.value)
}
```

#### `context`

```
const { attrs, slots, emit } = context
```

### Lifecycle Hooks

`setup()` 中的生命周期函数使用前缀 `on`，例如 `onMounted()`，生命周期函数接收函数类型的参数。

`beforeCreate` 和 `created` 在 `setup()` 中不需要明确定义，本应写在其中的代码直接写在 `setup()` 函数中。

```
export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })
  }
}
```

---

## 应用程序和组件实例

### createApp

使用 `createApp` 创建 Vue 应用示例

```
const app = Vue.createApp({ /* options */ })

app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)

// 或链式调用
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
```

### Provide / Inject

```
// in the entry
app.provide('guide', 'Vue 3 Guide')

// in a child component
export default {
  inject: {
    book: {
      from: 'guide'
    }
  },
  template: `<div>{{ book }}</div>`
}
```

## Class 和 Style 绑定

由于 Vue 3 组件支持多个根元素，引用组件时，在组件标签上添加的 class 和 style 需要在组件内部显式地指明添加的位置

```
<my-component class="baz"></my-component>

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p>
    <span>This is a child component</span>
  `
})
```

## 条件渲染

Vue 3 中，`v-if` 与 `v-for` 一起使用时，`v-if` 优先级高，这与 Vue 2 相反，对于原本需要同时使用的情况，建议使用计算属性过滤出可见数据列表。

## 列表渲染

### `v-for` 中的 `ref`

Vue 2 中，在 `v-for` 的元素上使用 `ref` 属性，会生成一个元素引用的数组。

Vue 3 中，该用法不再生成数组，可以给 `ref` 绑定一个函数，当前元素会作为该函数的参数传入，从而手动添加到一个数组（或对象，使用迭代的 `key` 作为键）中。

```
<div v-for="item in list" :ref="setItemRef"></div>

export default {
  data() {
    return {
      // 声明存放元素引用的数组
      itemRefs: []
    }
  },
  methods: {
    // 给 ref 传入函数，手动将元素引用加入数组
    setItemRef(el) {
      this.itemRefs.push(el)
    }
  },
  beforeUpdate() {
    this.itemRefs = []
  },
  updated() {
    console.log(this.itemRefs)
  }
}
```

## 事件处理

### 绑定

事件可以绑定多个处理函数，使用逗号分隔

```
<button @click="one($event), two($event)">
  Submit
</button>

methods: {
  one(event) {
    //
  },
  two(event) {
    //
  }
}
```

### `$on`, `$off`, `$once`

这三个方法被移除，保留 `$emit` 用于子组件触发由父组件处理的事件

event bus 官方推荐使用第三方库：mitt 或 tiny-emitter

## 属性强制行为

当元素的属性值为 `false` 时不再移除属性，而是设置为 `attr="false"`，若要移除属性，请使用 `null` 或 `undefined`

## 自定义元素

`is` 属性只能用于 `<component>` 标签，其余标签中使用 `v-is`

## Data 选项

当从 mixins 合并 data 时，将使用浅合并

```
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}
```

Vue 2 中，`$data` 为

```
{
  user: {
    id: 2,
    name: 'Jack' // Mixin 中的 name 属性也会并入
  }
}
```

Vue 3 中，`$data` 为

```
{
  user: {
    id: 2
    // 被 data 中的 user 覆盖，不存在 name 属性
  }
}
```

## Filters

Vue 3 中移除了 Filters ，官方建议在需要文本格式化的地方使用方法调用或计算属性。

可通过在 `app` 实例上绑定全局函数，变相实现全局 Filters

```
const app = createApp(App)

app.config.globalProperties.$filters = {
  currencyUSD(value) {
    return '$' + value
  }
}

<template>
  <h1>Bank Account Balance</h1>
  <p>{{ $filters.currencyUSD(accountBalance) }}</p>
</template>
```

## `key` 属性

在条件渲染 (`v-if`/`v-else`/`v-else-if`) 中，`key` 属性不再建议使用，Vue 3 会自动生成唯一的 `key` ，但如果手动提供了 `key` ，则每个条件分支都需要一个唯一的 `key`。

在 `<template v-for>` 中使用 `key` 时，现在需要将 `key` 绑定于 `<template>` 标签上，而不再是原先实际渲染的子元素。

## KeyCode 修饰符

不再支持使用按键码作为键盘事件修饰符，也不再支持使用 `config.keyCodes` 配置按键码别名，Vue 3 中推荐使用 kebab-case 的按键名称作为修饰符。

## 组件 Props

`props` 中，指定默认值的 `default` 工厂函数无法访问 `this` ，取而代之的是，组件接收到的原始属性会最为参数传给工厂函数

## Slots

`this.$slots` 将 slots 暴露为函数

`this.$scopedSlots` 被移除

```
// 2.x Syntax
this.$scopedSlots.header

// 3.x Syntax
this.$slots.header()
```

## 过渡效果的样式类变更

- `v-enter` => `v-enter-from`
- `v-leave` => `v-leave-from`

```
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

`<transition>` 组件的属性名变更

- `leave-class` => `leave-from-class`
- `enter-class` => `enter-from-class`

## v-model

使用于自定义组件时，默认监听的属性和事件变更：

- 属性：`value` => `modelValue`
- 事件：`input` => `update:modelValue`

```
<ChildComponent v-model="pageTitle" />

<!-- 等价于 -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
```

上述改动在 Vue 2 中，等价于 `v-bind:modelValue.sync` ，但在 Vue 3，`v-bind` 的 `.sync` 修饰符和组件 `model` 选项均被移除，通过 `v-model:prop` 的形式统一在 `v-model` 的用法中。

```
<ChildComponent v-model:title="pageTitle" />

<!-- 等价于 -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

因此，同一组件支持使用多个 `v-model`

```
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- 等价于 -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

### `v-model` 支持自定义修饰符

目前支持的内置修饰符：`.trim`, `.number`, `.lazy`

`v-model` 上添加的自定义修饰符会通过组件的 `modelModifiers` (无参 `v-model`) 或 `prop + 'Modifiers'` (带参 `v-model:prop`) 属性传入，

```
<my-component v-model.capitalize="bar"></my-component>

app.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  template: `
    <input type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
  `,
  created() {
    console.log(this.modelModifiers) // { capitalize: true } 组件调用时使用了的修饰符
  }
})
```

```
<my-component v-model:foo.capitalize="bar"></my-component>

app.component('my-component', {
  props: ['foo', 'fooModifiers'],
  template: `
    <input type="text"
      :value="foo"
      @input="$emit('update:foo', $event.target.value)">
  `,
  created() {
    console.log(this.fooModifiers) // { capitalize: true }
  }
})
```

根据某属性的修饰符 map 中是否存在某个修饰符，做相应的数据处理

```
<my-component v-model:foo.capitalize="bar"></my-component> // fooModifiers => { capitalize: true }

// data handler
...
if (this.fooModifiers.capitalize) {
  value = value.charAt(0).toUpperCase() + value.slice(1)
}
...
this.$emit('update:foo', value)
```

## v-bind 合并行为

`v-bind` 绑定顺序会影响渲染结果

Vue 2 中，单独绑定的属性会覆盖 `v-bind="object"` 中的同名属性

```
<!-- template -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- result -->
<div id="red"></div>
```

Vue 3 中，按绑定顺序合并，后绑定的覆盖先绑定的

```
<!-- template -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- result -->
<div id="blue"></div>

<!-- template -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- result -->
<div id="red"></div>
```
