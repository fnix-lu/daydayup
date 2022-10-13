(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{367:function(t,e,a){"use strict";a.r(e);var s=a(41),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"redux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redux"}},[t._v("#")]),t._v(" Redux")]),t._v(" "),a("h2",{attrs:{id:"三大原则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三大原则"}},[t._v("#")]),t._v(" 三大原则")]),t._v(" "),a("ul",[a("li",[t._v("单一数据源"),a("br"),t._v(" "),a("strong",[t._v("整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。")])]),t._v(" "),a("li",[t._v("State 只读"),a("br"),t._v(" "),a("strong",[t._v("唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。")])]),t._v(" "),a("li",[t._v("使用纯函数执行修改"),a("br"),t._v(" "),a("strong",[t._v("为了描述 action 如何改变 state tree ，你需要编写 reducers。")])])]),t._v(" "),a("h2",{attrs:{id:"基础"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),a("h3",{attrs:{id:"action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#action"}},[t._v("#")]),t._v(" Action")]),t._v(" "),a("p",[t._v("一个包含 "),a("code",[t._v("type")]),t._v(" 字段的普通对象，除 "),a("code",[t._v("type")]),t._v(" 外，可任意自定用于变更 "),a("code",[t._v("state")]),t._v(" 的数据格式")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("{\n  type: TOGGLE_TODO,\n  index: 5\n}\n")])])]),a("h3",{attrs:{id:"action-创建函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#action-创建函数"}},[t._v("#")]),t._v(" Action 创建函数")]),t._v(" "),a("p",[t._v("返回 Action 的普通函数")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import { ADD_TODO } from '../actionTypes' // 非必要\n\nfunction addTodo(text) {\n  return {\n    type: ADD_TODO,\n    text\n  }\n}\n\ndispatch(addTodo(text))\n")])])]),a("h3",{attrs:{id:"reducer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reducer"}},[t._v("#")]),t._v(" Reducer")]),t._v(" "),a("p",[t._v("连接 "),a("code",[t._v("State")]),t._v(" 和 "),a("code",[t._v("Action")]),t._v(" ，接收旧的 "),a("code",[t._v("state")]),t._v(" 和 "),a("code",[t._v("action")]),t._v(" ，返回新的 "),a("code",[t._v("state")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("(previousState, action) => newState\n")])])]),a("p",[t._v("注意事项："),a("strong",[t._v("只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。")])]),t._v(" "),a("p",[t._v("示例")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const initialState = {\n  visibilityFilter: 'SHOW_ALL',\n  todos: []\n}\n\nfunction todoApp(state = initialState, action) {\n  switch (action.type) {\n    case 'SET_VISIBILITY_FILTER':\n      return Object.assign({}, state, {\n        visibilityFilter: action.filter\n      })\n    case 'ADD_TODO':\n      return Object.assign({}, state, {\n        todos: [\n          ...state.todos,\n          {\n            text: action.text,\n            completed: false\n          }\n        ]\n      })\n    case 'TOGGLE_TODO':\n      return Object.assign({}, state, {\n        todos: state.todos.map((todo, index) => {\n          if (index === action.index) {\n            return Object.assign({}, todo, {\n              completed: !todo.completed\n            })\n          }\n          return todo\n        })\n      })\n    default:\n      return state\n  }\n}\n")])])]),a("ol",[a("li",[t._v("不要修改 "),a("code",[t._v("state")])]),t._v(" "),a("li",[t._v("在 "),a("code",[t._v("default")]),t._v(" 情况下返回旧的 "),a("code",[t._v("state")])])]),t._v(" "),a("h3",{attrs:{id:"reducer-拆分"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reducer-拆分"}},[t._v("#")]),t._v(" Reducer 拆分")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("function todos(state = [], action) {\n  switch (action.type) {\n    case ADD_TODO:\n      return [\n        ...state,\n        {\n          text: action.text,\n          completed: false\n        }\n      ]\n    case TOGGLE_TODO:\n      return state.map((todo, index) => {\n        if (index === action.index) {\n          return Object.assign({}, todo, {\n            completed: !todo.completed\n          })\n        }\n        return todo\n      })\n    default:\n      return state\n  }\n}\n\nfunction visibilityFilter(state = SHOW_ALL, action) {\n  switch (action.type) {\n    case SET_VISIBILITY_FILTER:\n      return action.filter\n    default:\n      return state\n  }\n}\n\n// 主 reducer\nfunction todoApp(state = {}, action) {\n  return {\n    visibilityFilter: visibilityFilter(state.visibilityFilter, action),\n    todos: todos(state.todos, action)\n  }\n}\n\n// 主 reducer 简化\nimport { combineReducers } from 'redux'\n\nconst todoApp = combineReducers({\n  visibilityFilter,\n  todos\n})\n")])])]),a("h3",{attrs:{id:"store"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#store"}},[t._v("#")]),t._v(" Store")]),t._v(" "),a("ul",[a("li",[t._v("维持应用的 state")]),t._v(" "),a("li",[t._v("提供 "),a("code",[t._v("getState()")]),t._v(" 方法获取 state")]),t._v(" "),a("li",[t._v("提供 "),a("code",[t._v("dispatch(action)")]),t._v(" 方法更新 state")]),t._v(" "),a("li",[t._v("通过 "),a("code",[t._v("subscribe(listener)")]),t._v(" 注册监听器")]),t._v(" "),a("li",[t._v("通过 "),a("code",[t._v("subscribe(listener)")]),t._v(" 返回的函数注销监听器")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import { createStore } from 'redux'\nimport todoApp from './reducers'\nlet store = createStore(todoApp)\n")])])]),a("h3",{attrs:{id:"发起-actions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#发起-actions"}},[t._v("#")]),t._v(" 发起 Actions")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import {\n  addTodo,\n  toggleTodo,\n  setVisibilityFilter,\n  VisibilityFilters\n} from './actions'\n\n// 打印初始状态\nconsole.log(store.getState())\n\n// 每次 state 更新时，打印日志\n// 注意 subscribe() 返回一个函数用来注销监听器\nconst unsubscribe = store.subscribe(() =>\n  console.log(store.getState())\n)\n\n// 发起一系列 action\nstore.dispatch(addTodo('Learn about actions'))\nstore.dispatch(addTodo('Learn about reducers'))\nstore.dispatch(addTodo('Learn about store'))\nstore.dispatch(toggleTodo(0))\nstore.dispatch(toggleTodo(1))\nstore.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))\n\n// 停止监听 state 更新\nunsubscribe()\n")])])]),a("h3",{attrs:{id:"数据流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数据流"}},[t._v("#")]),t._v(" 数据流")]),t._v(" "),a("p",[t._v("Redux 应用中数据的生命周期遵循 4 个步骤")]),t._v(" "),a("ol",[a("li",[t._v("调用 "),a("code",[t._v("store.dispatch(action)")])]),t._v(" "),a("li",[t._v("Redux store 调用传入的 reducer 函数")]),t._v(" "),a("li",[t._v("根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树")]),t._v(" "),a("li",[t._v("Redux store 保存了根 reducer 返回的完整 state 树")])]),t._v(" "),a("h2",{attrs:{id:"react-redux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-redux"}},[t._v("#")]),t._v(" React-Redux")]),t._v(" "),a("p",[t._v("安装")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("yarn add react-redux\n")])])]),a("p",[t._v("React-Redux 将组件划分为展示组件和容器组件。React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。")]),t._v(" "),a("h3",{attrs:{id:"connect"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#connect"}},[t._v("#")]),t._v(" connect()")]),t._v(" "),a("p",[t._v("从展示组件生成容器组件")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import { connect } from 'react-redux'\nconst VisibleTodoList = connect(\n  // 输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数\n  mapStateToProps,\n  // 输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去\n  mapDispatchToProps\n)(TodoList)\n")])])]),a("h3",{attrs:{id:"mapstatetoprops"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mapstatetoprops"}},[t._v("#")]),t._v(" mapStateToProps()")]),t._v(" "),a("p",[t._v("函数，建立一个从（外部的）state 对象到（UI 组件的）props 对象的映射关系")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const mapStateToProps = (state) => {\n  return {\n    todos: getVisibleTodos(state.todos, state.visibilityFilter) // todos 为 UI 组件同名参数\n  }\n}\n\nconst getVisibleTodos = (todos, filter) => {\n  switch (filter) {\n    case 'SHOW_ALL':\n      return todos\n    case 'SHOW_COMPLETED':\n      return todos.filter(t => t.completed)\n    case 'SHOW_ACTIVE':\n      return todos.filter(t => !t.completed)\n    default:\n      throw new Error('Unknown filter: ' + filter)\n  }\n}\n")])])]),a("p",[t._v("mapStateToProps 会订阅 Store，每当 state 更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。")]),t._v(" "),a("p",[t._v("mapStateToProps 的第一个参数总是 state 对象，还可以使用第二个参数，代表容器组件的 props 对象。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('// 容器组件的代码\n<FilterLink filter="SHOW_ALL">\n  All\n</FilterLink>\n\nconst mapStateToProps = (state, ownProps) => {\n  return {\n    active: ownProps.filter === state.visibilityFilter\n  }\n}\n\n')])])]),a("p",[t._v("使用 ownProps 作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。")]),t._v(" "),a("h3",{attrs:{id:"mapdispatchtoprops"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mapdispatchtoprops"}},[t._v("#")]),t._v(" mapDispatchToProps()")]),t._v(" "),a("p",[t._v("函数或对象，建立 UI 组件的参数到 store.dispatch 方法的映射")]),t._v(" "),a("ul",[a("li",[t._v("作为函数")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const mapDispatchToProps = (dispatch, ownProps) => {\n  return {\n    onClick: () => {\n      dispatch({\n        type: 'SET_VISIBILITY_FILTER',\n        filter: ownProps.filter\n      })\n    }\n  }\n}\n\n")])])]),a("ul",[a("li",[t._v("作为对象")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("const mapDispatchToProps = {\n  // key: UI 组件的 prop\n  // value: 作为 Action Creator 的函数\n  // 返回的 Action 会由 Redux 自动发出\n  // 此示例等价于上方“作为函数”\n  onClick: (filter) => ({\n    type: 'SET_VISIBILITY_FILTER',\n    filter: filter\n  })\n}\n\n")])])]),a("h3",{attrs:{id:"provider-组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#provider-组件"}},[t._v("#")]),t._v(" "),a("code",[t._v("<Provider>")]),t._v(" 组件")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("import { createStore } from 'redux'\nimport { Provider } from 'react-redux'\nimport todoApp from './reducers'\nimport App from './components/App'\n\nlet store = createStore(todoApp);\n\nrender(\n  <Provider store={store}>\n    <App />\n  </Provider>,\n  document.getElementById('root')\n)\n")])])]),a("h2",{attrs:{id:"q-a"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#q-a"}},[t._v("#")]),t._v(" Q & A")]),t._v(" "),a("ol",[a("li",[a("strong",[t._v("Q")]),t._v("：UI 组件不能带 state 吗，与 redux 无关的自身 state 呢？"),a("br"),t._v(" "),a("strong",[t._v("A")]),t._v("：可以保留自身的 state")]),t._v(" "),a("li",[a("strong",[t._v("Q")]),t._v("：UI 组件与 redux 无关的 props 如何传入，传给容器组件再 mapStateToProps 映射一遍吗？"),a("br"),t._v(" "),a("strong",[t._v("A")]),t._v("：无需映射或处理，在容器组件添加属性即可在 UI 组件中使用该 prop")]),t._v(" "),a("li",[a("strong",[t._v("Q")]),t._v("：容器组件能否与 UI 组件处于一个文件，导出使用 connect(mapStateToProps, mapDispatchToProps)(Class) 转换的容器组件？此时引用该组件，传入的 props 是否可直接传入到内部的 Class 组件 (Q2)？"),a("br"),t._v(" "),a("strong",[t._v("A")]),t._v("：可以，一般也是这样实践，其余属性会直接传递给 Class 组件")]),t._v(" "),a("li",[a("strong",[t._v("Q")]),t._v("：由上述 3 个问题推论，使用 react-redux 后，如果要使用 store 中的数据，是否要把组件所有的逻辑处理迁移到 mapStateToProps 和 mapDispatchToProps 中？"),a("br"),t._v(" "),a("strong",[t._v("A")]),t._v("：不需要，mapStateToProps 和 mapDispatchToProps 仅处理和 redux 有关的逻辑")])])])}),[],!1,null,null,null);e.default=r.exports}}]);