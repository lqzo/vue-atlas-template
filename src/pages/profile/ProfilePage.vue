<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Profile</h1>
        <p class="page-description">A small user profile page linked from the navbar dropdown.</p>
      </div>
    </div>

    <el-card shadow="never" class="page-card profile-card">
      <div class="profile-card__avatar">{{ userStore.name.slice(0, 1) || 'A' }}</div>
      <div>
        <h2>{{ userStore.name || 'Atlas Admin' }}</h2>
        <p>Roles: {{ userStore.roles.join(', ') || 'admin' }}</p>
        <p>Permissions: {{ userStore.permissions.join(', ') || 'dashboard:view' }}</p>
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

.profile-card__avatar {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 8px;
  background: #2f80ed;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
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
