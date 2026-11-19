# uni-helper website

[![Netlify Status](https://api.netlify.com/api/v1/badges/3e0bca77-4b72-46cd-afd5-639337e1054d/deploy-status)](https://app.netlify.com/projects/uni-helper/deploys)

uni-helper 生态的文档与项目站，同时部署在 Netlify 和 Cloudflare Pages。

## 技术栈

- Nuxt 4 + Nitro 2
- [@nuxt/ui](https://ui.nuxt.com/) 提供组件和文档站外壳
- [@nuxt/content](https://content.nuxt.com/) v3 管理 Markdown
- Tailwind CSS v4

## 本地开发

```bash
pnpm install
pnpm dev
```

构建与预览：

```bash
pnpm build
pnpm preview
```

`pnpm build` 会先执行 `pnpm update:uni-use`，从 [uni-helper/uni-use](https://github.com/uni-helper/uni-use) 拉取 API 文档到 `content/uni-use/2.api/`，再执行 `nuxt build`。`content/uni-use/2.api/` 下的文件不要手改。

## 内容

- `content/` 下每个目录对应一个库仓库，正文必须和库仓库的 README、源码保持一致。
- `content/uni-use/2.api/` 由 `pnpm update:uni-use` 从 uni-use 仓库的 `docs/api/` 生成，不要手改。
- 页面级配置写在 frontmatter：`title`、`description`、`icon`、`badges`、`aside`、`toc`、`fullpage` 等。
- 目录级配置写在 `_dir.yml`，例如侧栏图标、目录链接和 `navigation.redirect`。
- 内容里的 `::alert`、`::pm-install`、`::stack` 等标签通过 `nuxt.config.ts` 的 `content.renderer.alias` 映射到 `components/prose/` 下的组件。

## 更新日志

`/changelog` 和 `/api/_content/releases.json` 不参与预渲染，请求时从 GitHub releases 读取数据，`server/utils/github.ts` 里缓存 10 分钟。这样不需要定时重建，changelog 不会再次停在某次构建的时间点。

运行时接口不再查询内容数据库：`content/1.packages.yml` 在 `nuxt.config.ts` 构建阶段被读入 `runtimeConfig.projects`，Cloudflare 上没有 D1 绑定时也能工作。搜索接口 `/api/search.json` 在构建时预渲染成静态 JSON。

## 部署

### Netlify

- Build command：`pnpm build`
- Publish directory：`dist`
- Node：26（`.node-version` / `.nvmrc`）
- Nitro 自动使用 `netlify` preset，函数产物在 `.netlify/functions-internal/`
- `netlify.toml` 不要再加 `/* -> /index.html` 的 SPA fallback，否则会挡住运行时路由

### Cloudflare Pages

- Build command：`pnpm build`
- Build output directory：`dist`
- Node：26（`.node-version` / `.nvmrc`）
- `wrangler.jsonc` 已声明 `pages_build_output_dir` 和 `compatibility_flags: ["nodejs_compat"]`
- Nitro 自动使用 `cloudflare-pages` preset
- `nitro.cloudflare.pages.routes.include` 只包含 `/changelog` 和 `/api/_content/*`，其余页面由 Pages 当静态资源直接返回；新增运行时路由时要同步这里

Cloudflare Pages Functions 的包体限制是 25 MiB。OG 图片使用 `public/og.png` 一张静态品牌卡片（1200x600），worker 里不再打包 OG 渲染器和字体。当前 worker 约 3.6 MB。

## 依赖锁定

- `pnpm-workspace.yaml` 的 `minimumReleaseAgeExclude` 只用于放行 `@nuxt/content` 的当前版本，等默认策略覆盖后可以删掉。
