import { axiosHttpClient } from '@/api/http-client.js'

export function registerByBasicAuth(credentials) {
  return axiosHttpClient.request({
    url: '/auth/register',
    method: 'post',
    data: credentials
  })
}

export async function loginByBasicAuth(credentials) {
  const response = await axiosHttpClient.request({
    url: '/auth/login',
    method: 'POST',
    data: credentials
  })

  return response.data
}

export function verifyEmail(token) {
  return axiosHttpClient.request({
    url: '/auth/verify-email',
    method: 'post',
    params: {
      token
    }
  })
}
