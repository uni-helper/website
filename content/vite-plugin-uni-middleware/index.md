---
title: vite-plugin-uni-middleware
description: 在 Vite 驱动的 uni-app 中使用路由中间件
navTruncate: false
icon: mdi:middleware

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-middleware
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/vite-plugin-uni-middleware
    target: _blank
---
## 安装
:pm-install{name="-D @uni-helper/vite-plugin-uni-middleware"}

## 使用

```ts [vite.config.ts]
import Uni from '@dcloudio/vite-plugin-uni'
import UniMiddleware from '@uni-helper/vite-plugin-uni-middleware'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Uni(), UniMiddleware()],
})
```

在 `src/middleware` 中定义中间件

```ts [src/middleware/auth.ts]
import { defineMiddleware } from '@uni-helper/vite-plugin-uni-middleware/runtime'
import { useStore } from '../store'

export default defineMiddleware((to, from) => {
  const store = useStore()
  if (!store.isLogin) {
    return '/pages/login/index'
  }
})
```

在 pages.json 中添加全局或页面的中间件配置

```json [pages.json]
{
  ...
  "middleware": ["global"],
  "pages": [{
    "path": "pages/index/index",
    "middleware": ["auth"]
  }]
  ...
}
```

## 配置

see [types.ts](https://github.com/uni-helper/vite-plugin-uni-middleware/tree/main/src/types.ts)

## 注意

如果你使用 [vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages), 创建 `pages.d.ts` 来声明 `middleware` 的类型

```ts [pages.d.ts]
declare module '@uni-helper/vite-plugin-uni-pages' {
  export interface PagesConfig {
    middleware: string[]
  }
}
export {}
```

若要为页面添加配置，只需使用 route-block

```vue [pages/index/index.vue]
<route>
{
  "middleware": ["auth"]
}
</route>
```

## 工作方式

- vite
  1. 扫描 middlewareDir 和 pages.json
  2. 提供虚拟模块并导出 middlewares
- runtime
  1. 混入页面生命周期 onShow
  2. 调用 global middlewares
  3. 调用 page middlewares
  4. 根据返回结果执行拦截

> **Warning**
> 尽可能不要使用异步中间件，虽然最终会执行，但并不能阻止导航
