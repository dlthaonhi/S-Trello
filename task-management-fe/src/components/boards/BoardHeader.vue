<template>
  <div class="header">
    <div class="row-layout">
      <h1 class="text-lg font-bold">{{ name }}</h1>
      <el-button>Board</el-button>
    </div>

    <div class="row-layout">
      <el-button>
        Filters
        <el-icon><Filter /></el-icon>
      </el-button>

      <el-button>Share</el-button>
      <el-icon class="more"><More /></el-icon>
    </div>
  </div>
</template>

<style scoped>
.header {
  @apply flex justify-between items-center w-full px-4 py-2 border-b border-gray-200;

  .row-layout {
    @apply flex flex-row space-x-2 items-center;
  }
}

.more {
  @apply cursor-pointer text-gray-500 hover:bg-gray-700;
}
</style>

<script setup lang="ts">
import { Filter, More } from '@element-plus/icons-vue'

const props = defineProps(['name'])

const { name } = props
</script>
