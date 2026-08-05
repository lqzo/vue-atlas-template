<template>
  <section class="page">
    <el-result title="500" sub-title="服务暂时不可用，请稍后再试。">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </section>
</template>
