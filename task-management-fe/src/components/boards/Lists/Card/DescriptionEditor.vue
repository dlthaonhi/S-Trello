<script setup>
import { ref } from 'vue'
import PreviewEditor from './PreviewEditor.vue'
import { Expand } from '@element-plus/icons-vue'

defineProps(['value'])
const emit = defineEmits(['update-description'])
const editing = ref(false)
function switchMode() {
  editing.value = true
}
function updateText(text) {
  emit('update-description', text)
}
</script>
<template>
  <div class="data-description-title">
    <el-icon size="24" color="#172b4d" class="data-description-icon"><Expand /></el-icon>
    <span class="data-description-title-name">Mô tả</span>
    <button v-if="!editing" class="data-description-title-button" @click="switchMode">
      Chỉnh sửa
    </button>
  </div>
  <div class="data-description-editor">
    <PreviewEditor v-model:edit="editing" :value="value" @update-text="updateText" />
  </div>
</template>
<style scoped>
.data-description-title {
  display: flex;
  align-items: center;
  padding: 8px 0 8px 40px;
  margin-bottom: 4px;
  color: #172b4d;
  position: relative;
}
.data-description-icon {
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
}
.data-description-title-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-right: 8px;
}
.data-description-title-button {
  position: absolute;
  right: 0;
  top: 0;

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
.data-description-title-button:hover {
  background-color: #091e4224;
}
.data-description-editor {
  padding-left: 40px;
  color: #172b4d;
}
</style>
