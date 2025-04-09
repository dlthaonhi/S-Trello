<template>
  <textarea
    class="textarea-autosize"
    :class="{ 'disabled-blur': alwaysFocus }"
    v-model="value"
    ref="textarea"
    @input="resizeTextarea"
    rows="1"
    @keydown.enter="handleEnter"
    @blur="handleBlur"
    :style="style"
  ></textarea>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'

const emit = defineEmits(['enter, blur'])
const props = defineProps([
  'minHeight',
  'fontSize',
  'fontWeight',
  'color',
  'lineHeight',
  'focus',
  'alwaysFocus',
  'selectText'
])

const value = defineModel()
const textarea = ref(null)
onMounted(() => {
  if (!textarea.value) return
  nextTick(resizeTextarea)
  if (props.focus) {
    textarea.value.focus()
  }
  if (props.selectText) {
    textarea.value.select()
  }
})
const style = computed(() => {
  return {
    minHeight: props.minHeight || '16px',
    fontSize: props.fontSize || '16px',
    fontWeight: props.fontWeight || '400',
    color: props.color || '#172b4d',
    lineHeight: props.lineHeight || props.fontSize || '16px'
  }
})
function resizeTextarea() {
  if (!textarea.value) return
  textarea.value.style.height = 'auto'
  textarea.value.style.height = `${textarea.value.scrollHeight}px`
}

function handleEnter(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
    emit('enter')
  }
}
function handleBlur() {
  emit('blur')
}
</script>

<style scoped>
.textarea-autosize {
  display: block;
  box-sizing: border-box;
  border: none;
  background: #0000;
  border-radius: 4px;
  box-shadow: none;
  padding: 6px 10px;
  resize: none;
  overflow: hidden;
  overflow-wrap: break-word;
  width: 100%;
  outline: none;
}

.textarea-autosize:focus,
.textarea-autosize.disabled-blur {
  background-color: #fff;
  box-shadow: inset 0 0 0 2px #388bff;
}
</style>
