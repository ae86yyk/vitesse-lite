import type { AxiosRequestConfig } from 'axios'
import { request, useRequest } from '@/utils/request'

export default {
  getFileList(params) {
    const option: AxiosRequestConfig = {
      url: '/bimEngine/linkManager/getProjectPage',
      method: 'get',
      params,
    }
    return useRequest(option)
  },
  getFileList1(params) {
    const option: AxiosRequestConfig = {
      url: '/bimEngine/linkManager/getProjectPage',
      method: 'get',
      params,
    }
    return request(option)
  },
}
