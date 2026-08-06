<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { normalizeRequestError } from '@/utils/request'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const errorMessage = ref('')
const form = reactive({
  username: 'admin',
  password: 'atlas'
})

async function submit() {
  loading.value = true
  errorMessage.value = ''
  try {
    await userStore.login(form)
    await router.push((route.query.redirect as string) || '/')
  } catch (error) {
    errorMessage.value = normalizeRequestError(error).message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-page__intro" aria-label="项目介绍">
      <span class="login-page__eyebrow">Vue Atlas</span>
      <h1>清爽、克制、可直接起步的后台模板</h1>
      <p>保留后台项目最核心的布局、路由、权限和请求能力，让新业务可以从清晰结构开始。</p>
      <div class="login-page__stats">
        <div>
          <strong>Template</strong>
          <span>极简起点</span>
        </div>
        <div>
          <strong>Router 5</strong>
          <span>路由驱动</span>
        </div>
        <div>
          <strong>Element Plus</strong>
          <span>按需导入</span>
        </div>
      </div>
    </section>

    <section class="login-page__panel">
      <h2>Vue Atlas Template</h2>
      <p>面向现代 Vue 管理后台的清爽基础模板。</p>
      <el-alert
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
        show-icon
        :closable="false"
        class="login-page__alert"
      />
      <el-form label-position="top" @submit.prevent="submit">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          :loading="loading"
          class="login-page__submit"
        >
          登录
        </el-button>
      </el-form>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 56px;
  align-items: center;
  min-height: 100vh;
  padding: 48px clamp(24px, 7vw, 96px);
  background:
    linear-gradient(135deg, rgb(47 128 237 / 10%), transparent 42%),
    linear-gradient(315deg, rgb(34 197 94 / 8%), transparent 38%), #f4f7fb;
}

.login-page__intro {
  max-width: 600px;
}

.login-page__eyebrow {
  color: var(--atlas-primary);
  font-size: 14px;
  font-weight: 700;
}

.login-page__intro h1 {
  margin: 14px 0 16px;
  color: #172033;
  font-size: clamp(34px, 5vw, 56px);
  line-height: 1.08;
}

.login-page__intro p {
  max-width: 500px;
  margin: 0;
  color: var(--atlas-muted);
  font-size: 16px;
  line-height: 1.8;
}

.login-page__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 34px;
}

.login-page__stats div {
  display: grid;
  gap: 6px;
  padding: 16px;
  border: 1px solid rgb(47 128 237 / 12%);
  border-radius: 8px;
  background: rgb(255 255 255 / 70%);
}

.login-page__stats strong {
  color: #172033;
  font-size: 18px;
}

.login-page__stats span {
  color: var(--atlas-muted);
  font-size: 13px;
}

.login-page__panel {
  width: 100%;
  padding: 32px;
  border: 1px solid var(--atlas-border);
  border-radius: 8px;
  background: var(--atlas-surface);
  box-shadow: 0 24px 70px rgb(31 42 68 / 10%);
}

.login-page__panel h2 {
  margin: 0 0 8px;
  font-size: 26px;
}

.login-page__panel p {
  margin: 0 0 24px;
  color: var(--atlas-muted);
}

.login-page__alert {
  margin-bottom: 16px;
}

.login-page__submit {
  width: 100%;
}

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .login-page__intro {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .login-page {
    padding: 24px;
  }

  .login-page__stats {
    grid-template-columns: 1fr;
  }
}
</style>
