<script setup>
import Header from '@/components/header/Header.vue'
</script>
<template>
  <el-container :class="$style.defaultContainer">
    <el-header :class="$style.defaultHeader">
      <Header />
    </el-header>
    <el-main :class="$style.defaultMain">
      <slot />
    </el-main>
  </el-container>
</template>

<style module>
.defaultContainer {
  height: 100%;
}
.defaultHeader {
  --el-header-height: 40px !important;
  --el-header-padding: 0 !important;
  min-height: 48px;
  max-height: 48px;
}
.defaultMain {
  --el-main-padding: 0 !important;
}
</style>
