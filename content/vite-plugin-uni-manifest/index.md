---
title: vite-plugin-uni-manifest
description:   使用 TypeScript 编写 uni-app 的 manifest.json。
navTruncate: false
icon: lucide:file-cog

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-manifest
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/vite-plugin-uni-manifest
    target: _blank
---

本插件从 `manifest.config.*` 生成 uni-app 的 `manifest.json`。你在 TypeScript 里写配置，插件负责写出 JSON。

## 安装

:pm-install{name="-D @uni-helper/vite-plugin-uni-manifest"}

## 使用

```ts [vite.config.ts]
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniManifest(), // 必须在 Uni() 之前调用
    Uni(),
  ],
})
```

创建 `manifest.config.(ts|mts|cts|js|cjs|mjs|json)`，然后用 TypeScript 编写配置：

```ts [manifest.config.ts]
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  // code here...
})
```

uni-app 默认的 Vite-TS 模板 `manifest.json` 的 TypeScript 写法见 [playground 的 manifest.config.ts](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/playground/manifest.config.ts)。

## 生成时机

插件行为取决于 Vite 的运行方式：

- `vite dev`：插件监听 `manifest.config.*`，配置改动后重新生成 `manifest.json`。
- `build` 加 `watch`（uni-app 小程序开发就是这样跑）：同上，插件保持监听。
- 一次性 `build`：插件只生成一次。

监听器在进程退出时释放。如果以编程方式启动 watch 构建并关闭它，监听器会继续存活。

uni-app 在自己的 `config` 钩子中读取 `manifest.json`，早于本插件的 `configResolved`。需要文件提前就位时，可以显式 `await` 插件的 `prepare()`：

```ts [vite.config.ts]
export default defineConfig({
  plugins: [
    await UniManifest().prepare(),
    Uni(),
  ],
})
```

`prepare()` 可以传 `cwd` 与 `mode`。`mode` 必须与 Vite 实际使用的 `--mode` 一致，否则生成的配置可能取自另一个 `.env` 文件。插件接管后会再写一次同样的内容，内容相同时写入跳过，因此第二次写入没有副作用。

## 选项

| 选项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `minify` | `boolean` | `false` | 压缩 `manifest.json`。 |
| `insertFinalNewline` | `boolean` | `false` | 在 `manifest.json` 末尾插入换行。 |
| `indent` | `number \| string` | `2` | 缩进。`minify` 为 `true` 时忽略。 |
| `eol` | `'\n' \| '\r\n'` | `'\n'` | 换行符。 |
| `cwd` | `string` | `process.env.VITE_ROOT_DIR` | 查找配置文件的工作目录。 |
| `outDir` | `string` | 未设置 | 输出目录。未设置时用 uni-app 的 `UNI_INPUT_DIR`，再退回 `cwd/src`。 |
| `debug` | `boolean \| DebugType` | `false` | 输出调试日志。传字符串只开启一个分类。 |
| `dotenv` | `boolean` | `false` | 读取 `cwd` 下的 `.env` 系列文件后再加载配置。 |
| `replaceArrays` | `boolean` | `false` | 数组改为替换，不拼接。 |

配置项的完整类型定义见 [types.ts](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/core/src/types.ts)，`manifest.json` 字段的类型见 [@uni-helper/uni-manifest-types](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/types)。

## 包

| 包 | 说明 |
| --- | --- |
| [`@uni-helper/vite-plugin-uni-manifest`](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/core) | Vite 插件，从 `manifest.config.*` 生成 `manifest.json` |
| [`@uni-helper/uni-manifest-types`](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/types) | `manifest.json` 的 TypeScript 类型 |
| [`@uni-helper/manifest-json-schema`](https://github.com/uni-helper/vite-plugin-uni-manifest/tree/main/packages/schema) | `manifest.json` 的 JSON Schema，由 types 生成 |

## 关联项目

- [vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages)：为 Vite 下的 uni-app 提供基于文件系统的路由。
- [vite-plugin-uni-platform](https://github.com/uni-helper/vite-plugin-uni-platform)：按文件名分流的平台编译插件。
- [vite-plugin-uni-platform-modifier](https://github.com/uni-helper/vite-plugin-uni-platform-modifier)：为属性、指令提供平台修饰符。
- [vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts)：为 Vite 下的 uni-app 提供类 nuxt 的 layouts 系统。
- [@uni-ku/root](https://github.com/uni-ku/root)：提供全局共享的根组件。
