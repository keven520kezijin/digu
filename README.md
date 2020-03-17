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

## docker

    # 打包镜像
    docker build -t digu-prod --build-arg ACTION_COMMAND=prod .
    # 启动容器
    docker run -p 4001:4001 digu-prod
    # 设置后端接口地址启动
    docker run -p 4001:4001 --env BACKEND_URL=http://www.google.com digu-prod
    # 导出镜像
    docker save -o ~/digu-prod.tar digu-prod
    # 导入镜像
    docker load < ~/digu-prod.tar

    # 打包后台镜像
    docker build -t digu-prod-manage --build-arg ACTION_COMMAND=prod -f manage.Dockerfile .
