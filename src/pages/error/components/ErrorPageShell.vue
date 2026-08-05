<script setup lang="ts">
import { ArrowLeft, HomeFilled, RefreshRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    code: string
    title: string
    description: string
    actionText?: string
    actionTo?: string
    showBack?: boolean
    tone?: 'warning' | 'danger' | 'info'
  }>(),
  {
    actionText: '返回首页',
    actionTo: '/',
    showBack: true,
    tone: 'info'
  }
)

const router = useRouter()

const toneLabel = computed(() => {
  const map = {
    warning: '需要处理',
    danger: '访问受限',
    info: '页面提示'
  }
  return map[props.tone]
})

function goAction() {
  router.push(props.actionTo)
}

function goBack() {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push('/')
}
</script>

<template>
  <section class="page error-page">
    <div class="error-page__panel" :class="`error-page__panel--${tone}`">
      <div class="error-page__visual">
        <span class="error-page__label">{{ toneLabel }}</span>
        <strong>{{ code }}</strong>
      </div>

      <div class="error-page__content">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <div class="error-page__actions">
          <el-button
            type="primary"
            :icon="actionTo === '/login' ? RefreshRight : HomeFilled"
            @click="goAction"
          >
            {{ actionText }}
          </el-button>
          <el-button v-if="showBack" :icon="ArrowLeft" @click="goBack">返回上一页</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.error-page {
  display: grid;
  min-height: calc(100vh - 64px);
  place-items: center;
}

.error-page__panel {
  display: grid;
  width: min(920px, 100%);
  grid-template-columns: 300px minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid var(--atlas-border);
  border-radius: 8px;
  background: var(--atlas-surface);
  box-shadow: 0 18px 48px rgb(31 42 68 / 8%);
}

.error-page__visual {
  display: grid;
  min-height: 280px;
  align-content: center;
  gap: 12px;
  padding: 34px;
  border-right: 1px solid var(--atlas-border);
  background: #f7f9fc;
}

.error-page__label {
  width: fit-content;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e8f1ff;
  color: #337ecc;
  font-size: 13px;
  font-weight: 650;
}

.error-page__visual strong {
  color: #1f2a44;
  font-size: 76px;
  line-height: 1;
}

.error-page__content {
  display: grid;
  align-content: center;
  padding: 42px;
}

.error-page__content h1 {
  margin: 0 0 14px;
  color: #1f2a44;
  font-size: 28px;
}

.error-page__content p {
  max-width: 440px;
  margin: 0;
  color: #697386;
  font-size: 15px;
  line-height: 1.8;
}

.error-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.error-page__panel--warning .error-page__label {
  background: #fdf6ec;
  color: #b88230;
}

.error-page__panel--danger .error-page__label {
  background: #fef0f0;
  color: #c45656;
}

@media (max-width: 720px) {
  .error-page {
    place-items: stretch;
  }

  .error-page__panel {
    grid-template-columns: 1fr;
  }

  .error-page__visual {
    min-height: 180px;
    border-right: 0;
    border-bottom: 1px solid var(--atlas-border);
  }

  .error-page__visual strong {
    font-size: 58px;
  }

  .error-page__content {
    padding: 28px;
  }
}
</style>
