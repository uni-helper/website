---
title: eslint-config
description: eslint-config 是为 uni-app 提供的 ESLint 配置
icon: simple-icons:eslint

navTruncate: false

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/eslint-config
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/eslint-config
    target: _blank
---

本配置基于 [@antfu/eslint-config](https://github.com/antfu/eslint-config)，为 uni-app 项目提供开箱即用的 ESLint 配置。

- 关闭与 uni-app 冲突的 Vue 规则，例如组件名大小写、自定义事件命名。
- 注册平台全局变量，例如 `uni`、`wx`、`my`、`tt`。
- 按 uni-app 官方规范排序 `manifest.json`、`pages.json`、`theme.json` 的键。
- 项目安装了 `@uni-helper/vite-plugin-uni-manifest` 或 `@uni-helper/vite-plugin-uni-pages` 时，自动跳过对应 JSON 文件的排序。
- 从 0.8.0 起，`.nvue`、`.uvue`、`.uts` 进入 lint 范围。

## 兼容性

建议始终使用 Node.js 最新的 LTS 版本。

本配置只发布 ESM。

| eslint | @antfu/eslint-config | @uni-helper/eslint-config | Node.js | 备注 |
|--------|----------------------|---------------------------|---------|------|
| ^10.0.0 | ^10.0.0 | ^0.8.0 | ^20.19.0 \|\| ^22.13.0 \|\| >=24 | 仅 ESM |
| ^10.0.0 | ^7.0.0 \|\| ^8.0.0 \|\| ^9.0.0 \|\| ^10.0.0 | ^0.7.6 | ^20.19.0 \|\| ^22.13.0 \|\| >=24 | 仅 ESM |
| ^10.0.0 | ^7.0.0 \|\| ^8.0.0 \|\| ^9.0.0 | ^0.7.4 | ^20.19.0 \|\| ^22.13.0 \|\| >=24 | 仅 ESM |
| ^10.0.0 | ^5.0.0 \|\| ^6.0.0 \|\| ^7.0.0 | 0.7.1 | ^20.19.0 \|\| ^22.13.0 \|\| >=24 | 仅 ESM |
| ^9.10.0 | ^5.0.0 \|\| ^6.0.0 | ^0.6.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | 仅 ESM |
| ^9.10.0 | ^5.0.0 | ^0.5.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | 仅 ESM |
| ^9.10.0 | ^4.0.1 | ^0.4.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | 仅 ESM |
| ^9.10.0 | ^3.13.0 | ^0.3.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | |
| ^9.5.0 | ^3.0.0（v0.2.2 起 ^3.4.1） | ^0.2.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | |
| >=8.40.0 | ^2.25.0 | ^0.1.0 | ^12.22.0 \|\| ^14.17.0 \|\| >=16.0.0 | |

## 安装

:pm-install{name="-D eslint @antfu/eslint-config @uni-helper/eslint-config"}

## 使用

在项目根目录创建 `eslint.config.mjs`：

```js [eslint.config.mjs]
import uniHelper from '@uni-helper/eslint-config'

export default uniHelper()
```

在 `package.json` 中添加脚本：

```json [package.json]
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 选项

```js
export default uniHelper({
  // 启用 uni-app 规则适配，默认 true。
  // 开启时强制启用 Vue 支持，并把 Vue 配置的覆盖范围扩展到 .nvue 与 .uvue。
  uni: true,
  // 按 uni-app 官方规范排序 manifest.json / pages.json / theme.json 的键，默认 true。
  uniJson: true,
})
```

平台全局变量的注册不受 `uni` 选项影响，始终启用。

两个选项也接受对象形式。对象形式表示开启，同时覆盖内部规则：

```js
export default uniHelper({
  uni: {
    overrides: { 'vue/singleline-html-element-content-newline': 'off' }
  },
  uniJson: {
    overrides: { 'jsonc/sort-keys': 'off' }
  },
})
```

只有显式传 `false` 才关闭对应功能。

所有 [@antfu/eslint-config 选项](https://github.com/antfu/eslint-config#customization) 都可以直接传入。

## nvue、uvue、uts

`uni` 开启时（默认开启），`.nvue` 与 `.uvue` 使用和 `.vue` 相同的解析器与规则。`<script lang="uts">` 交给 TypeScript 解析器处理。独立的 `.uts` 文件同样按 TypeScript 解析；传 `typescript: false` 时不处理。

`<script>` 必须写在 `<template>` 前面，沿用 antfu 的默认顺序。

在 `.uvue` 里可以直接调用页面生命周期，例如 `onLoad`、`onPageShow`、`onBackPress`。也可以直接用 `UTSAndroid`、`UTSiOS`、`UTSHarmony`、`UTSJSONObject`，不用额外声明。完整名单见 [uni-app x 页面文档](https://doc.dcloud.net.cn/uni-app-x/page.html)。这些全局变量只对 `.uvue` 生效。

`ts/consistent-type-definitions` 与 `ts/prefer-as-const` 对 `.uts` 和 `.uvue` 关闭。这两条规则要求的写法 UTS 编译器不接受：对象字面量只能用 `type` 声明，`as const` 断言不支持。

0.8.0 起 `.nvue`、`.uvue`、`.uts` 才进入 lint 范围。老项目升级后，CI 可能出现新问题，建议单独提交一个 PR 修正。

## 相关资源

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)：本配置的上游基础。
- [IDE 支持（保存时自动修复）](https://github.com/antfu/eslint-config#ide-support-auto-fix-on-save)。

更多配置及选项请查看 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 的文档。
