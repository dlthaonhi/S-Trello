<script setup>
import { watch, nextTick, ref } from 'vue'

const edit = defineModel('edit')
const props = defineProps(['value'])
const emit = defineEmits(['update-text'])
const description = ref(props.value)
const quill = ref(null)
const focus = ref(false)
const toolbar = [
  [{ header: [false, 1, 2, 3, 4, 5, 6] }],
  ['bold', 'italic', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  ['clean']
]
function switchToEditMode() {
  edit.value = true
}
function handleFocus() {
  focus.value = true
}
function handleBlur() {
  focus.value = false
}
function save() {
  if (quill.value.getText().trim() === '') {
    emit('update-text', '')
    edit.value = false
    description.value = ''
    return
  }
  emit('update-text', quill.value.getHTML())
  edit.value = false
}
function cancel() {
  edit.value = false
  description.value = props.value
}
watch(edit, (val) => {
  if (val) {
    nextTick(() => {
      quill.value.focus()
    })
  }
})
</script>
<template>
  <div class="description-editor">
    <div v-if="!edit" class="preview-description ql-snow" @click="switchToEditMode">
      <div v-if="value" class="content ql-editor" v-html="value"></div>
      <div v-else class="preview-description-placeholder">Thêm mô tả chi tiết hơn...</div>
    </div>
    <div v-else>
      <div class="editor-container" :class="{ focus: focus }">
        <quill-editor
          ref="quill"
          v-model:content="description"
          content-type="html"
          :toolbar="toolbar"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <div class="editor-footer">
        <el-button type="primary" @click="save">Lưu</el-button>
        <el-button type="info" plain @click="cancel">Hủy</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.data-description-title-button {
  background-color: var(--ds-background-neutral, #091e420f);
  border: none;
  border-radius: 3px;
  color: var(--ds-text, #172b4d);
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  max-width: 200px;
  height: 32px;
  overflow: hidden;
  padding: 6px 12px;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
}
.data-description-title-button:hover {
  background-color: #091e4224;
}
.preview-description-placeholder {
  color: #172b4d;
  font-weight: 600;
  background-color: #091e420f;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  height: 56px;
}
.preview-description-placeholder:hover {
  background-color: #091e4224;
}

.editor-footer {
  margin-top: 8px;
}
.preview-description {
  cursor: pointer;
}
.editor-container {
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 0 1px #dbdbdb;
  min-height: 200px;
}
.editor-container.focus {
  box-shadow: 0 0 0 2px #388bff;
}
.ql-toolbar.ql-snow {
  border: none;
  border-radius: 4px 4px 0 0;
  background-color: #fff;
}
.ql-editor.content {
  padding: 0;
}
:deep(.ql-container) {
  font-size: 14px;
  line-height: 20px;
}
:deep(.ql-toolbar) {
  border: none;
  border-bottom: 2px solid #dfdfdf;
}
:deep(.ql-container.ql-snow) {
  border: none;
}
:deep(.ql-container.ql-snow .ql-editor) {
  min-height: 100px;
}
</style>
