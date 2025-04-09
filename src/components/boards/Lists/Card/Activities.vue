<script setup>
defineProps(['activities'])
import { Operation } from '@element-plus/icons-vue'
import Comment from './Comment.vue'
// const showDetail = ref(false)
</script>
<template>
  <div class="activity-title">
    <el-icon size="24" color="#172b4d" class="activity-icon"><Operation /></el-icon>
    <span class="activity-title-name"> Hoạt động </span>
    <!-- <button class="activity-title-button">
      {{ showDetail ? 'Ẩn chi tiết' : 'Hiện chi tiết' }}
    </button> -->
  </div>
  <div class="activity-body">
    <Comment v-bind="$attrs" />
    <Comment v-for="activity in activities" :key="activity.id" :item="activity" v-bind="$attrs" />
  </div>
</template>
<style scoped>
.activity-title {
  display: flex;
  align-items: center;
  padding-left: 40px;
  margin-bottom: 18px;
  color: #172b4d;
  position: relative;
}
.activity-icon {
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
}
.activity-title-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-right: 8px;
}
.activity-title-button {
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
.activity-title-button:hover {
  background-color: #091e4224;
}
</style>
