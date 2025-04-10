<template>
  <div class="flex flex-row">
    <SideBar />
    <div class="flex flex-col w-full">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import SideBar from '@/components/boards/SideBar.vue'
</script>
