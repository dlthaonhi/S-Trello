<script setup>
import { ref, unref } from 'vue'
import { storeToRefs } from 'pinia'
import { useWorkspacesStore } from '@/stores/workspaces.js'

const store = useWorkspacesStore()
const { workspaces } = storeToRefs(store)
const workspaceButtonRef = ref(null)
const workspacePopupRef = ref(null)
const handleNavigate = () => {
  unref(workspacePopupRef).hide?.()
}
</script>

<template>
  <div>
    <el-button ref="workspaceButtonRef">
      Các không gian làm việc
      <el-icon :size="20">
        <i-mdi-keyboard-arrow-down />
      </el-icon>
    </el-button>
    <el-popover
      ref="workspacePopupRef"
      :popper-class="$style.workspacesPopover"
      trigger="click"
      virtual-triggering
      :virtual-ref="workspaceButtonRef"
      width="300px"
      transition="none"
      :offset="8"
      :hide-after="0"
      :show-arrow="false"
      placement="bottom-start"
    >
      <h2 :class="$style.workspacesHeader">Không gian làm việc của bạn</h2>
      <ul>
        <li :class="$style.workspace" v-for="workspace in workspaces" :key="workspace.id">
          <router-link
            :class="$style.workspaceContainer"
            :to="{ name: 'board-detail', params: { id: workspace.id } }"
            @click="handleNavigate"
          >
            <div :class="$style.workspaceLogo">
              <div :class="$style.workspaceLogoText">
                {{ workspace.title.charAt(0) }}
              </div>
            </div>
            <p :class="$style.workspaceTitle">
              {{ workspace.title }}
            </p>
          </router-link>
        </li>
      </ul>
    </el-popover>
  </div>
</template>

<style module>
.workspacesPopover {
  padding: 0 !important;
  box-shadow: var(--ds-shadow-overlay, 0px 8px 12px #091e4226, 0px 0px 1px #091e424f) !important;
}
.workspaceContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 12px 4px;
  padding: 8px;
  overflow: hidden;
  border-radius: 8px;
  color: #172b4d;
  text-decoration: none;
  cursor: pointer;
}
.workspaceContainer:hover {
  background-color: #091e420f;
  color: currentColor;
  text-decoration: none;
}
.workspacesHeader {
  margin: 16px 20px 8px 20px;
  color: #44546f;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}
.workspaceLogo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 4px;
  background-color: var(--ds-background-neutral, #091e420f);
}
.workspaceTitle {
  flex: 1;
  margin-bottom: 0;
  margin-left: 12px;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.workspaceLogoText {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
