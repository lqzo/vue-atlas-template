<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const emit = defineEmits<{
  logout: []
}>()

function handleCommand(command: string) {
  if (command === 'profile') {
    router.push('/profile')
    return
  }

  if (command === 'github') {
    window.open('https://github.com/lqzo/vue-atlas-template', '_blank', 'noopener,noreferrer')
    return
  }

  if (command === 'logout') {
    emit('logout')
  }
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <button class="user-dropdown" type="button">
      <span class="user-dropdown__avatar">{{ userStore.name.slice(0, 1) || 'A' }}</span>
      <span class="user-dropdown__name">{{ userStore.name || 'Atlas Admin' }}</span>
      <el-icon class="user-dropdown__arrow"><ArrowDown /></el-icon>
    </button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile">Profile</el-dropdown-item>
        <el-dropdown-item command="github">GitHub</el-dropdown-item>
        <el-dropdown-item command="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.user-dropdown {
  display: inline-flex;
  align-items: center;
  height: 40px;
  gap: 8px;
  border: 0;
  background: transparent;
  color: var(--atlas-text);
  cursor: pointer;
}

.user-dropdown__avatar {
  display: inline-grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 6px;
  background: #2f80ed;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.user-dropdown__name {
  max-width: 120px;
  overflow: hidden;
  color: var(--atlas-muted);
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-dropdown__arrow {
  color: var(--atlas-muted);
}

@media (max-width: 640px) {
  .user-dropdown__name {
    display: none;
  }
}
</style>
