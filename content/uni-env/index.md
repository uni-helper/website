---
title: uni-env
description: 在 uni-app 中优雅地判断当前环境。
icon: carbon:chart-network

navTruncate: false

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/uni-env
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/uni-env
    target: _blank
---

## 安装

:pm-install{name="@uni-helper/uni-env"}

## 使用

```js
// ESM
import { isMpWeixin } from '@uni-helper/uni-env'

// CommonJS
const { isMp } = require('@uni-helper/uni-env')
```

::alert{type="note"}
这个包更多的是为插件开发者提供，如果你在运行时引入并不能做到条件编译。
要做条件编译的话，请使用官方的 [跨端兼容 - 条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor)，如果你需要更好的条件编译，你可以使用 [unplugin-preprocessor-directives](https://github.com/KeJunMao/unplugin-preprocessor-directives)
::
