<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useWorkspacesStore } from '@/stores/workspaces.js'
import { createBoard } from '@/api/'

const workspaceStore = useWorkspacesStore()
const { fetchWorkspaces } = workspaceStore
const { workspaces } = storeToRefs(workspaceStore)

fetchWorkspaces()

const boardName = ref('')
const createButtonRef = ref(null)
const selectedWorkspaceId = ref('')

const selectedWorkspace = computed(() => {
  if (!selectedWorkspaceId.value && workspaces.value.length) return workspaces.value[0]
  const workspace = workspaces.value.find((workspace) => workspace.id === selectedWorkspaceId.value)
  return workspace ? workspace : { title: 'Chưa chọn không gian làm việc' }
})

async function submit() {
  const response = await createBoard(selectedWorkspaceId.value, {
    title: boardName.value,
    description: '',
    coverUrl: ''
  })
  const data = await response.json()
  console.log(data)
}
</script>
<template>
  <div class="container">
    <el-button :class="$style.createBoardButton" type="primary" ref="createButtonRef">
      <span :class="$style.createBoardButtonIcon">
        <el-icon :size="20">
          <i-mdi-plus />
        </el-icon>
      </span>
      <span :class="$style.createBoardButtonText">Create</span>
    </el-button>
    <el-popover
      :popper-class="$style.createBoardPopover"
      trigger="click"
      virtual-triggering
      :virtual-ref="createButtonRef"
      width="300px"
      transition="none"
      :offset="8"
      :hide-after="0"
      :show-arrow="false"
      placement="bottom-start"
    >
      <div :class="$style.header">
        <h2 :class="$style.title">Tạo bảng</h2>
      </div>
      <el-form :class="$style.createBoardForm">
        <div :class="$style.formItemContainer">
          <label :class="$style.formItem">
            <div>
              Tiêu đề bảng
              <span class="form-required">*</span>
            </div>
            <el-input v-model="boardName" placeholder="Tiêu đề bảng" />
          </label>
          <div>
            <span class="margin-8">👋</span>
            Tiêu đề bảng là bắt buộc
          </div>
        </div>
        <div :class="$style.formItemContainer">
          <label :class="$style.formItem" for="workspace-select"> Chọn không gian làm việc </label>
          <el-select
            id="workspace-select"
            :teleported="false"
            :model-value="selectedWorkspace.title"
            @change="selectedWorkspaceId = $event"
          >
            <el-option v-for="item in workspaces" :key="item.id" :label="item.id" :value="item.id">
              {{ item.title }}
            </el-option>
          </el-select>
        </div>
        <el-button :class="$style.createBoardSubmitButton" type="primary" @click="submit"
          >Tạo mới</el-button
        >
      </el-form>
    </el-popover>
  </div>
</template>

<style module>
.createBoardButton {
  padding: 0 !important;
  height: 32px;
}
.createBoardButtonIcon {
  width: 32px;
}
.createBoardButtonText {
  padding: 0 12px;
  font-weight: 500;
}
.createBoardPopover {
  padding: 0 !important;
}
.header {
  padding: 4px 8px;
}
.title {
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.003em;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #44546f;
  text-align: center;
}
.createBoardForm {
  padding: 12px;
  padding-top: 0;
}
.formItem {
  color: #44546f;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  flex-flow: column;
}
.margin8 {
  margin-right: 8px;
}

.createBoardSubmitButton {
  width: 100%;
  margin-top: 16px;
}
@media screen and (min-width: 1281px) {
  .createBoardButtonIcon {
    display: none;
  }
}
@media screen and (max-width: 1280px) {
  .createBoardButtonIcon {
    display: block;
  }
  .createBoardButtonText {
    display: none;
  }
}
</style>
