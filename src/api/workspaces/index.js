import { authorizedAxiosHttpClient } from '@/api/http-client.js'

export async function getWorkSpaces() {
  const data = await authorizedAxiosHttpClient.request({
    url: '/project/',
    method: 'get'
  })
  return data
}
