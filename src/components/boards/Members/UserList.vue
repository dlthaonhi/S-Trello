<script setup lang="ts">
import { Link } from '@element-plus/icons-vue'
import UserItem from './UserItem.vue'
import { ref } from 'vue'

const search = ref('')

const users = ref([
  {
    avatar:
      'https://images.unsplash.com/photo-1723647395168-d916159b78c9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    username: '@namhuy12',
    name: 'Nam Huy'
  },
  {
    avatar:
      'https://trello-members.s3.amazonaws.com/66752f54a3a139fce846bce9/3c7f84d0f195f321a0dbd70563da3c22/30.png',
    username: '@nhannguyen612',
    name: 'Nhan Nguyen'
  },
  {
    avatar:
      'https://trello-members.s3.amazonaws.com/6400d7d73c11c1c724d6235f/41c5d6164997cc1cd0c6753dc3819875/30.png',
    username: '@nhanphanththanh',
    name: 'Nhàn Phan Thị Thanh'
  },
  {
    avatar:
      'https://trello-members.s3.amazonaws.com/6489784eab92ffeb9e31e9c5/30626bd386e733d5c0dbc47cc5856f1c/30.png',
    username: 'Truyền Nguyễn Đức',
    name: '@truynnguyndc'
  }
])

const visible = ref(false)
</script>
<template>
  <div :class="$style.wrapper">
    <div :class="$style.title">
      <h2>Thành viên không gian làm việc (8)</h2>
      <p :class="$style.chip">
        Các thành viên trong Không gian làm việc có thể xem và tham gia tất cả các bảng Không gian
        làm việc hiển thị và tạo ra các bảng mới trong Không gian làm việc.
      </p>
    </div>

    <div :class="$style.title">
      <h2>Mời các thành viên tham gia cùng bạn</h2>
      <div :class="$style.flex">
        <p :class="$style.chip">
          Bất kỳ ai có liên kết mời đều có thể tham gia Không gian làm việc miễn phí này. Bạn cũng
          có thể tắt và tạo liên kết mời mới cho Không gian làm việc này bất cứ lúc nào. Số lời mời
          đang chờ xử lý được tính vào giới hạn 10 người cộng tác
        </p>
        <el-button type="" text bg>
          <el-icon><Link /></el-icon>
          Mời bằng liên kết
        </el-button>
      </div>
    </div>

    <div :class="$style.searchWrapper">
      <el-input v-model="search" placeholder="Tìm kiếm thành viên" />
    </div>

    <div :class="$style.userList">
      <UserItem v-for="user in users" :key="user.username" :user="user" />
    </div>
  </div>
</template>
<style module>
.wrapper {
  display: flex;
  gap: 24px;
  flex-direction: column;
}

.title {
  border-bottom: 1px solid #dfe1e6;
  padding-bottom: 12px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  p {
    font-size: 14px;
    color: #172b4d;
    font-weight: 400;
  }

  .flex {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
  }
}

.searchWrapper {
  border-bottom: 1px solid #dfe1e6;
  padding-bottom: 8px;

  div {
    max-width: 250px;
  }
}

.userList {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
