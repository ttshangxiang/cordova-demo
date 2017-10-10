## cordova项目

暂时未支持ios

### 安装依赖
npm install
npm install cordova -g

### 添加平台
cordova platform add android  
cordova platform add browser  

检测平台需要：
cordova requirements
安卓推荐使用android studio安装sdk

### 开发
浏览器：
npm run dev 或
npm run browser 或
cordova run browser -- --lr
安卓：
npm run android 或
cordova run android
自动刷新
npm run android-lr 或
cordova run android -- --lr (自动刷新)
ps: 安卓自动刷新，模拟器可以。使用真机时稍有问题，手机和电脑在同一wifi下，公司wifi不可以，手机开热点电脑连接的情况可以，原因不明。

### 打包
npm run build 或
cordova build android
cordova build browser

### api地址
deploy_conf/config.js

### 查看demo
现在默认是没有使用framework7的demo  
将根目录的webpack.config.js中11行，改"src/main.js"为"src/main2.js"可查看framework7的demo

### 安卓模拟器
brew cask install genymotion

### 模板源    
[https://github.com/centrual/cordova-template-framework7-vue-webpack](https://github.com/centrual/cordova-template-framework7-vue-webpack)
