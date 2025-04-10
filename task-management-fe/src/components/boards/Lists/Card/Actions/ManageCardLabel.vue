<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import BasePopover from '@/components/boards/Lists/Card/BasePopover.vue'
import { ArrowLeft, EditPen } from '@element-plus/icons-vue'
const props = defineProps({ boardLabels: Array })
const emit = defineEmits([
  'update:cardLabels',
  'update:boardLabels',
  'create:boardLabels',
  'delete:boardLabels'
])
const colors = ref([
  { id: 1, background: '#4BCE97', color: '#164B35' },
  { id: 2, background: '#F5CD47', color: '#533F04' },
  { id: 3, background: '#FEA362', color: '#702E00' },
  { id: 4, background: '#F87168', color: '#5D1F1A' },
  { id: 5, background: '#9F8FEF', color: '#352C63' },
  { id: 6, background: '#1F845A', color: '#FFFFFF' },
  { id: 7, background: '#946F00', color: '#FFFFFF' },
  { id: 8, background: '#C25100', color: '#FFFFFF' },
  { id: 9, background: '#C9372C', color: '#FFFFFF' },
  { id: 10, background: '#6E5DC6', color: '#FFFFFF' },
  { id: 11, background: '#CCE0FF', color: '#09326C' },
  { id: 12, background: '#C6EDFB', color: '#164555' },
  { id: 13, background: '#D3F1A7', color: '#37471F' },
  { id: 14, background: '#FDD0EC', color: '#50253F' },
  { id: 15, background: '#DCDFE4', color: '#091E42' },
  { id: 16, background: '#579DFF', color: '#09326C' },
  { id: 17, background: '#6CC3E0', color: '#164555' },
  { id: 18, background: '#94C748', color: '#37471F' },
  { id: 19, background: '#E774BB', color: '#50253F' },
  { id: 20, background: '#8590A2', color: '#091E42' },
  { id: 21, background: '#0C66E4', color: '#FFFFFF' },
  { id: 22, background: '#227D9B', color: '#FFFFFF' },
  { id: 23, background: '#5B7F24', color: '#FFFFFF' },
  { id: 24, background: '#AE4787', color: '#FFFFFF' },
  { id: 25, background: '#626F86', color: '#FFFFFF' }
])
const labels = ref(props.boardLabels)
const search = ref('')
const newLabelTitle = ref('')
const currentColor = ref(colors.value[5])
const editingLabel = ref(null)
const mode = ref('view')
const inputSearch = ref(null)
const inputTitle = ref(null)
function pickColor(color) {
  currentColor.value = color
}

const boardLabelsFilter = computed(() => {
  return labels.value.filter((label) => label.title.includes(search.value.trim()))
})

const title = computed(() => {
  const name = {
    view: 'Nhãn',
    create: 'Tạo nhãn mới',
    edit: 'Chỉnh sửa nhãn',
    delete: 'Xóa nhãn'
  }
  return name[mode.value]
})

watch(mode, async (value) => {
  await nextTick()
  switch (value) {
    case 'view':
      inputSearch.value.focus()
      break
    case 'create':
      inputTitle.value.focus()
      break
    case 'edit':
      inputTitle.value.focus()
      break
  }
})

function clearCurrentColor() {
  currentColor.value = { id: '', background: '#091e420f' }
}
function switchToMode(value, item = null) {
  switch (value) {
    case 'view':
      newLabelTitle.value = ''
      mode.value = value
      break
    case 'create':
      newLabelTitle.value = search.value
      mode.value = value
      break
    case 'edit':
      editingLabel.value = item
      newLabelTitle.value = item.title
      currentColor.value = colors.value.find((color) => color.background === item.background)
      mode.value = value
      break
    default:
      mode.value = value
      break
  }
}

