<template>
  <div class="user-menu" v-if="user">
    <button :class="$style.userMenuButton" ref="menuButtonRef">
      <template v-if="user.avatarUrl">
        <el-avatar :size="24" :src="user.avatarUrl" />
      </template>
      <template v-else>
        <el-avatar :size="24" :class="$style.userMenuAvtDefault">{{ userInitials }}</el-avatar>
      </template>
    </button>
    <el-popover
      :class="$style.userMenuPopover"
      trigger="click"
      virtual-triggering
      :virtual-ref="menuButtonRef"
      width="fit-content"
      transition="none"
      :offset="8"
      :hide-after="0"
      :show-arrow="false"
    >
      <div :class="$style.wrapper">
        <h2>Account</h2>
        <div :class="$style.userInfor">
          <div :class="$style.avatar">
            <template v-if="user.avatarUrl">
              <el-avatar :size="40" :src="user.avatarUrl" />
            </template>
            <template v-else>
              <el-avatar :size="40" :class="$style.userMenuAvtDefault">{{
                userInitials
              }}</el-avatar>
            </template>
          </div>
          <div :class="$style.infor">
            <div>{{ user.name }}</div>
            <div :class="$style.subtleText">{{ user.email }}</div>
          </div>
        </div>
        <div :class="$style.divider"></div>
        <h2>Trello</h2>
        <nav :class="$style.userNav">
          <ul>
            <li>
              <router-link :to="`/users/${userId}`"> Profile and visibility </router-link>
            </li>
            <li>
              <router-link :to="`/users/${userId}/activity`"> Activity </router-link>
            </li>
            <li>
              <router-link to="/"> Cards </router-link>
            </li>
            <li>
              <router-link to="/"> Settings </router-link>
            </li>
          </ul>
        </nav>

        <div :class="$style.divider"></div>

        <nav>
          <ul>
            <li>
              <button ref="createWorkspaceRef">Create workspace</button>
            </li>
          </ul>
        </nav>

        <div :class="$style.divider"></div>

        <nav>
          <ul>
            <li>
              <!-- TODO: add logout function here -->
              <button>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import { fetchAndSetUser } from '@/api/users'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const userId = computed(() => user.value?.id || '')
const menuButtonRef = ref(null)
const createWorkspaceRef = ref(null)

onMounted(async () => {
  await fetchAndSetUser()
  console.log('User data on mount:', user.value)
})

const userInitials = computed(() => {
  if (user.value?.name) {
    const nameParts = user.value.name.split(' ')
    let initials =
      nameParts.length > 1
        ? nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
        : nameParts[0].charAt(0)
    return initials.toUpperCase()
  }
  return ''
})
</script>

<style module>
.userMenuButton {
  border: none;
  background-color: transparent;
  box-shadow: none;
  display: block;
  position: relative;
  width: 32px;
  height: 32px;
  margin-right: 0;
  padding: 4px;
  outline: 0;
  border-radius: 50%;
  cursor: pointer;
}
.userMenuAvtDefault {
  background-color: #172b4d;
  color: #ffffff;
  font-size: 0.6rem;
}
.userMenuButton:hover {
  background-color: #091e4224;
  color: #44546f;
}
.userMenuPopover {
  -webkit-overflow-scrolling: touch;
  padding: 12px;
  overflow-x: hidden;
  overflow-y: auto;
}
.userInfor {
  display: flex;
  max-width: 100%;
  padding: 8px;
}
.avatar {
  margin-right: 8px;
}
.subtleText {
  overflow: hidden;
  color: #44546f;
  font-size: 12px;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.divider {
  content: ' ';
  display: block;
  height: 1px;
  margin: 8px 10px;
  background-color: var(--ds-border, #091e4224);
}
.wrapper {
  color: #172b4d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
.wrapper h2 {
  margin: 16px 0 8px;
  padding: 0 8px;
  color: var(--ds-text-subtlest, #626f86);
  font-size: 11px;
  font-weight: 700;
  line-height: 16px;
  text-transform: uppercase;
}

.wrapper nav {
  margin: 0 -12px;
}
.userNav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav li > * {
  padding: 8px 20px;
  border: none;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  transition: none;
  border-radius: 0;
  outline: 0;
  background: #00000000;
  box-shadow: none;
  color: #172b4d;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
nav li > *:hover {
  border: none;
  box-shadow: none;
  background: #091e420f;
  color: #172b4d;
  text-decoration: none;
}
</style>
