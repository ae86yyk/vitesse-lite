<template>
  <el-config-provider size="default" :z-index="3000" :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = ref(zhCn)
</script>
