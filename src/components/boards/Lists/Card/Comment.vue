<script setup>
import { watch, nextTick, ref } from 'vue'

const edit = defineModel('edit')
const props = defineProps(['item'])
const emit = defineEmits(['comment', 'update-comment', 'delete-comment'])
const itemComment = ref(props.item)
const title = ref('')
const quill = ref(null)
const focus = ref(false)
const enableSave = ref(false)
const popoverDeleteComment = ref(null)
const toolbar = [
  [{ header: [false, 1, 2, 3, 4, 5, 6] }],
  ['bold', 'italic', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  ['clean']
]
function switchToEditMode() {
  if (itemComment.value?.data.text) {
    title.value = itemComment.value.data.text
  }

  edit.value = true
}
function handleFocus() {
  focus.value = true
}
function handleBlur() {
  focus.value = false
}
function save() {
  if (itemComment.value) {
    itemComment.value.data.text = title.value
    emit('update-comment', itemComment.value.data)
    console.log('update comment', itemComment.value.data)
    edit.value = false
  } else {
    emit('comment', title.value)
    title.value = ''
    edit.value = false
  }
}
function cancelChange() {
  title.value = itemComment.value.data.text
  edit.value = false
}
function handleDeleteComment() {
  popoverDeleteComment.value.hide()
  emit('delete-comment', itemComment.value.id)
}
watch(edit, (val) => {
  if (val) {
    nextTick(() => {
      quill.value.focus()
    })
  }
})
watch(title, async () => {
  await nextTick()
  if (!quill.value) {
    // enableSave.value = false
    return
  }
  enableSave.value = quill.value.getText().trim() !== ''
})
const getDate = (date) => {
  const dmy = date.split('T')[0]
  const times = date.split('T')[1].split(':')
  return `${dmy}, ${times[0]}:${times[1]}`
}
</script>
<template>
  <div class="comment-editor">
    <img
      v-if="itemComment"
      :src="itemComment.memberCreator.avatarUrl"
      alt=""
      class="comment-creator"
    />
    <img
      v-else
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZ8ZtmkjFdGFK0_FJf-dSL8E7laGwRv33OuZ_IlGMAjrASwhzoNcRwdfLPO2OkKsNyts&usqp=CAU"
      alt=""
      class="comment-creator"
    />
    <!-- Avatar useUserStore -->

    <div v-if="!edit" class="preview-comment">
      <div v-if="itemComment" class="comment-author">
        <span class="comment-author-name">{{ itemComment.memberCreator.fullName }}</span>
        <span class="comment-author-time">{{ getDate(itemComment.date) }}</span>
      </div>
      <div v-if="itemComment" class="preview-comment-body ql-snow">
        <div class="content ql-editor" v-html="itemComment.data.text"></div>
        <div class="preview-comment-body-action" v-if="true">
          <!--Check authorization here-->
          <span class="file-action" @click="switchToEditMode()"><span>Chỉnh sửa</span></span>
          <BasePopover ref="popoverDeleteComment">
            <template #reference>
              <!-- <button class="check-list-button">Xóa</button> -->
              <span class="file-action"><span>Xóa</span></span>
            </template>
            <template #header>Bạn muốn xoá bình luận?</template>
            <template #body>
              <h4 class="popover-delte-title">
                Bình luận sẽ bị xóa vĩnh viễn và bạn không thể hoàn tác.
              </h4>
              <el-button
                class="button-confirm-delete-comment"
                type="danger"
                @click="handleDeleteComment"
                >Xóa bình luận</el-button
              >
            </template>
          </BasePopover>
        </div>
      </div>
      <div v-else class="preview-comment-placeholder" @click="switchToEditMode()">
        Viết bình luận...
      </div>
    </div>
    <div v-else>
      <div class="editor-container" :class="{ focus: focus }">
        <quill-editor
          ref="quill"
          v-model:content="title"
          content-type="html"
          :toolbar="toolbar"
          placeholder="Viết bình luận..."
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <div class="editor-footer">
        <el-button :type="enableSave ? 'primary' : ''" :disabled="!enableSave" @click="save"
          >Lưu</el-button
        >
        <el-button v-if="itemComment" type="info" @click="cancelChange">Hủy bỏ thay đổi</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.comment-editor {
  position: relative;
  padding-left: 40px;
  margin-bottom: 8px;
}
.preview-comment-placeholder {
  padding: 8px;
  color: #44546f;
  background-color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f);
  border-radius: 8px;
}
.preview-comment-placeholder:hover {
  background-color: var(--ds-background-input-hovered, #f7f8f9);
  box-shadow: var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f);
  cursor: pointer;
}
.comment-author {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.comment-author-name {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  margin-right: 8px;
  color: #172b4d;
}
.comment-author-time {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--ds-text-subtle, #44546f);
}
.preview-comment-body {
  color: #172b4d;
}
.comment-creator {
  position: absolute;
  left: 0;
  top: 0;
  object-fit: contain;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.preview-comment-body-action {
  margin-top: 4px;
  display: flex;
}
.file-action span {
  text-decoration: underline;
  cursor: pointer;
  line-height: 24px;
}
.file-action::before {
  content: '•';
  margin: 0 8px;
  color: var(--ds-text-subtle, #44546f);
}
.editor-footer {
  margin-top: 8px;
}
.editor-container {
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 0 0 1px #dbdbdb;
  min-height: 56px;
}
.editor-container.focus {
  box-shadow: 0 0 0 2px #0055cc;
}
.ql-toolbar.ql-snow {
  border: none;
  border-radius: 2px 2px 0 0;
  background-color: #fff;
}
.ql-editor.content {
  padding: 0;
  padding: 8px;
  background-color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f);
  border-radius: 8px;
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
  min-height: 56px;
}
.button-confirm-delete-comment {
  @apply w-full mt-4;
}
</style>
