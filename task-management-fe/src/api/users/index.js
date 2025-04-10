import { axiosHttpClient } from '../http-client'
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '@/stores/user'

function formatUserData(user) {
  return {
    avatarUrl: user.avatarUrl,
    bio: user.bio || 'This is a default bio',
    createdAt: user.createdAt,
    email: user.email || 'test@gmail.com',
    id: user.id,
    isActive: user.isActive || true,
    name: user.name || 'Default Name',
    password: user.password || 'password',
    updatedAt: user.updatedAt
  }
}
export async function fetchAndSetUser() {
  try {
    const token = localStorage.getItem('sgroupTrelloToken')
    if (!token) throw new Error('Token not found')

    const userId = jwtDecode(token).userId
    const { data } = await axiosHttpClient.request({
      url: `/users/${userId}`,
      method: 'get'
    })
    const formattedData = formatUserData(data)
    const userStore = useUserStore()
    userStore.setUser(formattedData)
  } catch (error) {
    console.error('Error fetching and setting user:', error)
  }
}
// export async function updateUserProfile(userData) {
//   const userStore = useUserStore()
//   const userId = userStore.user.id
//   try {
//     const { data } = await axiosHttpClient.request({
//       url: `/users/${userId}`,
//       method: 'patch',
//       data: userData
//     })
//     const formattedData = formatUserData(data)
//     userStore.setUser(formattedData)
//   } catch (error) {
//     console.error('Error updating user profile:', error)
//   }

// }
