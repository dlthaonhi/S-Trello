<script setup>
import ManageCardMember from './Actions/ManageCardMember.vue'
import ManageCardLabel from './Actions/ManageCardLabel.vue'
import CreateChecklist from './Actions/CreateChecklist.vue'
import MoveCard from './Actions/MoveCard.vue'
import { User, PriceTag, FolderChecked, Right } from '@element-plus/icons-vue'
</script>
<template>
  <div class="sidebar-card">
    <div class="sidebar-card-section">
      <span class="sidebar-card-title">Thêm vào thẻ</span>
      <ManageCardMember v-bind="$attrs">
        <template #refElement>
          <button class="button-action">
            <el-icon size="16" color="#172b4d"><User /></el-icon>
            <span>Thành viên</span>
          </button>
        </template>
      </ManageCardMember>
      <ManageCardLabel v-bind="$attrs">
        <template #refElement>
          <button class="button-action">
            <el-icon size="16" color="#172b4d"><PriceTag /></el-icon>
            <span>Nhãn</span>
          </button>
        </template>
      </ManageCardLabel>
      <CreateChecklist ref="createChecklistRef" v-bind="$attrs">
        <template #refElement>
          <button class="button-action">
            <el-icon size="16" color="#172b4d"><FolderChecked /></el-icon>
            <span>Việc cần làm</span>
          </button>
        </template>
      </CreateChecklist>
    </div>
    <div class="sidebar-card-section">
      <span class="sidebar-card-title">Thao tác</span>
      <MoveCard>
        <template #refElement>
          <button class="button-action">
            <el-icon size="16" color="#172b4d"><Right /></el-icon>
            <span>Di chuyển</span>
          </button>
        </template>
      </MoveCard>
    </div>
  </div>
</template>
<style scoped>
.sidebar-card {
  margin-bottom: 24px;
}
.sidebar-card-section {
  margin-bottom: 24px;
}
.sidebar-card-title {
  font-size: 12px;
  font-weight: 600;
  color: #44564f;
}
.button-action {
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
  gap: 10px;
  margin-top: 8px;
  width: 100%;
}
.button-action:hover {
  background-color: #091e4224;
}
</style>
