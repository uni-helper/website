---
title: plugin-uni
description: 为 uni-app 提供的 原生 ESM Vite 插件，让你在 ESM-First 环境中零成本接入 uni-app 构建体系。
navTruncate: false
icon: lucide:rocket

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/plugin-uni
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/plugin-uni
    target: _blank
  - value: 赞助
    icon: lucide:coffee
    to: https://afdian.com/a/flippedround
    target: _blank
---

`@dcloudio/vite-plugin-uni` 是 CJS 包。在 ESM 配置里执行 `import Uni from '@dcloudio/vite-plugin-uni'`，拿到的是整个 `module.exports`，还得自己再取一次 `.default`。

本包把这一步包好。它只做重导出，不包含运行时逻辑，也不限制官方插件的版本。

## 安装

官方插件 `@dcloudio/vite-plugin-uni` 必须自己安装。本包通过 `peerDependencies` 使用它。

:pm-install{name="-D @uni-helper/plugin-uni"}

## 使用

```ts [vite.config.ts]
import Uni from '@uni-helper/plugin-uni'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Uni(),
  ],
})
```

配置按 ESM 写即可。playground 的 `package.json` 设置了 `"type": "module"`。

`Uni()` 的选项和官方插件相同：`uvue`、`vueOptions`、`vueJsxOptions`、`viteLegacyOptions`、`autoImportOptions`。需要类型时从 `@dcloudio/vite-plugin-uni` 导入。

## 工作原理

- `src/index.js` 只有一行 `export default uni.default ?? uni`。官方插件带 `.default` 时取它，否则直接用导入结果。
- `src/index.cjs` 是 `require` 条件的入口，写法相同：`module.exports = uni.default ?? uni`。
- `src/index.d.ts` 重导出官方插件的默认类型。IDE 提示和官方插件保持一致。
- `peerDependencies` 写的是 `*`。官方插件用哪个版本由你的项目决定，本包不用跟着发版。

## 问题反馈

构建出错时，必须先确认是不是官方插件的问题。是的话提到 [dcloudio/uni-app](https://github.com/dcloudio/uni-app/issues)。

确认问题出在转发层，再到 [uni-helper/plugin-uni](https://github.com/uni-helper/plugin-uni) 提 issue，并附上最小复现仓库。

官方插件提供原生 ESM 版本后，本包会归档并停止维护。
