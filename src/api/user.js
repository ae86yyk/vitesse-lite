import request from '@/composables/request'
export default {
  login(data) {
    return request(
      {
        url: '/fweb-security/login/dologin',
        method: 'post',
        data,
      },
    )
  },
  getPublicKey() {
    return request({
      url: '/fweb-security/login/getPublicKey',
      method: 'get',
    })
  },
  getInfo() {
    return request({
      url: '/fweb-security/login/getLoginUserInfo',
      method: 'get',
    })
  },
  logout() {
    return request({
      url: '/fweb-security/login/logout',
      method: 'post',
    })
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
