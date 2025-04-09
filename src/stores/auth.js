import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginByBasicAuth } from '@/api'
import { jwtDecode } from 'jwt-decode'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const JSONToken = JSON.parse(localStorage.getItem('sgroupTrelloToken'))
  const token = ref(JSONToken || '')
  const userId = ref(typeof JSONToken === 'string' ? jwtDecode(JSONToken).userId : '')

  async function login(credentials) {
    const data = await loginByBasicAuth(credentials)

    if (isLoggedIn.value) {
      Promise.reject('You are already logged in')
      return
    }

    token.value = data.accessToken
    userId.value = jwtDecode(data.accessToken).userId
    localStorage.setItem('sgroupTrelloToken', JSON.stringify(data.accessToken))
    return true
  }

  const isLoggedIn = computed(() => Boolean(token.value))

  function logout() {
    token.value = ''
    userId.value = ''
    localStorage.removeItem('sgroupTrelloToken')
    router.push({ name: 'login' })
  }

  return { token, userId, login, isLoggedIn, logout }
})
