# 快速平台搭建

## Project setup 安装依赖、环境
```
npm install
```

### Compiles and hot-reloads for development  运行命令
```
npm run serve
```

### Compiles and minifies for production 打包命令
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### 框架介绍
```
平台演示:https://www.vygd.top/

框架介绍

1.基于Vue进行搭建

2.页面有一定的自适应，总页面最小为1500px

3.登录页面为读令牌卡和账号登录两种样式，可根据具体进行适配

4.导航菜单支持动态生成，需要在router.js配置。

5.选中某个导航菜单后，刷新页面还会打开并选中该菜单

6.路由支持权限拦截，例：未登录直接跳转某个页面提示未登录

7.axios基本配置：请求头部加token、状态码识别、网络错误、网络连接超时

8.框架已经添加iviewUI框架，全局配置的。按需加载的话，需要配置一下

9.默认图标：谷歌图标 (material.io)

10.CSS预加载默认为：less
```

###技术栈
```
Vue + Vue-Route + axios + iview + vuex + less
```

### 备注
```
代码在window整理没有很好的格式化，看着别扭的话，在webStorm通过eslint配合prettier格式化一下就好。
好心求Star,嘻嘻。

如有不周之处，希望大家不吝赐教。
```
