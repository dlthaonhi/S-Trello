<script setup>
import { ref } from 'vue'
import TextAreaAutosize from '@/components/common/TextAreaAutosize.vue'
import { Close } from '@element-plus/icons-vue'
const emit = defineEmits(['update-checklist-title', 'update:editing'])
const props = defineProps({
  value: String,
  editing: Boolean
})
const title = ref('')
function switchToEditingMode() {
  title.value = props.value
  emit('update:editing', true)
}
function cancel() {
  title.value = props.value
  emit('update:editing', false)
}
function save() {
  if (!title.value.trim()) return
  emit('update:editing', false)
  if (title.value === props.value) return
  emit('update-checklist-title', title.value)
}
function handelEnter() {
  save()
}
</script>
<template>
  <div class="checklist-title" :style="editing ? 'width:100%' : ''">
    <div v-if="!editing" class="checklist-title-preview" @click="switchToEditingMode">
      <span class="checklist-title-name"> {{ value }} </span>
    </div>
    <div v-else class="checklist-title-edit">
      <TextAreaAutosize
        class="checklist-title-edit-textarea"
        v-model="title"
        font-size="16px"
        font-weight="600"
        min-height="56px"
        line-height="24px"
        focus="true"
        always-focus="true"
        select-text="true"
        @enter="handelEnter"
      />
      <div class="edit-control">
        <el-button type="primary" @click="save">Lưu</el-button>
        <button class="edit-control-cancel" @click="cancel">
          <el-icon size="24" color="#44546f"><Close /></el-icon>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.checklist-title {
  display: flex;
  cursor: pointer;
}
.checklist-title-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-right: 8px;
}

.checklist-title-preview {
  display: flex;
  align-items: center;
}
.checklist-title-title {
  color: #172b4d;
  margin-right: 8px;
  /* @apply text-ellipsis text-nowrap overflow-hidden; */
}

.checklist-title-edit {
  padding-bottom: 8px;
  width: 100%;
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
.edit-control-action-button {
  position: absolute;
  right: 0;
  top: 0;
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
</style>