function save() {
  const updateLabel = {
    title: newLabelTitle.value,
    background: currentColor.value.background,
    color: currentColor.value.color
  }
  if (mode.value === 'create') {
    updateLabel.id = Math.random().toString(36).substring(2, 9)
    updateLabel.assigned = true
    labels.value.push(updateLabel)
    emit('create:boardLabels', updateLabel)
  } else if (mode.value === 'edit') {
    updateLabel.id = editingLabel.value.id
    console.log('Lưu nhãn', updateLabel)
    emit('update:boardLabels', updateLabel)
    const index = labels.value.findIndex((label) => label.id === editingLabel.value.id)
    labels.value[index] = { ...updateLabel, assigned: editingLabel.value.assigned }
  }
  search.value = ''
  cancel()
}
function cancel() {
  if (mode.value === 'delete') {
    mode.value = 'edit'
    return
  }
  currentColor.value = colors.value[5]
  newLabelTitle.value = ''
  editingLabel.value = null
  mode.value = 'view'
}
function handleClickLabel(params) {
  const item = { ...params, assigned: !params.assigned }
  const index = labels.value.findIndex((label) => label.id === item.id)
  labels.value[index] = item
  emit('update:cardLabels', item)
}
function deleteLabel() {
  const index = labels.value.findIndex((label) => label.id === editingLabel.value.id)
  labels.value.splice(index, 1)
  emit('delete:boardLabels', editingLabel.value.id)
  mode.value = 'view'
  cancel()
}
function resetState() {
  search.value = ''
  newLabelTitle.value = ''
  currentColor.value = colors.value[5]
  editingLabel.value = null
  mode.value = 'view'
}
</script>
<template>
  <BasePopover @hide="resetState">
    <template #reference>
      <slot name="refElement">
        <button>Click me</button>
      </slot>
    </template>
    <template #header>{{ title }}</template>
    <template #body>
      <div v-if="mode === 'view'" class="view-label">
        <input
          ref="inputSearch"
          type="text"
          v-model="search"
          placeholder="Tìm nhãn..."
          class="input-labels"
        />
        <h4 class="card-label-title">Nhãn</h4>
        <ul v-if="boardLabelsFilter.length > 0" class="list-labels">
          <li v-for="item in boardLabelsFilter" class="list-labels-item" :key="item.id">
            <input
              type="checkbox"
              name=""
              id=""
              :checked="item?.assigned"
              class="checkbox-labels"
              @click="handleClickLabel(item)"
            />
            <span
              class="list-labels-color"
              :style="{ background: item.background, color: item.color }"
              @click="handleClickLabel(item)"
              >{{ item.title }}</span
            >
            <button class="button-hover" @click="switchToMode('edit', item)">
              <el-icon color="#172B4D"><EditPen /></el-icon>
            </button>
          </li>
        </ul>
        <button class="button-hover button-create-labels" @click="switchToMode('create')">
          Tạo nhãn mới
        </button>
      </div>
      <div v-else-if="mode === 'delete'" class="delete-label">
        <button class="button-hover back-button" @click="cancel">
          <el-icon color="#172b4d"><ArrowLeft /></el-icon>
        </button>
        <h4 class="text-[#172b4d]">
          Việc này sẽ xóa nhãn này khỏi tất cả các thẻ. Không có hoàn tác
        </h4>
        <el-button class="w-full mt-4" type="danger" @click="deleteLabel">Xóa</el-button>
      </div>
      <div v-else class="create-edit-label">
        <button class="button-hover back-button" @click="cancel">
          <el-icon color="#172b4d"><ArrowLeft /></el-icon>
        </button>
        <div class="label-preview-container">
          <span
            class="label-preview-item"
            :style="{
              background: `${currentColor.background}`,
              color: `${currentColor.color}`
            }"
            >{{ newLabelTitle }}</span
          >
        </div>
        <h4 class="card-label-title">Tiêu đề</h4>
        <input ref="inputTitle" type="text" v-model="newLabelTitle" class="input-labels" />
        <h4 class="card-label-title">Chọn một màu</h4>
        <div class="list-color">
          <div
            v-for="(item, index) in colors"
            :key="index"
            class="list-color-item"
            :style="{ background: `${item.background}` }"
            :class="{ 'border-primary': item.id === currentColor.id }"
            @click="pickColor(item)"
          ></div>
        </div>
        <el-button
          :type="currentColor.id ? '' : 'disabled'"
          :disabled="!currentColor.id"
          class="clear-color"
          @click="clearCurrentColor"
        >
          <span>Gỡ bỏ màu</span>
        </el-button>
        <hr />
        <div class="footer">
          <el-button type="primary" @click="save">
            <span>{{ mode === 'create' ? 'Tạo mới' : 'Lưu' }}</span>
          </el-button>
          <el-button v-if="mode === 'edit'" type="danger" @click="switchToMode('delete')">
            <span>Xóa</span>
          </el-button>
        </div>
      </div>
    </template>
  </BasePopover>
