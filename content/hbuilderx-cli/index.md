# @uni-helper/hbuilderx-cli

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]
[![JSDocs][jsdocs-src]][jsdocs-href]

**WIP** HBuilderX cli 的 CJS/ESM 包装

## 安装

```sh
# npm
npm install @uni-helper/hbuilderx-cli

# yarn
yarn add @uni-helper/hbuilderx-cli

# pnpm
pnpm install @uni-helper/hbuilderx-cli
```

## 使用

### 作为模块

```ts
// ESM
import { createHbuilderX } from "@uni-helper/hbuilderx-cli";

// CommonJS
const { createHbuilderX } = require("@uni-helper/hbuilderx-cli");
```

### 命令行

`hbx` 是 HBuildeX cli 别名(alias), 用法请参考[文档](https://hx.dcloud.net.cn/cli/README)

```bash
pnpm install -g @uni-helper/hbuilderx-cli
hbx # or hbuilderx
```

#### 配置

命令行配置项使用 unjs/c12 自动从 cwd 中加载。 你可以使用 hbx.config.json, hbx.config.{ts,js,mjs,cjs} 或者 .hbxrc

- **cli**: HBuildeX cli 的绝对路径，在 Window 下默认为自动从注册表发现，在 Macos 下默认为 `/Applications/HBuilderX.app/Contents/MacOS/cli`

## 协议

基于 [MIT](./LICENSE) 用 💛 发电

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@uni-helper/hbuilderx-cli?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@uni-helper/hbuilderx-cli
[npm-downloads-src]: https://img.shields.io/npm/dm/@uni-helper/hbuilderx-cli?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@uni-helper/hbuilderx-cli
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@uni-helper/hbuilderx-cli?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@uni-helper/hbuilderx-cli
[license-src]: https://img.shields.io/github/license/uni-helper/hbuilderx-cli.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/uni-helper/hbuilderx-cli/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/@uni-helper/hbuilderx-cli
