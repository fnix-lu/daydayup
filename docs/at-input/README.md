# @ 功能输入框

```
<template>
  <div class="at-input">
    <div
      class="at-input-editor"
      contenteditable="true"
      ref="atInputEditor"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @click="handleClick"
      @paste="handlePaste"
      data-placeholder="Write something... Enter @ to mention someone"
    ></div>

    <div class="at-input-counter"><span :class="{ danger: textCount > maxLength }">{{ getTextCount() }}</span>/{{ maxLength }}</div>

    <div :class="['at-input-selector', { show: atInputSelectorVisible }]">
      <ul class="user-list" @scroll="handleScroll" v-if="users && users.length > 0">
        <li
          class="user-item"
          v-for="u in users"
          :key="u.id"
          @click="handleSelect(u)"
        >
          {{ u.nickname }}
        </li>
      </ul>
      <p class="at-input-selector-placeholder" v-else>@ Someone: Enter keywords to search, or enter space to continue</p>
    </div>
  </div>
</template>

<script>
import { debounce, trim, trimHtml } from '@/utils/utils'

import {
  fetchUserPagingList
} from '@/api'

export default {
  name: 'AtInput',
  props: {
    maxLength: {
      type: Number,
      default: 2000
    },
    clear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lastRange: null,
      // remote search
      atInputSelectorVisible: false,
      lastSearchKey: '',
      users: [],
      pageIndex: 1,
      pageCount: 0,
      currentUserNodeValue: '',
      textCount: 0
    }
  },
  watch: {
    clear(n) {
      if (n) {
        this.$refs.atInputEditor.innerHTML = ''
        this.getTextCount()
      }
    }
  },
  methods: {
    getContent() {
      const editor = this.$refs.atInputEditor
      const content = {
        html: editor ? trimHtml(editor.innerHTML) : '',
        text: editor ? trim(editor.innerText) : ''
      }

      return content
    },

    getTextCount() {
      return this.textCount = this.getContent().text.length
    },

    emitChange() {
      this.$emit('change', this.getContent())
    },

    handleKeydown(e) {
      // 获取字符输入前的光标
      const selection = window.getSelection()
      this.lastRange = selection.getRangeAt(0)

      const startContainer = this.lastRange.startContainer
      const parentNode = startContainer.parentNode

      // 按下 @
      if (e.code === 'Digit2' && e.shiftKey) {
        // 如果在 @ 用户节点内按下 @，在进入新的 @ 用户节点之前，移除当前用户节点的 id
        if (parentNode.className === 'at' && parentNode.childNodes.length === 1) {
          parentNode.removeAttribute('data-id')
        }

        // 创建 @ 用户节点
        const userNode = document.createElement('span')
        userNode.className = 'at'
        const textNode = document.createTextNode('@')
        userNode.appendChild(textNode)

        // 将用户节点插入光标内
        this.lastRange.insertNode(userNode)

        // 将光标移入 @ 用户节点内末尾
        this.lastRange.setEnd(textNode, textNode.length)
        this.lastRange.collapse()

        e.preventDefault()
        return
      }

      // 按下空格
      if (e.code === 'Space' && !e.shiftKey) {
        // 如果处于 @ 用户节点内末尾
        if (parentNode.className === 'at' && parentNode.childNodes.length === 1 && this.lastRange.startOffset === startContainer.length) {
          // 将光标移至节点外部之后
          this.lastRange.setEndAfter(parentNode)
          this.lastRange.collapse()

          console.log(this.lastRange)

          // 插入空格
          const spaceNode = document.createTextNode('\u00A0')
          this.lastRange.insertNode(spaceNode)
          this.lastRange.collapse()

          e.preventDefault()
        }
      }
    },

    handleKeyup(e) {
      // 获取最新的光标
      const selection = window.getSelection()
      this.lastRange = selection.getRangeAt(0)

      const startContainer = this.lastRange.startContainer
      const nodeValue = startContainer.nodeValue
      const parentNode = startContainer.parentNode

      if (parentNode.className === 'at' && parentNode.childNodes.length === 1) {
        /* 松开按键时，若处于 @ 用户节点中 */

        // 显示用户选项
        this.atInputSelectorVisible = true

        // 如果松开的是方向键（通过方向键移入节点），储存当点用户的节点字符
        const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        if (arrows.includes(e.code)) {
          this.currentUserNodeValue = nodeValue
        }

        // 如果节点字符（包括 @）不是原始内容了，移除当前用户节点的 id
        if (nodeValue !== this.currentUserNodeValue) {
          parentNode.removeAttribute('data-id')
        }

        // 提取关键字，如果关键字发生改变，远程查询用户
        const result = /^@(.*)$/.exec(nodeValue)
        const searchKey = result ? result[1] : ''
        if (searchKey !== this.lastSearchKey) {
          this.handleSearch(searchKey)
          this.lastSearchKey = searchKey
        }
      } else {
        /* 松开按键时，若不在 @ 用户节点中 */

        // 重置并关闭用户选项
        this.resetAtInputSelector()
      }

      this.emitChange()
    },

    handleClick(e) {
      // 获取点击后的光标
      const selection = window.getSelection()
      this.lastRange = selection.getRangeAt(0)

      const startContainer = this.lastRange.startContainer
      const parentNode = startContainer.parentNode

      if (parentNode.className === 'at' && parentNode.childNodes.length === 1) {
        this.currentUserNodeValue = startContainer.nodeValue
        this.handleKeyup(e)
      } else {
        this.resetAtInputSelector()
      }
    },

    handlePaste() {
      const selection = window.getSelection()
      this.lastRange = selection.getRangeAt(0)

      const startContainer = this.lastRange.startContainer
      const parentNode = startContainer.parentNode

      if (parentNode.className === 'at' && parentNode.childNodes.length === 1) {
        parentNode.removeAttribute('data-id')
      }
    },

    fetchUsers(searchKey) {
      const params = {
        pageNo: this.pageIndex,
        pageSize: 20,
        nickname: searchKey,
        status: 1
      }
      fetchUserPagingList(params).then(res => {
        this.pageCount = res.data.pages
        this.users = this.pageIndex === 1
          ? res.data.records
          : this.users.concat(res.data.records)
      })
    },

    handleSearch: debounce(function(searchKey) {
      this.pageIndex = 1
      this.fetchUsers(searchKey)
    }),

    handleSelect(user) {
      const selection = window.getSelection()

      // 设置 @ 用户节点的数据
      const userNode = this.lastRange.startContainer.parentNode
      userNode.innerHTML = '@' + user.nickname
      userNode.setAttribute('data-id', user.id)

      // 将光标移至节点外部末尾
      this.lastRange.setEndAfter(userNode)
      this.lastRange.collapse()

      // 创建空格分隔符，并插入光标内
      const spaceNode = document.createTextNode('\u00A0')
      this.lastRange.insertNode(spaceNode)
      this.lastRange.collapse()

      // 显示光标
      selection.removeAllRanges()
      selection.addRange(this.lastRange)

      // 重置并关闭用户选项
      this.resetAtInputSelector()

      this.emitChange()
    },

    resetAtInputSelector() {
      this.atInputSelectorVisible = false
      this.lastSearchKey = ''
      this.users = []
      this.pageIndex = 1
      this.pageCount = 0
    },

    handleScroll: debounce(function(e) {
      const { scrollTop, scrollHeight, offsetHeight } = e.target
      if (scrollTop > scrollHeight - offsetHeight - 5) {
        const { pageIndex, pageCount } = this
        if (pageIndex < pageCount) {
          this.pageIndex++
          this.fetchUsers(this.lastSearchKey)
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
.at-input {
  position: relative;
}

.at-input-editor {
  line-height: 1.5em;
  height: 4.5em;
  padding: 0 4px;
  overflow: auto;
  outline-color: @primary-color;
  -webkit-user-modify: read-write-plaintext-only;
  &:empty::before {
    content: attr(data-placeholder);
    color: #C0C4CC;
  }

  /deep/ .at[data-id] {
    color: @primary-color;
  }
}

.at-input-counter {
  color: #C0C4CC;
  padding: 0 4px;
  line-height: 30px;
  float: left;
  .danger {
    color: @danger-color;
  }
}

.at-input-selector {
  border: 1px solid @border-color-base;
  background: #fff;
  position: absolute;
  top: 64px;
  left: -1px;
  right: -1px;
  z-index: 2;
  display: none;
  &.show {
    display: block;
  }

  .at-input-selector-placeholder {
    color: #C0C4CC;
    padding: 0 4px;
  }
}

.user-list {
  line-height: 1.5em;
  max-height: 15em;
  overflow: auto;
  .user-item {
    padding: 0 4px;
    cursor: pointer;
    &:hover {
      background: @primary-color-light;
    }
  }
}
</style>

```
