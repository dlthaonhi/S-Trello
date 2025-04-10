// src/stores/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  function setUser(userData) {
    user.value = userData
  }
  return { user, setUser }
})
