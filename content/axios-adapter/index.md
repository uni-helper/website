---
title: axios-adapter
description: 适用于 Vue2 和 Vue3 的 uniapp Axios 适配器
navTruncate: false
icon: simple-icons:axios

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/axios-adapter
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/axios-adapter
    target: _blank
  - value: 赞助
    icon: lucide:coffee
    to: https://afdian.com/a/kejun
    target: _blank
---

::alert{icon="lucide:test-tube"}
  在 uni-app 中，[`uni-network`](/uni-network/guide/introduction) 是一个体积性能更好的替代品
::

本适配器封装 uni-app 的 `uni.request`、`uni.downloadFile`、`uni.uploadFile` 等接口，让 axios 的编程方式在 uni-app 各平台继续可用。

本包同时为 TypeScript 项目提供全局类型扩展，补充 `upload`、`download` 与 uni-app 专有请求参数的类型定义。

## 平台兼容性

| Vue 版本 | 支持情况 |
| -------- | -------- |
| Vue 2    | √        |
| Vue 3    | √        |

| App                                      | 快应用 | 微信小程序 | 支付宝小程序 | 百度小程序 | 字节小程序 | QQ 小程序 |
| ---------------------------------------- | ------ | ---------- | ------------ | ---------- | ---------- | --------- |
| HBuilderX 3.4.8<br/>app-vue<br/>app-nvue | √      | √          | √            | √          | √          | √         |

| 钉钉小程序 | 快手小程序 | 飞书小程序 | 京东小程序 |
| ---------- | ---------- | ---------- | ---------- |
| √          | √          | √          | √          |

| H5-Safari | Android Browser | 微信浏览器 (Android) | QQ 浏览器 (Android) | Chrome | IE  | Edge | Firefox | PC-Safari |
| --------- | --------------- | ------------------- | ------------------ | ------ | --- | ---- | ------- | --------- |
| √         | √               | √                   | √                  | √      | √   | √    | √       | √         |

## 安装

:pm-install{name="@uni-helper/axios-adapter axios"}

适配器与 axios 的主版本号和次版本号必须一致。当前适配器版本是 `1.21.0`，推荐搭配 `axios@^1.21.0` 使用。

## 基本用法

```ts
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import axios from 'axios'

axios.defaults.adapter = createUniAppAxiosAdapter()
```

配置完成后，可以照常使用 `axios.get`、`axios.post` 等方法。

`uni.request` 本身没有默认超时。适配器设置了 60 秒默认超时，可以用 `config.timeout` 覆盖。

### 创建自定义实例

```ts
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import axios from 'axios'

const instance = axios.create({ adapter: createUniAppAxiosAdapter() })
```

### 传递 uni-app 专有参数

导入本包后，axios 的请求配置类型会自动扩展出 uni-app 专有参数，可以直接使用：

```ts
axios.get('https://example.com/get', {
  enableHttp2: true,
  enableQuic: true,
  enableCache: true,
})
```

这些参数原样透传给 `uni.request`。类型扩展同时为 `AxiosResponse` 补充了 `cookies` 字段。

### 取消请求

```ts
const controller = new AbortController()

axios.get('/get', { signal: controller.signal })

// 需要取消时
controller.abort()
```

除 `AbortController` 外，也兼容 axios 旧版的 `CancelToken`。

### Basic Auth 用户名编码

`config.auth` 由适配器直接拼成 `Authorization: Basic ...` 请求头，行为与 axios 1.21 的 xhr、fetch 一致：

- 密码始终按 UTF-8 编码。
- 用户名默认按原字节发送。

用户名含非 ASCII 字符时，必须显式开启 `transitional.encodeBasicAuthUsername`：

```ts
axios.get('/get', {
  auth: { username: '用户名', password: 'pwd' },
  transitional: { encodeBasicAuthUsername: true },
})
```

也可以写在实例默认值上：`axios.create({ adapter, transitional: { encodeBasicAuthUsername: true } })`。

### 与 useAxios 一起使用

```ts
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import axios from 'axios'

axios.defaults.adapter = createUniAppAxiosAdapter()
const { data, isFinished } = useAxios('/posts')
```

详见 [vueuse useAxios](https://vueuse.org/integrations/useAxios/)。

### 上传和下载

```ts
// 下载
axios.download('/')
// or
axios.request({
  url: '/',
  method: 'download',
})

// 上传
axios.upload('/', new File([new Blob()], 'fake file'))
// or
axios.request({
  url: '/',
  method: 'upload',
  data: new File([new Blob()], 'fake file'),
})
```

### 监听进度和响应头

```ts
axios.download('/file', {
  onHeadersReceived(result) {
    console.log(result.header)
  },
  onDownloadProgress(progressEvent) {
    console.log(progressEvent.loaded, progressEvent.total)
  },
})

axios.upload('/upload', data, {
  onUploadProgress(progressEvent) {
    console.log(progressEvent.loaded, progressEvent.total)
  },
})
```

三种请求都支持 `onHeadersReceived`。

`onDownloadProgress` 与 `onUploadProgress` 的事件格式与浏览器端 axios 一致：上传事件带 `upload: true`，下载事件带 `download: true`。下载与上传响应的 `headers` 是空对象。

### 小程序

自 axios 1.4.0 起，axios 已对小程序环境做了部分兼容处理。

需要在小程序里使用 `FormData` 与 `Blob` 时，必须安装 polyfill 并启用构建插件：

```bash
pnpm add miniprogram-formdata miniprogram-blob
```

```ts
// vite.config.js
import uniAxiosAdapter from '@uni-helper/axios-adapter/vite'

export default {
  plugins: [
    uniAxiosAdapter()
  ]
}
```

使用 Vue CLI 时，改用 `@uni-helper/axios-adapter/webpack`。

## API

### createUniAppAxiosAdapter

```ts
function createUniAppAxiosAdapter(options?: UserOptions): AxiosAdapter
```

创建适配器实例，可以直接赋值给 `axios.defaults.adapter`，或传给 `axios.create({ adapter })`。

调用时会在 `Axios` 原型上挂载 `upload` 与 `download` 方法，对所有 axios 实例全局生效。

`options` 是可选配置对象。当前版本没有可配置字段，仅作预留。返回值是标准的 `AxiosAdapter` 函数。

### axios.upload

```ts
function upload<T = any, D = any, P = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D, P>,
): Promise<AxiosResponse<T, D>>
```

`uni.uploadFile` 发送上传请求。`data` 通常是 `FormData` 实例。

### axios.download

```ts
function download<T = any, D = any, P = any>(
  url: string,
  config?: AxiosRequestConfig<D, P>,
): Promise<AxiosResponse<T, D>>
```

`uni.downloadFile` 发起下载请求。`response.data` 是下载文件的临时路径（`tempFilePath`）。

泛型与 axios 自带方法对齐：`T` 是响应数据类型，`D` 与 `P` 分别对应请求数据与 `params`。

旧版的第二个泛型参数 `R`（自定义返回类型）已移除。axios 1.19 起其默认值 `AxiosResponseDefault` 未导出，无法继续透传 `R`。

## 版本策略

自 1.4.0 起，适配器的主版本号和次版本号必须与 axios 一致。例如安装了 `1.21.0` 时，axios 必须是 `1.21.x`。

这样处理后，适配器始终支持最新的 axios 特性。
