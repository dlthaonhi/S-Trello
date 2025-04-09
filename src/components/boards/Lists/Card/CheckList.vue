<script setup>
import { computed, ref } from 'vue'
import { FolderChecked } from '@element-plus/icons-vue'
import CheckListItem from './CheckListItem.vue'
import ChecklistTitle from './ChecklistTitle.vue'
import BasePopover from '@/components/boards/Lists/Card/BasePopover.vue'
const props = defineProps({
  checklist: {
    type: Object,
    required: true
  }
})
const emit = defineEmits([
  'delete-checklist',
  'add-check-list-item',
  'delete-checklist-item',
  'update-checklist-title',
  'udpate-checklist-item-status'
])
const editingTitle = ref(false)
const popoverDeleteChecklist = ref(null)
const hideCompletedItem = ref(false)
const progress = computed(() => {
  const total = props.checklist.items.length || 0
  if (total === 0) return 0
  const checked = props.checklist.items.filter((item) => item.completed).length
  return Math.round((checked / total) * 100)
})
const style = computed(() => {
  return {
    backgroundColor: progress.value === 100 ? '#1f845a' : '#579dff',
    width: `${progress.value}%`
  }
})
const listChecklistItemFilterd = computed(() => {
  return hideCompletedItem.value
    ? props.checklist.items.filter((item) => !item.completed)
    : props.checklist.items
})
const lengthChecklistItemHidden = computed(() => {
  return props.checklist.items.length - listChecklistItemFilterd.value.length
})
function handleAddChecklistItem(title) {
  const data = {
    checklist: props.checklist,
    title
  }
  emit('add-check-list-item', data)
}
function handleDeleteChecklistItem(idChecklistItem) {
  const data = {
    idChecklist: props.checklist.id,
    idChecklistItem
  }
  emit('delete-checklist-item', data)
}
function handleUpdateChecklistItemStatus(data) {
  const dataEmit = {
    checklistItem: data,
    idChecklist: props.checklist.id
  }
  emit('udpate-checklist-item-status', dataEmit)
}
function onUpdateChecklistTitle(title) {
  const data = {
    idChecklist: props.checklist.id,
    title
  }
  emit('update-checklist-title', data)
}
function changeEditingMode(mode) {
  editingTitle.value = mode
}
function deleteChecklist() {
  emit('delete-checklist', props.checklist.id)
  popoverDeleteChecklist.value.hide()
}
function toggleShowCompletedItem() {
  hideCompletedItem.value = !hideCompletedItem.value
}
</script>
<template>
  <div class="check-list-title">
    <el-icon size="24" color="#172b4d" class="check-list-icon"><FolderChecked /></el-icon>
    <ChecklistTitle
      :value="checklist.title"
      :editing="editingTitle"
      @update-checklist-title="onUpdateChecklistTitle"
      @update:editing="changeEditingMode"
    />
    <div v-show="!editingTitle" class="check-list-group-button">
      <button class="check-list-button" @click="toggleShowCompletedItem">
        {{
          hideCompletedItem
            ? `Hiện các mục đã xong (${lengthChecklistItemHidden})`
            : 'Ẩn các mục đã chọn'
        }}
      </button>
      <BasePopover ref="popoverDeleteChecklist">
        <template #reference>
          <button class="check-list-button">Xóa</button>
        </template>
        <template #header>Bạn muốn xoá {{ checklist.title }}?</template>
        <template #body>
          <h4 class="popover-delte-title">
            Danh sách công việc sẽ bị xoá vĩnh viễn và không bao giờ lấy lại được.
          </h4>
          <el-button class="button-confirm-delete-checklist" type="danger" @click="deleteChecklist"
            >Xóa danh sách công việc</el-button
          >
        </template>
      </BasePopover>
    </div>
  </div>
  <div class="check-list-progress">
    <span class="progress-number">{{ progress }}%</span>
    <div class="progress-bar">
      <div class="bar" :style="style"></div>
    </div>
  </div>
  <div class="check-list-container">
    <div v-for="item in listChecklistItemFilterd" :key="item.id">
      <!-- Loop Checklist items -->
      <CheckListItem
        v-bind="$attrs"
        :value="item"
        @delete-checklist-item="handleDeleteChecklistItem"
        @udpate-checklist-item-status="handleUpdateChecklistItemStatus"
      />
    </div>
    <span
      v-if="checklist.items.length > 0 && lengthChecklistItemHidden === checklist.items.length"
      style="margin: 8px 0 0 40px"
      >Mọi thứ trong danh sách công việc này đều đã hoàn tất!
    </span>
    <CheckListItem @add-checklist-item="handleAddChecklistItem" />
  </div>
</template>
<style scoped>
.check-list-title {
  display: flex;
  align-items: center;
  padding: 8px 0 8px 40px;
  margin-bottom: 4px;
  color: #172b4d;
  position: relative;
  flex-wrap: wrap;
}
.check-list-icon {
  position: absolute;
  left: 2px;
  top: 8px;
}
.check-list-group-button {
  margin-left: auto;
  display: flex;
  gap: 4px;
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
.popover-delte-title {
  color: #172b4d;
}
.button-confirm-delete-checklist {
  @apply w-full mt-4;
}
.button-add-more {
  margin-top: 8px;
}
.check-list-button:hover {
  background-color: #091e4224;
}
.check-list-container {
  color: #172b4d;
  margin-bottom: 24px;
}
.check-list-progress {
  margin-bottom: 6px;
  display: flex;
  gap: 12px;
}
.progress-number {
  font-size: 11px;
  line-height: 8px;
  width: 30px;
}
.progress-bar {
  background-color: #091e420f;
  border-radius: 4px;
  overflow: hidden;
  height: 8px;
  width: 100%;
}
.bar {
  border-radius: 4px;
  height: 100%;
  transition: width ease-in-out 0.2s;
}
</style>
