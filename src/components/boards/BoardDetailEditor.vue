<script setup lang="ts">
import { BoardDetail } from '@/views/boards/BoardMemberDetail.vue'
import { ref, computed, onMounted } from 'vue'

const prop = defineProps<{
  board: BoardDetail
}>()

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

onMounted(() => {
  boardDetail.value = { ...prop.board }
})

const boardDetail = ref<BoardDetail>({
  name: '',
  shortName: '',
  website: '',
  description: ''
})

const submit = async () => {
  emit('save', boardDetail.value)
}
</script>
<template>
  <el-form :class="$style.createBoardForm">
    <div :class="$style.formItemContainer">
      <label :class="$style.formItem">
        <div>
          Tên
          <span class="form-required">*</span>
        </div>
        <el-input v-model="boardDetail.name" placeholder="Tên" />
      </label>
    </div>
    <label :class="$style.formItem">
      <div>
        Tên ngắn gọn
        <span class="form-required">*</span>
      </div>
      <el-input v-model="boardDetail.shortName" placeholder="Tên ngắn gọn" />
    </label>
    <label :class="$style.formItem">
      <div>
        Trang web (tùy chọn)
        <span class="form-required">*</span>
      </div>
      <el-input v-model="boardDetail.website" placeholder="Trang web" />
    </label>
    <label :class="$style.formItem">
      <div>
        Mô tả
        <span class="form-required">*</span>
      </div>
      <el-input v-model="boardDetail.description" type="textarea" placeholder="Mô tả" />
    </label>
    <div :class="$style.actions">
      <el-button :class="$style.createBoardSubmitButton" type="primary" @click="submit"
        >Lưu</el-button
      >
      <el-button :class="$style.createBoardSubmitButton" @click="submit" bg text>Hủy</el-button>
    </div>
  </el-form>
</template>

<style module>
.createBoardButton {
  padding: 0 !important;
  height: 32px;
}

.createBoardButtonIcon {
  width: 32px;
}

.createBoardButtonText {
  padding: 0 12px;
  font-weight: 500;
}

.createBoardPopover {
  padding: 0 !important;
}

.header {
  padding: 4px 8px;
}

.title {
  height: 40px;
  font-size: 14px;
}

.createBoardForm {
  max-width: 400px;
  width: 250px;
}

.formItemContainer {
  margin-bottom: 16px;
}

.formItem {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  font-weight: 400;

  & > div {
    font-weight: 500;
    margin: 0 0 4px 0;
  }
}

.form-required {
  color: red;
}

.margin-8 {
  margin-right: 8px;
}

.createBoardSubmitButton {
  width: 100%;
  margin-top: 16px;
}

.actions {
  display: flex;
  width: 100px;
}
</style>
