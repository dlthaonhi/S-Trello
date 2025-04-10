<template>
  <BoardHeader :name="boardDetail?.name" />
  <div class="detail">
    <ListDetail
      v-for="list in boardDetail?.lists ?? []"
      :key="list.id"
      :name="list.name"
      :tasks="list.tasks"
    />

    <div class="w-[272px]">
      <el-button v-if="!isAddList" class="add-btn rounded-lg" @click="handleOpenAddList">
        <el-icon class="mr-2"><Plus /></el-icon>
        Thêm danh sách khác
      </el-button>
      <div v-else class="w-full bg-slate-100 p-2 rounded-md shadow-sm">
        <el-input
          v-model="input"
          placeholder="Nhập tiêu đề danh sách.."
          class="rounded-md shadow-sm"
          input-style="padding: 20px 0"
        />
        <div class="mt-3 flex items-center gap-3">
          <el-button type="primary" class="rounded-md" @click="handleAddList"
            >Thêm danh sách</el-button
          >
          <el-icon class="cursor-pointer" color="black" size="24" @click="handleClose"
            ><Close
          /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  @apply overflow-x-auto flex flex-row gap-x-4 p-4;

  .add-btn {
    @apply bg-gray-100 rounded-lg shadow-md py-5 text-center w-full hover:bg-gray-200 hover:text-black;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { Plus, Close } from '@element-plus/icons-vue'

import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { getBoardDetailBySlug } from '@/api/boards'
import ListDetail from './Lists/ListDetail.vue'

const { query } = useRoute()
const boardId = query.id

const isAddList = ref(false)
const input = ref('')

const handleOpenAddList = () => {
  isAddList.value = true
  console.log('Add list clicked')
}

const handleAddList = () => {
  console.log('Add list clicked', input.value)
  handleClose()
}

const handleClose = () => {
  isAddList.value = false
  console.log('Close clicked')
}

const { data: boardDetail } = useQuery({
  queryKey: ['board', boardId],
  queryFn: () => getBoardDetailBySlug(boardId)
})
</script>
