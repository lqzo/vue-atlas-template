<script setup lang="ts">
import ErrorPageShell from './components/ErrorPageShell.vue'
</script>

<template>
  <ErrorPageShell
    code="401"
    title="登录状态已失效"
    description="当前会话已经过期或尚未登录，请重新登录后继续访问后台。"
    action-text="重新登录"
    action-to="/login"
    tone="warning"
    :show-back="false"
  />
</template>
