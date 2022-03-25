import { useAxios } from '@vueuse/integrations/useAxios'
import request from '@/composables/request'
export function getFileList(params) {
  return useAxios(
    '/bimEngine/linkManager/getProjectPage',
    {
      method: 'get',
      params,
    },
    request,
    { immediate: false },
  )
}

export function getFileList1(params) {
  return request(
    {
      url: '/bimEngine/linkManager/getProjectPage',
      method: 'get',
      params,
    },
  )
}
