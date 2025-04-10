<template>
  <div class="sidebar">
    <div class="header-layout">
      <div class="image-represent">S</div>
      <h2 class="text-sm font-medium">Sms-Sgroup-internal-project</h2>
      <el-icon class="header-toggle"><ArrowLeft /></el-icon>
    </div>
    <hr />

    <div>
      <div>
        <div class="board-item with-icon-layout">
          <el-icon><DataBoard /></el-icon>
          <span>Boards</span>
        </div>
        <RouterLink :to="{ name: 'board-detail-members' }" class="board-item with-icon-layout">
          <el-icon><User /></el-icon>
          Members
        </RouterLink>
        <div class="board-item with-icon-layout">
          <el-icon><Setting /></el-icon>Workspace Settings
        </div>
      </div>

      <h3 class="board-category">Workspace views</h3>

      <div>
        <div class="board-item with-icon-layout">
          <el-icon><Grid /></el-icon>Table
        </div>
        <div class="board-item with-icon-layout">
          <el-icon><Calendar /></el-icon>Calendar
        </div>
      </div>

      <h3 class="board-category">Your Boards</h3>

      <div>
        <div class="board-item">Importtant Checklist</div>
        <div class="board-item">Hỗ Trợ khoá mùa đông ..</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  @apply w-[16.25rem] py-2 shadow h-screen;
}

.header-layout {
  @apply flex flex-row gap-2 px-2 py-2 items-center;

  .image-represent {
    @apply w-8 h-6 bg-gray-300 rounded flex items-center justify-center cursor-pointer;
  }

  .header-toggle {
    @apply cursor-pointer;
  }
}

.board-category {
  @apply text-sm font-medium px-3 py-2;
}

.board-item {
  @apply text-sm font-normal
  px-4 py-2
  hover:bg-gray-100 cursor-pointer
  flex flex-row items-center;

  &.with-icon-layout {
    @apply gap-x-2;
  }
}
</style>
<script setup lang="ts">
import { ArrowLeft, Calendar, DataBoard, Grid, Setting, User } from '@element-plus/icons-vue'
</script>
