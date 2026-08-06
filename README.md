# Vue Atlas Template

Vue Atlas Template 是 Vue Atlas 系列的极简后台模板，对标 `vue-admin-template` 的定位：保持结构清晰、依赖克制、功能够用，适合作为真实业务后台的起点。

它不是 Vue 2 项目的逐行迁移，而是用当前 Vue 3 技术体系重建同一类后台项目的核心思路。

## 特性

- Vue 3 + TypeScript + Vite
- Vue Router 5 路由驱动菜单、面包屑、页面标题和权限元信息
- Pinia 用户状态与菜单权限状态
- Element Plus 组件和样式自动按需导入
- Axios 请求基础层与统一错误归一化
- Element Plus 中文语言配置
- 登录、退出、仪表盘、表格、表单、嵌套菜单、外链、401、403、404、500 页面
- 开发环境 mock 登录与 mock 列表查询
- 基础列表筛选、分页、新建弹窗和表单校验示例
- `v-permission` 按钮权限指令，包含有权限和无权限对照示例
- Vitest 单元测试覆盖菜单、标题和请求错误逻辑

## 技术栈

| 类型   | 选择         |
| ------ | ------------ |
| 框架   | Vue 3        |
| 路由   | Vue Router 5 |
| 状态   | Pinia        |
| 构建   | Vite         |
| UI     | Element Plus |
| 请求   | axios        |
| 测试   | Vitest       |
| 包管理 | pnpm         |

## 对齐 vue-admin-template

Vue Atlas Template 保留的是基础模板应有的核心能力，不把复杂业务模块塞进起步仓库。

| vue-admin-template 思路 | Vue Atlas Template 实现                                |
| ----------------------- | ------------------------------------------------------ |
| 登录 / 退出             | 本地 mock 登录、token 存储、用户信息加载、退出清理状态 |
| Layout                  | 侧边栏、顶部栏、主体内容区、响应式折叠                 |
| 路由菜单                | 路由 `meta` 驱动菜单、排序、嵌套菜单、外链菜单         |
| 面包屑 / 页面标题       | 根据路由匹配和 `meta.title` 自动生成                   |
| 图标                    | 支持本地 SVG 图标和 Element Plus Icons                 |
| 权限                    | 路由权限、菜单权限、`v-permission` 按钮权限            |
| Axios                   | 统一请求实例、token 注入、错误归一化、401 登录失效处理 |
| 基础页面                | 仪表盘、表格、表单、错误页、个人中心                   |
| Mock                    | 开发环境 mock 登录、用户信息和项目列表                 |
| 工程化                  | TypeScript、Vitest、GitHub Actions CI、staging 构建    |

## 目录结构

```text
src/
  api/          接口模块
  directives/   全局指令
  layout/       后台布局与布局组件
  icons/        SVG 图标注册
  mock/         开发环境 mock 数据
  pages/        路由页面
  router/       路由、守卫、菜单生成
  stores/       Pinia 状态
  styles/       全局样式
  utils/        通用工具
  settings.ts   应用级配置
```

## 开发命令

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm test
pnpm build
pnpm build:staging
```

## 默认账号

开发环境下登录接口为本地模拟逻辑，可以直接使用默认表单值：

```text
username: admin
password: atlas
```

输入其它账号或密码会触发统一错误类型 `AppRequestError`，登录页会展示对应错误状态。

## 应用配置

基础应用配置集中在 `src/settings.ts`：

```ts
export const appSettings = {
  title: 'Vue Atlas Template',
  shortTitle: 'VA',
  sidebarLogo: true,
  fixedHeader: false,
  tokenExpiredRedirect: '/login'
}
```

页面标题默认仍可通过 `.env` 中的 `VITE_APP_TITLE` 覆盖。

## 路由元信息

后台核心能力由路由元信息驱动：

```ts
meta: {
  title: '仪表盘',
  icon: 'svg:dashboard',
  order: 10,
  permissions: ['dashboard:view']
}
```

这些字段会影响菜单、面包屑、页面标题和权限判断。

父级菜单需要始终展示时，可以使用 `alwaysShow`：

```ts
meta: { title: '嵌套菜单', icon: 'svg:nested', alwaysShow: true }
```

嵌套菜单由 `src/layout/components/SidebarItem.vue` 递归渲染，示例路由位于 `/nested/menu1` 和 `/nested/menu2/level`。

外链菜单使用 `externalLink`：

```ts
meta: {
  title: '外链',
  icon: 'svg:link',
  externalLink: 'https://github.com/lqzo/vue-atlas-template'
}
```

## 图标

菜单图标支持两种来源：

```ts
meta: {
  icon: 'svg:dashboard'
} // 使用 src/icons/svg/dashboard.svg
meta: {
  icon: 'DataBoard'
} // 使用 Element Plus Icons
```

新增 SVG 图标时，把文件放到 `src/icons/svg/`，然后在路由 meta 中使用 `svg:文件名`。

## Mock API

Template 默认在开发环境中提供两个轻量 mock：

- `src/mock/auth.ts`：登录和用户信息
- `src/mock/projects.ts`：项目列表查询、筛选和分页

`src/api/` 负责暴露业务 API 函数，开发环境会调用 `src/mock/`，生产环境会调用真实 HTTP 请求。

生产环境下这些 API 会走 `src/utils/request.ts` 中的 axios 实例，接口地址由 `VITE_API_BASE_URL` 控制。

## 环境模式

当前提供三个环境文件：

- `.env.development`
- `.env.staging`
- `.env.production`

`pnpm build:staging` 会使用 staging 模式构建，方便在正式生产前接入预发环境。

## 工程校验

仓库已提供 GitHub Actions CI，会在 push 和 pull request 时执行：

- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

编辑器基础格式通过 `.editorconfig` 约束，统一使用 LF、2 空格缩进和 UTF-8。

CI 使用 Node 24 和 pnpm 11.1.1。pnpm 会先通过 Corepack 启用，再交给 `actions/setup-node` 做依赖缓存。

## 登录失效

`src/router/auth-failure.ts` 会把请求层的 401 错误接入路由和用户状态：

- 清理本地 token 和用户状态
- 重置菜单
- 跳转到登录页
- 保留当前页面为 `redirect` 查询参数

## 自动导入

项目使用 `unplugin-auto-import` 和 `unplugin-vue-components` 自动导入 Vue、Pinia、Vue Router 和 Element Plus。

`src/auto-imports.d.ts` 与 `src/components.d.ts` 会在开发和构建时生成，并提交到仓库中，方便 `vue-tsc` 和编辑器获得完整类型提示。
