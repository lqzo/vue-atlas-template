<script setup lang="ts">
interface ProjectRow {
  id: number
  name: string
  owner: string
  status: 'Active' | 'Draft'
  updatedAt: string
}

const rows: ProjectRow[] = [
  {
    id: 1,
    name: 'Route-driven menu',
    owner: 'Atlas Team',
    status: 'Active',
    updatedAt: '2026-08-05'
  },
  {
    id: 2,
    name: 'Permission directive',
    owner: 'Frontend',
    status: 'Active',
    updatedAt: '2026-08-05'
  },
  {
    id: 3,
    name: 'Request wrapper',
    owner: 'Platform',
    status: 'Draft',
    updatedAt: '2026-08-05'
  }
]
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

    <el-card shadow="never">
      <el-table :data="rows" row-key="id">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" min-width="180" />
        <el-table-column prop="owner" label="Owner" min-width="140" />
        <el-table-column prop="status" label="Status" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === 'Active' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="Updated" width="140" />
      </el-table>
    </el-card>
  </section>
</template>
