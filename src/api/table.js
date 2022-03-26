import { useAxios } from '@vueuse/integrations/useAxios'
import request from '@/composables/request'
export default {
  getFileList(params) {
    return useAxios(
      '/bimEngine/linkManager/getProjectPage',
      {
        method: 'get',
        params,
      },
      request,
      { immediate: false },
    )
  },
  getFileList1(params) {
    return request(
      {
        url: '/bimEngine/linkManager/getProjectPage',
        method: 'get',
        params,
      },
    )
  },
}
