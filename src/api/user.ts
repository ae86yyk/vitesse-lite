import type { AxiosRequestConfig } from 'axios'
import { request } from '@/utils/request'

export default {
  login(data) {
    const option: AxiosRequestConfig = {
      url: '/fweb-security/login/dologin',
      method: 'post',
      data,
    }
    return request(option)
  },
  getPublicKey() {
    const option: AxiosRequestConfig = {
      url: '/fweb-security/login/getPublicKey',
      method: 'get',
    }
    return request(option)
  },
  getInfo() {
    const option: AxiosRequestConfig = {
      url: '/fweb-security/login/getLoginUserInfo',
      method: 'get',
    }
    return request(option)
  },
  logout() {
    const option: AxiosRequestConfig = {
      url: '/fweb-security/login/logout',
      method: 'post',
    }
    return request(option)
  },

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
}
