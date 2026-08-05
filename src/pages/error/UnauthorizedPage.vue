<template>
  <section class="page">
    <el-result title="401" sub-title="登录状态已失效，请重新登录。">
      <template #extra>
        <el-button type="primary" @click="$router.push('/login')">重新登录</el-button>
      </template>
    </el-result>
  </section>
</template>
