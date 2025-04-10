<script setup lang="ts">
import { computed, ref } from 'vue'

const isDialogVisible = defineModel<boolean>()

const input = ref('')

const memberList = ref([
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1723647395168-d916159b78c9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    username: '@namhuy12',
    name: 'Nam Huy'
  },
  {
    id: 2,
    avatar:
      'https://trello-members.s3.amazonaws.com/66752f54a3a139fce846bce9/3c7f84d0f195f321a0dbd70563da3c22/30.png',
    username: '@nhannguyen612',
    name: 'Nhan Nguyen'
  },
  {
    id: 3,
    avatar:
      'https://trello-members.s3.amazonaws.com/6400d7d73c11c1c724d6235f/41c5d6164997cc1cd0c6753dc3819875/30.png',
    username: '@nhanphanththanh',
    name: 'Nhàn Phan Thị Thanh'
  },
  {
    id: 4,
    avatar:
      'https://trello-members.s3.amazonaws.com/6489784eab92ffeb9e31e9c5/30626bd386e733d5c0dbc47cc5856f1c/30.png',
    name: 'Truyền Nguyễn Đức',
    username: '@truynnguyndc'
  }
])

const isShowMemberList = ref(false)

const membersFiltered = computed(() => {
  return memberList.value.filter((member) => {
    return member.name.toLowerCase().includes(input.value.toLowerCase())
  })
})
</script>
<template>
  <el-dialog
    v-model="isDialogVisible"
    title="Mời vào không gian làm việc"
    width="500"
    align-center
    :class="$style.dialog"
  >
    <el-input
      v-model="input"
      placeholder="Please input"
      :class="$style.input"
      @focus="isShowMemberList = true"
      @blur="isShowMemberList = false"
    />

    <div :class="$style.memberList" v-if="isShowMemberList">
      <template v-if="membersFiltered.length > 0">
        <div :class="$style.memberItem" v-for="member in membersFiltered" :key="member.id">
          <el-avatar :src="member.avatar" />
          <span>{{ member.name }}</span>
        </div>
      </template>
      <template v-else>
        <div>
          Có vẻ như người đó không phải là thành viên của Trello. Thêm địa chỉ email để mời họ tham
          gia.
        </div>
      </template>
    </div>
  </el-dialog>
</template>
<style module>
.dialog {
  border-radius: 10px;
}

.input {
  width: 100%;
}

.memberList {
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 12px;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.memberItem {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f5f7fa;
  }
}
</style>
