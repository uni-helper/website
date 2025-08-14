# @uni-helper/plugin-uni
为 uni-app 提供的 原生 ESM Vite 插件，让你在 ESM-First 环境中零成本接入 uni-app 构建体系。

> [!TIP]
> - 零运行时影响
>
>   本包仅为 ESM 重导出，无额外逻辑，因此不会增加构建耗时或引入潜在缺陷。
>
> - 问题归属
>
>   如遇构建异常，请先确认是否由官方插件引起，并向 [dcloudio/uni-app](https://github.com/dcloudio/uni-app/issues) 提交 issue；
>
>   若可定位为转发层缺陷，请附最小复现仓库至 [@uni-helper/plugin-uni](https://github.com/uni-helper/plugin-uni)。
>
> - 维护计划
>
>   将持续跟进官方 ESM 支持进度；一旦官方提供原生 ESM 版本，本项目将归档并停止维护。

## ✨ 亮点

| 特性            | 说明                                                      |
| ------------- | ------------------------------------------------------- |
| 🚀 **原生 ESM** | 完全遵循 `import`/`export` 规范，无需 `.default()` 适配            |
| 🛡️ **完整类型**  | TypeScript 类型与 `@dcloudio/vite-plugin-uni` 同步，IDE 提示零丢失 |
| 🪶 **零依赖转发**  | 通过 `peerDependencies` 复用用户项目中的官方插件，**不锁版本**             |
| 🧩 **即装即用**   | 一行 `import`，即可替换官方 CJS 插件                               |

## 📦 安装

```shell
npm i -D @uni-helper/plugin-uni
```

> [!IMPORTANT]
> 请确保已安装官方插件 `@dcloudio/vite-plugin-uni`，否则本插件将无法正常工作。

## 🔧 使用
```json
{
  "type": "module",
  "devDependencies": {
    "@dcloudio/vite-plugin-uni": "xxx",
    "@uni-helper/plugin-uni": "^0.1.0"
  }
}
```

```ts
import Uni from '@uni-helper/plugin-uni'
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Uni({ /* 同官方配置 */ })
  ]
})
```

## ⚙️ 工作原理
1. 本包仅做 ESM 重导出[CJS→ESM 兼容性语法糖](https://nodejs.org/api/esm.html#interoperability-with-commonjs)，不携带任何运行时逻辑。
2. 通过 peerDependencies 复用用户项目中的 @dcloudio/vite-plugin-uni，确保版本由用户掌控。
3. 手动导出`d.ts`文件，确保类型与官方插件一致。

## 🙇🏻‍♂️ [赞助](https://afdian.com/a/flippedround)

<p align="center">
  <a href="https://afdian.com/a/flippedround">
    <img alt="sponsors" src="https://cdn.jsdelivr.net/gh/FliPPeDround/sponsors/sponsorkit/sponsors.svg"/>
  </a>
</p>
