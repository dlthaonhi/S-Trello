<template>
  <div class="list-detail">
    <div class="header">
      {{ name }}
      <el-popover
        placement="right-start"
        :width="306"
        trigger="click"
        v-model:visible="isPopoverVisible"
        s
        class="flex justify-center"
      >
        <template #reference>
          <el-icon
            @click="handleSettings"
            class="cursor-pointer hover:bg-slate-200 h-6 w-8 rounded"
          >
            <MoreFilled />
          </el-icon>
        </template>
        <template #default>
          <PopupSettingList :handleClose="handleClosePopup" />
        </template>
      </el-popover>
    </div>

    <Card v-for="task in tasks" :key="task.id" v-bind="task" />

    <div>
      <el-button v-if="!isAddCard" class="add-btn" @click="handleOpenAddCard">
        <el-icon class="mr-2"><Plus /></el-icon>
        Thêm thẻ
      </el-button>
      <div v-else class="w-full bg-white p-2 rounded-md shadow-md">
        <el-input
          v-model="input"
          placeholder="Nhập tên cho thẻ này.."
          class="rounded-md shadow-md"
          input-style="padding: 20px 0"
        />
        <div class="mt-3 flex items-center gap-3">
          <el-button type="primary" class="shadow-md" @click="handleAddCard">Thêm thẻ</el-button>
          <el-icon class="cursor-pointer" color="black" size="24" @click="handleClose"
            ><Close
          /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-detail {
  @apply w-[272px] bg-gray-100 border rounded-md shadow-md p-2 space-y-2 h-fit;

  .header {
    @apply flex justify-between px-2 py-1 text-sm font-semibold;
  }

  .add-btn {
    @apply w-full text-left flex justify-start shadow-md py-5;
  }
}
</style>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Plus, MoreFilled, Close } from '@element-plus/icons-vue'

import Card from './Card/Card.vue'
import PopupSettingList from './PopupSettingList.vue'

const { name } = defineProps(['name', 'tasks'])

const isAddCard = ref(false)
const input = ref('')
const isPopoverVisible = ref(false)

const handleSettings = () => {
  console.log('Settings clicked')
}

const handleClosePopup = () => {
  isPopoverVisible.value = false
  console.log('Close clicked')
}

const handleOpenAddCard = () => {
  isAddCard.value = true
  console.log('Add card clicked')
}

const handleAddCard = () => {
  console.log('Add card clicked', input.value)
  handleClose()
}

const handleClose = () => {
  isAddCard.value = false
  console.log('handleClose clicked')
}
</script>
