<script setup>
import { verifyEmail } from '@/api'
import { ElNotification } from 'element-plus'
import router from '@/router'
import { useMutation } from '@tanstack/vue-query'

const { mutate, isPending, reset } = useMutation({
  mutationKey: ['activate'],
  mutationFn: async (token) => {
    if (!token)
      throw new Error({
        message: 'Token không hợp lệ'
      })
    const res = await verifyEmail(token)

    // JAVASCRIPT MAGIC
    res &&
      router.push({ name: 'login' }) &&
      ElNotification({
        title: 'Thành công',
        message: res.message || 'Tài khoản đã được kích hoạt',
        type: 'success',
        position: 'top-right',
        duration: 3000
      })
  },
  onError: (error) => {
    reset()
    Promise.reject(error)
  }
})
</script>

<template>
  <el-form :class="$style.form">
    <el-button :loading="isPending" type="primary" size="large" @click="mutate($route.query.token)"
      >Kích hoạt tài khoản</el-button
    >
  </el-form>
</template>

<style module>
.form {
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  width: 400px;
  padding: 32px 40px;
  background: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  box-sizing: border-box;
  color: var(--ds-text-subtle, #42526e);
}
</style>
