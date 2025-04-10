<template>
  <div
    @click="showCardDetail"
    class="card relative bg-white shadow-md p-2 rounded-md cursor-pointer border-2 border-white hover:border-gray-500"
  >
    <div class="p-1">
      <p class="text-base">{{ name }}</p>
    </div>
    <el-icon
      class="icon-edit absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <Edit />
    </el-icon>

    <div class="flex items-center gap-3 px-2">
      <el-tooltip class="box-item" effect="light" content="Thẻ đã có miêu tả" placement="bottom">
        <el-icon v-if="infoCard.description"><Memo /></el-icon>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        effect="light"
        content="Các tập tinh đính kèm"
        placement="bottom"
      >
        <div v-if="infoCard.attachment" class="flex items-center gap-[2px]">
          <el-icon><Paperclip /></el-icon>
          <p class="text-sm leading-4">{{ infoCard.attachment }}</p>
        </div>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        effect="light"
        content="Mục trong danh sách công việc"
        placement="bottom"
      >
        <div v-if="infoCard.totalList" class="flex items-center gap-1">
          <el-icon><CircleCheck /></el-icon>
          <p class="text-sm leading-4">{{ infoCard.checkList || 0 }}/{{ infoCard.totalList }}</p>
        </div>
      </el-tooltip>

      <div v-if="infoCard.dueDate" class="flex items-center gap-1">
        <el-icon><Orange /></el-icon>
        <p class="text-sm leading-4">{{ infoCard.dueDate }}</p>
      </div>
    </div>
  </div>
  <CardDetail v-if="dialogVisibility" :id v-model="dialogVisibility" />
</template>

<style scoped>
.card:hover .icon-edit {
  opacity: 1;
}
</style>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Edit, Memo, Paperclip, CircleCheck, Orange } from '@element-plus/icons-vue'

const { name } = defineProps(['name'])

interface InfoCard {
  description: boolean
  attachment: number
  checkList: number
  totalList: number
  dueDate: string
}

const infoCard = ref<InfoCard>({
  description: true,
  attachment: 3,
  checkList: 0,
  totalList: 4,
  dueDate: 'trial expired'
})
</script>
