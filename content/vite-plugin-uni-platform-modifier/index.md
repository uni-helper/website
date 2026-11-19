---
title: vite-plugin-uni-platform-modifier
description: 为属性、指令提供平台修饰符并按需编译
navTruncate: false
icon: octicon:diff-modified-16

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-platform-modifier
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/vite-plugin-uni-platform-modifier
    target: _blank
---

同一个属性在本插件里可以按平台写多份取值，例如 `class.h5`、`@click.mp-weixin`、`v-text.app`。插件在编译期按当前平台为每组属性保留匹配的那一份。没有平台匹配时保留默认值。

插件只处理 `.vue` 与 `.nvue` 文件。它用 `@vue/compiler-dom` 的模板 AST 定位属性，用 `magic-string` 改写源码并生成 sourcemap。

## 安装

:pm-install{name="-D @uni-helper/vite-plugin-uni-platform-modifier"}

peer 依赖是 `vite ^5.0.0`。

## 配置

```ts [vite.config.ts]
import Uni from '@dcloudio/vite-plugin-uni'
import UniPlatformModifier from '@uni-helper/vite-plugin-uni-platform-modifier'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Uni(), UniPlatformModifier()],
})
```

也提供具名导出，两种引入方式等价：

```ts
import { VitePluginUniPlatformModifier } from '@uni-helper/vite-plugin-uni-platform-modifier'
```

从 0.2.0 起，插件工厂函数名为 `VitePluginUniPlatformModifier`。旧名 `VitePluginUniPlatformVOnModifier` 是笔误，已移除。

## 编写代码

```vue [index.vue]
<button
  v-text="'hello'"
  v-text.h5.mp-weixin="'h5&mp-weixin'"
  class.h5="h5-class"
  class="default-class"
  @click.h5="handleH5Click"
  @click="handleDefaultClick"
/>
```

### 编译结果

::accordion{type=multiple collapsible}
  ::accordion-item
  #title
  > 编译到 H5

  #content
  ```vue
  <button
    v-text="'h5&mp-weixin'"
    class="h5-class"
    @click="handleH5Click"
  />
  ```
  ::

  ::accordion-item
  #title
  > 编译到微信小程序

  #content
  ```vue
  <button
    v-text="'h5&mp-weixin'"
    class="default-class"
    @click="handleDefaultClick"
  />
  ```
  ::

  ::accordion-item
  #title
  > 编译到其他平台

  #content
  ```vue
  <button
    v-text="'hello'"
    class="default-class"
    @click="handleDefaultClick"
  />
  ```
  ::
::

## 支持的修饰符

修饰符集合来自 [`@uni-helper/uni-env`](https://github.com/uni-helper/uni-env) 导出的 `builtInPlatforms`。以实际安装的版本为准：

```js
[
  'app',
  'app-android',
  'app-harmony',
  'app-ios',
  'app-plus',
  'h5',
  'mp-360',
  'mp-alipay',
  'mp-baidu',
  'mp-harmony',
  'mp-jd',
  'mp-kuaishou',
  'mp-lark',
  'mp-qq',
  'mp-toutiao',
  'mp-weixin',
  'mp-xhs',
  'quickapp-webview',
  'quickapp-webview-huawei',
  'quickapp-webview-union',
  'web',
]
```

## 匹配规则

匹配依据是当前构建的平台标识 `UNI_PLATFORM`。App 端还会参考 `UNI_APP_PLATFORM` 与 `UNI_UTS_PLATFORM`。快应用参考 `UNI_SUB_PLATFORM`。

`h5` 与 `web` 视为同一个浏览器目标，写任意一个都会生效。其余平台名按值精确匹配。

同一属性命中多个当前平台修饰符时，插件使用第一个，并在构建时输出警告。
