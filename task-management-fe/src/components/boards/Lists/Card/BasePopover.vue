<script setup>
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
const emit = defineEmits(['hide'])
defineExpose({
  hide
})
const elementRef = ref()
const popoverRef = ref()
function hide() {
  emit('hide')
  popoverRef.value.hide()
}
</script>
<template>
  <div ref="elementRef">
    <slot name="reference"> Click me </slot>
  </div>

  <el-popover
    v-bind="$attrs"
    ref="popoverRef"
    :virtual-ref="elementRef"
    trigger="click"
    virtual-triggering
    :hide-after="0"
    @before-leave="$emit('hide')"
    width="304px"
    :popper-style="{ padding: 0, borderRadius: '8px' }"
  >
    <div class="action-popover">
      <div class="action-popover-header">
        <h2 class="action-popover-header-title">
          <slot name="header">Some content </slot>
        </h2>
        <button class="action-popover-close" @click="hide">
          <el-icon><Close /></el-icon>
        </button>
      </div>
      <div class="action-popover-body">
        <slot name="body" />
      </div>
    </div>
  </el-popover>
</template>
<style scoped>
.action-popover-header {
  display: grid;
  position: relative;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
  padding: 4px 8px;
  text-align: center;
}
.action-popover-header-title {
  display: block;
  position: relative;
  grid-column: 1 / span 3;
  grid-row: 1;
  height: 40px;
  margin: 0;
  padding: 0 32px;
  overflow: hidden;
  color: var(--ds-text-subtle, #44546f);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.003em;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.action-popover-close {
  grid-column: 3;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: var(--ds-icon-subtle, #626f86);
}
.action-popover-close:hover {
  background-color: var(--ds-background-neutral-hovered, #091e4224);
  color: var(--ds-icon, #44546f);
  text-decoration: none;
}
.action-popover-body {
  padding: 0 12px 12px 12px;
}
</style>
