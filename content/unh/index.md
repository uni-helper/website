---
title: unh
description: 二次封装的启动命令，可以自定义hooks
navTruncate: false
icon: lucide:mouse-pointer-click

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/unh
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/unh
    target: _blank
---

## 安装
:pm-install{name="@uni-helper/unh"}

## 为什么需要 `@uni-helper/unh`

`@uni-helper/unh` 是对 uni-app 启动命令的二次封装，旨在解决开发过程中的特定问题。在标准的 uni-app 工作流中，启动命令会使用 `fs` 模块检查 `pages.json` 和 `manifest.json` 文件是否存在，若缺少这些文件将导致命令中断。

当使用 [vite-plugin-uni-pages](/vite-plugin-uni-pages) 和 [vite-plugin-uni-manifest](/vite-plugin-uni-manifest) 等插件时，这些配置文件通常在构建过程中动态生成，而非预先存在。这种时序差异会导致启动命令失败，因为文件检查发生在文件生成之前。

`@uni-helper/unh` 通过引入自定义 hooks 机制，在执行实际启动命令前预先生成必要的配置文件，确保了开发流程的顺畅性。这种设计不仅解决了文件依赖问题，还为开发者提供了在项目启动前后执行自定义逻辑的灵活性。

`@uni-helper/unh` 还提供了平台别名功能，允许开发者在 `unh.config.ts` 中为不同平台配置简短别名。这一特性不仅简化了命令行操作，也优化了 `package.json` 中 `scripts` 部分的配置，提升了开发效率和项目可维护性。

## 使用

更新 `package.json`
```json [package.json]
{
  "scripts": {
    "dev": "unh dev",
    "build": "unh build",
    "prepare": "unh prepare"
  }
}
```

配置 `unh.config.ts`
```ts [unh.config.ts]
import { defineConfig } from '@uni-helper/unh'

export default defineConfig({
  // 平台配置
  platform: {
    // 默认平台，当不指定平台时使用此平台
    default: 'h5',
    // 平台别名，可以使用短名称代替完整平台名称
    alias: {
      'h5': ['w', 'h'],
      'mp-weixin': ['wx'],
    },
  },
  // 准备阶段配置，可以自定义hooks
  hooks: {
    // 安装依赖时的钩子
    prepare() {
      console.log('prepare')
    },
    // 开发前的钩子，接收平台参数
    dev(platform: string, options: Record<string, any>) {
      console.log('dev:', platform, options)
    },
    // 构建前的钩子，接收平台参数
    build(platform: string, options: Record<string, any>) {
      console.log('build:', platform, options)
    },
    // 构建后的钩子，接收平台参数
    onBuildAfter(platform: string, options: Record<string, any>) {
      console.log('buildAfter:', platform, options)
    },
  },
  // 自动生成配置
  autoGenerate: {
    // 是否自动生成页面配置
    pages: true,
    manifest: true,
  },
})
```

调用
:pm-run{script="dev wx"}

## 获取帮助

执行以下命令可以查看所有可用的命令和选项：

```bash [terminal]
unh -h
```

## 配置说明

## `platform`
::field{name="default" type="Platform" defaultValue="'h5'"}
默认平台，当未指定平台时使用该平台
::

::field{name="alias" type="PlatformAlias"}
平台别名，用于自定义配置不同平台的别名
::

## `hooks`
::field{name="prepare" type="() => void | Promise<void>"}
安装依赖时执行，执行`unh prepare`时调用
::

::field{name="build" type="(inputPlatform: string) => void | Promise<void>"}
构建前执行，执行`unh build`时调用
::

::field{name="dev" type="(inputPlatform: string) => void | Promise<void>"}
开发前执行，执行`unh dev`时调用
::

::field{name="onBuildAfter" type="(inputPlatform: string) => void | Promise<void>"}
构建后执行，执行`unh build`后调用
::

## `autoGenerate`
::field{name="outDir" type="string" defaultValue="'src'"}
自动生成的文件输出目录
::

::field{name="pages" type="boolean | BuildPhase[]" defaultValue="false"}
是否自动生成pages.json
- `true` 均自动生成 pages.json
- `BuildPhase[]` 指定在哪些阶段生成，如 `['build', 'dev']`
::

::field{name="manifest" type="boolean | ManifestOptions & { commands?: BuildPhase[] }" defaultValue="false"}
是否自动生成manifest.json
- `true` 均自动生成 manifest.json
- 对象形式可配置更多选项
::

### ManifestOptions
::field{name="minify" type="boolean" defaultValue="false"}
是否压缩 `manifest.json`
::

::field{name="insertFinalNewline" type="boolean" defaultValue="false"}
是否在 `manifest.json` 末尾插入换行符
::

::field{name="commands" type="BuildPhase[]"}
指定在哪些命令阶段生成 manifest.json
::

## `ui`
::field{name="enabled" type="boolean" defaultValue="false"}
是否启用终端UI，测试功能，谨慎使用
::

::field{name="platforms" type="Platforms"}
用于指定终端UI显示的平台
::
