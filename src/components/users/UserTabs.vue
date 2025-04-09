<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const { user } = defineProps({
  user: {
    type: Object,
    required: true
  }
})
const route = useRoute()
const userId = ref(user?.id)
</script>

<template>
  <div :class="$style.tab">
    <router-link
      :to="`/users/${userId}`"
      :class="[$style.tabItem, route.path === `/users/${userId}` ? $style.active : '']"
    >
      Profile and Visibility
    </router-link>
    <router-link
      :to="`/users/${userId}/activity`"
      :class="[$style.tabItem, route.path === `/users/${userId}/activity` ? $style.active : '']"
    >
      Activity
    </router-link>
  </div>
  <router-view :user="user" />
</template>

<style module scoped>
.tab {
  border-bottom: 2px solid #091e4224;
  padding-bottom: 7.5px;
}
.tabItem {
  text-decoration: none;
  font-weight: 700;
  margin-right: 16px;
}
.tabItem.active {
  border-bottom: 2px solid #0c66e4;
  color: #0c66e4;
  margin-bottom: -2px;
  padding-bottom: 9px;
}
</style>
