<template>
  <div class="popup-setting-list">
    <div class="flex justify-center relative">
      <p>Thao tác</p>
      <el-icon class="cursor-pointer absolute right-0" color="black" @click="handleClose"
        ><Close style="width: 20px; height: 20px"
      /></el-icon>
    </div>

    <div class="setting-list border-b-2 pb-2">
      <div
        v-for="(setting, index) in listSetting"
        :key="index"
        class="setting-item cursor-pointer p-2 hover:bg-gray-100 rounded"
        @click="setting.action"
      >
        {{ setting.name }}
      </div>
    </div>

    <div class="storage-list pt-2">
      <div
        v-for="(storage, index) in listStorage"
        :key="index"
        class="setting-item cursor-pointer p-2 hover:bg-gray-100 rounded"
        @click="storage.action"
      >
        {{ storage.name }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Close, CloseBold } from '@element-plus/icons-vue'

const { handleClose } = defineProps(['handleClose'])

const handleDeleteList = () => {
  console.log('Delete list clicked')
}

const listSetting = [
  {
    name: 'Thêm thẻ',
    action: handleDeleteList
  },
  {
    name: 'Di chuyển danh sách',
    action: handleDeleteList
  },
  {
    name: 'Di chuyển tất cả thẻ trong danh sách này',
    action: handleDeleteList
  }
]

const listStorage = [
  {
    name: 'Lưu trữ danh sách này',
    action: handleDeleteList
  },
  {
    name: 'Lưu trữ tất cả thẻ trong danh sách này',
    action: handleDeleteList
  }
]
</script>
