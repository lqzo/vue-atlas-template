<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name?: string
    size?: 'sm' | 'lg'
  }>(),
  {
    name: '',
    size: 'sm'
  }
)

const initial = computed(() => props.name.trim().slice(0, 1).toUpperCase() || 'A')
</script>

<template>
  <span class="user-avatar" :class="`user-avatar--${size}`" aria-hidden="true">
    <span class="user-avatar__accent" />
    <span class="user-avatar__mark">
      <el-icon><UserFilled /></el-icon>
    </span>
    <span class="user-avatar__initial">{{ initial }}</span>
  </span>
</template>

<style scoped>
.user-avatar {
  position: relative;
  display: inline-grid;
  flex-shrink: 0;
  place-items: center;
  border-radius: 8px;
  background: #1f2a44;
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 16%);
  color: #fff;
  overflow: hidden;
}

.user-avatar--sm {
  width: 34px;
  height: 34px;
}

.user-avatar--lg {
  width: 64px;
  height: 64px;
  border-radius: 10px;
}

.user-avatar__accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 58%;
  height: 100%;
  background: #4fa3ff;
  opacity: 0.95;
  transform: skewX(-18deg) translateX(26%);
}

.user-avatar__mark {
  position: absolute;
  right: 4px;
  bottom: 3px;
  display: grid;
  color: rgb(255 255 255 / 34%);
}

.user-avatar--sm .user-avatar__mark {
  font-size: 18px;
}

.user-avatar--lg .user-avatar__mark {
  right: 7px;
  bottom: 5px;
  font-size: 28px;
}

.user-avatar__initial {
  position: relative;
  z-index: 1;
  font-weight: 750;
}

.user-avatar--sm .user-avatar__initial {
  font-size: 14px;
}

.user-avatar--lg .user-avatar__initial {
  font-size: 24px;
}
</style>
