<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getProjectListApi, type ProjectItem, type ProjectQuery } from '@/api/projects'

const loading = ref(false)
const createDialogVisible = ref(false)
const rows = ref<ProjectItem[]>([])
const total = ref(0)
const query = reactive<ProjectQuery>({
  keyword: '',
  status: '',
  page: 1,
  pageSize: 5
})
const createForm = reactive({
  name: '',
  owner: '',
  status: 'active' as ProjectItem['status']
})

async function fetchProjects() {
  loading.value = true
  try {
    const result = await getProjectListApi(query)
    rows.value = result.list
    total.value = result.total
  } finally {
    loading.value = false
  }
}

function search() {
  query.page = 1
  fetchProjects()
}

function reset() {
  query.keyword = ''
  query.status = ''
  search()
}

function openCreateDialog() {
  createForm.name = ''
  createForm.owner = ''
  createForm.status = 'active'
  createDialogVisible.value = true
}

function createProject() {
  if (!createForm.name.trim() || !createForm.owner.trim()) {
    ElMessage.warning('请填写名称和负责人')
    return
  }

  const nextId = Math.max(0, ...rows.value.map((item) => item.id)) + 1
  const newProject: ProjectItem = {
    id: nextId,
    name: createForm.name.trim(),
    owner: createForm.owner.trim(),
    status: createForm.status,
    updatedAt: '2026-08-05'
  }

  query.keyword = ''
  query.status = ''
  query.page = 1
  rows.value = [newProject, ...rows.value].slice(0, query.pageSize)
  total.value += 1
  createDialogVisible.value = false
  ElMessage.success('创建成功')
}

onMounted(fetchProjects)
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">表格</h1>
        <p class="page-description">一个展示查询、列表和分页结构的基础页面。</p>
      </div>
      <el-button type="primary" @click="openCreateDialog">新建</el-button>
    </div>

    <el-card shadow="never" class="page-card">
      <el-form :model="query" inline class="table-toolbar">
        <el-form-item label="关键词">
          <el-input
            v-model="query.keyword"
            clearable
            placeholder="请输入名称或负责人"
            @keyup.enter="search"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" clearable placeholder="全部" style="width: 160px">
            <el-option label="启用" value="active" />
            <el-option label="草稿" value="draft" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="rows" row-key="id">
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="名称" min-width="180" />
        <el-table-column prop="owner" label="负责人" min-width="140" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '启用' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新时间" width="140" />
      </el-table>

      <div class="table-footer">
        <el-pagination
          v-model:current-page="query.page"
          v-model:page-size="query.pageSize"
          :total="total"
          :page-sizes="[5, 10, 20]"
          layout="total, sizes, prev, pager, next"
          @current-change="fetchProjects"
          @size-change="search"
        />
      </div>
    </el-card>

    <el-dialog v-model="createDialogVisible" title="新建项目" width="420px">
      <el-form :model="createForm" label-width="88px">
        <el-form-item label="名称" required>
          <el-input v-model="createForm.name" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="负责人" required>
          <el-input v-model="createForm.owner" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="createForm.status" style="width: 100%">
            <el-option label="启用" value="active" />
            <el-option label="草稿" value="draft" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createProject">确定</el-button>
      </template>
    </el-dialog>
  </section>
</template>
