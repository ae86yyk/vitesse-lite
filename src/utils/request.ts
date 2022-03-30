import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

// create an axios instance
const service = axios.create({
  baseURL: '/bim', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date().toString()) / 1000,
        ...config.params,
      }
    }
    return config
  },
  (error) => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    const errorArr = ['500', '404']
    if (res.code && errorArr.includes(res.code)) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(new Error('失败'))
    }
    if (res.state && res.state === 'error') {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return res
  },
  (error) => {
    if (error.response) {
      // 登陆失效
      if (error.response.data.code === '401' || (error.response.data.code === '500' && error.response.data.msg.includes('Missing request header \'userId\' for method parameter of type String'))) {
        location.reload()
        return Promise.reject(error)
      }
    }
    const res = error.response.data
    if (res.state && res.state === 'error') {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    switch (error.response.status) {
      case 400: error.message = '请求错误'; break
      case 401: error.message = '未授权，请登录'; break
      case 403: error.message = '拒绝访问'; break
      case 408: error.message = '请求超时'; break
      case 500: error.message = '服务器内部错误'; break
      case 501: error.message = '服务未实现'; break
      case 502: error.message = '网关错误'; break
      case 503: error.message = '服务不可用'; break
      case 504: error.message = '网关超时'; break
      case 505: error.message = 'HTTP版本不受支持'; break
      default: break
    }
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

export const request = service
export const useRequest = (option: AxiosRequestConfig) => {
  return useAxios(option.url as string, option, request, { immediate: false })
}
