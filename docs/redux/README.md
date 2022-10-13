# Redux

## 三大原则

- 单一数据源  
  **整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。**
- State 只读  
  **唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。**
- 使用纯函数执行修改  
  **为了描述 action 如何改变 state tree ，你需要编写 reducers。**

## 基础

### Action

一个包含 `type` 字段的普通对象，除 `type` 外，可任意自定用于变更 `state` 的数据格式

```
{
  type: TOGGLE_TODO,
  index: 5
}
```

### Action 创建函数

返回 Action 的普通函数

```
import { ADD_TODO } from '../actionTypes' // 非必要

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

dispatch(addTodo(text))
```

### Reducer

连接 `State` 和 `Action` ，接收旧的 `state` 和 `action` ，返回新的 `state`

```
(previousState, action) => newState
```

注意事项：**只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。**

示例

```
const initialState = {
  visibilityFilter: 'SHOW_ALL',
  todos: []
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    case 'TOGGLE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      })
    default:
      return state
  }
}
```

1. 不要修改 `state`
2. 在 `default` 情况下返回旧的 `state`

### Reducer 拆分

```
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

// 主 reducer
function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}

// 主 reducer 简化
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter,
  todos
})
```

### Store

- 维持应用的 state
- 提供 `getState()` 方法获取 state
- 提供 `dispatch(action)` 方法更新 state
- 通过 `subscribe(listener)` 注册监听器
- 通过 `subscribe(listener)` 返回的函数注销监听器

```
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```

### 发起 Actions

```
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'

// 打印初始状态
console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// 发起一系列 action
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
unsubscribe()
```

### 数据流

Redux 应用中数据的生命周期遵循 4 个步骤

1. 调用 `store.dispatch(action)`
2. Redux store 调用传入的 reducer 函数
3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树
4. Redux store 保存了根 reducer 返回的完整 state 树

## React-Redux

安装

```
yarn add react-redux
```

React-Redux 将组件划分为展示组件和容器组件。React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

### connect()

从展示组件生成容器组件

```
import { connect } from 'react-redux'
const VisibleTodoList = connect(
  // 输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数
  mapStateToProps,
  // 输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去
  mapDispatchToProps
)(TodoList)
```

### mapStateToProps()

函数，建立一个从（外部的）state 对象到（UI 组件的）props 对象的映射关系

```
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter) // todos 为 UI 组件同名参数
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
```

mapStateToProps 会订阅 Store，每当 state 更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

mapStateToProps 的第一个参数总是 state 对象，还可以使用第二个参数，代表容器组件的 props 对象。

```
// 容器组件的代码
<FilterLink filter="SHOW_ALL">
  All
</FilterLink>

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

```

使用 ownProps 作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。

### mapDispatchToProps()

函数或对象，建立 UI 组件的参数到 store.dispatch 方法的映射

- 作为函数

```
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      })
    }
  }
}

```

- 作为对象

```
const mapDispatchToProps = {
  // key: UI 组件的 prop
  // value: 作为 Action Creator 的函数
  // 返回的 Action 会由 Redux 自动发出
  // 此示例等价于上方“作为函数”
  onClick: (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  })
}

```

### `<Provider>` 组件

```
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## Q & A

1. **Q**：UI 组件不能带 state 吗，与 redux 无关的自身 state 呢？  
   **A**：可以保留自身的 state
2. **Q**：UI 组件与 redux 无关的 props 如何传入，传给容器组件再 mapStateToProps 映射一遍吗？  
   **A**：无需映射或处理，在容器组件添加属性即可在 UI 组件中使用该 prop
3. **Q**：容器组件能否与 UI 组件处于一个文件，导出使用 connect(mapStateToProps, mapDispatchToProps)(Class) 转换的容器组件？此时引用该组件，传入的 props 是否可直接传入到内部的 Class 组件 (Q2)？  
   **A**：可以，一般也是这样实践，其余属性会直接传递给 Class 组件
4. **Q**：由上述 3 个问题推论，使用 react-redux 后，如果要使用 store 中的数据，是否要把组件所有的逻辑处理迁移到 mapStateToProps 和 mapDispatchToProps 中？  
   **A**：不需要，mapStateToProps 和 mapDispatchToProps 仅处理和 redux 有关的逻辑
