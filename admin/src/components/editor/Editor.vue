<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
      @onCreated="handleCreated" />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, onMounted, ref, shallowRef, defineProps, defineEmits, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'


const props = defineProps({
  content: String
})

const emits = defineEmits(['changeContent'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(props.content)

let timer
watch(valueHtml, () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    emits('changeContent', valueHtml)
  }, 1000)
})

const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script> 