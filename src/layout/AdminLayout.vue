<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DataBoard, Expand, Fold, House, SwitchButton } from '@element-plus/icons-vue'
import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const permissionStore = usePermissionStore()
const collapsed = ref(false)

const iconMap = {
  DataBoard,
  House
}

const menuRoutes = computed(() => permissionStore.menus)
const breadcrumbs = computed(() => route.matched.filter((item) => item.meta.title))

function getIcon(name?: string) {
  return name ? iconMap[name as keyof typeof iconMap] : House
}

function logout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <el-container class="admin-layout">
    <el-aside class="admin-layout__aside" :width="collapsed ? '64px' : '232px'">
      <div class="admin-layout__brand">
        <span v-if="!collapsed">Vue Atlas</span>
        <span v-else>VA</span>
      </div>
      <el-menu
        :collapse="collapsed"
        :default-active="route.meta.activeMenu || route.path"
        router
        background-color="#172033"
        text-color="#cbd5e1"
      >
        <el-menu-item v-for="item in menuRoutes" :key="item.path" :index="item.path">
          <el-icon><component :is="getIcon(item.icon)" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="admin-layout__header">
        <div class="admin-layout__header-left">
          <el-button
            :icon="collapsed ? Expand : Fold"
            text
            class="admin-layout__collapse"
            @click="collapsed = !collapsed"
          />
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-button :icon="SwitchButton" text @click="logout">Logout</el-button>
      </el-header>
      <el-main class="admin-layout__main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
}

.admin-layout__aside {
  background: var(--atlas-sidebar);
  transition: width 0.2s ease;
  overflow: hidden;
}

.admin-layout__brand {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}

.admin-layout__aside :deep(.el-menu) {
  border-right: 0;
}

.admin-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--atlas-border);
  background: var(--atlas-surface);
}

.admin-layout__header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.admin-layout__collapse {
  width: 32px;
}

.admin-layout__main {
  padding: 0;
}

@media (max-width: 768px) {
  .admin-layout__aside {
    position: fixed;
    z-index: 20;
    height: 100vh;
  }
}
</style>
