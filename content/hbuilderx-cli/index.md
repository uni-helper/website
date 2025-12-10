---
title: hbuilderx-cli
description: HBuilderX cli 的 CJS/ESM 包装
icon: carbon:chart-network

navTruncate: false

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/hbuilderx-cli
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/hbuilderx-cli
    target: _blank
---

## 安装

:pm-install{name="-D @uni-helper/hbuilderx-cli"}

## 使用

### 作为模块

```ts
// ESM
import { createHbuilderX } from '@uni-helper/hbuilderx-cli'

// CommonJS
const { createHbuilderX } = require('@uni-helper/hbuilderx-cli')
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
