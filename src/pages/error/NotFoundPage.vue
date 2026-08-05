<script setup lang="ts">
import ErrorPageShell from './components/ErrorPageShell.vue'
</script>

<template>
  <ErrorPageShell
    code="404"
    title="页面不存在"
    description="你访问的页面可能已被移动、删除，或当前链接地址不正确。"
  />
</template>
