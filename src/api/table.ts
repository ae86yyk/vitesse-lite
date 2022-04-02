import { request, useRequest } from '@/utils/request'

export default {
  getFileList(params) {
    return useRequest({
      url: '/bimEngine/linkManager/getProjectPage',
      method: 'get',
      params,
    })
  },
  getFileList1(params) {
    return request({
      url: '/bimEngine/linkManager/getProjectPage',
      method: 'get',
      params,
    })
  },
}
