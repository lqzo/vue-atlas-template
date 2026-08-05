<script setup lang="ts">
import { Expand, Fold, SwitchButton } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb.vue'

defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  toggleSidebar: []
  logout: []
}>()
</script>

<template>
  <el-header class="navbar">
    <div class="navbar__left">
      <el-button
        :icon="collapsed ? Expand : Fold"
        text
        class="navbar__collapse"
        @click="emit('toggleSidebar')"
      />
      <Breadcrumb />
    </div>
    <el-button :icon="SwitchButton" text @click="emit('logout')">Logout</el-button>
  </el-header>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 12px;
  border-bottom: 1px solid var(--atlas-border);
  background: var(--atlas-surface);
}

.navbar__left {
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
  gap: 12px;
  font-weight: 600;
}

.navbar__collapse {
  flex-shrink: 0;
  width: 32px;
}

.navbar :deep(.el-breadcrumb) {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
