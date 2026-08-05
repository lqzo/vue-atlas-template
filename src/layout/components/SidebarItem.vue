<script setup lang="ts">
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import type { AppMenuItem } from '@/router/types'
import { getElementIcon, getSvgIconName, isSvgIcon } from './icons'

const props = defineProps<{
  item: AppMenuItem
}>()

const router = useRouter()

function isExternal(path: string) {
  return /^https?:\/\//.test(path)
}

function openMenu(path: string) {
  if (isExternal(path)) {
    window.open(path, '_blank', 'noopener,noreferrer')
    return
  }

  router.push(path)
}
</script>

<template>
  <el-sub-menu v-if="item.children?.length" :index="item.path">
    <template #title>
      <el-icon>
        <SvgIcon v-if="isSvgIcon(item.icon)" :name="getSvgIconName(item.icon)" />
        <component :is="getElementIcon(item.icon)" v-else />
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <SidebarItem v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>

  <el-menu-item v-else :index="item.path" @click="openMenu(item.path)">
    <el-icon>
      <SvgIcon v-if="isSvgIcon(item.icon)" :name="getSvgIconName(item.icon)" />
      <component :is="getElementIcon(item.icon)" v-else />
    </el-icon>
    <span>{{ item.title }}</span>
  </el-menu-item>
</template>
