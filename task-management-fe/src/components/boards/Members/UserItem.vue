<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'

defineProps(['user'])

const visible = ref(false)

const onClickOutside = () => {
  console.log('click outside')
  visible.value = false
}
</script>
<template>
  <div :class="$style.userItem">
    <div :class="$style.avatar">
      <img :src="user.avatar" alt="avatar" />
    </div>
    <div :class="$style.username">
      <p>
        {{ user.name }}
      </p>
      <p>
        {{ user.username }}
      </p>
    </div>
    <div :class="$style.action">
      <el-popover :visible="visible" placement="bottom" :width="304">
        <div :class="$style.popover">
          <div :class="$style.popoverHeader">
            <h3>Rời khỏi không gian làm việc</h3>
            <div :class="$style.popoverClose">
              <el-button @click="visible = false" text>
                <el-icon>
                  <Close />
                </el-icon>
              </el-button>
            </div>
          </div>
          <p>
            Bạn sẽ trở thành khách của Không gian làm việc này và sẽ chỉ có thể truy cập các bảng
            thông tin mà bạn đang là thành viên.
          </p>

          <div :class="$style.popoverFooter">
            <el-button type="danger" @click="visible = false">
              Rời khỏi không gian làm việc
            </el-button>
          </div>
        </div>
        <template #reference>
          <el-button v-click-outside="onClickOutside" @click="visible = true" text bg>
            <el-icon>
              <Close />
            </el-icon>
            &nbsp; Loại bỏ
          </el-button>
        </template>
      </el-popover>
    </div>
  </div>
</template>
<style module>
.userItem {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  align-items: center;
  border-bottom: 1px solid #dfe1e6;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.username {
  display: flex;
  flex-direction: column;

  p:first-child {
    font-size: 14px;
    font-weight: 500;
    color: #172b4d;
  }

  p:last-child {
    font-size: 12px;
    font-weight: 400;
    color: #6b778c;
  }
}

.action {
  margin-left: auto;
}

.popoverHeader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 40px;
  margin: 0;
  padding: 0 32px;
  overflow: hidden;
  color: var(--ds-text-subtle, #44546f);
  font-size: 14px;
  font-weight: 600;
}

.popoverClose {
  position: absolute;
  top: 0;
  right: 0;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    color: #626f86;
  }
}

.popoverFooter {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  width: 100%;

  button {
    width: 100%;
    background-color: #ae2a19;
  }
}
</style>
