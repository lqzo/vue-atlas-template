<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

const router = useRouter()
const userStore = useUserStore()
const collapsed = ref(false)

function syncSidebarWithViewport() {
  collapsed.value = window.innerWidth <= 768
}

function toggleSidebar() {
  collapsed.value = !collapsed.value
}

function logout() {
  userStore.logout()
  router.push('/login')
}

onMounted(() => {
  syncSidebarWithViewport()
  window.addEventListener('resize', syncSidebarWithViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', syncSidebarWithViewport)
})
</script>

<template>
  <el-container class="admin-layout">
    <el-aside class="admin-layout__aside" :width="collapsed ? '64px' : '232px'">
      <Sidebar :collapsed="collapsed" />
    </el-aside>
    <el-container class="admin-layout__body" direction="vertical">
      <Navbar :collapsed="collapsed" @toggle-sidebar="toggleSidebar" @logout="logout" />
      <AppMain />
    </el-container>
  </el-container>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
  overflow: hidden;
}

.admin-layout__aside {
  flex-shrink: 0;
  background: var(--atlas-sidebar);
  transition: width 0.2s ease;
  overflow: hidden;
}

.admin-layout__body {
  min-width: 0;
  flex-direction: column;
}
</style>
