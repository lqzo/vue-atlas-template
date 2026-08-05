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
    <section class="login-page__panel">
      <h1>Vue Atlas Template</h1>
      <p>Clean starter for modern Vue admin applications.</p>
      <el-alert
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
        show-icon
        :closable="false"
        class="login-page__alert"
      />
      <el-form label-position="top" @submit.prevent="submit">
        <el-form-item label="Username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" class="login-page__submit">
          Login
        </el-button>
      </el-form>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  background: #eef2f7;
}

.login-page__panel {
  width: min(420px, 100%);
  padding: 32px;
  border: 1px solid var(--atlas-border);
  border-radius: 8px;
  background: var(--atlas-surface);
}

.login-page__panel h1 {
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
</style>
