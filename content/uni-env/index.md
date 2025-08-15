# @uni-helper/uni-env

在 uni-app 中优雅地判断当前环境。

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]
[![JSDocs][jsdocs-src]][jsdocs-href]

## 安装

```sh
pnpm i @uni-helper/uni-env
```

## 使用

```js
// ESM
import { isMpWeixin } from '@uni-helper/uni-env'

// CommonJS
const { isMp } = require('@uni-helper/uni-env')
```

> [!NOTE]
> 这个包更多的是为插件开发者提供，如果你在运行时引入并不能做到条件编译。
> 要做条件编译的话，请使用官方的 [跨端兼容 - 条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor)，如果你需要更好的条件编译，你可以使用 [unplugin-preprocessor-directives](https://github.com/KeJunMao/unplugin-preprocessor-directives)

[npm-version-src]: https://img.shields.io/npm/v/@uni-helper/uni-env?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@uni-helper/uni-env
[npm-downloads-src]: https://img.shields.io/npm/dm/@uni-helper/uni-env?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@uni-helper/uni-env
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@uni-helper/uni-env?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@uni-helper/uni-env
[license-src]: https://img.shields.io/github/license/uni-helper/uni-env.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/uni-helper/uni-env/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/@uni-helper/uni-env
