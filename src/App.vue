<script setup>
import layout from '@/layouts/layout.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import Copyright from '@/components/Copyright.vue'
</script>
<template>
  <error-boundary>
    <layout>
      <router-view />
    </layout>
  </error-boundary>
  <Copyright />
</template>
