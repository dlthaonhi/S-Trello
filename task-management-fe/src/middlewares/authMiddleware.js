import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
export function authMiddleware(to, from, next) {
  const { isLoggedIn } = storeToRefs(useAuthStore())

  if (to.meta.requireAuth && !isLoggedIn.value) {
    return next('/login')
  }

  if (to.meta.layout === 'auth' && isLoggedIn.value) {
    return next('/')
  }

  return next()
}
