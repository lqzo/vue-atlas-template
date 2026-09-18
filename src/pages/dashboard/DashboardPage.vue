<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const permissionsText = computed(() => userStore.permissions.join(', ') || 'No permissions')
const permissionActionCount = ref(0)
const permissionActionStatus = ref('点击按钮验证 dashboard:view 权限。')

const metrics = [
  {
    label: '路由菜单',
    value: '已就绪',
    description: '通过路由元信息驱动侧边栏、激活状态和外链菜单。'
  },
  {
    label: '登录鉴权',
    value: '已就绪',
    description: 'Token、用户信息加载和权限校验已经串联完成。'
  },
  {
    label: '质量检查',
    value: '已就绪',
    description: '类型检查、单元测试和生产构建脚本可以直接使用。'
  }
]

const checklist = [
  '包含侧边栏和顶部栏的基础布局',
  '路由驱动菜单和嵌套菜单示例',
  'Mock 登录、请求封装和错误页',
  'Element Plus 自动导入和按需样式'
]

function handlePermissionAction(action = '仪表盘') {
  permissionActionCount.value += 1
  permissionActionStatus.value = `${action}权限校验通过 ${permissionActionCount.value} 次：${permissionsText.value}`
  ElMessage.success(permissionActionStatus.value)
}
</script>

<template>
  <section class="page">
    <div class="dashboard-hero">
      <div>
        <h1 class="page-title dashboard-hero__title">仪表盘</h1>
        <p class="page-description">
          一个保持经典后台模板思路的 Vue 3 基础版本：路由清晰、布局稳定、权限示例可直接复用。
        </p>
      </div>
    </div>

    <el-row :gutter="16" class="dashboard-grid">
      <el-col v-for="metric in metrics" :key="metric.label" :xs="24" :md="8">
        <el-card shadow="never" class="page-card dashboard-card">
          <p class="dashboard-card__label">{{ metric.label }}</p>
          <strong class="dashboard-card__value">{{ metric.value }}</strong>
          <p class="dashboard-card__description">{{ metric.description }}</p>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="dashboard-grid">
      <el-col :xs="24" :md="8">
        <el-card shadow="never" class="page-card dashboard-panel">
          <template #header>权限示例</template>
          <div class="permission-demo">
            <div>
              <span class="permission-demo__label">当前用户</span>
              <strong>{{ userStore.name || 'Atlas Admin' }}</strong>
            </div>
            <div>
              <span class="permission-demo__label">角色</span>
              <strong>{{ userStore.roles.join(', ') || 'admin' }}</strong>
            </div>
            <div>
              <span class="permission-demo__label">权限</span>
              <strong>{{ permissionsText }}</strong>
            </div>
          </div>
          <div class="permission-demo__actions">
            <el-button
              v-permission="'dashboard:view'"
              type="primary"
              @click="handlePermissionAction('仪表盘')"
            >
              执行权限动作
            </el-button>
            <el-button
              v-permission="'system:user:list'"
              @click="handlePermissionAction('用户管理')"
            >
              用户管理动作
            </el-button>
          </div>
          <div class="permission-demo__result" aria-live="polite">
            {{ permissionActionStatus }}
          </div>
          <p class="permission-demo__hint">
            “用户管理动作”需要 system:user:list 权限，当前账号没有该权限时会被自动隐藏。
          </p>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="16">
        <el-card shadow="never" class="page-card dashboard-panel">
          <template #header>基础能力清单</template>
          <ul class="dashboard-checklist">
            <li v-for="item in checklist" :key="item">
              <span>{{ item }}</span>
              <el-tag type="success" effect="light">已完成</el-tag>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<style scoped>
.dashboard-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  padding-top: 4px;
}

.dashboard-hero__title {
  margin-bottom: 12px;
}

.dashboard-grid {
  row-gap: 16px;
}

.dashboard-grid + .dashboard-grid {
  margin-top: 16px;
}

.dashboard-card {
  min-height: 168px;
}

.dashboard-card :deep(.el-card__body) {
  padding: 20px;
}

.dashboard-panel {
  min-height: 236px;
}

.dashboard-panel :deep(.el-card__header) {
  padding: 16px 18px;
  font-weight: 650;
}

.dashboard-card__label,
.permission-demo__label {
  display: block;
  margin-bottom: 10px;
  color: #7a8494;
  font-size: 13px;
}

.dashboard-card__value {
  display: block;
  color: #1f2a44;
  font-size: 28px;
  line-height: 1.2;
}

.dashboard-card__description {
  margin: 18px 0 0;
  color: #5f6877;
  line-height: 1.65;
}

.permission-demo {
  display: grid;
  gap: 16px;
}

.permission-demo strong {
  color: #1f2a44;
  font-weight: 650;
}

.permission-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.permission-demo__actions :deep(.el-button + .el-button) {
  margin-left: 0;
}

.permission-demo__result {
  margin-top: 14px;
  padding: 10px 12px;
  border: 1px solid #d9ecff;
  border-radius: 6px;
  background: #ecf5ff;
  color: #337ecc;
  font-size: 13px;
  line-height: 1.5;
}

.permission-demo__hint {
  margin: 10px 0 0;
  color: #7a8494;
  font-size: 13px;
  line-height: 1.6;
}

.dashboard-checklist {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dashboard-checklist li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 36px;
  padding-bottom: 12px;
  border-bottom: 1px solid #edf0f5;
  color: #3f4858;
}

.dashboard-checklist li:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

@media (max-width: 640px) {
  .dashboard-hero {
    display: grid;
  }

  .dashboard-checklist li {
    align-items: flex-start;
  }
}
</style>
