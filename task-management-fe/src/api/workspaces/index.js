import { authorizedAxiosHttpClient } from '@/api/http-client.js'

export function getWorkSpaces() {
  return authorizedAxiosHttpClient.request({
    url: '/projects',
    method: 'get'
  })
}
