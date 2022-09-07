import networkRequest from './request/require'
import { BASE_URL, TIME_OUT } from './request/config'
import LocalCache from '@/utils/cache'
const GetData = new networkRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = LocalCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    reponseInterceptor: (res) => {
      console.log(res)
      return res
    },
    reponseInterceptorCatch: (error) => {
      return error
    }
  }
})

export default GetData
