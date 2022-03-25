<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const name = $ref(user.userName)

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/children/${encodeURIComponent(name)}`)
}
const table = () => {
  router.push('/table')
}
const logout = () => {
  user.doLogout().then(() => {
    router.push('/login')
  })
}
</script>

<template>
  <div text-center>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <el-button m-3 text-sm type="primary" @click="go">
        Go
      </el-button>
      <el-button m-3 text-sm type="primary" @click="table">
        table
      </el-button>
      <el-button m-3 text-sm type="primary" @click="logout">
        logout
      </el-button>
    </div>
  </div>
</template>
