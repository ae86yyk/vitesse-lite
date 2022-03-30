<template>
  <div class="login-container">
    <div text-center>
      <img :src="logoBanner" inline-block width="1436">
    </div>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <div class="title-cn">
          账户登录
        </div>
        <div class="title-eng">
          THE ACCOUNT LOGIN
        </div>
      </div>
      <el-form-item prop="username">
        <div style="display:inline-block">
          <div class="input-icon">
            <img :src="user" width="19" height="23">
          </div>
        </div>
        <div class="input-divider" />

        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <div style="display:inline-block">
          <div class="input-icon">
            <img :src="pass" width="17" height="22">
          </div>
        </div>
        <div class="input-divider" />

        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i-svg-eye v-if="passwordType === 'password'" text-gray />
          <i-svg-eye-open v-else text-gray />
        </span>
      </el-form-item>
      <el-button :loading="isLoading" type="primary" class="login-btn" @click="handleLogin">
        <div inline-block v-html="'登&nbsp;&nbsp;&nbsp;&nbsp;录'" />
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import logoBanner from '@/assets/images/login/logoBanner.png'
import user from '@/assets/images/login/user.png'
import pass from '@/assets/images/login/pass.png'
import { useUserStore } from '@/stores/user'

const loginForm = reactive({ username: '', password: '' })
const loginRules = reactive({
  username: [{
    required: true,
    trigger: 'blur',
    validator: () => {

    },
  }],
  password: [{
    required: true,
    trigger: 'blur',
    validator: () => {

    },
  }],
})

const passwordType = ref('password')
const showPwd = () => {
  passwordType.value = passwordType.value === 'password' ? '' : 'password'
}

const userStore = useUserStore()
const { isLoading, execute } = userStore.doLogin(loginForm)
const router = useRouter()

const handleLogin = () => {
  execute().then(() => {
    router.push('/')
  })
}
</script>
<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */

.login-container {
  .el-form-item {
    height: 46px;
    width: 343px;
    background: url('@/assets/images/login/input.png') no-repeat top center;
    margin-bottom: 46px;
    .el-form-item__content {
      line-height: 46px;
      .el-input {
        font-size: 16px;
        display: inline-block;
        height: 100%;
        width: 82%;
        vertical-align: top;
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          color: $light_gray;
          height: 30px;
          caret-color: $cursor;
          &:focus {
            background-color:transparent !important;
          }
          &:-webkit-autofill {
            -webkit-text-fill-color: $cursor !important;
          }
          &:-internal-autofill-previewed,
          &:-internal-autofill-selected{
            -webkit-text-fill-color: #FFFFFF !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }
          box-shadow: none;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background: url("@/assets/images/login/bg.png") no-repeat top center;
  background-size: 100% 100%;
  overflow: hidden;
  .login-top-header {
    margin-top: 213px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 505px;
      height: 50px;
    }
  }
  .login-form {
    position: absolute;
    width: 671px;
    height: 671px;
    padding: 20px 75px 60px;
    max-width: 100%;
    left: 56%;
    bottom: 16%;
    overflow: hidden;
    background: url("@/assets/images/login/earth.png") no-repeat top center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .title-cn {
      width: 105px;
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
    }
    .title-eng {
      width: 151px;
      font-size: 12px;
      font-weight: 400;
      color: #ffffff;
    }
    .login-btn {
      background: url("@/assets/images/login/loginBt.png") no-repeat top
        center;
      background-size: 100% 100%;
      width: 169px;
      height: 48px;
      font-size: 16px;
      border-color: transparent;
      margin-top: 34px;
    }
    .broken-line {
      position: absolute;
      width: 20px;
    }
    .remember-password {
      padding-left: 14px;
      padding-bottom: 14px;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    font-size: 20px;
    padding: 0px 5px 0px 25px;
  }
  .title-container {
    position: relative;
    font-size: 24px;
    width: 457px;
    color: #ffffff;
    text-align: center;
    font-weight: bold;
    background: url("@/assets/images/login/loginBg.png") no-repeat center
      center;
    background-size: 457px 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 90px;
  }
  .show-pwd {
    position: absolute;
    right: 20px;
    top: 3px;
    font-size: 20px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .input-icon {
    width: 50px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-divider {
    display: inline-block;
    width: 1px;
    height: 23px;
    background: #ffffff;
    opacity: 0.7;
  }
}
</style>
