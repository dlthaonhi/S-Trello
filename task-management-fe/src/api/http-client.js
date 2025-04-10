import axios from 'axios'

/**
 * @typedef {Object} HttpRequest
 * @property {string} url
 * @property {'get' | 'post' | 'put' | 'patch'} method
 * @property {any} params
 * @property {any} data
 */

class HttpClient {
  request() {
    throw new Error('Not implement HttpClient#request')
  }
}

class AxiosHttpClient extends HttpClient {
  /**
   * @param {axios.AxiosInstance} axios
   */
  constructor(axios) {
    super()
    this.axios = axios
  }

  /**
   * @param {HttpRequest} config
   */
  async request(config) {
    const response = await this.axios.request(config)

    return response.data
  }
}

class AuthorizedAxiosHttpClient extends HttpClient {
  static ACCESS_TOKEN_KEY = 'sgroupTrelloToken'
  /**
   * @param {axios.AxiosInstance} axios
   */
  constructor(axios) {
    super()
    this.axios = axios
    this.axios.interceptors.request.use((config) => {
      const accessTokenRaw = localStorage.getItem(AuthorizedAxiosHttpClient.ACCESS_TOKEN_KEY)
      const accessToken = JSON.parse(accessTokenRaw)

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      return config
    })
    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (401 === error?.response?.status) {
          localStorage.removeItem(AuthorizedAxiosHttpClient.ACCESS_TOKEN_KEY)
          window.location.href = '/login'
        }

        return Promise.reject(error)
      }
    )
  }

  /**
   * @param {HttpRequest} config
   */
  async request(config) {
    const response = await this.axios.request(config)

    return response.data
  }
}

const basicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
export const axiosHttpClient = new AxiosHttpClient(basicAxios)
export const authorizedAxiosHttpClient = new AuthorizedAxiosHttpClient(authAxios)
