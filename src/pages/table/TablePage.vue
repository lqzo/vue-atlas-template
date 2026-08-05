<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getProjectListApi, type ProjectItem, type ProjectQuery } from '@/api/projects'

const loading = ref(false)
const rows = ref<ProjectItem[]>([])
const total = ref(0)
const query = reactive<ProjectQuery>({
  keyword: '',
  status: '',
  page: 1,
  pageSize: 5
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

onMounted(fetchProjects)
</script>

<template>
  <section class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Table</h1>
        <p class="page-description">A small list page that shows the expected page structure.</p>
      </div>
      <el-button type="primary">Create</el-button>
    </div>

    <el-card shadow="never" class="page-card">
      <el-form :model="query" inline class="table-toolbar">
        <el-form-item label="Keyword">
          <el-input
            v-model="query.keyword"
            clearable
            placeholder="Name or owner"
            @keyup.enter="search"
          />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="query.status" clearable placeholder="All" style="width: 160px">
            <el-option label="Active" value="active" />
            <el-option label="Draft" value="draft" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">Search</el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="rows" row-key="id">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" min-width="180" />
        <el-table-column prop="owner" label="Owner" min-width="140" />
        <el-table-column prop="status" label="Status" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? 'Active' : 'Draft' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="Updated" width="140" />
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
  </section>
</template>
