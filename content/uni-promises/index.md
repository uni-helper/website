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

本库把 `uni-app` 的回调式 API 封装为 Promise。要求 `node >= 14.18`。

本库不支持 `uni_modules`。

## 安装

:pm-install{name="@uni-helper/uni-promises"}

用 yarn v2/v3 时，必须按 [yarnrc 文档](https://yarnpkg.com/configuration/yarnrc/#nodeLinker) 把 `nodeLinker` 设为 `node_modules`。

用 pnpm 时，必须按 [pnpm 文档](https://pnpm.io/npmrc#shamefully-hoist) 把 `shamefully-hoist` 设为 `true`。

## API

本库导出以下 Promise 化 API。名单与 `src/` 下的目录一一对应：

- [addPhoneContact](https://github.com/uni-helper/uni-promises/tree/main/src/addPhoneContact/index.ts)
- [authorize](https://github.com/uni-helper/uni-promises/tree/main/src/authorize/index.ts)
- [canvasGetImageData](https://github.com/uni-helper/uni-promises/tree/main/src/canvasGetImageData/index.ts)
- [canvasPutImageData](https://github.com/uni-helper/uni-promises/tree/main/src/canvasPutImageData/index.ts)
- [canvasToTempFilePath](https://github.com/uni-helper/uni-promises/tree/main/src/canvasToTempFilePath/index.ts)
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
- [configMTLS](https://github.com/uni-helper/uni-promises/tree/main/src/configMTLS/index.ts)
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
- [getBeacons](https://github.com/uni-helper/uni-promises/tree/main/src/getBeacons/index.ts)
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
- [index.ts](https://github.com/uni-helper/uni-promises/tree/main/src/index.ts/index.ts)
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
- [requestMerchantTransfer](https://github.com/uni-helper/uni-promises/tree/main/src/requestMerchantTransfer/index.ts)
- [requestPayment](https://github.com/uni-helper/uni-promises/tree/main/src/requestPayment/index.ts)
- [requestSubscribeMessage](https://github.com/uni-helper/uni-promises/tree/main/src/requestSubscribeMessage/index.ts)
- [requestVirtualPayment](https://github.com/uni-helper/uni-promises/tree/main/src/requestVirtualPayment/index.ts)
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
- [startAccelerometer](https://github.com/uni-helper/uni-promises/tree/main/src/startAccelerometer/index.ts)
- [startBeaconDiscovery](https://github.com/uni-helper/uni-promises/tree/main/src/startBeaconDiscovery/index.ts)
- [startBluetoothDevicesDiscovery](https://github.com/uni-helper/uni-promises/tree/main/src/startBluetoothDevicesDiscovery/index.ts)
- [startCompass](https://github.com/uni-helper/uni-promises/tree/main/src/startCompass/index.ts)
- [startFacialRecognitionVerify](https://github.com/uni-helper/uni-promises/tree/main/src/startFacialRecognitionVerify/index.ts)
- [startGyroscope](https://github.com/uni-helper/uni-promises/tree/main/src/startGyroscope/index.ts)
- [startLocationUpdate](https://github.com/uni-helper/uni-promises/tree/main/src/startLocationUpdate/index.ts)
- [startLocationUpdateBackground](https://github.com/uni-helper/uni-promises/tree/main/src/startLocationUpdateBackground/index.ts)
- [startPullDownRefresh](https://github.com/uni-helper/uni-promises/tree/main/src/startPullDownRefresh/index.ts)
- [startSoterAuthentication](https://github.com/uni-helper/uni-promises/tree/main/src/startSoterAuthentication/index.ts)
- [stopAccelerometer](https://github.com/uni-helper/uni-promises/tree/main/src/stopAccelerometer/index.ts)
- [stopBeaconDiscovery](https://github.com/uni-helper/uni-promises/tree/main/src/stopBeaconDiscovery/index.ts)
- [stopBluetoothDevicesDiscovery](https://github.com/uni-helper/uni-promises/tree/main/src/stopBluetoothDevicesDiscovery/index.ts)
- [stopCompass](https://github.com/uni-helper/uni-promises/tree/main/src/stopCompass/index.ts)
- [stopGyroscope](https://github.com/uni-helper/uni-promises/tree/main/src/stopGyroscope/index.ts)
- [stopLocationUpdate](https://github.com/uni-helper/uni-promises/tree/main/src/stopLocationUpdate/index.ts)
- [switchTab](https://github.com/uni-helper/uni-promises/tree/main/src/switchTab/index.ts)
- [types.ts](https://github.com/uni-helper/uni-promises/tree/main/src/types.ts/index.ts)
- [uploadFile](https://github.com/uni-helper/uni-promises/tree/main/src/uploadFile/index.ts)
- [vibrate](https://github.com/uni-helper/uni-promises/tree/main/src/vibrate/index.ts)
- [vibrateLong](https://github.com/uni-helper/uni-promises/tree/main/src/vibrateLong/index.ts)
- [vibrateShort](https://github.com/uni-helper/uni-promises/tree/main/src/vibrateShort/index.ts)
- [writeBLECharacteristicValue](https://github.com/uni-helper/uni-promises/tree/main/src/writeBLECharacteristicValue/index.ts)

## 构建

`@uni-helper/uni-promises` 用 `unbuild` 把 `uni` API 之外的部分转译到 `ES2017`（即 `ES8`）。`uni` API 必须由 uni-app 官方插件在项目构建时处理。

### vue-cli + vue2

修改项目根目录的 `vue.config.js`，让 `vue-cli` 处理本库，保证生成代码符合 `browserslist` 里的配置。建议把 `browserslist` 设为 `chrome>=53,ios>=8`。

```javascript [vue.config.js]
module.exports = {
  transpileDependencies: ['@uni-helper/uni-promises'],
}
```

### vite + vue3

先把 `build.target` 设为 `ES6`。

```typescript [vite.config.ts]
import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es6',
    cssTarget: 'chrome61', // https://cn.vitejs.dev/config/build-options.html#build-csstarget
  },
  plugins: [
    // ...
    uni(),
    // ...
  ],
})
```

然后在 `src/main.ts` 或 `src/main.js` 里自行添加 polyfill。下面是使用 [core-js](https://github.com/zloirock/core-js) 的示例，需要自行安装 `core-js`。也可以使用 [es-shims](https://github.com/es-shims)。

```typescript [src/main.ts]
// 按需添加额外的 polyfill
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

微信小程序的 JavaScript 支持度见 [wechat-miniprogram/miniprogram-compat](https://github.com/wechat-miniprogram/miniprogram-compat)。

微信小程序要支持 `vue3`，基础库最低版本必须是 2.11.2 或以上。2.11.2 对应 `chrome>=53,ios>=10`。

## 与官方类型定义的关系

`@dcloudio/types@3.3.0` 起提供基于 Promise 的类型定义，但不能同时正确支持 Vue 2 与 Vue 3，需要手动适配。

本库基于回调方法封装 Promise，同时支持 Vue 2 与 Vue 3。在官方类型定义覆盖本库的功能之前，本库继续维护。

## 致谢

- [taro](https://github.com/nervjs/taro)
