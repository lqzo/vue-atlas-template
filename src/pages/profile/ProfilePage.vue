<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">个人中心</h1>
        <p class="page-description">从顶部用户下拉菜单进入的用户信息页面。</p>
      </div>
    </div>

    <el-card shadow="never" class="page-card profile-card">
      <UserAvatar :name="userStore.name" size="lg" />
      <div>
        <h2>{{ userStore.name || 'Atlas Admin' }}</h2>
        <p>角色：{{ userStore.roles.join(', ') || 'admin' }}</p>
        <p>权限：{{ userStore.permissions.join(', ') || 'dashboard:view' }}</p>
      </div>
    </el-card>
  </section>
</template>

<style scoped>
.profile-card :deep(.el-card__body) {
  display: flex;
  align-items: center;
  gap: 18px;
}

.profile-card h2 {
  margin: 0 0 6px;
  font-size: 18px;
}

.profile-card p {
  margin: 4px 0;
  color: var(--atlas-muted);
}
</style>
