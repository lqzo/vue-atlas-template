import { DataBoard, Edit, Grid, House } from '@element-plus/icons-vue'

export const iconMap = {
  DataBoard,
  Edit,
  Grid,
  House
}

export function isSvgIcon(name?: string) {
  return Boolean(name?.startsWith('svg:'))
}

export function getSvgIconName(name?: string) {
  return name?.replace(/^svg:/, '') || ''
}

export function getElementIcon(name?: string) {
  return name ? iconMap[name as keyof typeof iconMap] || House : House
}
