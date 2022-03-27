import { useAxios } from '@vueuse/integrations/useAxios'
import request from '@/composables/request'
export default {
  getFileList(params) {
    const option = {
      url: '/bimEngine/linkManager/getProjectPage',
      method: 'get',
      params,
    }
    return useAxios(option.url, option, request, { immediate: false })
  },
  getFileList1(params) {
    const option = {
      url: '/bimEngine/linkManager/getProjectPage',
      method: 'get',
      params,
    }
    return request(option)
  },
}
