import NProgress from 'nprogress'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import type { UserModule } from '@/types'

const whiteList = ['/login'] // no redirect whitelist
const adminList = ['/account']

export const install: UserModule = (app, router) => {
  router.beforeEach(async(to, from, next) => {
    const user = useUserStore()
    // start progress bar
    NProgress.start()

    // console.log(to, from)
    const hasToken = user.getToken()

    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
        NProgress.done()
      }
      else {
        try {
          if (!user.userCode)
            await user.doGetInfo()
            // await user.doGetMenus()

          if (user.userCode !== 'admin' && adminList.includes(to.path))
            next(false)

          else
            next()
        }
        catch (error: any) {
          user.removeToken()
          ElMessage.error(error || 'Has Error')
          next('/login')
          NProgress.done()
        }
      }
    }
    else {
      /* has no token */
      // determine whether the user has logged in
      if (whiteList.includes(to.path)) {
        // in the free login whitelist, go directly
        next()
      }
      else {
        // other pages that do not have permission to access are redirected to the login page.
        next('/login')
        NProgress.done()
      }
    }
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
