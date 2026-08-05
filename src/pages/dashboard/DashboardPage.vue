<template>
  <section class="page">
    <h1 class="page-title">Dashboard</h1>
    <el-row :gutter="16">
      <el-col :xs="24" :md="8">
        <el-card shadow="never">
          <template #header>Architecture</template>
          Router, permission, request and layout are ready for business work.
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card shadow="never">
          <template #header>Stack</template>
          Vue 3, Vue Router 5, Pinia, Vite and Element Plus.
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card shadow="never">
          <template #header>Permission</template>
          <el-button v-permission="'dashboard:view'" type="primary">Visible by permission</el-button>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>
