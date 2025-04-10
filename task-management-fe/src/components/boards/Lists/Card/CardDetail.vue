<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { Plus, Close, Platform } from '@element-plus/icons-vue'
import TextAreaAutosize from '@/components/common/TextAreaAutosize.vue'
import AvatarUser from '@/components/user/AvatarUser.vue'
import DescriptionEditor from './DescriptionEditor.vue'
import CheckList from './CheckList.vue'
import Activities from './Activities.vue'
import SidebarCardDetail from './SidebarCardDetail.vue'
import ManageCardMember from './Actions/ManageCardMember.vue'
import { getCardDetailById, getBoardData } from '@/api/boards'
import ManageCardLabel from './Actions/ManageCardLabel.vue'
const props = defineProps({
  value: {
    type: Boolean,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
const cardDetail = ref(null)
const boardMembers = ref(null)
const loading = ref(true)
const renderComponent = ref(true)
const labels = ref([])
onBeforeMount(async () => {
  const res = await getCardDetailById(props.id)
  cardDetail.value = res.data
  const response = await getBoardData()
  boardMembers.value = response.members
  labels.value = response.labels
  loading.value = false
})

const boardLabels = computed(() => {
  return labels.value.map((label) => {
    const assignedLabels = cardDetail.value.labels.includes(label.id)
    return {
      ...label,
      assigned: assignedLabels
    }
  })
})
const cardLabels = computed(() => {
  return boardLabels.value.filter((label) => label.assigned)
})
const customStyle = {
  padding: '0',
  backgroundColor: '#fff',
  borderRadius: '12px',
  overflow: 'hidden'
}

function handleClose(done) {
  emit('update:modelValue', false)
  if (done) done()
}
// Handle members
function handleRemoveMember(id) {
  // Handle remove member
  console.log('remove member:', id)
  const index = cardDetail.value.members.findIndex((member) => member.id === id)
  cardDetail.value.members.splice(index, 1)
}
function handleAddMember(id) {
  // Handle add member
  console.log('add member:', id)
  const member = boardMembers.value.find((member) => member.id === id)
  if (member) {
    cardDetail.value.members.push(member)
  }
}

function updateCardLabels(data) {
  // Handle update board labels
  const index = cardDetail.value.labels.findIndex((label) => label === data.id)
  if (index !== -1) cardDetail.value.labels.splice(index, 1)
  else cardDetail.value.labels.push(data.id)
  console.log('update:cardLabels', data)
}
function createBoardLabels(data) {
  labels.value.push(data)
  cardDetail.value.labels.push(data.id)
  console.log('create:boardLabels', cardDetail.value.labels)
}
function updateBoardLabels(data) {
  // Handle update board labels
  console.log('update:boardLabels', data)
  const index = labels.value.findIndex((label) => label.id === data.id)
  if (index === -1) return
  labels.value[index] = data
}
function deleteBoardLabels(id) {
  // Handle delete board labels
  console.log('delete:boardLabels', id)
  const index = labels.value.findIndex((label) => label.id === id)
  if (index === -1) return
  labels.value.splice(index, 1)
  const indexCardLabel = cardDetail.value.labels.findIndex((label) => label === id)
  if (indexCardLabel === -1) return
  cardDetail.value.labels.splice(indexCardLabel, 1)
}
function createChecklist(title) {
  // Handle create checklist
  console.log('create checklist:', title)
  const example = {
    id: new Date().getTime(),
    title: title,
    items: []
  }
  cardDetail.value.checklists.push(example)
}
function updateDescription(value) {
  cardDetail.value.description = value
}
function onUdpateCheckItemStatus(data) {
  // Handle update check item status
  console.log(data)
}
function onUpdateCheckItemTitle(item) {
  // Handle update check item title
  console.log(item.id, item.title)
}
function updateTitleCard() {
  // Handle update title card
  console.log(cardDetail.value.title)
}
function onUpdateChecklistTitle(data) {
  // Handle update checklist title
  console.log(data)
  const indexChecklist = cardDetail.value.checklists.findIndex(
    (checklist) => checklist.id === data.idChecklist
  )
  cardDetail.value.checklists[indexChecklist].title = data.title
}
function deleteChecklist(id) {
  renderComponent.value = false
  const index = cardDetail.value.checklists.findIndex((checklist) => checklist.id === id)
  cardDetail.value.checklists.splice(index, 1)
  renderComponent.value = true
}
function handleAddChecklistItem(data) {
  // Handle add checklist item
  console.log(data)
  const example = {
    id: new Date().getTime(),
    checklist_id: 'd365c62b-db47-4975-8e7e-1a8f0b12581c',
    title: data.title,
    completed: false,
    position: 32768
  }
  const indexChecklist = cardDetail.value.checklists.findIndex(
    (checklist) => checklist.id === data.checklist.id
  )
  cardDetail.value.checklists[indexChecklist].items.push(example)
}

function handleDeleteChecklistItem(data) {
  // Handle delete checklist item
  console.log('delete checklist item:', data)
  const { idChecklist, idChecklistItem } = data
  const indexChecklist = cardDetail.value.checklists.findIndex(
    (checklist) => checklist.id === idChecklist
  )
  const indexChecklistItem = cardDetail.value.checklists[indexChecklist].items.findIndex(
    (item) => item.id === idChecklistItem
  )
  cardDetail.value.checklists[indexChecklist].items.splice(indexChecklistItem, 1)
}
function handleUpdateComment(data) {
  // Handle update comment
  console.log('update comment:', data)
}
function handleDeleteComment(id) {
  // Handle delete comment
  console.log('delete comment:', id)
  const index = cardDetail.value.actions.findIndex((comment) => comment.id === id)
  cardDetail.value.actions.splice(index, 1)
}
function handleComment(content) {
  // Handle comment
  console.log('comment:', content)
  const exampleNewComment = {
    id: new Date().getTime().toString(),
    type: 'comment',
    idMemberCreator: '6489784eab92ffeb9e31e9c5',
    date: '2021-09-30T00:00:00Z',
    data: {
      text: content,
      textData: {
        emoji: {}
      },
      card: {
        id: '66a84a30c638d304b773c2f8',
        name: 'As a user, from the board detail view, I want to open a card to change the title and description, I also want to see who is in charge of it.',
        idShort: 36,
        shortLink: 'vvUv5mtA'
      },
      board: {
        id: '6674aec55f6e8fed5b6f73c4',
        name: 'Specialized Training FE Project',
        shortLink: 'mxzQV8kk'
      },
      list: {
        id: '6674aec55f6e8fed5b6f73c7',
        name: 'To Do'
      },
      dateLastEdited: '2024-08-03T01:47:07.050Z'
    },
    memberCreator: {
      id: '6489784eab92ffeb9e31e9c5',
      activityBlocked: false,
      avatarUrl:
        'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
      bio: '',
      bioData: null,
      confirmed: true,
      fullName: 'Truyền Nguyễn Đức',
      idEnterprise: null,
      idMemberReferrer: null,
      initials: 'TĐ',
      memberType: 'normal',
      nonPublic: {
        fullName: 'Truyền Nguyễn Đức',
        avatarUrl:
          'https://storage.googleapis.com/download/storage/v1/b/sucodev-prod/o/1693294135274-99408387-422D-4A49-8BC2-665259B25C08.jpeg?generation=1693294154495696&alt=media',
        avatarHash: '30626bd386e733d5c0dbc47cc5856f1c'
      },
      url: 'https://trello.com/truynnguyndc',
      username: 'truynnguyndc',
      idPremOrgsAdmin: []
    }
  }
  cardDetail.value.actions.push(exampleNewComment)
}
</script>
<template>
  <el-dialog
    class="no-header-dialog dialog-detail-card"
    :style="customStyle"
    :show-close="false"
    :before-close="handleClose"
    v-loading="loading"
  >
    <div class="card-loading" v-if="loading">
      <span class="card-loading-icon"></span>
    </div>
    <div class="card-detail" v-else>
      <div class="header">
        <el-icon size="32" color="#172b4d" class="header-icon"><Platform /></el-icon>
        <TextAreaAutosize
          v-model="cardDetail.title"
          :font-size="'20px'"
          min-height="32px"
          font-weight="600"
          @blur="updateTitleCard"
        />
        <p class="header-more">
          trong danh sách
          <span class="header-more-position">{{
            cardDetail.current_position.group.group_name
          }}</span>
        </p>
      </div>
      <div class="main">
        <div class="data">
          <div class="data-meta">
            <div class="data-members">
              <h3 class="data-members-title data-item-title">Thành viên</h3>
              <div class="data-members-container">
                <AvatarUser v-for="member in cardDetail.members" :key="member.id" :user="member" />
                <ManageCardMember
                  :members="cardDetail.members"
                  :board-members="boardMembers"
                  @add-member="handleAddMember"
                  @remove-member="handleRemoveMember"
                >
                  <template #refElement>
                    <button class="data-members-button">
                      <el-icon color="#172b4d" size="16"><Plus /></el-icon>
                    </button>
                  </template>
                </ManageCardMember>
              </div>
            </div>
            <div class="data-labels">
              <h3 class="data-labels-title data-item-title">Nhãn</h3>
              <div class="data-labels-container">
                <ManageCardLabel
                  v-for="label in cardLabels"
                  :key="label.id"
                  :board-labels="boardLabels"
                  @update:cardLabels="updateCardLabels"
                  @create:boardLabels="createBoardLabels"
                  @update:boardLabels="updateBoardLabels"
                  @delete:boardLabels="deleteBoardLabels"
                >
                  <template #refElement>
                    <span
                      class="data-labels-item"
                      :style="{ background: label.background, color: label.color }"
                      >{{ label.title }}</span
                    >
                  </template>
                </ManageCardLabel>
                <ManageCardLabel
                  :board-labels="boardLabels"
                  @update:cardLabels="updateCardLabels"
                  @create:boardLabels="createBoardLabels"
                  @update:boardLabels="updateBoardLabels"
                  @delete:boardLabels="deleteBoardLabels"
                >
                  <template #refElement>
                    <button class="data-labels-button">
                      <el-icon color="#172b4d" size="16"><Plus /></el-icon>
                    </button>
                  </template>
                </ManageCardLabel>
              </div>
            </div>
          </div>
          <div class="data-description">
            <DescriptionEditor
              :value="cardDetail.description"
              @update-description="updateDescription"
            />
          </div>
          <div class="data-checklist" v-if="renderComponent">
            <CheckList
              v-for="item in cardDetail.checklists"
              :key="item.item"
              @udpate-checklist-item-status="onUdpateCheckItemStatus"
              @update-checklist-item-title="onUpdateCheckItemTitle"
              @add-check-list-item="handleAddChecklistItem"
              @delete-checklist-item="handleDeleteChecklistItem"
              @update-checklist-title="onUpdateChecklistTitle"
              @delete-checklist="deleteChecklist"
              :checklist="item"
            />
          </div>
          <div class="data-activity">
            <Activities
              :activities="cardDetail.actions"
              @update-comment="handleUpdateComment"
              @delete-comment="handleDeleteComment"
              @comment="handleComment"
            />
          </div>
        </div>
        <div class="sidebar">
          <SidebarCardDetail
            :members="cardDetail.members"
            :board-members="boardMembers"
            :board-labels="boardLabels"
            @add-member="handleAddMember"
            @remove-member="handleRemoveMember"
            @update:cardLabels="updateCardLabels"
            @create:boardLabels="createBoardLabels"
            @update:boardLabels="updateBoardLabels"
            @delete:boardLabels="deleteBoardLabels"
            @create:checklist="createChecklist"
          />
        </div>
      </div>
      <el-icon size="40" color="#172b4d" class="header-close" @click="handleClose()"
        ><Close
      /></el-icon>
    </div>
  </el-dialog>
</template>

<style scoped>
.card-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
}
.card-loading-icon {
  display: block;
  width: 30px;
  height: 30px;
  background-image: url(https://trello.com/assets/24976c46bbf8be9db663.svg);
  background-size: 30px 30px;
}
.card-detail {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  background-color: #091e420f;
}
/* Card header */
.header {
  padding: 14px 52px 8px 46px;
  position: relative;
}
.header-more {
  color: #44546f;
  margin-left: 10px;
  margin-bottom: 8px;
}
.header-more-position {
  text-decoration: underline;
  cursor: pointer;
}
.header-icon {
  position: absolute;
  left: 16px;
  top: 16px;
  padding: 4px;
}
.header-close {
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 6px;
  cursor: pointer;
}
.header-close:hover {
  background-color: #091e4224;
  border-radius: 50%;
}

/* Main */
.main {
  display: flex;
}
.data {
  width: 75%;
  padding: 0 8px 0 16px;
}
.action {
  width: 25%;
  padding: 0 16px 0 8px;
}
.data-meta {
  margin: 8px 0 16px 40px;
  display: flex;
  flex-wrap: wrap;
}
.data-meta > div[class^='data'] {
  margin: 0 8px 8px 0;
}
/* Members container */
.data-members-container {
  display: flex;
  gap: 4px;
  align-items: center;
}
.data-labels {
  margin: 0 8px 8px 0;
  display: flex;
  flex-direction: column;
}

.data-labels-container {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.data-labels-item {
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
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.data-labels-button,
.data-members-button {
  width: 32px;
  height: 32px;
  background-color: #091e420f;
  margin-right: 8px;
  margin-bottom: 0;
  padding: 8px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
}
.data-members-button {
  border-radius: 100%;
}
.data-labels-button:hover,
.data-members-button:hover {
  background-color: #091e4224;
}
.data-item-title {
  color: var(--ds-text-subtle, #44546f);
  display: block;
  font-weight: 600;
  line-height: 20px;
  margin: 0 8px 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.icon-eye-follow {
  margin-right: 2px;
  width: 20px;
  height: 20px;
}
.icon-check-follow {
  margin-left: 4px;
}
.data-description {
  margin-bottom: 48px;
  position: relative;
}
.data-attachment,
.data-checklist,
.data-activity {
  margin-bottom: 24px;
}
/* Sidebar */
.sidebar {
  width: 25%;
  padding: 0 16px 8px 8px;
}
</style>
