import { axiosHttpClient, authorizedAxiosHttpClient  } from '../http-client'
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '@/stores/user'

export async function fetchAndSetUser() {
  try {
    const token = localStorage.getItem('sgroupTrelloToken')
    if (!token) throw new Error('Token not found')

    const userId = jwtDecode(token).userId
    const { data } = await authorizedAxiosHttpClient.request({
      url: `/user/${userId}`,
      method: 'get'
    })
    
    return data
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
