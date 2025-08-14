# @uni-helper/uni-promises

[![License](https://img.shields.io/github/license/uni-helper/uni-promises)](https://github.com/uni-helper/uni-promises/blob/main/LICENSE)

[![npm](https://img.shields.io/npm/v/@uni-helper/uni-promises)](https://www.npmjs.com/package/@uni-helper/uni-promises)

`uni-app` promise 化的 API。要求 `node >= 14.18`。

## 起步

### 安装依赖

安装依赖。

```shell
npm install @uni-helper/uni-promises
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

## API

- [addPhoneContact](./src/addPhoneContact/index.ts)
- [authorize](./src/authorize/index.ts)
- [checkIsSoterEnrolledInDevice](./src/checkIsSoterEnrolledInDevice/index.ts)
- [checkIsSupportSoterAuthentication](./src/checkIsSupportSoterAuthentication/index.ts)
- [checkSession](./src/checkSession/index.ts)
- [chooseAddress](./src/chooseAddress/index.ts)
- [chooseFile](./src/chooseFile/index.ts)
- [chooseImage](./src/chooseImage/index.ts)
- [chooseInvoice](./src/chooseInvoice/index.ts)
- [chooseInvoiceTitle](./src/chooseInvoiceTitle/index.ts)
- [chooseLocation](./src/chooseLocation/index.ts)
- [chooseMedia](./src/chooseMedia/index.ts)
- [chooseMessageFile](./src/chooseMessageFile/index.ts)
- [chooseVideo](./src/chooseVideo/index.ts)
- [clearStorage](./src/clearStorage/index.ts)
- [closeBLEConnection](./src/closeBLEConnection/index.ts)
- [closeBluetoothAdapter](./src/closeBluetoothAdapter/index.ts)
- [closePreviewImage](./src/closePreviewImage/index.ts)
- [closeSocket](./src/closeSocket/index.ts)
- [compressImage](./src/compressImage/index.ts)
- [compressVideo](./src/compressVideo/index.ts)
- [connectSocket](./src/connectSocket/index.ts)
- [createBLEConnection](./src/createBLEConnection/index.ts)
- [createCameraContext](./src/createCameraContext/index.ts)
- [createCanvasContext](./src/createCanvasContext/index.ts)
- [createInnerAudioContext](./src/createInnerAudioContext/index.ts)
- [createLivePlayerContext](./src/createLivePlayerContext/index.ts)
- [createLivePusherContext](./src/createLivePusherContext/index.ts)
- [createMapContext](./src/createMapContext/index.ts)
- [createMediaContainer](./src/createMediaContainer/index.ts)
- [createPushMessage](./src/createPushMessage/index.ts)
- [createSelectorQuery](./src/createSelectorQuery/index.ts)
- [createVideoContext](./src/createVideoContext/index.ts)
- [downloadFile](./src/downloadFile/index.ts)
- [getApp](./src/getApp/index.ts)
- [getBLEDeviceCharacteristics](./src/getBLEDeviceCharacteristics/index.ts)
- [getBLEDeviceRSSI](./src/getBLEDeviceRSSI/index.ts)
- [getBLEDeviceServices](./src/getBLEDeviceServices/index.ts)
- [getBackgroundAudioManager](./src/getBackgroundAudioManager/index.ts)
- [getBatteryInfo](./src/getBatteryInfo/index.ts)
- [getBluetoothAdapterState](./src/getBluetoothAdapterState/index.ts)
- [getBluetoothDevices](./src/getBluetoothDevices/index.ts)
- [getCheckBoxState](./src/getCheckBoxState/index.ts)
- [getClipboardData](./src/getClipboardData/index.ts)
- [getConnectedBluetoothDevices](./src/getConnectedBluetoothDevices/index.ts)
- [getExtConfig](./src/getExtConfig/index.ts)
- [getFileInfo](./src/getFileInfo/index.ts)
- [getImageInfo](./src/getImageInfo/index.ts)
- [getLocation](./src/getLocation/index.ts)
- [getNetworkType](./src/getNetworkType/index.ts)
- [getProvider](./src/getProvider/index.ts)
- [getPushClientId](./src/getPushClientId/index.ts)
- [getRecordManager](./src/getRecordManager/index.ts)
- [getSavedFileInfo](./src/getSavedFileInfo/index.ts)
- [getSavedFileList](./src/getSavedFileList/index.ts)
- [getScreenBrightness](./src/getScreenBrightness/index.ts)
- [getSelectedTextRange](./src/getSelectedTextRange/index.ts)
- [getSetting](./src/getSetting/index.ts)
- [getStorage](./src/getStorage/index.ts)
- [getStorageInfo](./src/getStorageInfo/index.ts)
- [getSystemInfo](./src/getSystemInfo/index.ts)
- [getUserInfo](./src/getUserInfo/index.ts)
- [getUserProfile](./src/getUserProfile/index.ts)
- [getVideoInfo](./src/getVideoInfo/index.ts)
- [hideHomeButton](./src/hideHomeButton/index.ts)
- [hideNavigationBarLoading](./src/hideNavigationBarLoading/index.ts)
- [hideShareMenu](./src/hideShareMenu/index.ts)
- [hideTabBar](./src/hideTabBar/index.ts)
- [hideTabBarRedDot](./src/hideTabBarRedDot/index.ts)
- [loadFontFace](./src/loadFontFace/index.ts)
- [login](./src/login/index.ts)
- [makePhoneCall](./src/makePhoneCall/index.ts)
- [navigateBack](./src/navigateBack/index.ts)
- [navigateBackMiniProgram](./src/navigateBackMiniProgram/index.ts)
- [navigateTo](./src/navigateTo/index.ts)
- [navigateToMiniProgram](./src/navigateToMiniProgram/index.ts)
- [notifyBLECharacteristicValueChange](./src/notifyBLECharacteristicValueChange/index.ts)
- [openAppAuthorizeSetting](./src/openAppAuthorizeSetting/index.ts)
- [openBluetoothAdapter](./src/openBluetoothAdapter/index.ts)
- [openDocument](./src/openDocument/index.ts)
- [openLocation](./src/openLocation/index.ts)
- [openSetting](./src/openSetting/index.ts)
- [openVideoEditor](./src/openVideoEditor/index.ts)
- [pageScrollTo](./src/pageScrollTo/index.ts)
- [preLogin](./src/preLogin/index.ts)
- [previewImage](./src/previewImage/index.ts)
- [reLaunch](./src/reLaunch/index.ts)
- [readBLECharacteristicValue](./src/readBLECharacteristicValue/index.ts)
- [redirectTo](./src/redirectTo/index.ts)
- [removeSavedFile](./src/removeSavedFile/index.ts)
- [removeStorage](./src/removeStorage/index.ts)
- [removeTabBarBadge](./src/removeTabBarBadge/index.ts)
- [request](./src/request/index.ts)
- [requestPayment](./src/requestPayment/index.ts)
- [requestSubscribeMessage](./src/requestSubscribeMessage/index.ts)
- [saveFile](./src/saveFile/index.ts)
- [saveImageToPhotosAlbum](./src/saveImageToPhotosAlbum/index.ts)
- [saveVideoToPhotosAlbum](./src/saveVideoToPhotosAlbum/index.ts)
- [scanCode](./src/scanCode/index.ts)
- [sendSocketMessage](./src/sendSocketMessage/index.ts)
- [setBLEMTU](./src/setBLEMTU/index.ts)
- [setBackgroundColor](./src/setBackgroundColor/index.ts)
- [setBackgroundTextStyle](./src/setBackgroundTextStyle/index.ts)
- [setClipboardData](./src/setClipboardData/index.ts)
- [setEnableDebug](./src/setEnableDebug/index.ts)
- [setKeepScreenOn](./src/setKeepScreenOn/index.ts)
- [setNavigationBarColor](./src/setNavigationBarColor/index.ts)
- [setNavigationBarTitle](./src/setNavigationBarTitle/index.ts)
- [setScreenBrightness](./src/setScreenBrightness/index.ts)
- [setStorage](./src/setStorage/index.ts)
- [setTabBarBadge](./src/setTabBarBadge/index.ts)
- [setTabBarItem](./src/setTabBarItem/index.ts)
- [setTabBarStyle](./src/setTabBarStyle/index.ts)
- [share](./src/share/index.ts)
- [shareWithSystem](./src/shareWithSystem/index.ts)
- [showActionSheet](./src/showActionSheet/index.ts)
- [showLoading](./src/showLoading/index.ts)
- [showModal](./src/showModal/index.ts)
- [showNavigationBarLoading](./src/showNavigationBarLoading/index.ts)
- [showShareMenu](./src/showShareMenu/index.ts)
- [showTabBar](./src/showTabBar/index.ts)
- [showTabBarRedDot](./src/showTabBarRedDot/index.ts)
- [showToast](./src/showToast/index.ts)
- [startBluetoothDevicesDiscovery](./src/startBluetoothDevicesDiscovery/index.ts)
- [startPullDownRefresh](./src/startPullDownRefresh/index.ts)
- [startSoterAuthentication](./src/startSoterAuthentication/index.ts)
- [stopBluetoothDevicesDiscovery](./src/stopBluetoothDevicesDiscovery/index.ts)
- [switchTab](./src/switchTab/index.ts)
- [uploadFile](./src/uploadFile/index.ts)
- [vibrate](./src/vibrate/index.ts)
- [vibrateLong](./src/vibrateLong/index.ts)
- [vibrateShort](./src/vibrateShort/index.ts)
- [writeBLECharacteristicValue](./src/writeBLECharacteristicValue/index.ts)

## 构建

目前 `@uni-helper/uni-promises` 会使用 `unbuild` 将 `uni` API 之外的部分转译到 `ES2017`（即 `ES8`）。`uni` API 需要在项目构建时由 `uni-app` 官方提供的插件处理。

对于 `vue-cli + vue2` 项目，请修改项目根目录 `vue.config.js` 如下所示。这会让 `vue-cli` 处理 `@uni-helper/uni-promises`，保证生成代码符合 `browserslist` 里的配置。我们建议设置 `browserslist` 为 `chrome>=53,ios>=8`

```javascript
module.exports = {
  transpileDependencies: ['@uni-helper/uni-promises'],
};
```

对于 `vite + vue3` 项目，请先设置 `build.target` 为 `ES6`。

```typescript
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

```typescript
import 'core-js/actual/array/iterator';
import 'core-js/actual/promise';
import 'core-js/actual/object/assign';
import 'core-js/actual/promise/finally';
// 你可以根据需要自行添加额外的 polyfills
// import 'core-js/actual/object/values'
import { createSSRApp } from 'vue';
import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
```

微信小程序的 JavaScript 支持度见 [wechat-miniprogram/miniprogram-compat](https://github.com/wechat-miniprogram/miniprogram-compat)。微信小程序要支持 `vue3`，需设置基础库最低版本为 2.11.2 或以上，2.11.2 对应 `chrome>=53,ios>=10`。

## 延伸

<del>如果你觉得这个库有用，你可以到 [这个 ISSUE](https://github.com/dcloudio/uni-app/issues/4084) 投票，鼓励官方引入支持。</del>

尽管 `@dcloudio/types@3.3.0` 开始提供基于 Promise 的类型定义，但它不能正确地同时支持 Vue 2 和 Vue 3，需要手动适配。而这个库基于回调方法封装 Promise，能正确地同时支持 Vue 2 和 Vue 3。

在官方提供的类型定义不能覆盖这个库之前，这个库依旧保持维护。

## 致谢

- [taro](https://github.com/nervjs/taro)
