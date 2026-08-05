<script setup lang="ts">
import ErrorPageShell from './components/ErrorPageShell.vue'
</script>

<template>
  <ErrorPageShell
    code="403"
    title="没有访问权限"
    description="当前账号暂时没有访问该页面的权限，可以返回首页或联系管理员开通。"
    tone="danger"
  />
</template>
