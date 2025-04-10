<template>
  <div :class="$style.wrapper">
    <div :class="$style.options">
      <div :class="[$style.item, $style.active]">Thành viên trong không gian làm việc (8)</div>

      <div :class="$style.item">Khách (0)</div>
    </div>

    <div :class="$style.divider"></div>

    <div :class="$style.item">Yêu cầu tham gia (0)</div>
  </div>
</template>
<style module>
.wrapper {
  min-width: 240px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.item {
  padding: 8px 16px;
  cursor: pointer;
  max-width: 240px;
  border-radius: 8px;
  font-weight: 500;

  &.active {
    background-color: #e9f2ff;
    color: #0c66e4;
  }

  &:hover {
    background-color: #f4f5f7;
  }
}

.divider {
  height: 1px;
  background-color: #dfe1e6;
  margin: 16px 0;
}
</style>
