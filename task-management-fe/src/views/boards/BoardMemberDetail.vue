<script setup lang="ts">
import { EditPen, User } from '@element-plus/icons-vue'
import Sidebar from '@/components/boards/Members/Sidebar.vue'
import UserList from '@/components/boards/Members/UserList.vue'
import BoardDetailEditor from '@/components/boards/BoardDetailEditor.vue'
import AddMemberDialog from '@/components/boards/Members/AddMemberDialog.vue'
import { ref } from 'vue'

export interface BoardDetail {
  name: string
  shortName: string
  website: string
  description: string
}

const isShowUpdate = ref(false)

const handleSave = (data: BoardDetail) => {
  boardDetail.value = { ...data }
  isShowUpdate.value = false
}

const boardDetail = ref<BoardDetail>({
  name: 'S-GROUP FE Project',
  shortName: 'S',
  website: 'https://s-group.vn',
  description: 'S-Group Frontend Project'
})

const dialogVisible = ref(false)
</script>
<template>
  <div :class="$style.container">
    <AddMemberDialog v-model="dialogVisible" />
    <div :class="$style.header">
      <BoardDetailEditor
        :board="boardDetail"
        v-if="isShowUpdate"
        @cancel="isShowUpdate = false"
        @save="handleSave"
      />

      <div v-else :class="$style.headerRight">
        <div :class="$style.avatar">{{ boardDetail.name.charAt(0) }}</div>
        <div :class="$style.name">{{ boardDetail.name }}</div>
        <el-button text>
          <el-icon><EditPen @click="isShowUpdate = true" /></el-icon>
        </el-button>
      </div>
      <div :class="$style.headerLeft">
        <el-button @click="dialogVisible = true" type="primary">
          <el-icon><User /></el-icon> &nbsp; Mời các thành viên vào không gian làm việc
        </el-button>
      </div>
    </div>
    <div :class="$style.main">
      <div :class="$style.title">
        <span> Người cộng tác </span>
        <span :class="$style.chip"> 8/10 </span>
      </div>
      <div :class="$style.wrapper">
        <Sidebar />
        <UserList />
      </div>
    </div>
  </div>
</template>
<style module>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  max-width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px 16px;
  border-bottom: 1px solid #ebeef5;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  font-size: 35px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(
    var(--ds-background-accent-blue-bolder, #0747a6),
    var(--ds-background-accent-teal-bolder, #008da6)
  );
}

.name {
  font-size: 20px;
  line-height: 24px;
  margin: 0 8px;
  font-weight: 600;
}

.headerRight {
  display: flex;
  align-items: center;
}

.main {
  width: 100%;
  max-width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 30px 16px;
  flex-direction: column;
}

.title {
  span:first-child {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .chip {
    background-color: #dfe1e6;
    color: #172b4d;
    padding: 1px 8px;
    border-radius: 12px;
  }
}

.wrapper {
  display: flex;
  gap: 32px;
}
</style>
