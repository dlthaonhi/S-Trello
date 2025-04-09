<template>
  <AuthForm
    mode="register"
    @authChange="router.push({ name: 'login' })"
    v-model:email="email"
    v-model:password="password"
    @formSubmit="mutate"
    :isPending="isPending"
  />
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import { ElNotification } from 'element-plus'
import { useMutation } from '@tanstack/vue-query'
import { registerByBasicAuth } from '@/api'
import AuthForm from '@/components/auth/AuthForm.vue'

const email = ref('')
const password = ref('')

const { mutate, isPending, reset } = useMutation({
  mutationKey: ['register'],
  mutationFn: async () => {
    const res = await registerByBasicAuth({ email: email.value, password: password.value })
    if (res.success) {
      ElNotification({
        title: 'Thành công',
        message: res.message || 'Đăng ký thành công',
        type: 'success',
        position: 'top-right',
        duration: 3000
      })
      router.push({ name: 'login' })
    }
  },
  onError: (error) => {
    reset()
    Promise.reject(error)
  }
})
</script>
