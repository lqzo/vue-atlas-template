<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

const form = reactive({
  name: 'Vue Atlas',
  owner: 'Atlas Team',
  enabled: true,
  remark: ''
})

const formRef = ref<FormInstance>()
const rules: FormRules = {
  name: [
    { required: true, message: 'Please enter project name', trigger: 'blur' },
    { min: 3, max: 40, message: 'Length should be 3 to 40 characters', trigger: 'blur' }
  ],
  owner: [{ required: true, message: 'Please enter owner', trigger: 'blur' }]
}

async function save() {
  await formRef.value?.validate()
  ElMessage.success('Saved')
}

function reset() {
  formRef.value?.resetFields()
}
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Form</h1>
        <p class="page-description">A minimal form page for common create and edit flows.</p>
      </div>
    </div>

    <el-card shadow="never" class="page-card form-card">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name" placeholder="Project name" />
        </el-form-item>
        <el-form-item label="Owner" prop="owner">
          <el-input v-model="form.owner" placeholder="Owner" />
        </el-form-item>
        <el-form-item label="Enabled">
          <el-switch v-model="form.enabled" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="form.remark" type="textarea" :rows="4" placeholder="Optional notes" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">Save</el-button>
          <el-button @click="reset">Reset</el-button>
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