</template>
<style scoped>
.list-labels {
  padding: 4px 0 8px 0;
}
.list-labels-item {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0 0 4px 4px;
  cursor: pointer;
  display: flex;
  gap: 4px;
}
input[type='checkbox'] {
  cursor: pointer;
  height: 16px;
  margin: 0;
  width: 16px;
  background-color: var(--ds-background-input, #fff);
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px var(--ds-border-input, #091e4224);
  margin: 6px;
  margin-left: 0;
}
.list-labels-color {
  display: inline-block;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  width: 200px;
  height: 32px;
  margin-bottom: 0;
  padding: 0 12px;
  overflow: hidden;
  border-radius: 3px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.create-edit-label,
.delete-label {
  position: relative;
}
.button-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #172b4d;
}
.button-hover:hover {
  background-color: var(--ds-background-neutral, #091e420f);
}
.button-create-labels {
  width: 100%;
  background-color: #091e420f;
  padding: 6px 12px;
  margin: 4px 0;
  border-radius: 3px;
}
.button-create-labels:hover {
  background-color: #091e4224;
}
.back-button {
  position: absolute;
  top: -42px;
  left: -4px;
}
.label-preview-container {
  margin: 0 -12px;
  padding: 32px;
  background-color: #f7f8f9;
}
.label-preview-item {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  min-width: 48px;
  max-width: 100%;
  height: 32px;
  margin-bottom: 0;
  padding: 0 12px;
  overflow: hidden;
  border-radius: 3px;
  background-color: var(--label-background-color, var(--ds-skeleton, #091e420f));
  color: var(--label-text-color, var(--ds-text, #172b4d));
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.input-labels {
  margin: 4px 0 12px;
  width: 100%;
  background-color: var(--ds-background-input, #fff);
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px var(--ds-border-input, #091e4224);
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  outline: none;
  padding: 8px 12px;
}
.input-labels:focus {
  background-color: var(--ds-background-input, #fff);
  box-shadow: inset 0 0 0 2px var(--ds-border-focused, #388bff);
}
.card-label-title {
  margin-top: 16px;
  margin-bottom: 8px;
  color: var(--ds-text-subtle, #44546f);
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
}
.list-color {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}
.list-color-item {
  position: relative;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 3px;
  margin: 1px;
  cursor: pointer;
}
.list-color-item.border-primary {
  border-color: #579dff;
}
.list-color-item.border-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px var(--ds-border-inverse, #ffffff) solid;
  pointer-events: none;
}
.clear-color {
  width: 100%;
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  gap: 4px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background-color: var(--ds-background-neutral, #091e420f);
  box-shadow: none;
  color: var(--ds-text, #172b4d);
  font-weight: 500;
}
.clear-color:hover {
  background-color: #091e4224;
}
hr {
  background-color: var(--ds-border, #091e4224);
  border: 0;
  height: 1px;
  margin: 16px 0;
  padding: 0;
  width: 100%;
}
.footer {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  margin-top: 16px;
}
</style>
