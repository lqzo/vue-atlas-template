<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { appSettings } from '@/settings'
import SvgIcon from '@/components/SvgIcon.vue'
import { usePermissionStore } from '@/stores/permission'
import { getElementIcon, getSvgIconName, isSvgIcon } from './icons'

defineProps<{
  collapsed: boolean
}>()

const route = useRoute()
const permissionStore = usePermissionStore()
const menuRoutes = computed(() => permissionStore.menus)
</script>

<template>
  <div class="sidebar">
    <div v-if="appSettings.sidebarLogo" class="sidebar__brand">
      <span v-if="!collapsed">{{ appSettings.title }}</span>
      <span v-else>{{ appSettings.shortTitle }}</span>
    </div>
    <el-menu
      :collapse="collapsed"
      :default-active="route.meta.activeMenu || route.path"
      router
      background-color="#172033"
      text-color="#cbd5e1"
    >
      <el-menu-item v-for="item in menuRoutes" :key="item.path" :index="item.path">
        <el-icon>
          <SvgIcon v-if="isSvgIcon(item.icon)" :name="getSvgIconName(item.icon)" />
          <component :is="getElementIcon(item.icon)" v-else />
        </el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 20px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}

.sidebar :deep(.el-menu) {
  height: calc(100% - 56px);
  border-right: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
