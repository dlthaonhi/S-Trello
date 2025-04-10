<script setup>
import UserHeader from '@/components/users/Header/UserHeader.vue'
import UserTabs from '@/components/users/UserTabs.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div :class="$style.userContainer" v-if="userStore.user">
    <UserHeader :user="userStore.user" />
    <UserTabs :user="userStore.user" />
  </div>
</template>

<style module scoped>
.userContainer {
  display: flex;
  margin: 0 3rem 1rem 3rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  flex-direction: column;
}
</style>
