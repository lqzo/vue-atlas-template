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
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 3, max: 40, message: '长度应为 3 到 40 个字符', trigger: 'blur' }
  ],
  owner: [{ required: true, message: '请输入负责人', trigger: 'blur' }]
}

async function save() {
  await formRef.value?.validate()
  ElMessage.success('保存成功')
}

function reset() {
  formRef.value?.resetFields()
}
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">表单</h1>
        <p class="page-description">一个覆盖常见新建和编辑流程的基础表单页面。</p>
      </div>
    </div>

    <el-card shadow="never" class="page-card form-card">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="负责人" prop="owner">
          <el-input v-model="form.owner" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="form.enabled" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" :rows="4" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="reset">重置</el-button>
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
