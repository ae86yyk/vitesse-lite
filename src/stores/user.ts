import { acceptHMRUpdate, defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import JSEncrypt from '@/composables/jsencrypt'

const keyStr = 'ABCDEFGHIJKLMNOP' + 'QRSTUVWXYZabcdef' + 'ghijklmnopqrstuv' + 'wxyz0123456789+/' + '='
function MD5(input: string) {
  let output = ''
  let chr1; let chr2; let chr3
  let enc1; let enc2; let enc3; let enc4
  let i = 0
  do {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2))
      enc3 = enc4 = 64

    else if (isNaN(chr3))
      enc4 = 64

    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
        + keyStr.charAt(enc3) + keyStr.charAt(enc4)
    chr1 = chr2 = chr3 = ''
    enc1 = enc2 = enc3 = enc4 = ''
  } while (i < input.length)
  return output
}

function encryptPasswd(password: string, publicKey: string, random: string) {
  // 加密密码
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  const mdPassword = MD5(password)
  const enPassword = encrypt.encryptLong(`${password},${mdPassword},${random}`)
  return enPassword
}

export const useUserStore = defineStore('user', () => {
  const userName = ref('')
  const userCode = ref('')
  const userId = ref('')
  const cookies = useCookies(['token'])
  function doLogin(userInfo: any) {
    return useAsyncState(
      () => {
        return new Promise((resolve, reject) => {
          const { username, password } = userInfo
          $api_user.getPublicKey().then((response) => {
            const enPassword = encryptPasswd(password, response.data.publicKey, response.data.random)
            return $api_user.login({ userCode: username.trim(), enPassword, rememberMe: false, captcha: '' })
          }).then((response: any) => {
            const { state } = response
            if (state === 'success') {
              userName.value = response.data.userName
              userId.value = response.data.userId
              userCode.value = response.data.userCode
              cookies.set('token', response.token)
              resolve('')
            }
            else {
              reject(response.msg)
            }
          }).catch((error) => {
            reject(error)
          })
        })
      },
      {},
      { immediate: false },
    )
  }

  function doGetInfo() {
    return new Promise((resolve, reject) => {
      $api_user.getInfo().then((response: any) => {
        const { data_ } = response.result

        if (!data_)
          reject(Error('请重新登录'))

        userName.value = data_.userName
        userId.value = data_.id
        userCode.value = data_.userCode

        resolve('')
      }).catch((error) => {
        reject(error)
      })
    })
  }

  function doLogout() {
    return new Promise((resolve, reject) => {
      $api_user.logout().then(() => {
        cookies.remove('token')
        resolve('')
      }).catch((error) => {
        reject(error)
      })
    })
  }

  function getToken() {
    return cookies.get('token')
  }

  function removeToken() {
    cookies.remove('token')
  }

  return {
    userName,
    userId,
    userCode,
    doLogin,
    doLogout,
    doGetInfo,
    getToken,
    removeToken,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
