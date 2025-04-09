<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['click'])
function handleClick() {
  emit('click')
}
</script>
<template>
  <el-tooltip
    :content="`${user.last_name} ${user.first_name} (${user.email})`"
    placement="bottom"
    effect="light"
  >
    <el-avatar
      class="avatar-user-tooltip"
      :size="32"
      :src="user.avatar"
      :alt="user.name"
      @click="handleClick"
    />
  </el-tooltip>
</template>
<style scoped></style>
