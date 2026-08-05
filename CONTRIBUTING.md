# Contributing

感谢你关注 Vue Atlas Template。

## 开发原则

- 保持项目结构简单，优先服务新项目起步。
- 不把复杂业务示例放进 Template，复杂能力应放到 Vue Atlas Admin。
- 路由元信息是菜单、面包屑、权限和页面行为的核心契约。
- 新增能力要有清晰示例和测试。

## 本地开发

```bash
pnpm install
pnpm dev
```

提交前请运行：

```bash
pnpm typecheck
pnpm test
pnpm build
```
