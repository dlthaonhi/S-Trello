<script setup>
import { computed, ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import BasePopover from '@/components/boards/Lists/Card/BasePopover.vue'
const props = defineProps({ members: Array, boardMembers: Array })
const emit = defineEmits(['add-member', 'remove-member'])
const search = ref('')

const listMembers = computed(() => props.members || [])
const listUsers = computed(() => props.boardMembers || [])

const listUserNotMembers = computed(() => {
  return listUsers.value.filter(
    (user) => !listMembers.value.some((mem) => mem.email === user.email)
  )
})
const usersFilter = computed(() => {
  return listUserNotMembers.value.filter((member) => member.email.includes(search.value.trim()))
})
const membersFilter = computed(() => {
  return listMembers.value.filter((member) => member.email.includes(search.value.trim()))
})
function addMemberToCard(id) {
  // const user = listUsers.value.find((user) => user.id === id)
  // if (user) {
  //   listMembers.value.push(user)
  // }
  emit('add-member', id)
}
function removeMemberToCard(id) {
  // const index = listMembers.value.findIndex((user) => user.id === id)
  // if (index !== -1) {
  //   listMembers.value.splice(index, 1)
  // }
  emit('remove-member', id)
}
function resetState() {
  search.value = ''
}
</script>
<template>
  <BasePopover @after-leave="resetState">
    <template #reference>
      <slot name="refElement">
        <button>Click me</button>
      </slot>
    </template>
    <template #header>Thành viên</template>
    <template #body>
      <input
        type="text"
        v-model="search"
        placeholder="Tìm kiếm các thành viên"
        class="input-search-members"
      />
      <div
        class="empty"
        v-if="usersFilter.length === 0 && membersFilter.length === 0 && search.trim()"
      >
        Không có kết quả
      </div>
      <h4 v-if="membersFilter.length > 0" class="card-member-title">Thành viên của thẻ</h4>
      <li
        class="card-member-list"
        v-for="user in membersFilter"
        :key="user.id"
        @click="removeMemberToCard(user.id)"
      >
        <el-avatar class="avatar-user-tooltip" :size="32" :src="user.avatar" :alt="user.name" />
        <el-tooltip
          :content="`${user.first_name} ${user.last_name} (${user.email})`"
          placement="bottom"
          effect="light"
          :offset="10"
          :show-after="500"
          :hide-after="0"
        >
          <span class="card-member-list-name">{{ `${user.first_name} ${user.last_name}` }}</span>
        </el-tooltip>
        <el-icon color="#172b4d"><Close /></el-icon>
      </li>
      <h4 v-if="usersFilter.length > 0" class="card-member-title">Thành viên của bảng</h4>
      <li
        class="card-member-list"
        v-for="user in usersFilter"
        :key="user.id"
        @click="addMemberToCard(user.id)"
      >
        <el-avatar class="avatar-user-tooltip" :size="32" :src="user.avatar" :alt="user.name" />
        <el-tooltip
          :content="`${user.first_name} ${user.last_name} (${user.email})`"
          placement="bottom"
          effect="light"
          :offset="10"
          :show-after="500"
          :hide-after="0"
        >
          <span class="card-member-list-name">{{ `${user.first_name} ${user.last_name}` }}</span>
        </el-tooltip>
      </li>
    </template>
  </BasePopover>
</template>
<style scoped>
.input-search-members {
  margin: 4px 0 12px;
  width: 100%;
  background-color: var(--ds-background-input, #fff);
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px var(--ds-border-input, #091e4224);
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  outline: none;
  padding: 8px 12px;
}
.input-search-members:focus {
  background-color: var(--ds-background-input, #fff);
  box-shadow: inset 0 0 0 2px var(--ds-border-focused, #388bff);
}
.card-member-title {
  margin-top: 16px;
  margin-bottom: 8px;
  color: var(--ds-text-subtle, #44546f);
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
}
.card-member-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 4px 8px 4px 4px;
  cursor: pointer;
  border-radius: 4px;
}
.card-member-list:hover {
  background: #091e420f;
}
.card-member-list-name {
  color: #172b4d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 210px;
}
.avatar-user-tooltip {
  margin-right: 8px;
}
.empty {
  margin: 0;
  padding: 24px 6px;
  border-radius: 3px;
  background-color: var(--ds-background-neutral, #091e420f);
  color: var(--ds-text-subtle, #44546f);
  text-align: center;
}
</style>
