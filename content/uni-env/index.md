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

本库把 uni-app 注入的环境变量导出为带类型的常量，用来判断当前平台与构建信息。

## 安装

:pm-install{name="@uni-helper/uni-env"}

## 使用

```ts
import { appId, isH5, isMpWeixin, platform } from '@uni-helper/uni-env'
```

CommonJS 同样可用：

```js
const { isMp, platform } = require('@uni-helper/uni-env')
```

::alert{type="warning"}
**构建期，不是运行时**：本库读取的是 uni-app 在**构建期**注入的环境值。uni-app 通过 Vite `define` 静态替换 `process.env.*`，所以本库拿不到运行时的条件编译效果。

需要条件编译时，请用官方的 [跨端兼容 - 条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor)。需要更强的条件编译时，可以用 [unplugin-preprocessor-directives](https://github.com/KeJunMao/unplugin-preprocessor-directives)。
::

## 导出

### 平台

| 导出 | 含义 |
| --- | --- |
| `platform` | `process.env.UNI_PLATFORM`，类型为 `BuiltInPlatform` |
| `builtInPlatforms` | 全部内置平台名的数组 |
| `vueAppPlatform` | `process.env.VUE_APP_PLATFORM`，uni-app 为兼容旧版本注入的别名 |
| `appPlatform` | `process.env.UNI_APP_PLATFORM`，值为 `android`、`ios`、`harmony` 或 `undefined` |
| `subPlatform` | `process.env.UNI_SUB_PLATFORM`，快应用的子平台 |
| `utsPlatform` | `process.env.UNI_UTS_PLATFORM` |

### 平台判断

| 导出 | 为真时 |
| --- | --- |
| `isH5` | `platform` 为 `h5` 或 `web` |
| `isWeb` | `platform` 为 `web` 或 `h5` |
| `isH5Weixin` | H5 且在微信内置浏览器 |
| `isH5Weibo` | H5 且在微博客户端 |
| `isH5Alipay` | H5 且在支付宝客户端 |
| `isApp` | `platform` 为 `app` |
| `isAppPlus` | `platform` 为 `app-plus` |
| `isAppHarmony` | `platform` 为 `app-harmony` |
| `isAppAndroid` | `appPlatform` 为 `android`，或 `utsPlatform` 为 `app-android` |
| `isAppIOS` | `appPlatform` 为 `ios`，或 `utsPlatform` 为 `app-ios` |
| `isMp` | `platform` 匹配 `^mp-` |
| `isMpWeixin` | 微信小程序 |
| `isMpAlipay` | 支付宝小程序 |
| `isMpBaidu` | 百度小程序 |
| `isMpKuaishou` | 快手小程序 |
| `isMpQQ` | QQ 小程序 |
| `isMpToutiao` | 抖音小程序 |
| `isMpJD` | 京东小程序 |
| `isMpXHS` | 小红书小程序 |
| `isMpHarmony` | 鸿蒙小程序 |
| `isMp360` | 360 小程序 |
| `isMpLark` | 飞书小程序 |
| `isQuickapp` | `platform` 匹配 `^quickapp-webview` |
| `isQuickappUnion` | 快应用联盟 |
| `isQuickappHuawei` | 华为快应用 |

### 应用信息

| 导出 | 来源 |
| --- | --- |
| `appId` | manifest 的 `appid`，未配置时为空字符串 |
| `appName` | manifest 的 `name`，未配置时为空字符串 |
| `appVersionName` | manifest 的 `versionName`，未配置时为空字符串 |
| `appVersionCode` | manifest 的 `versionCode`，未配置时为空字符串 |
| `debug` | manifest 的 `debug`，布尔值 |

### 构建与目录

| 导出 | 来源 |
| --- | --- |
| `inputDir` | `process.env.UNI_INPUT_DIR` |
| `outputDir` | `process.env.UNI_OUTPUT_DIR` |
| `cliContext` | `process.env.UNI_CLI_CONTEXT` |
| `compilerVersion` | `process.env.UNI_COMPILER_VERSION` |
| `sourcemap` / `hasSourcemap` | `process.env.SOURCEMAP` |
| `minimize` / `isMinimize` | `process.env.UNI_MINIMIZE` |
| `runByHBuilderX` | `process.env.RUN_BY_HBUILDERX`，布尔值 |

其余导出与 uni-app 内部的 `process.env.*` 一一对应，例如 `uvue`、`appX`、`appPackType`、`automatorPort`。完整名单与注释见 [src/index.ts](https://github.com/uni-helper/uni-env/tree/main/src/index.ts)。

## 读取规则

本库按两条规则选择读取方式：

- 已注册的键用 `process.env.X`。uni-app 在构建期把这些键静态替换为字面量，所有目标都能拿到正确值，并能触发 dead-code elimination，裁掉其他平台的死代码。
- 未注册的键用 std-env 的 `env.X`。这些键不会被静态替换，运行时经 Proxy 依次回退读取 `process?.env`、`import.meta.env`、Deno、`__env__`、`globalThis`。这样在没有 `process` 全局的环境里不会抛 `process is not defined`。

规则来自 uni-app `packages/uni-cli-shared/src/env/define.ts` 的 `initDefine`。开发约定见 [CONTRIBUTING.md](https://github.com/uni-helper/uni-env/blob/main/CONTRIBUTING.md)。

误用后果：

- 未注册键写成 `process.env.X`，会在没有 `process` 全局的运行时报错。
- 已注册键写成 `env.X`，读不到构建期注入的值，也无法被 tree-shaking。
