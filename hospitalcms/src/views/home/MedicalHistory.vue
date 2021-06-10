<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>服务台</el-breadcrumb-item>
      <el-breadcrumb-item>病历</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="content">
      病历
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // setup() {
  // },
})
</script>
<style lang="less" scoped>
.content {
  margin-top: 20px;
}
</style>
