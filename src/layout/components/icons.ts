import { DataBoard, Edit, Grid, House } from '@element-plus/icons-vue'

export const iconMap = {
  DataBoard,
  Edit,
  Grid,
  House
}

export function getMenuIcon(name?: string) {
  return name ? iconMap[name as keyof typeof iconMap] || House : House
}
