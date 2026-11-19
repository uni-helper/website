---
title: vite-plugin-uni-layouts
description:   Vite 下 uni-app 的可定制布局框架
navTruncate: false
icon: lucide:layout-dashboard

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-layouts
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/vite-plugin-uni-layouts
    target: _blank
---

构建时插件扫描 `src/layouts`，把布局组件全局注册，再按页面配置把页面模板包进对应布局。

## 安装

:pm-install{name="-D @uni-helper/vite-plugin-uni-layouts"}

## 使用

### 配置

```ts [vite.config.ts]
import Uni from '@dcloudio/vite-plugin-uni'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniLayouts(),
    Uni(),
  ],
})
```

### 创建布局

布局文件必须放在 `src/layouts` 目录下。一个布局文件就是一个 Vue 组件。`src/layouts/default.vue` 是默认布局。

```vue [src/layouts/default.vue]
<template>
  <view class="layout">
    <view class="header">
      <slot name="header">
        默认标题
      </slot>
    </view>
    <view class="main">
      <slot>main</slot>
    </view>
    <view class="footer">
      <slot name="footer" />
    </view>
  </view>
</template>

<style>
.layout {
  padding: 24rpx;
}
</style>
```

布局名由文件路径推导：

| 文件 | 布局名 |
| --- | --- |
| `src/layouts/default.vue` | `default` |
| `src/layouts/posts.vue` | `posts` |
| `src/layouts/Posts.vue` | `posts` |
| `src/layouts/posts/index.vue` | `posts` |
| `src/layouts/posts/posts.vue` | `posts` |
| `src/layouts/kebab-layout.vue` | `kebabLayout` |
| `src/layouts/no-index/index.vue` | `noIndex` |
| `src/layouts/blog/posts.vue` | `blogPosts` |
| `src/layouts/the/nesting/layout.vue` | `theNestingLayout` |

布局文件名必须能拼出合法的组件名（字母、数字、`_`、`$`）。带引号、反斜杠之类的文件名无法生成组件，插件会跳过并给出 warning。

从 0.3 起，没有布局目录（`layoutDir` 写错、目录为空）时插件警告一次，所有页面都不套布局。页面写的布局名不存在时也警告，只有这一页不套布局。

### 指定布局

页面默认用 `default` 布局。不用 [vite-plugin-uni-pages](/vite-plugin-uni-pages) 时，必须手动更新 `pages.json`：

```jsonc [pages.json]
{
  "pages": [
    {
      "path": "pages/index/index" // 默认使用 default 布局
    },
    {
      "path": "pages/posts/index",
      "layout": "posts" // 使用 posts 布局
    },
    {
      "path": "pages/users/index",
      "layout": false // 不使用任何布局
    }
  ]
}
```

`layout` 也可以写布尔值。`false` 关闭布局，`true` 等同于写 `"default"`，此时不读 `layout` 选项。

### 禁用布局

```json [pages.json]
{
  // ...
  "pages": [{
    "path": "pages/index/index",
    "layout": false
  }]
  // ...
}
```

### 配合 vite-plugin-uni-pages

推荐用 [@uni-helper/vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages) 自动扫描并生成 `pages.json`。页面配置写在 `definePage` 宏里，构建时宏会被删掉并自动更新 `pages.json`。

```ts [vite.config.ts]
import Uni from '@uni-helper/plugin-uni'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniPages(),
    UniLayouts(),
    Uni(),
  ],
})
```

```vue [src/pages/posts/index.vue]
<script setup lang="ts">
definePage({
  layout: 'posts', // 使用 posts 布局
  // layout: false, // 不使用任何布局
})
</script>

<template>
  <view>帖子列表</view>
</template>
```

`definePage` 的类型提示需要设置 `tsconfig.json`：

```json [tsconfig.json]
{
  "compilerOptions": {
    "types": ["@dcloudio/types", "@uni-helper/vite-plugin-uni-pages/client"]
  }
}
```

### 条件编译

从 0.3 起，同一个页面可以给不同平台配不同的 `layout`。

