import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWorkSpaces } from '@/api'

export const useWorkspacesStore = defineStore('workspaces', () => {
  const workspaces = ref([])

  async function fetchWorkspaces() {
    const { data } = await getWorkSpaces()
    workspaces.value = [...data]
  }

  return { workspaces, fetchWorkspaces }
})
