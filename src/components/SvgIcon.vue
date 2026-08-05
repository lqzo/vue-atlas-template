<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    size?: number | string
  }>(),
  {
    size: '1em'
  }
)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true" :style="{ width: size, height: size }">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  flex-shrink: 0;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}
</style>
