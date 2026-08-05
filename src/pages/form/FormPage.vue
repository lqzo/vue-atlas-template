<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: 'Vue Atlas',
  owner: 'Atlas Team',
  enabled: true,
  remark: ''
})
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Form</h1>
        <p class="page-description">A minimal form page for common create and edit flows.</p>
      </div>
    </div>

    <el-card shadow="never" class="form-card">
      <el-form :model="form" label-width="120px">
        <el-form-item label="Name">
          <el-input v-model="form.name" placeholder="Project name" />
        </el-form-item>
        <el-form-item label="Owner">
          <el-input v-model="form.owner" placeholder="Owner" />
        </el-form-item>
        <el-form-item label="Enabled">
          <el-switch v-model="form.enabled" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="form.remark" type="textarea" :rows="4" placeholder="Optional notes" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Save</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<style scoped>
.form-card {
  max-width: 720px;
}
</style>
