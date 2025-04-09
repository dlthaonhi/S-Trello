<script setup>
import { computed } from 'vue'

const { user } = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const userInitials = computed(() => {
  if (user?.name) {
    const nameParts = user.name.split(' ')
    let initials =
      nameParts.length > 1
        ? nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
        : nameParts[0].charAt(0)
    return initials.toUpperCase()
  }
  return ''
})
</script>
<template>
  <el-header :class="$style.userHeader" v-if="user">
    <div :class="$style.imageHeader">
      <template v-if="user.avatarUrl">
        <img :src="user.avatarUrl" alt="avatar" />
      </template>
      <template v-else>
        <div :class="$style.initialsAvatar">{{ userInitials }}</div>
      </template>
    </div>
    <div :class="$style.userNameHeader">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  </el-header>
</template>

<style module scoped>
.userHeader {
  display: flex;
  align-items: center;
  margin: 1.625rem 0;
  padding: 0;
}
.imageHeader {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
}
.userNameHeader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 3rem;
  box-sizing: border-box;
}
.userNameHeader h2 {
  margin: 0;
  font-weight: 500;
  font-size: 1.25rem;
}
.userNameHeader p {
  margin: 0;
  font-size: 0.75rem;
  color: #6b778c;
}
.initialsAvatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #172b4d;
  border-radius: 50%;
  font-size: 1rem;
  color: #ffffff;
}
</style>
