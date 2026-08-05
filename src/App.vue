<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const elementLocale = zhCn
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <router-view />
  </el-config-provider>
</template>
