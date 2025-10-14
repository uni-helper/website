---
title: 告别 uni-app 启动烦恼：@uni-helper/unh 让开发流程更顺畅
description: 它是对 uni-app 启动命令的二次封装，通过引入自定义 hooks 机制，在执行实际启动命令前预先生成必要的配置文件，确保开发流程顺畅进行
navigation: false
aside: false
prevNext: false
authors:
  - name: FliPPeDround
    username: FliPPeDround
    avatar: https://www.github.com/flippedround.png
    to: https://github.com/flippedround
    target: _blank
---

作为 uni-app 开发者，你是否曾遇到过这样的困扰：使用 vite-plugin-uni-pages 和 vite-plugin-uni-manifest 等插件时，启动命令总是因为找不到 pages.json 或 manifest.json 而失败？这是因为这些配置文件在构建过程中动态生成，但启动命令却在文件生成前就进行检查。

今天要介绍的 @uni-helper/unh 正是为了解决这一痛点而生。它是对 uni-app 启动命令的二次封装，通过引入自定义 hooks 机制，在执行实际启动命令前预先生成必要的配置文件，确保开发流程顺畅进行。

## 核心优势

### 1. 解决文件依赖时序问题
@uni-helper/unh 最核心的价值在于解决了配置文件生成与启动命令执行之间的时序冲突。它会在启动前确保必要的配置文件已就绪，避免了因文件缺失导致的启动失败。

### 2. 灵活的钩子系统
通过自定义 hooks，开发者可以在项目启动前后执行自定义逻辑，如：
```typescript
// unh.config.ts
import { defineConfig } from '@uni-helper/unh'

export default defineConfig({
  hooks: {
    prepare() {
      console.log('准备阶段：安装依赖或执行初始化任务')
    },
    build(platform: string) {
      console.log(`构建前准备：针对 ${platform} 平台的特殊处理`)
    },
    dev(platform: string) {
      console.log(`开发前准备：针对 ${platform} 平台的开发环境配置`)
    },
  },
})
```

### 3. 平台别名简化操作
@uni-helper/unh 允许为不同平台配置简短别名，大幅简化命令行操作：
```typescript
export default defineConfig({
  platform: {
    default: 'h5',
    alias: {
      'h5': ['w', 'h'], // 可以用 'w' 或 'h' 代替 'h5'
      'mp-weixin': ['wx'], // 可以用 'wx' 代替 'mp-weixin'
    },
  },
})
```

这样，原本需要输入 `npm run dev mp-weixin` 的命令，现在只需 `npm run dev wx` 即可。

## 完整命令集

@uni-helper/unh 提供了一套完整的命令行工具，覆盖了项目开发的各个阶段：

### 基本命令
- `unh prepare` - 准备项目环境，执行初始化任务
- `unh dev [platform]` - 启动开发服务器，支持指定平台
- `unh build [platform]` - 构建项目，支持指定平台
- `unh info` - 显示项目信息
- `unh platform` - 显示所有可编译平台

### 命令选项
每个命令都支持 `--help` 选项查看详细帮助信息，例如：
```bash
unh dev --help    # 查看 dev 命令的详细选项
unh build --help  # 查看 build 命令的详细选项
```

全局选项包括：
- `-v, --version` - 显示版本号
- `-h, --help` - 显示帮助信息

## 快速上手

安装 @uni-helper/unh 后，只需简单两步即可开始使用：

1. 更新 package.json：
```json
{
  "scripts": {
    "dev": "unh dev",
    "build": "unh build",
    "prepare": "unh prepare"
  }
}
```

2. 创建配置文件：
```typescript
// unh.config.ts
import { defineConfig } from '@uni-helper/unh'

export default defineConfig({
  platform: {
    default: 'h5',
    alias: {
      'h5': ['w', 'h'],
      'mp-weixin': ['wx'],
    },
  },
  autoGenerate: {
    pages: true,
    manifest: true,
  },
})
```

## 实际使用场景

### 开发环境启动
```bash
# 使用默认平台启动开发服务器
npm run dev

# 使用别名启动微信小程序开发服务器
npm run dev wx

# 使用完整平台名称启动
npm run dev mp-weixin
```

### 项目构建
```bash
# 构建默认平台
npm run build

# 构建微信小程序
npm run build wx

# 构建H5平台
npm run build h5
```

### 项目准备
```bash
# 执行项目初始化任务
npm run prepare
```

## 自动生成配置

@uni-helper/unh 还提供了自动生成配置功能，可以自动生成 pages.json 和 manifest.json 文件，并支持细粒度控制：

```typescript
export default defineConfig({
  autoGenerate: {
    pages: true, // 自动生成 pages.json
    manifest: { // 自动生成 manifest.json 并配置选项
      minify: true,
      insertFinalNewline: true,
      commands: ['build', 'dev'], // 指定在哪些命令阶段生成
    },
  },
})
```

## 高级功能

### 终端UI（测试功能）
@uni-helper/unh 还提供了一个实验性的终端UI功能，可以通过以下配置启用：
```ts
export default defineConfig({
  ui: {
    enabled: true, // 启用终端UI（测试功能，谨慎使用）
    platforms: ['h5', 'mp-weixin', 'mp-alipay'], // 指定UI显示的平台
  },
})
```

### 项目信息查看
使用 `unh info` 命令可以快速查看项目的基本信息，包括当前配置的平台、别名等。

### 平台列表查看
使用 `unh platform` 命令可以查看所有支持编译的平台列表，方便开发者了解可用的目标平台。

## 总结

@uni-helper/unh 虽然是一个小巧的工具，但解决了 uni-app 开发中的一个实际痛点。它通过引入钩子机制和平台别名功能，不仅解决了文件依赖问题，还为开发者提供了更灵活的工作流程。如果你正在使用 vite-plugin-uni-pages 和 vite-plugin-uni-manifest 等插件，@uni-helper/unh 绝对值得一试。

要了解更多详情，可以访问 [GitHub 仓库](https://github.com/uni-helper/unh) 或通过 npm 安装使用：

:pm-install{name="@uni-helper/unh"}

让开发流程更顺畅，从使用 @uni-helper/unh 开始。
