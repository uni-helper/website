---
title: vite-plugin-uni-components
description: 从 unplugin-vue-components 派生并修改以适应UniApp。
navTruncate: false
icon: carbon:workspace-import

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-components
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/vite-plugin-uni-components
    target: _blank
---

适用于 uni-app (Vue3) 的 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)。组件按需自动引入，配置文件在 `vite.config.ts` 里写。

## 安装

:pm-install{name="-D @uni-helper/vite-plugin-uni-components"}

## 使用

```ts [vite.config.ts]
import Uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Components(), // 必须在 Uni() 之前
    Uni(),
  ],
})
```

选项与 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components#installation) 相同。

## 从 UI 库导入

本插件内置以下 UI 库的解析器：

| UI 库 | 解析器 |
| --- | --- |
| [Ano UI](https://github.com/ano-ui/ano-ui) | `AnoResolver` |
| [hy-app](https://github.com/uni-helper/vite-plugin-uni-components/blob/main/packages/core/src/resolvers/hy-app.ts) | `HyAppResolver` |
| [TDesign UniApp](https://github.com/uni-helper/vite-plugin-uni-components/blob/main/packages/core/src/resolvers/tdesign-uniapp.ts) | `TDesignUniappResolver` |
| [uni-ui](https://github.com/dcloudio/uni-ui) | `UniUIResolver` |
| [uv-ui](https://github.com/uni-helper/vite-plugin-uni-components/blob/main/packages/core/src/resolvers/uv-ui.ts) | `UvResolver` |
| [uview-pro](https://github.com/uni-helper/vite-plugin-uni-components/blob/main/packages/core/src/resolvers/uview-pro.ts) | `uViewProResolver` |
| [wot-design-uni](https://github.com/Moonofweisheng/wot-design-uni) | `WotResolver` |
| [wot-ui v2](https://github.com/uni-helper/vite-plugin-uni-components/blob/main/packages/core/src/resolvers/wot-ui.ts) | `WotV2Resolver` |
| [z-paging](https://github.com/SmileZXLee/uni-z-paging) | `ZPagingResolver` |

解析器从 `@uni-helper/vite-plugin-uni-components/resolvers` 导入：

```ts [vite.config.ts]
import Uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Components({ resolvers: [WotResolver()] }),
    Uni(),
  ],
})
```

## UI 组件类型提示

用 `pnpm` 时，必须在根目录创建 `.npmrc`，参见 [unplugin-vue-components#389](https://github.com/antfu/unplugin-vue-components/issues/389)。

``` [.npmrc]
shamefully-hoist = true
```

::alert
对第三方组件（例如 [dcloudio/uni-ui](https://github.com/dcloudio/uni-ui)、[ano-ui](https://github.com/ano-ui/ano-ui)），`vite-plugin-uni-components` 生成的声明使用 `default` 属性，解决 H5 端无法正确处理组件的问题。
```diff
declare module 'vue' {
  export interface GlobalComponents {
-  AButton: typeof import('ano-ui/components/AButton/AButton.vue')['AButton']
+  AButton: typeof import('ano-ui/components/AButton/AButton.vue')['default']
    Book: typeof import('./src/components/book/index.vue')['default']
    ComponentA: typeof import('./src/components/ComponentA.vue')['default']
-  UniCalendar: typeof import('@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue')['UniCalendar']
+  UniCalendar: typeof import('@dcloudio/uni-ui/lib/uni-calendar/uni-calendar.vue')['default']
  }
}
```
::

## 关联项目

- [vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages)：用 TypeScript 编写 `pages.json`，支持约定式路由。
- [vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts)：为 Vite 下的 uni-app 提供类 nuxt 的 layouts 系统。
- [vite-plugin-uni-manifest](https://github.com/uni-helper/vite-plugin-uni-manifest)：用 TypeScript 编写 `manifest.json`。
- [vite-plugin-uni-platform](https://github.com/uni-helper/vite-plugin-uni-platform)：按文件名分流的平台编译插件。
- [vite-plugin-uni-platform-modifier](https://github.com/uni-helper/vite-plugin-uni-platform-modifier)：为属性、指令提供平台修饰符。
- [vite-plugin-uni-middleware](https://github.com/uni-helper/vite-plugin-uni-middleware)：在 `src/middleware` 中定义中间件。
