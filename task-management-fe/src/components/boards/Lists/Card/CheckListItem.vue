<script setup>
import { ref } from 'vue'
import { MoreFilled, Close } from '@element-plus/icons-vue'
import TextAreaAutosize from '@/components/common/TextAreaAutosize.vue'
import BasePopover from '@/components/boards/Lists/Card/BasePopover.vue'

const emit = defineEmits([
  'udpate-checklist-item-status',
  'add-checklist-item',
  'update-checklist-item-title',
  'delete-checklist-item'
])
const props = defineProps(['value'])
const checklistItem = ref(props.value)
const title = ref('')
const editing = ref(false)
function switchToEditingMode() {
  if (checklistItem.value) {
    title.value = checklistItem.value.title
  }
  editing.value = true
}
function cancel() {
  if (checklistItem.value) title.value = checklistItem.value.title
  else title.value = ''
  editing.value = false
}
function handleChange($event) {
  checklistItem.value.completed = $event.target.checked
  emit('udpate-checklist-item-status', checklistItem.value)
}
function save() {
  if (checklistItem.value) {
    if (!title.value.trim()) {
      emit('delete-checklist-item', checklistItem.value.id)
      editing.value = false
      return
    }
    checklistItem.value.title = title.value
    emit('update-checklist-item-title', checklistItem.value)
  } else {
    if (!title.value.trim()) return
    console.log('title', title.value)
    emit('add-checklist-item', title.value)
    title.value = ''
  }
  editing.value = false
}
function handelEnter() {
  save()
}
function deleteChecklistItem() {
  emit('delete-checklist-item', checklistItem.value.id)
  editing.value = false
}
</script>
<template>
  <div class="check-item">
    <input
      v-if="value"
      type="checkbox"
      name=""
      @input="handleChange"
      :checked="checklistItem.completed"
      id=""
    />
    <button
      v-else-if="!editing"
      class="check-list-button button-add-more"
      @click="switchToEditingMode"
    >
      Thêm một mục
    </button>
    <div v-if="value || editing" class="check-item-detail">
      <div v-if="value && !editing" class="check-item-preview" @click="switchToEditingMode">
        <span
          class="check-item-title"
          :style="{ textDecoration: checklistItem.completed ? 'line-through' : 'none' }"
          >{{ checklistItem.title }}</span
        >
        <div class="check-item-action" @click.stop>
          <BasePopover ref="popoverDeleteChecklist">
            <template #reference>
              <button class="check-item-action-button" type="button">
                <el-icon size="14" color="#44546f"><MoreFilled /></el-icon>
              </button>
            </template>
            <template #header>Thao tác mục</template>
            <template #body>
              <li class="action-checklist-item">Chuyển sang thẻ</li>
              <li class="action-checklist-item" @click="deleteChecklistItem">Xóa</li>
            </template>
          </BasePopover>
        </div>
      </div>
      <div v-else-if="editing" class="check-item-edit">
        <TextAreaAutosize
          class="check-item-edit-textarea"
          v-model="title"
          font-size="14px"
          font-weight="400"
          min-height="56px"
          line-height="20px"
          focus="true"
          always-focus="true"
          select-text="true"
          @enter="handelEnter"
        />
        <div class="edit-control">
          <el-button type="primary" @click="save">Lưu</el-button>
          <button v-if="checklistItem" class="edit-control-cancel" @click="cancel">
            <el-icon size="24" color="#44546f"><Close /></el-icon>
          </button>
          <el-button v-else type="info" @click="cancel">Hủy</el-button>
          <div v-if="value" class="edit-control-action">
            <BasePopover ref="popoverDeleteChecklist">
              <template #reference>
                <button class="edit-control-action-button" type="button">
                  <el-icon size="16" color="#44546f"><MoreFilled /></el-icon>
                </button>
              </template>
              <template #header>Thao tác mục</template>
              <template #body>
                <li class="action-checklist-item">Chuyển sang thẻ</li>
                <li class="action-checklist-item" @click="deleteChecklistItem">Xóa</li>
              </template>
            </BasePopover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
input[type='checkbox'] {
  cursor: pointer;
  height: 16px;
  margin: 0;
  width: 16px;
  background-color: var(--ds-background-input, #fff);
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px var(--ds-border-input, #091e4224);
  margin: 10px 10px 6px 6px;
}
.check-item {
  display: flex;
  cursor: pointer;
}
.check-item:hover .check-item-action-button {
  visibility: visible;
}
.check-item-detail {
  padding: 6px 8px;
  border-radius: 10px;
  width: calc(100% - 28px);
}
.check-item-detail:hover {
  background-color: #091e420f;
}
.check-item-preview {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.check-item-title {
  color: #172b4d;
  margin-right: 8px;
  width: calc(100% - 28px);
  /* @apply text-ellipsis text-nowrap overflow-hidden; */
}
.check-item-action {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 4px;
}
.action-checklist-item {
  color: #172b4d;
  padding: 6px 12px;
  list-style-type: none;
  cursor: pointer;
  border-radius: 4px;
}
.action-checklist-item:hover {
  background-color: #091e4224;
}
.check-item-action-button {
  display: flex;
  visibility: hidden;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 100px;
  background-color: #091e4224;
}
.check-item-action-button:hover {
  background-color: #091e4233;
}
.check-item-edit {
  padding-bottom: 8px;
}
.edit-control {
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-top: 8px;
  position: relative;
}
.edit-control-cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 2px;
}
.edit-control-action {
  position: absolute;
  right: 0;
  top: 0;
}
.edit-control-action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 32px;
  border-radius: 4px;
}
.edit-control-action-button:hover {
  background-color: #091e4224;
}
.check-list-button {
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
  text-decoration: none;
  text-overflow: ellipsis;
}
.button-add-more {
  margin-top: 8px;
}
.check-list-button:hover {
  background-color: #091e4224;
}
</style>
