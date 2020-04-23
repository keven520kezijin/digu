# vue-manage-system

基于 Vue.js 2.x 系列 + Element UI 的后台管理系统解决方案。

## 目录结构介绍

    |-- build                            // webpack配置文件
    |-- config                           // 项目打包路径
    |-- src                              // 源码目录
    |   |-- components                   // 组件
    |       |-- common                   // 公共组件
    |           |-- bus.js           	 // Event Bus
    |           |-- Header.vue           // 公共头部
    |           |-- Home.vue           	 // 公共路由入口
    |           |-- Sidebar.vue          // 公共左边栏
    |           |-- Tags.vue           	 // 页面切换标签组件
    |       |-- page                   	 // 主要路由页面
    |           |-- 403.vue
    |           |-- 404.vue
    |           |-- Login.vue          	 // 登录
    |   |-- App.vue                      // 页面入口文件
    |   |-- main.js                      // 程序入口文件，加载各种公共组件
    |-- .babelrc                         // ES6语法编译配置
    |-- .editorconfig                    // 代码编写规格
    |-- .gitignore                       // 忽略的文件
    |-- index.html                       // 入口html文件
    |-- package.json                     // 项目及工具的依赖配置文件
    |-- README.md                        // 说明

## 安装依赖

```shell
yarn install

# 前台 flow 安装依赖
cd front-source/flow & yarn install
```

## 本地开发

### 前台

`yarn dev`

### 后台

_端口重复问题，无法同时启动前台和后台_

`yarn dev:manage`


### element-ui

一套基于 vue.js2.0 的桌面组件库。访问地址：[element](http://element.eleme.io/#/zh-CN/component/layout)

--------------------------------------------------------------------------------------------------------------

# 测试环境 部署步骤

  ###打包
  
  ```
    注意：打包前要先在本地跑起flow项目，否则flow不会打进最新digu-front包里
    前台: yarn build:front
    后台: yarn build:manage
  ```
  ###输出路径
  ```
      前台：/server/digu-front
      后台：/server/digu-manage
  ```
  
  ###服务端部署
  ```
    /home/unisound/samantha/路径下分别覆盖 digu-front digu-manage

    测试环境路径：http://192.168.3.116:8001/（前） http://192.168.3.116:8002/（后）
  ```
  
 ### -----------------------------------------------------------------------------------

 ####嘀咕测试前台服务地址：

 http://192.168.3.116:8001/#/login 	13487078970/leihao900529



 ####嘀咕测试后台服务地址：

 http://192.168.3.116:8002/#/login	admin/2222wwww
 
 测试环境与本地开发环境账号相同



  ####wiki地址：

  http://wiki.it.yzs.io:8090/pages/viewpage.action?pageId=26132586

 各版本需求在：[04-产品定义] => [DIGU可视化平台（迭代中）]



 ####嘀咕后端Git地址：

 http://gitlab-iot.yzs.io/frontEnd/digu	
 ```
分支：
 develop，release（无docker）
 master（有docker）```

 192.168.3.116 52000
  unisound/q1w2e3r4


