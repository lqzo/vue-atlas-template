<template>
  <section class="page">
    <el-result title="404" sub-title="The page you requested does not exist.">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">Back Home</el-button>
      </template>
    </el-result>
  </section>
</template>