不用 uni-pages 时，手动在 `pages.json` 里写条件编译，详见 [条件编译处理多端差异](https://uniapp.dcloud.net.cn/tutorial/platform.html)：

```json [pages.json]
{
  "pages": [
    // #ifdef H5
    { "path": "pages/index/index", "layout": "home" },
    // #endif
    // #ifndef H5
    { "path": "pages/index/index", "layout": "default" },
    // #endif
    { "path": "pages/about/about" }
  ]
}
```

用 uni-pages 时，用 `definePage` 的函数式写法：

```vue
<script setup lang="ts">
definePage(({ define }) =>
  define({ layout: 'default' })
    .ifdef('h5', { layout: 'home' }),
)
</script>
```

### 动态布局与具名插槽

页面写了 `layout: false` 之后，插件不再自动包裹页面。需要布局或具名插槽时，用内置组件 `<uh-uni-layout>` 指定布局。不需要布局的页面直接写内容即可。

```vue [src/pages/index/index.vue]
<script setup lang="ts">
import type { LayoutKey } from 'virtual:uni-layouts'
import { ref } from 'vue'

definePage({
  layout: false, // 禁用默认布局
})

const name = ref<LayoutKey>('namedSlots')
</script>

<template>
  <uh-uni-layout :name="name">
    <template #header>
      header
    </template>
    页面内容
    <template #footer>
      footer
    </template>
  </uh-uni-layout>
</template>
```

`name` prop 写布局名。kebab 写法（`named-slots`）也认：插件按 kebab 名注册组件，同时注册 camelCase 别名，H5 的 `:is` 直接取绑定值也能命中。

`name` 可以绑定变量。其他属性透传给布局组件。

`LayoutKey` 是扫描到的布局名的联合类型，来自生成的声明文件。写错名字时编辑器会报错。

`name` 写不存在的布局时插件给出 warning，标签留在模板里，不渲染布局。

### 读取布局实例

布局里用 `defineExpose` 暴露方法，页面拿到实例后可以直接调用。

```vue [src/layouts/default.vue]
<script setup lang="ts">
function toast(message: string): void {
  // ...
}

defineExpose({ toast })
</script>
```

从 0.3 起，用 `useUhUniLayoutRef` 拿实例。它从虚拟模块 `virtual:uni-layouts` 导入，变量名随意，泛型写布局暴露的接口。

```vue
<script setup lang="ts">
import { useUhUniLayoutRef } from 'virtual:uni-layouts'

const uniLayout = useUhUniLayoutRef<{ toast: (message: string) => void }>()

function handleShowToast() {
  uniLayout.value?.toast('hello')
}
</script>
```

插件读页面的 `<script setup>`，给包裹标签加一个与变量名一致的 ref，这里是 `ref="uniLayout"`。类型来自插件生成的 `uni-layouts.d.ts`，由 `dts` 选项控制，默认开启。

值是布局挂载之后才有的，`onLoad` 里读取会拿到 `null`。用 `onMounted`、`onReady`，或者 `watch(uniLayout, ...)`。模板里写 `uniLayout?.toast('...')` 也可以，模板会自动解包，有值了会重新渲染。

以下边界需要注意：

- `useUhUniLayoutRef` 必须写在页面 setup 顶层。包在函数或条件里不算 setup 绑定，插件无法识别。
- `layout: false` 的页面不加包裹，ref 加在自己写的 `<uh-uni-layout>` 上，效果相同。标签上已经有 `ref` 时以你写的为准。
- 不支持 Options API。对应页面没有等价的自动绑定。
- 小程序端动态布局切到不渲染布局的分支后，ref 里还是上一个实例；H5 会置空。要两端一致，见下节。

0.3 以前只能写 `const uniLayout = ref()`。插件在 setup 顶层找这个名字，给包裹标签加 `ref="uniLayout"`。该写法在 0.3 仍然可用，但不再推荐，原因见 [Issue #41](https://github.com/uni-helper/vite-plugin-uni-layouts/issues/41)。

没有组件上下文的纯 JS 模块（例如 `utils.js`）调不到布局实例。`useUhUniLayoutRef` 只能在页面或组件的 setup 里用。

跨页提示必须放到模块里的状态上，让布局去渲染：

```ts [src/utils/toast.ts]
import { ref } from 'vue'

const messages = ref<string[]>([])

export function toast(message: string) {
  messages.value.push(message)
}
```

```vue [src/layouts/default.vue]
<script setup lang="ts">
import { messages } from '@/utils/toast'
</script>

<template>
  <view class="layout">
    <view v-for="message in messages" :key="message" class="toast">
      {{ message }}
    </view>
    <slot />
  </view>
</template>
```

页面直接 `import toast` 即可，不需要经过布局实例：

```vue [src/pages/index/index.vue]
<script setup lang="ts">
import { toast } from '@/utils/toast'

function handleSave() {
  toast('保存成功')
}
</script>

<template>
  <view>
    <button @click="handleSave">
      保存
    </button>
  </view>
</template>
```

### page-meta

`<page-meta>` 只有作为页面第一个节点才生效。被布局组件包住就会失效。从 0.3 起，插件包裹页面时把它提到布局组件前面。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const locked = ref(false)
</script>

<template>
  <page-meta :page-style="`overflow:${locked ? 'hidden' : 'visible'}`" />
  <view class="content">
    页面内容
  </view>
</template>
```

插件只处理页面模板顶层的 `<page-meta>`。写在其他节点里面的不受处理，也不会生效。`layout: false` 的页面不需要处理，页面本身就是根节点，`<page-meta>` 写在第一个位置即可。

### 开发时热更新

从 0.3 起，改 `pages.json` 里某个页面的 `layout` 时，只有这一页重新编译。

在布局目录里新增或删除 `.vue` 时，插件重扫布局。页面用上新布局，删掉的布局从页面模板里去掉。

`vite build --watch` 没有 dev server。`pages.json` 的变化只更新插件记下的页面列表，下一次构建生效。

## 插件配置

```ts
interface UserOptions {
  /**
   * 页面没有自己的 `layout` 时使用的布局名
   * @default 'default'
   */
  layout?: string

  /**
   * 布局文件所在目录，相对 `cwd`
   * @default 'src/layouts'
   */
  layoutDir?: string

  /**
   * 路径基准
   * @default process.cwd()
   */
  cwd?: string

  /**
   * 生成 `useUhUniLayoutRef` 与布局名的类型声明
   * 为 true 时写到 pages.json 同目录的 `uni-layouts.d.ts`
   * 为 string 时作为自定义路径，相对 `cwd`
   * @default true
   * @since 0.3.0
   */
  dts?: boolean | string
}
```

配置项的完整定义见 [types.ts](https://github.com/uni-helper/vite-plugin-uni-layouts/blob/main/src/types.ts)。

```ts [vite.config.ts]
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniLayouts({
      layout: 'default',
      layoutDir: 'src/layouts',
      dts: 'src/types/uni-layouts.d.ts',
    }),
  ],
})
```

### 声明文件

`dts` 默认开启。启动 dev server 或构建时写 `uni-layouts.d.ts`，位置与 `pages.json` 同目录（有 `src` 时是 `src/uni-layouts.d.ts`）。传字符串表示相对 `cwd` 的路径，`false` 关闭。生成的声明可以直接提交进仓库。

声明包含两部分：

- `virtual:uni-layouts` 的 `useUhUniLayoutRef` 类型，以及扫描到的布局名导出的 `LayoutKey` 联合类型。
- 布局名登记表 `UniHelperUniLayouts`。`@uni-helper/uni-pages-types` 用它给页面配置的 `layout` 字段收窄类型，所以 `definePage({ layout: '写错的名字' })` 与 `pages.config` 里的 `layout` 都会报错。升级到带这个登记口的 `@uni-helper/uni-pages-types`（跟随 `@uni-helper/vite-plugin-uni-pages` 一起安装）才生效。旧版本不会报错，`layout` 仍然接受任意字符串。

布局文件增删或改名后，dev server 重新扫描并更新声明。`layout` 用计算出来的字符串（例如 `const name: string = ...`）时，类型收窄会报错，可以写 `as LayoutKey`。

改过 `dts` 路径时，旧位置的声明文件还会被 tsconfig 收进来。两个登记表合并后，删掉的布局名会继续通过类型检查。删掉旧文件再重启即可。

## 注意

插件只做两件事：

1. 自动扫描并全局注册 layouts 目录下的组件。
2. 把页面用布局组件包裹起来。

因此微信小程序下使用 `web-view` 时不会生效。
