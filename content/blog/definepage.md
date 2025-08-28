---
title: definePage
description: 使用 definePage 宏定义页面
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

> 深入解析 @uni-helper/vite-plugin-uni-pages 的 definePage 宏：技术实现与优势分析

在 uni-app 生态中，路由管理一直是开发者关注的重点。近日，`@uni-helper/vite-plugin-uni-pages` 插件引入了 `definePage` 宏功能 (由@[Edwin Hui](https://github.com/edwinhuish)在[PR 228](https://github.com/uni-helper/vite-plugin-uni-pages/pull/228)实现)，
为基于 Vite 的 uni-app 项目提供了更现代化的路由定义方案。本文将从技术实现角度深入分析这一新特性，探讨其设计理念、核心优势及实际应用场景。

## 传统路由定义方式的局限性

在 `definePage` 宏出现之前，uni-app 项目主要有两种路由定义方式：

### 1. pages.json 手动配置

```json [pages.json]
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    }
  ]
}
```

**技术痛点**：
- 配置集中管理，与页面文件分离，维护成本高
- 缺乏类型检查，配置错误只能在运行时发现
- 无法实现动态配置或条件编译

### 2. Vue SFC 中的 `<route>` 标签
为了解决上面的问题，vite-plugin-uni-pages 插件引入了 `<route>` 标签来解决这些问题

```vue [page.vue]
<route>
{
  "style": {
    "navigationBarTitleText": "首页"
  }
}
</route>
```

**技术痛点**：
- 标签内容本质是字符串，IDE 无法提供有效的类型支持
- 条件编译需要通过注释实现，代码可读性差
- 无法使用 JavaScript/TypeScript 的编程能力
- Volar2.x 已停止对自定义标签的支持

## definePage 宏的技术实现

`definePage` 宏通过 Vite 的 AST 转换能力，在编译阶段将宏调用转换为实际的路由配置。其实现原理可分为以下几个关键步骤：

### 1. 宏识别与解析

```typescript
// 在 Vite 插件中
export function definePageMacro() {
  return {
    name: 'uni-pages-define-page',
    transform(code, id) {
      if (!id.endsWith('.vue')) return null
      
      // 使用 AST 解析器识别 definePage 调用
      const ast = parse(code)
      const definePageNodes = findDefinePageCalls(ast)
      
      // 提取并执行宏函数
      const pageConfig = executeDefinePageMacro(definePageNodes, id)
      
      // 生成路由配置并注入到 pages.json
      injectPageConfig(pageConfig)
      
      // 移除宏调用，避免影响运行时
      return removeDefinePageCalls(ast)
    }
  }
}
```

### 2. 安全的代码执行环境

为确保宏函数执行的安全性，插件使用 Node.js 的 VM 模块创建隔离的执行环境：

```typescript
function executeDefinePageMacro(nodes, id) {
  const code = generateScriptFromNodes(nodes)
  
  // 创建一个新的虚拟机上下文，支持动态导入
  const vmContext = {
    module: {},
    exports: {},
    __filename: filename,
    __dirname: dir,
    require: createRequire(dir),
    import: (id: string) => import(id),
  }
  
  // 使用 vm 模块执行 JavaScript 代码
  const script = new vm.Script(code, id)

  await script.runInNewContext(vmContext, {
    timeout: 1000, // 设置超时避免长时间运行
  })

  // 获取导出的值
  const result = (vmContext.exports as any).default || vmContext.exports

  return result
}
```

### 3. 类型系统集成

通过 TypeScript 的类型声明文件，为 `definePage` 宏提供完整的类型支持：

```typescript
// types.d.ts
declare function definePage(config: PageConfig): void
declare function definePage(fn: () => PageConfig): void
declare function definePage(fn: () => Promise<PageConfig>): void

interface PageConfig {
  style?: {
    navigationBarTitleText?: string
    navigationBarBackgroundColor?: string
    // ... 其他样式配置
  }
  // ... 其他页面配置项
}
```

## definePage 宏的核心优势

### 1. 编程式路由定义

`definePage` 宏支持多种 API 形式，满足不同场景需求：

**对象形式**（静态配置）：
```typescript
definePage({
  style: {
    navigationBarTitleText: '首页'
  }
})
```

**函数形式**（动态计算）：
```typescript
definePage(() => ({
  style: {
    navigationBarTitleText: computedTitle()
  }
}))
```

**异步函数形式**（异步数据获取）：
```typescript
definePage(async () => {
  const title = await fetchPageTitle()
  return {
    style: {
      navigationBarTitleText: title
    }
  }
})
```

### 2. 完整的类型安全

通过 TypeScript 类型系统，实现编译时类型检查：

```typescript
// 错误示例：类型不匹配
definePage({
  style: {
    navigationBarTitleText: 123 // TS Error: 类型不匹配
  }
})

// 正确示例：类型安全
definePage({
  style: {
    navigationBarTitleText: '首页' // 类型正确
  }
})
```

### 3. 优雅的条件编译

结合 `@uni-helper/uni-env` 包，实现平台特定的路由配置：

```typescript
import { isH5, isMP, isApp } from '@uni-helper/uni-env'

definePage(() => ({
  style: {
    navigationBarTitleText: isH5 ? 'Web 版' : 
                           isMP ? '小程序版' : 
                           'App 版',
    navigationStyle: isMP ? 'custom' : 'default'
  }
}))
```

## 迁移指南

从传统方式迁移到 `definePage` 宏非常简单：

### 1. 安装依赖

:pm-install{name="-D @uni-helper/vite-plugin-uni-pages @uni-helper/uni-env"}

### 2. 配置 Vite 插件

```typescript [vite.config.ts]
import UniPages from '@uni-helper/vite-plugin-uni-pages'

export default defineConfig({
  plugins: [
    UniPages(), // 确保在 Uni() 插件之前调用
    Uni()
  ]
})
```

### 3. 添加类型声明

```json [tsconfig.json]
{
  "compilerOptions": {
    "types": ["@uni-helper/vite-plugin-uni-pages"]
  }
}
```

### 4. 转换现有路由配置

**从 `<route>` 标签迁移**：
```vue
<!-- 原方式 -->
<route>
{
  "style": {
    "navigationBarTitleText": "首页"
  }
}
</route>

<!-- 新方式 -->
<script setup>
definePage({
  style: {
    navigationBarTitleText: '首页'
  }
})
</script>
```

**从 `pages.json` 迁移**：
```json
// 原方式
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    }
  ]
}
```

```vue
<!-- 新方式 -->
<!-- pages/index/index.vue -->
<script setup>
definePage({
  style: {
    navigationBarTitleText: '首页'
  }
})
</script>
```

## 宏执行时机

`definePage` 宏在 Vite 的 `transform` 阶段执行，早于 Vue SFC 的编译。这意味着：

- 宏函数无法访问 SFC 内部的变量（如 ref、computed 等）
- 宏执行时，Vue 组件尚未实例化
- 宏返回的配置会被提取并合并到最终的 pages.json 中


## 总结

`definePage` 宏通过以下技术改进，显著提升了 uni-app 项目的路由管理体验：

1. **编程式 API**：将路由配置从静态声明提升为可编程的 JavaScript/TypeScript 代码
2. **类型安全**：完整的 TypeScript 支持，实现编译时错误检查
3. **条件编译**：优雅的多端适配方案，替代繁琐的注释语法
4. **动态配置**：支持异步数据获取和动态计算，满足复杂场景需求
5. **开发体验**：IDE 智能提示和错误检查，减少低级错误

从技术实现角度看，`definePage` 宏充分利用了 Vite 的插件机制和 AST 转换能力，在编译时完成路由配置的生成和注入，既保持了开发时的灵活性，又不会增加运行时开销。这种设计思路为前端工具链开发提供了有益的参考。

对于正在使用 `@uni-helper/vite-plugin-uni-pages` 的项目，建议逐步迁移到 `definePage` 宏，以获得更好的类型安全和开发体验。
