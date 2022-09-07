import { AxiosRequestConfig } from 'axios'
export interface MyInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  reponseInterceptor?: (res: any) => any
  reponseInterceptorCatch?: (error: any) => any
}
export interface LCFInterceptors extends AxiosRequestConfig {
  interceptors?: MyInterceptors
}
