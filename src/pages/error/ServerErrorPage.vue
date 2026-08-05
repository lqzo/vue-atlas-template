<script setup lang="ts">
import ErrorPageShell from './components/ErrorPageShell.vue'
</script>

<template>
  <ErrorPageShell
    code="500"
    title="服务暂时不可用"
    description="服务器处理请求时出现异常，请稍后重试，或返回首页继续其他操作。"
    tone="warning"
  />
</template>
