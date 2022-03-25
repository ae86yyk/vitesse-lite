// import { useAxios } from '@vueuse/integrations/useAxios'
import request from '@/composables/request'
export function login(data) {
  return request(
    {
      url: '/fweb-security/login/dologin',
      method: 'post',
      data,
    },
  )
}

export function getPublicKey() {
  return request({
    url: '/fweb-security/login/getPublicKey',
    method: 'get',
  })
}

export function getInfo() {
  return request({
    url: '/fweb-security/login/getLoginUserInfo',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/fweb-security/login/logout',
    method: 'post',
  })
}

// export function fwebRoleMenu(data) {
//   return request({
//     url: '/fweb-security/role/queryroleleafmenulist',
//     method: 'post',
//     data,
//   })
// }

// export function getRoleIds() {
//   return request({
//     url: '/bimow/userInfo/getRoleIds',
//     method: 'get',
//   })
// }

// export function getRoleIdsByProject(params) {
//   return request({
//     url: `/bimow/userInfo/getRoleIdsByProject/${params.id}`,
//     method: 'get',
//   })
// }

// export function getFileToken() {
//   return request({
//     url: '/bimow/fileservice/getToken',
//     method: 'get',
//   })
// }

// export function getUserInfo(id) {
//   return request({
//     url: `/bimow/userInfo/getUserInfo/${id}`,
//     method: 'get',
//   })
// }

// export function updatepasswd(data) {
//   return request({
//     url: '/fweb-security/user/updatepasswd',
//     method: 'post',
//     data,
//   })
// }
