import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { MyInterceptors, LCFInterceptors } from './type'
//封装自己的接口
class networkRequest {
  instance: AxiosInstance
  interceptors?: MyInterceptors
  constructor(config: LCFInterceptors) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    //局部拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.reponseInterceptorCatch,
      this.interceptors?.reponseInterceptorCatch
    )
    //全局的
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use((res) => {
      const data = res.data
      return data
    })
  }
  request<T>(config: LCFInterceptors): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.reponseInterceptor) {
            res = config.interceptors.reponseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: LCFInterceptors): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: LCFInterceptors): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: LCFInterceptors): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: LCFInterceptors): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default networkRequest
