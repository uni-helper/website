---
title: uni-devtools
description: uni-devtools 是为 uni-app 提供的开发者工具
icon: carbon:executable-program

navTruncate: false

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/devtools
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/devtools
    target: _blank
---

<pre align="center">
🏗 积极开发中💪，暂不建议在生产中使用
</pre>

</br>

![demo](./devtools/demo.jpg)

## 安装
:pm-install{name="-D @uni-helper/devtools"}

## 使用

```ts
import Uni from '@dcloudio/vite-plugin-uni'
import DevTools from '@uni-helper/devtools'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    DevTools(),
    Uni(),
  ],
})
```

## 💻 开发

- `fork`并`clone`本仓库
- 使用`pnpm install`安装依赖
- 使用`pnpm dev`编译代码
- 使用`pnpm play`运行交互式测试

## 💝 贡献

任何人都可以参与到这个项目的贡献中，欢迎大家参与讨论和贡献代码。
