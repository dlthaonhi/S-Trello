<script setup>
import BasePopover from '@/components/boards/Lists/Card/BasePopover.vue'
import { ref } from 'vue'
const emit = defineEmits(['create:checklist'])
const title = ref('Việc cần làm')
const popover = ref(null)
const inputTitle = ref(null)
function save() {
  emit('create:checklist', title.value.trim())
  popover.value.hide()
  resetState()
}
function resetState() {
  title.value = 'Việc cần làm'
}
function focusInput() {
  inputTitle.value.focus()
  inputTitle.value.select()
}
function handleKeyDown(event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    save()
  }
}
</script>
<template>
  <BasePopover ref="popover" @after-leave="resetState" @show="focusInput">
    <template #reference>
      <slot name="refElement">
        <button>Click me</button>
      </slot>
    </template>
    <template #header>Thêm danh sách công việc</template>
    <template #body>
      <h4 class="card-label-title">Tiêu đề</h4>
      <input
        ref="inputTitle"
        type="text"
        v-model="title"
        @keydown.enter="handleKeyDown"
        class="input-labels"
      />
      <div class="footer">
        <el-button type="primary" @click="save">
          <span>Thêm</span>
        </el-button>
      </div>
    </template>
  </BasePopover>
</template>
<style scoped>
.card-label-title {
  margin-top: 16px;
  margin-bottom: 8px;
  color: var(--ds-text-subtle, #44546f);
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
}
.input-labels {
  margin: 4px 0 12px;
  width: 100%;
  background-color: var(--ds-background-input, #fff);
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px var(--ds-border-input, #091e4224);
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  outline: none;
  padding: 8px 12px;
}
.input-labels:focus {
  background-color: var(--ds-background-input, #fff);
  box-shadow: inset 0 0 0 2px var(--ds-border-focused, #388bff);
}
.footer {
  margin-top: 16px;
}
</style>
