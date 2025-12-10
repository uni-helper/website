---
title: uni-promises
description: uni-promises 是为 uni-app 提供的 promise 化的 API
icon: eos-icons:action-chains-outlined

navTruncate: false

badges:
  - value: npm
    to: https://www.npmjs.com/package/@uni-helper/uni-promises
    target: _blank
  - value: source
    icon: lucide:code
    to: https://github.com/uni-helper/uni-promises
    target: _blank
---

::alert
`uni-app` promise 化的 API。要求 `node >= 14.18`。
::

## 起步

### 安装依赖

安装依赖。
:pm-install{name="@uni-helper/uni-promises"}

<details>
  <summary>yarn v2/v3</summary>
  <p>请参考 <a href="https://yarnpkg.com/configuration/yarnrc/#nodeLinker">文档</a> 设置 <code>nodeLinker</code> 为 <code>node_modules</code>。</p>
</details>

<details>
  <summary>pnpm</summary>
  <p>请参考 <a href="https://pnpm.io/npmrc#shamefully-hoist">文档</a> 设置 <code>shamefully-hoist</code> 为 <code>true</code>。</p>
</details>

不考虑支持 `uni_modules`。

## API

- [addPhoneContact](https://github.com/uni-helper/uni-promises/tree/main/src/addPhoneContact/index.ts)
- [authorize](https://github.com/uni-helper/uni-promises/tree/main/src/authorize/index.ts)
- [checkIsSoterEnrolledInDevice](https://github.com/uni-helper/uni-promises/tree/main/src/checkIsSoterEnrolledInDevice/index.ts)
- [checkIsSupportSoterAuthentication](https://github.com/uni-helper/uni-promises/tree/main/src/checkIsSupportSoterAuthentication/index.ts)
- [checkSession](https://github.com/uni-helper/uni-promises/tree/main/src/checkSession/index.ts)
- [chooseAddress](https://github.com/uni-helper/uni-promises/tree/main/src/chooseAddress/index.ts)
- [chooseFile](https://github.com/uni-helper/uni-promises/tree/main/src/chooseFile/index.ts)
- [chooseImage](https://github.com/uni-helper/uni-promises/tree/main/src/chooseImage/index.ts)
- [chooseInvoice](https://github.com/uni-helper/uni-promises/tree/main/src/chooseInvoice/index.ts)
- [chooseInvoiceTitle](https://github.com/uni-helper/uni-promises/tree/main/src/chooseInvoiceTitle/index.ts)
- [chooseLocation](https://github.com/uni-helper/uni-promises/tree/main/src/chooseLocation/index.ts)
- [chooseMedia](https://github.com/uni-helper/uni-promises/tree/main/src/chooseMedia/index.ts)
- [chooseMessageFile](https://github.com/uni-helper/uni-promises/tree/main/src/chooseMessageFile/index.ts)
- [chooseVideo](https://github.com/uni-helper/uni-promises/tree/main/src/chooseVideo/index.ts)
- [clearStorage](https://github.com/uni-helper/uni-promises/tree/main/src/clearStorage/index.ts)
- [closeBLEConnection](https://github.com/uni-helper/uni-promises/tree/main/src/closeBLEConnection/index.ts)
- [closeBluetoothAdapter](https://github.com/uni-helper/uni-promises/tree/main/src/closeBluetoothAdapter/index.ts)
- [closePreviewImage](https://github.com/uni-helper/uni-promises/tree/main/src/closePreviewImage/index.ts)
- [closeSocket](https://github.com/uni-helper/uni-promises/tree/main/src/closeSocket/index.ts)
- [compressImage](https://github.com/uni-helper/uni-promises/tree/main/src/compressImage/index.ts)
- [compressVideo](https://github.com/uni-helper/uni-promises/tree/main/src/compressVideo/index.ts)
- [connectSocket](https://github.com/uni-helper/uni-promises/tree/main/src/connectSocket/index.ts)
- [createBLEConnection](https://github.com/uni-helper/uni-promises/tree/main/src/createBLEConnection/index.ts)
- [createCameraContext](https://github.com/uni-helper/uni-promises/tree/main/src/createCameraContext/index.ts)
- [createCanvasContext](https://github.com/uni-helper/uni-promises/tree/main/src/createCanvasContext/index.ts)
- [createInnerAudioContext](https://github.com/uni-helper/uni-promises/tree/main/src/createInnerAudioContext/index.ts)
- [createLivePlayerContext](https://github.com/uni-helper/uni-promises/tree/main/src/createLivePlayerContext/index.ts)
- [createLivePusherContext](https://github.com/uni-helper/uni-promises/tree/main/src/createLivePusherContext/index.ts)
- [createMapContext](https://github.com/uni-helper/uni-promises/tree/main/src/createMapContext/index.ts)
- [createMediaContainer](https://github.com/uni-helper/uni-promises/tree/main/src/createMediaContainer/index.ts)
- [createPushMessage](https://github.com/uni-helper/uni-promises/tree/main/src/createPushMessage/index.ts)
- [createSelectorQuery](https://github.com/uni-helper/uni-promises/tree/main/src/createSelectorQuery/index.ts)
- [createVideoContext](https://github.com/uni-helper/uni-promises/tree/main/src/createVideoContext/index.ts)
- [downloadFile](https://github.com/uni-helper/uni-promises/tree/main/src/downloadFile/index.ts)
- [getApp](https://github.com/uni-helper/uni-promises/tree/main/src/getApp/index.ts)
- [getBLEDeviceCharacteristics](https://github.com/uni-helper/uni-promises/tree/main/src/getBLEDeviceCharacteristics/index.ts)
- [getBLEDeviceRSSI](https://github.com/uni-helper/uni-promises/tree/main/src/getBLEDeviceRSSI/index.ts)
- [getBLEDeviceServices](https://github.com/uni-helper/uni-promises/tree/main/src/getBLEDeviceServices/index.ts)
- [getBackgroundAudioManager](https://github.com/uni-helper/uni-promises/tree/main/src/getBackgroundAudioManager/index.ts)
- [getBatteryInfo](https://github.com/uni-helper/uni-promises/tree/main/src/getBatteryInfo/index.ts)
- [getBluetoothAdapterState](https://github.com/uni-helper/uni-promises/tree/main/src/getBluetoothAdapterState/index.ts)
- [getBluetoothDevices](https://github.com/uni-helper/uni-promises/tree/main/src/getBluetoothDevices/index.ts)
- [getCheckBoxState](https://github.com/uni-helper/uni-promises/tree/main/src/getCheckBoxState/index.ts)
- [getClipboardData](https://github.com/uni-helper/uni-promises/tree/main/src/getClipboardData/index.ts)
- [getConnectedBluetoothDevices](https://github.com/uni-helper/uni-promises/tree/main/src/getConnectedBluetoothDevices/index.ts)
- [getExtConfig](https://github.com/uni-helper/uni-promises/tree/main/src/getExtConfig/index.ts)
- [getFileInfo](https://github.com/uni-helper/uni-promises/tree/main/src/getFileInfo/index.ts)
- [getImageInfo](https://github.com/uni-helper/uni-promises/tree/main/src/getImageInfo/index.ts)
- [getLocation](https://github.com/uni-helper/uni-promises/tree/main/src/getLocation/index.ts)
- [getNetworkType](https://github.com/uni-helper/uni-promises/tree/main/src/getNetworkType/index.ts)
- [getProvider](https://github.com/uni-helper/uni-promises/tree/main/src/getProvider/index.ts)
- [getPushClientId](https://github.com/uni-helper/uni-promises/tree/main/src/getPushClientId/index.ts)
- [getRecordManager](https://github.com/uni-helper/uni-promises/tree/main/src/getRecordManager/index.ts)
- [getSavedFileInfo](https://github.com/uni-helper/uni-promises/tree/main/src/getSavedFileInfo/index.ts)
- [getSavedFileList](https://github.com/uni-helper/uni-promises/tree/main/src/getSavedFileList/index.ts)
- [getScreenBrightness](https://github.com/uni-helper/uni-promises/tree/main/src/getScreenBrightness/index.ts)
- [getSelectedTextRange](https://github.com/uni-helper/uni-promises/tree/main/src/getSelectedTextRange/index.ts)
- [getSetting](https://github.com/uni-helper/uni-promises/tree/main/src/getSetting/index.ts)
- [getStorage](https://github.com/uni-helper/uni-promises/tree/main/src/getStorage/index.ts)
- [getStorageInfo](https://github.com/uni-helper/uni-promises/tree/main/src/getStorageInfo/index.ts)
- [getSystemInfo](https://github.com/uni-helper/uni-promises/tree/main/src/getSystemInfo/index.ts)
- [getUserInfo](https://github.com/uni-helper/uni-promises/tree/main/src/getUserInfo/index.ts)
- [getUserProfile](https://github.com/uni-helper/uni-promises/tree/main/src/getUserProfile/index.ts)
- [getVideoInfo](https://github.com/uni-helper/uni-promises/tree/main/src/getVideoInfo/index.ts)
- [hideHomeButton](https://github.com/uni-helper/uni-promises/tree/main/src/hideHomeButton/index.ts)
- [hideNavigationBarLoading](https://github.com/uni-helper/uni-promises/tree/main/src/hideNavigationBarLoading/index.ts)
- [hideShareMenu](https://github.com/uni-helper/uni-promises/tree/main/src/hideShareMenu/index.ts)
- [hideTabBar](https://github.com/uni-helper/uni-promises/tree/main/src/hideTabBar/index.ts)
- [hideTabBarRedDot](https://github.com/uni-helper/uni-promises/tree/main/src/hideTabBarRedDot/index.ts)
- [loadFontFace](https://github.com/uni-helper/uni-promises/tree/main/src/loadFontFace/index.ts)
- [login](https://github.com/uni-helper/uni-promises/tree/main/src/login/index.ts)
- [makePhoneCall](https://github.com/uni-helper/uni-promises/tree/main/src/makePhoneCall/index.ts)
- [navigateBack](https://github.com/uni-helper/uni-promises/tree/main/src/navigateBack/index.ts)
- [navigateBackMiniProgram](https://github.com/uni-helper/uni-promises/tree/main/src/navigateBackMiniProgram/index.ts)
- [navigateTo](https://github.com/uni-helper/uni-promises/tree/main/src/navigateTo/index.ts)
- [navigateToMiniProgram](https://github.com/uni-helper/uni-promises/tree/main/src/navigateToMiniProgram/index.ts)
- [notifyBLECharacteristicValueChange](https://github.com/uni-helper/uni-promises/tree/main/src/notifyBLECharacteristicValueChange/index.ts)
- [openAppAuthorizeSetting](https://github.com/uni-helper/uni-promises/tree/main/src/openAppAuthorizeSetting/index.ts)
- [openBluetoothAdapter](https://github.com/uni-helper/uni-promises/tree/main/src/openBluetoothAdapter/index.ts)
- [openDocument](https://github.com/uni-helper/uni-promises/tree/main/src/openDocument/index.ts)
- [openLocation](https://github.com/uni-helper/uni-promises/tree/main/src/openLocation/index.ts)
- [openSetting](https://github.com/uni-helper/uni-promises/tree/main/src/openSetting/index.ts)
- [openVideoEditor](https://github.com/uni-helper/uni-promises/tree/main/src/openVideoEditor/index.ts)
- [pageScrollTo](https://github.com/uni-helper/uni-promises/tree/main/src/pageScrollTo/index.ts)
- [preLogin](https://github.com/uni-helper/uni-promises/tree/main/src/preLogin/index.ts)
- [previewImage](https://github.com/uni-helper/uni-promises/tree/main/src/previewImage/index.ts)
- [reLaunch](https://github.com/uni-helper/uni-promises/tree/main/src/reLaunch/index.ts)
- [readBLECharacteristicValue](https://github.com/uni-helper/uni-promises/tree/main/src/readBLECharacteristicValue/index.ts)
- [redirectTo](https://github.com/uni-helper/uni-promises/tree/main/src/redirectTo/index.ts)
- [removeSavedFile](https://github.com/uni-helper/uni-promises/tree/main/src/removeSavedFile/index.ts)
- [removeStorage](https://github.com/uni-helper/uni-promises/tree/main/src/removeStorage/index.ts)
- [removeTabBarBadge](https://github.com/uni-helper/uni-promises/tree/main/src/removeTabBarBadge/index.ts)
- [request](https://github.com/uni-helper/uni-promises/tree/main/src/request/index.ts)
- [requestPayment](https://github.com/uni-helper/uni-promises/tree/main/src/requestPayment/index.ts)
- [requestSubscribeMessage](https://github.com/uni-helper/uni-promises/tree/main/src/requestSubscribeMessage/index.ts)
- [saveFile](https://github.com/uni-helper/uni-promises/tree/main/src/saveFile/index.ts)
- [saveImageToPhotosAlbum](https://github.com/uni-helper/uni-promises/tree/main/src/saveImageToPhotosAlbum/index.ts)
- [saveVideoToPhotosAlbum](https://github.com/uni-helper/uni-promises/tree/main/src/saveVideoToPhotosAlbum/index.ts)
- [scanCode](https://github.com/uni-helper/uni-promises/tree/main/src/scanCode/index.ts)
- [sendSocketMessage](https://github.com/uni-helper/uni-promises/tree/main/src/sendSocketMessage/index.ts)
- [setBLEMTU](https://github.com/uni-helper/uni-promises/tree/main/src/setBLEMTU/index.ts)
- [setBackgroundColor](https://github.com/uni-helper/uni-promises/tree/main/src/setBackgroundColor/index.ts)
- [setBackgroundTextStyle](https://github.com/uni-helper/uni-promises/tree/main/src/setBackgroundTextStyle/index.ts)
- [setClipboardData](https://github.com/uni-helper/uni-promises/tree/main/src/setClipboardData/index.ts)
- [setEnableDebug](https://github.com/uni-helper/uni-promises/tree/main/src/setEnableDebug/index.ts)
- [setKeepScreenOn](https://github.com/uni-helper/uni-promises/tree/main/src/setKeepScreenOn/index.ts)
- [setNavigationBarColor](https://github.com/uni-helper/uni-promises/tree/main/src/setNavigationBarColor/index.ts)
- [setNavigationBarTitle](https://github.com/uni-helper/uni-promises/tree/main/src/setNavigationBarTitle/index.ts)
- [setScreenBrightness](https://github.com/uni-helper/uni-promises/tree/main/src/setScreenBrightness/index.ts)
- [setStorage](https://github.com/uni-helper/uni-promises/tree/main/src/setStorage/index.ts)
- [setTabBarBadge](https://github.com/uni-helper/uni-promises/tree/main/src/setTabBarBadge/index.ts)
- [setTabBarItem](https://github.com/uni-helper/uni-promises/tree/main/src/setTabBarItem/index.ts)
- [setTabBarStyle](https://github.com/uni-helper/uni-promises/tree/main/src/setTabBarStyle/index.ts)
- [share](https://github.com/uni-helper/uni-promises/tree/main/src/share/index.ts)
- [shareWithSystem](https://github.com/uni-helper/uni-promises/tree/main/src/shareWithSystem/index.ts)
- [showActionSheet](https://github.com/uni-helper/uni-promises/tree/main/src/showActionSheet/index.ts)
- [showLoading](https://github.com/uni-helper/uni-promises/tree/main/src/showLoading/index.ts)
- [showModal](https://github.com/uni-helper/uni-promises/tree/main/src/showModal/index.ts)
- [showNavigationBarLoading](https://github.com/uni-helper/uni-promises/tree/main/src/showNavigationBarLoading/index.ts)
- [showShareMenu](https://github.com/uni-helper/uni-promises/tree/main/src/showShareMenu/index.ts)
- [showTabBar](https://github.com/uni-helper/uni-promises/tree/main/src/showTabBar/index.ts)
- [showTabBarRedDot](https://github.com/uni-helper/uni-promises/tree/main/src/showTabBarRedDot/index.ts)
- [showToast](https://github.com/uni-helper/uni-promises/tree/main/src/showToast/index.ts)
- [startBluetoothDevicesDiscovery](https://github.com/uni-helper/uni-promises/tree/main/src/startBluetoothDevicesDiscovery/index.ts)
- [startPullDownRefresh](https://github.com/uni-helper/uni-promises/tree/main/src/startPullDownRefresh/index.ts)
- [startSoterAuthentication](https://github.com/uni-helper/uni-promises/tree/main/src/startSoterAuthentication/index.ts)
- [stopBluetoothDevicesDiscovery](https://github.com/uni-helper/uni-promises/tree/main/src/stopBluetoothDevicesDiscovery/index.ts)
- [switchTab](https://github.com/uni-helper/uni-promises/tree/main/src/switchTab/index.ts)
- [uploadFile](https://github.com/uni-helper/uni-promises/tree/main/src/uploadFile/index.ts)
- [vibrate](https://github.com/uni-helper/uni-promises/tree/main/src/vibrate/index.ts)
- [vibrateLong](https://github.com/uni-helper/uni-promises/tree/main/src/vibrateLong/index.ts)
- [vibrateShort](https://github.com/uni-helper/uni-promises/tree/main/src/vibrateShort/index.ts)
- [writeBLECharacteristicValue](https://github.com/uni-helper/uni-promises/tree/main/src/writeBLECharacteristicValue/index.ts)

## 构建

目前 `@uni-helper/uni-promises` 会使用 `unbuild` 将 `uni` API 之外的部分转译到 `ES2017`（即 `ES8`）。`uni` API 需要在项目构建时由 `uni-app` 官方提供的插件处理。

对于 `vue-cli + vue2` 项目，请修改项目根目录 `vue.config.js` 如下所示。这会让 `vue-cli` 处理 `@uni-helper/uni-promises`，保证生成代码符合 `browserslist` 里的配置。我们建议设置 `browserslist` 为 `chrome>=53,ios>=8`

```javascript [vue.config.js]
module.exports = {
  transpileDependencies: ['@uni-helper/uni-promises'],
}
```

对于 `vite + vue3` 项目，请先设置 `build.target` 为 `ES6`。

```typescript [vite.config.ts]
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es6',
    cssTarget: 'chrome61', // https://cn.vitejs.dev/config/build-options.html#build-csstarget
  },
  plugins: [
    ...,
    uni(),
    ...,
  ],
});
```

然后在 `src/main.ts` 或 `src/main.js` 处自行添加 polyfill。以下是使用 [core-js](https://github.com/zloirock/core-js) 的示例（需要自行安装 `core-js`），你也可以使用 [es-shims](https://github.com/es-shims)。

```typescript [src/main.ts]
// 你可以根据需要自行添加额外的 polyfills
// import 'core-js/actual/object/values'
import { createSSRApp } from 'vue'
import App from './App.vue'
import 'core-js/actual/array/iterator'
import 'core-js/actual/promise'
import 'core-js/actual/object/assign'
import 'core-js/actual/promise/finally'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
```

微信小程序的 JavaScript 支持度见 [wechat-miniprogram/miniprogram-compat](https://github.com/wechat-miniprogram/miniprogram-compat)。微信小程序要支持 `vue3`，需设置基础库最低版本为 2.11.2 或以上，2.11.2 对应 `chrome>=53,ios>=10`。

## 延伸

<del>如果你觉得这个库有用，你可以到 [这个 ISSUE](https://github.com/dcloudio/uni-app/issues/4084) 投票，鼓励官方引入支持。</del>

尽管 `@dcloudio/types@3.3.0` 开始提供基于 Promise 的类型定义，但它不能正确地同时支持 Vue 2 和 Vue 3，需要手动适配。而这个库基于回调方法封装 Promise，能正确地同时支持 Vue 2 和 Vue 3。

在官方提供的类型定义不能覆盖这个库之前，这个库依旧保持维护。

## 致谢

- [taro](https://github.com/nervjs/taro)
