# @uni-helper/uni-deploy

[![License](https://img.shields.io/github/license/uni-helper/uni-deploy)](https://github.com/uni-helper/uni-deploy/blob/main/LICENSE)

[![npm](https://img.shields.io/npm/v/@uni-helper/uni-deploy)](https://www.npmjs.com/package/@uni-helper/uni-deploy)

自动化部署 `uni-app` 应用。要求 `node >= 14.18`。

## 起步

### 安装依赖

安装依赖。

```shell
npm install @uni-helper/uni-deploy -D
```

<details>
  <summary>yarn v2/v3</summary>
  <p>请参考 <a href="https://yarnpkg.com/configuration/yarnrc/#nodeLinker">文档</a> 设置 <code>nodeLinker</code> 为 <code>node_modules</code>。</p>
</details>

<details>
  <summary>pnpm</summary>
  <p>请参考 <a href="https://pnpm.io/npmrc#shamefully-hoist">文档</a> 设置 <code>shamefully-hoist</code> 为 <code>true</code>。</p>
</details>

不考虑支持 `uni_modules`。

### 配置文件

支持以下配置：

- `uni-deploy.config.ts`
- `uni-deploy.config.mts`
- `uni-deploy.config.cts`
- `uni-deploy.config.js`
- `uni-deploy.config.mjs`
- `uni-deploy.config.cjs`

借助 [unconfig](https://github.com/antfu/unconfig) 的帮助，以上配置文件的内容会被读取并合并，最终合并后的内容会作为你提供的 `uni-deploy` 的配置。

以下是一个 `uni-deploy.config.ts` 的示例。

```typescript
import { defineConfig } from 'uni-deploy';

export default defineConfig({
  /* 通用配置 */
  // 当前进程的工作目录，默认为执行目录
  cwd: process.cwd(),

  /* 应用平台 */
  // 微信小程序配置
  'mp-weixin': { ... },
  // 支付宝小程序配置
  'mp-alipay': { ... },

  /* 办公平台 */
  // 钉钉配置
  dingtalk: { ... },
  // 企业微信配置
  wecom: { ... },
})
```

## 配置

### 应用平台

#### 微信小程序

类型定义如下。

```typescript
import type { MiniProgramCI as Wechat } from 'miniprogram-ci/dist/@types/types';

export interface MpWeixinConfig {
  /** 项目 appid，会尝试搜索 project.config.json 和 manifest.json 并将其中微信小程序字段的 appid 作为默认值 */
  appid?: string;
  /** 项目路径，会尝试搜索 project.config.json 并将其目录作为默认值 */
  projectPath?: string;
  /**
   * 请阅读 https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html
   *
   * @deprecated 不建议使用，建议在 .env 或 process.env 设置 MP_WEIXIN_PRIVATE_KEY
   */
  privateKey?: string;
  /**
   * 请阅读 https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html
   *
   * @deprecated 不建议使用，建议在 .env 或 process.env 设置 MP_WEIXIN_PRIVATE_KEY_PATH
   */
  privateKeyPath?: string;
  /** 项目类型，默认为 miniProgram */
  type?: Wechat.ProjectType;
  /** 需要排除的路径 */
  ignores?: string[];
  /**
   * 项目版本，会尝试搜索 package.json 和 manifest.json，并将 version (package.json) 或 versionName (manifest.json)
   * 作为默认值
   */
  version?: string;
  /** 编译设置，会尝试搜索 project.config.json，并将 setting 作为默认值 */
  setting?: Wechat.ICompileSettings;
  /** 备注，默认为 Handled by uni-deploy */
  desc?: string;
  /** 使用的机器人，可选 1 - 30 */
  robot?: number;
  /** 编译过程中开启的线程数 */
  threads?: number;
  /** 是否使用异步方式上传，当代码包大于 5MB 时，默认开启 */
  useCOS?: boolean;
  /** 是否允许过滤无依赖文件，默认开启 */
  allowIgnoreUnusedFiles?: boolean;
  /** 进度更新监听函数 */
  onProgressUpdate?: (task: Wechat.ITaskStatus | string) => void;
  /** 预览时主包、分包体积上限是否调整为4M */
  bigPackageSizeSupport?: boolean;
  /** 二维码文件的格式，默认为 image */
  qrcodeFormat?: 'base64' | 'image' | 'terminal';
  /** 二维码文件保存路径，默认为 qrcode.png */
  qrcodeOutputDest?: string;
  /** 预览页面路径 */
  pagePath?: string;
  /** 预览页面路径启动参数 */
  searchQuery?: string;
  /** 默认值 1011，具体含义见 https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html */
  scene?: number;
  test?: boolean;
}
```

#### 支付宝小程序

类型定义如下。

```typescript
import type { EBuildTarget as AlipayBuildTarget } from 'minidev';

export interface MpAlipayConfig {
  /**
   * 项目 appid，会尝试搜索 mini.project.json 和 manifest.json，并将 appid (mini.project.json) 或 mp-alipay.appid
   * (manifest.json) 作为默认值
   *
   * 请注意，这里跟随微信小程序使用 appid，而并非 appId
   */
  appid?: string;
  /** 项目路径，会尝试搜索 mini.project.json 并将其目录作为默认值 */
  projectPath?: string;
  /**
   * 请阅读 https://opendocs.alipay.com/mini/02q29w
   *
   * @deprecated 不建议使用，建议在 .env 或 process.env 设置 MP_ALIPAY_PRIVATE_KEY
   */
  privateKey?: string;
  /**
   * 请阅读 https://opendocs.alipay.com/mini/02q29w
   *
   * @deprecated 不建议使用，建议在 .env 或 process.env 设置 MP_ALIPAY_TOOL_ID
   */
  toolId?: string;
  /** 端类型 */
  clientType?: string;
  /** 开放平台 bundleId, 此项会覆盖 clientType 的效果 */
  bundleId?: string;
  /**
   * 项目版本，会尝试搜索 package.json 和 manifest.json，并将 version (package.json) 或 versionName (manifest.json)
   * 作为默认值
   */
  version?: string;
  /** 上传成功后是否自动设置为体验版本，需要对应权限 */
  experience?: boolean;
  /** 上传时需要删除的版本号 */
  deleteVersion?: string;
  /** 强制构建类别，默认为 v2 */
  appxv?: 'v1' | 'v2' | 'legacy-v1';
  /** 构建缓存路径, 默认为系统缓存路径 */
  cacheDir?: string;
  /** 产物路径 */
  output?: string;
  /** 是否开启 sourceMap */
  sourceMap?: boolean;
  /** 插件 Id，构建插件时将生成到代码中 */
  pluginId?: string;
  /** 多进程编译 */
  parallel?: boolean;
  /** 是否需要压缩，默认不开 */
  minify?: boolean;
  /** 构建类型 */
  buildTarget?: AlipayBuildTarget;
  /** 是否开启 less 编译 */
  enableLess?: boolean;
  /** 是否开启 ts 编译 */
  enableTypescript?: boolean;
  /** 是否开启紧凑产物模式 */
  compact?: boolean;
  /** 是否忽略 http 请求白名单校验 */
  ignoreHttpDomainCheck?: boolean;
  /** 是否忽略 webview 加载域名白名单校验 */
  ignoreWebViewDomainCheck?: boolean;
  /** 是否自动推送到客户端 */
  autoPush?: boolean;
  /** 自定义启动参数 */
  launchParams?: any;
  /** 移动应用 ID */
  ampeProductId?: string;
  /** 设备 ID */
  ampeDeviceId?: string;
  /** 产品 ID */
  ampeHostAppId?: string;
  /** 入口页面 */
  page?: string;
  /** 页面参数, 可在当前页面的 onLoad 中取得，如: name=vendor&color=black */
  pageQuery?: string;
  /** 全局参数，app.js 的 onLaunch 中取得，如: name=vendor&color=black */
  query?: string;
  /** 场景值 */
  scene?: string;
  /** 模拟更新 */
  simulateUpdate?: boolean;
}
```

### 办公平台

#### 钉钉

```typescript
export interface ImConfig {
  /** @deprecated 机器人 webhook，建议在 .env 或 process.env 设置 */
  webhook?: string | string[];
}
export interface DingtalkConfig extends ImConfig {
  /** @deprecated 机器人 webhook，建议在 .env 或 process.env 设置 DINGTALK_WEBHOOK */
  webhook?: string | string[];
}
```

#### 企业微信

```typescript
export interface ImConfig {
  /** @deprecated 机器人 webhook，建议在 .env 或 process.env 设置 */
  webhook?: string | string[];
}
export interface WecomConfig extends ImConfig {
  /** @deprecated 机器人 webhook，建议在 .env 或 process.env 设置 WECOM_WEBHOOK */
  webhook?: string | string[];
}
```

### CLI 调用

提供基于 ESM 的 CLI 调用。参考了 <https://www.stefanjudis.com/snippets/how-to-create-a-module-based-node-js-executable/> 和 <https://2ality.com/2022/07/nodejs-esm-shell-scripts.html>。

注册的命令是 `uni-deploy` 和 `ud`。你可以通过 `uni-deploy -h` 或 `ud -h` 查看命令提示。

目前提供三个命令。

#### `uni-deploy validate`

检查配置文件。

#### `uni-deploy upload`

上传。

#### `uni-deploy preview`

预览。

### 脚本调用

你可以从 `@uni-helper/uni-deploy` 导入各种方法来组合使用。CLI 只是提供了更便捷的方式操作。但请注意，你需要使用 ESM 语法来操作。

```typescript
import {...} from '@uni-helper/uni-deploy';
```

## 致谢

- [taro-deploy](https://github.com/linjackson78/taro-deploy)
- [@tarojs/plugin-mini-ci](https://docs.taro.zone/docs/plugin-mini-ci)
