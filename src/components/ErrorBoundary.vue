<template>
  <slot />
</template>

<script setup>
import { onUnmounted, onMounted } from 'vue'
import { ElNotification } from 'element-plus'

onMounted(() => {
  window.addEventListener('unhandledrejection', (event) => {
    event.promise.catch((error) => {
      // why????
      delete error.stack

      ElNotification({
        title: 'Lỗi',
        message: (error?.response?.data?.message ?? error?.message) || 'Unknown error',
        type: 'error',
        position: 'top-right',
        duration: 3000
      })
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('unhandledrejection', () => {})
})
</script>
