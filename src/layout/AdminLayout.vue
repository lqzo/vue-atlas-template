<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const collapsed = ref(false)
const isMobile = ref(false)
const mobileSidebarOpen = ref(false)

const sidebarCollapsed = computed(() => !isMobile.value && collapsed.value)
const toggleCollapsed = computed(() =>
  isMobile.value ? !mobileSidebarOpen.value : collapsed.value
)

function syncSidebarWithViewport() {
  const nextIsMobile = window.innerWidth <= 768
  if (nextIsMobile !== isMobile.value) mobileSidebarOpen.value = false
  isMobile.value = nextIsMobile
}

function toggleSidebar() {
  if (isMobile.value) {
    mobileSidebarOpen.value = !mobileSidebarOpen.value
    return
  }

  collapsed.value = !collapsed.value
}

function closeMobileSidebar() {
  if (isMobile.value) mobileSidebarOpen.value = false
}

function logout() {
  userStore.logout()
  router.push('/login')
}

watch(
  () => route.fullPath,
  () => closeMobileSidebar()
)

onMounted(() => {
  syncSidebarWithViewport()
  window.addEventListener('resize', syncSidebarWithViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', syncSidebarWithViewport)
})
</script>

<template>
  <el-container
    class="admin-layout"
    :class="{
      'admin-layout--mobile': isMobile,
      'admin-layout--mobile-open': mobileSidebarOpen
    }"
  >
    <el-aside
      class="admin-layout__aside"
      :width="isMobile ? '232px' : collapsed ? '64px' : '232px'"
    >
      <Sidebar :collapsed="sidebarCollapsed" @navigate="closeMobileSidebar" />
    </el-aside>
    <button
      v-if="isMobile && mobileSidebarOpen"
      class="admin-layout__overlay"
      type="button"
      aria-label="关闭侧边栏"
      @click="closeMobileSidebar"
    />
    <el-container class="admin-layout__body" direction="vertical">
      <Navbar :collapsed="toggleCollapsed" @toggle-sidebar="toggleSidebar" @logout="logout" />
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
  transition:
    width 0.2s ease,
    transform 0.2s ease;
  overflow: hidden;
}

.admin-layout__body {
  min-width: 0;
  flex-direction: column;
}

.admin-layout__overlay {
  display: none;
}

@media (max-width: 768px) {
  .admin-layout__aside {
    position: fixed;
    z-index: 30;
    inset: 0 auto 0 0;
    height: 100vh;
    height: 100dvh;
    transform: translateX(-100%);
    box-shadow: 8px 0 24px rgb(15 23 42 / 20%);
  }

  .admin-layout--mobile-open .admin-layout__aside {
    transform: translateX(0);
  }

  .admin-layout__overlay {
    position: fixed;
    z-index: 25;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: rgb(15 23 42 / 42%);
    cursor: pointer;
  }
}
</style>
