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

## 安装
:pm-install{name="-D @uni-helper/vite-plugin-uni-platform-modifier"}

## 使用

### 配置

```ts [vite.config.ts]
import Uni from '@dcloudio/vite-plugin-uni'
import UniPlatformModifier from '@uni-helper/vite-plugin-uni-platform-modifier'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Uni(), UniPlatformModifier()],
})
```

### 编写代码
::stack
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

::accordion{type=multiple collapsible}
  ::accordion-item
  #title
  > 编译到H5

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
::

### 支持的修饰符

```js
['app', 'app-plus', 'h5', 'mp-360', 'mp-alipay', 'mp-baidu', 'mp-jd', 'mp-kuaishou', 'mp-lark', 'mp-qq', 'mp-toutiao', 'mp-weixin', 'quickapp-webview', 'quickapp-webview-huawei', 'quickapp-webview-union']
```
