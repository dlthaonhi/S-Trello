<template>
  <AuthForm
    mode="login"
    @authChange="$router.push({ name: 'register' })"
    v-model:email="email"
    v-model:password="password"
    @formSubmit="mutate"
    :isPending="isPending"
  />
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useMutation } from '@tanstack/vue-query'
import { useAuthStore } from '@/stores/auth'
import AuthForm from '@/components/auth/AuthForm.vue'

const { login } = useAuthStore()

const email = ref('')
const password = ref('')

const { mutate, isPending, reset } = useMutation({
  mutationKey: ['login'],
  mutationFn: async () => {
    const success = await login({ email: email.value, password: password.value })
    success && router.push({ name: 'home' })
  },
  onError: (error) => {
    reset()
    Promise.reject(error)
  }
})
</script>
