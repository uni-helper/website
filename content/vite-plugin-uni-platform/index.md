---
title: vite-plugin-uni-platform
description: 基于文件名 (*.<h5|mp-weixin|app>.*) 的按平台编译插件
navTruncate: false
icon: carbon:platforms

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-platform
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/vite-plugin-uni-platform
    target: _blank
---

## 安装

:pm-install{name="-D @uni-helper/vite-plugin-uni-platform"}

## 使用

```ts [vite.config.ts]
import Uni from '@dcloudio/vite-plugin-uni'
import UniPlatform from '@uni-helper/vite-plugin-uni-platform'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [UniPlatform(), Uni()],
})
```

现在所有的带有平台标识符的文件都会被自动替换！

```mermaid
flowchart LR
    subgraph 源目录 src/
      src-index[pages/index.vue]
      src-index-h5[pages/index.h5.vue]
      src-index-mp[pages/index.mp-weixin.vue]
    end
    subgraph 微信小程序环境
      src-index-mp --> pages/index.js
      src-index-mp --> pages/index.json
      src-index-mp --> pages/index.wxml
      src-index-mp --> pages/index.wxss
    end
    subgraph H5环境
      src-index-h5 --> assets/pages-index.js
      src-index-h5 --> assets/index.css
    end
    subgraph 其他环境
      src-index --> pages/pages-index.js
    end

```
