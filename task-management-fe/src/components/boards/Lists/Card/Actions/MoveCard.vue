<script setup>
import BasePopover from '@/components/boards/Lists/Card/BasePopover.vue'
</script>

<template>
  <BasePopover>
    <template #reference>
      <slot name="refElement">
        <button>Click me</button>
      </slot>
    </template>
    <template #header>Di chuyển thẻ</template>
    <template #body>
      <div>
        <h4 class="card-label-title">Chọn đích đến</h4>
        <p>Thêm thành viên vào thẻ</p>
      </div>
    </template>
  </BasePopover>
</template>

<style scoped>
.card-label-title {
  margin-top: 16px;
  margin-bottom: 8px;
  color: var(--ds-text-subtle, #44546f);
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
}
</style>
