# Vue Atlas Template

Vue Atlas Template 是 Vue Atlas 系列的极简后台模板，对标 `vue-admin-template` 的定位：保持结构清晰、依赖克制、功能够用，适合作为真实业务后台的起点。

它不是 Vue 2 项目的逐行迁移，而是用当前 Vue 3 技术体系重建同一类后台项目的核心思路。

## 特性

- Vue 3 + TypeScript + Vite
- Vue Router 5 路由驱动菜单、面包屑、页面标题和权限元信息
- Pinia 用户状态与菜单权限状态
- Element Plus 组件和样式自动按需导入
- Axios 请求基础层与统一错误归一化
- 登录、退出、Dashboard、Table、Form、401、403、404、500 页面
- `v-permission` 按钮权限指令
- Vitest 单元测试覆盖菜单、标题和请求错误逻辑

## 技术栈

| 类型 | 选择 |
| --- | --- |
| 框架 | Vue 3 |
| 路由 | Vue Router 5 |
| 状态 | Pinia |
| 构建 | Vite |
| UI | Element Plus |
| 请求 | axios |
| 测试 | Vitest |
| 包管理 | pnpm |

## 目录结构

```text
src/
  api/          接口模块
  directives/   全局指令
  layout/       后台布局
  pages/        路由页面
  router/       路由、守卫、菜单生成
  stores/       Pinia 状态
  styles/       全局样式
  utils/        通用工具
```

## 开发命令

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm test
pnpm build
```

## 默认账号

开发环境下登录接口为本地模拟逻辑，可以直接使用默认表单值：

```text
username: admin
password: atlas
```

## 路由元信息

后台核心能力由路由元信息驱动：

```ts
meta: {
  title: 'Dashboard',
  icon: 'DataBoard',
  order: 10,
  permissions: ['dashboard:view']
}
```

这些字段会影响菜单、面包屑、页面标题和权限判断。

## 自动导入

项目使用 `unplugin-auto-import` 和 `unplugin-vue-components` 自动导入 Vue、Pinia、Vue Router 和 Element Plus。

`src/auto-imports.d.ts` 与 `src/components.d.ts` 会在开发和构建时生成，并提交到仓库中，方便 `vue-tsc` 和编辑器获得完整类型提示。
