<script setup>
import { Link, TopRight } from '@element-plus/icons-vue'
defineProps(['listFiles'])
function getDate(date) {
  const dmy = date.split('T')[0]
  const times = date.split('T')[1].split(':')
  return `${dmy}, ${times[0]}:${times[1]}`
}
async function downloadImage(file) {
  const response = await fetch(file.url)
  if (!response.ok) throw new Error('response not ok')
  const imageData = await response.blob()
  const blobUrl = URL.createObjectURL(imageData)
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(blobUrl)
}
</script>
<template>
  <div class="data-attachments-title">
    <el-icon size="24" color="#172b4d" class="data-attachments-icon"><Link /></el-icon>
    <span class="data-attachments-title-name"> Các tệp đính kèm </span>
    <button class="data-attachments-title-button">Thêm</button>
  </div>
  <div class="data-attachments-list">
    <div v-for="file in listFiles" :key="file.id" class="attachments-item">
      <img
        :src="file.url"
        alt=""
        :style="{ backgroundColor: file.edgeColor }"
        class="attachments-item-image"
      />
      <div class="attachments-item-body">
        <span class="file-name"
          >{{ file.name }} <el-icon size="12" color="#172b4d"><TopRight /></el-icon
        ></span>
        <div class="file-info">
          <span class="file-date">Thêm {{ getDate(file.date) }}</span>
          <span class="file-action"><span>Bình luận</span></span>
          <span class="file-action" @click="downloadImage(file)"><span>Tải xuống</span></span>
          <span class="file-action"><span>Xóa</span></span>
          <!-- <span class="file-action"><span>Chỉnh sửa</span></span> -->
        </div>
        <span class="file-set-background"></span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.data-attachments-title {
  display: flex;
  align-items: center;
  padding-left: 40px;
  margin-bottom: 18px;
  color: #172b4d;
  position: relative;
}
.data-attachments-icon {
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
}
.data-attachments-title-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-right: 8px;
}
.data-attachments-title-button {
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
.data-attachments-title-button:hover {
  background-color: #091e4224;
}
.data-attachments-editor {
  padding-left: 40px;
  color: #172b4d;
}
/* List Attachments */
.data-attachments-list {
  padding: 8px 8px 8px 40px;
  color: #172b4d;
}
.attachments-item {
  position: relative;
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 3px;
}
.attachments-item:hover {
  background-color: #091e420f;
}
.attachments-item-image {
  object-fit: contain;
  border-radius: 3px;
  height: 80px;
  /* position: absolute; */
  width: 112px;
}
.file-name {
  font-weight: 600;
}
.file-action span {
  text-decoration: underline;
}
.file-action::before {
  content: '•';
  margin: 0 8px;
  color: var(--ds-text-subtle, #44546f);
}
</style>
