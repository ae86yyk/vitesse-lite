<template>
  <div>
    <el-form :inline="true" pt-18px pl-18px>
      <el-form-item label="名称">
        <el-input
          v-model="query.projectName"
          clearable
          @keyup.enter="search()"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="search()"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="isLoading"
      :data="tableData"
      w-full
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="id" label="id" width="280" />
      <el-table-column prop="projectName" label="名称" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { getFileList } from '@/api/table'
const projectName = ref('')
const query = reactive({
  projectName,
  userId: '1111',
  secretId: '123123',
})
const {
  isLoading,
  response: tableData,
  execute: search,
} = getFileList(query)
search()

const debounced = refDebounced(projectName, 500)
watch(debounced, () => (search()))
</script>

<style scoped>

</style>
