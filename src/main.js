import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./assets/css/reset.css";
import "babel-polyfill";
import iView from "iview";
import "iview/dist/styles/iview.css";
import "../src/assets/css/my-theme/index.less";
import "material-design-icons/iconfont/material-icons.css";
import "babel-polyfill";

import axios from "axios";
Vue.prototype.axios = axios;

import "material-design-icons/iconfont/material-icons.css";

Vue.use(iView);

Vue.prototype.$Message.config({
  top: 150,
  duration: 3
});

Vue.config.productionTip = false;
Vue.config.javascriptEnabled = true;

// axios全局配置api接口地址
// axios.defaults.baseURL = "http://xxx.xxx.xxx";
axios.defaults.timeout = 6000;

//ie10下数据不兼容问题
if (window.HTMLElement) {
  if (
    Object.getOwnPropertyNames(HTMLElement.prototype).indexOf("dataset") === -1
  ) {
    Object.defineProperty(HTMLElement.prototype, "dataset", {
      get: function() {
        var attributes = this.attributes; // 获取节点的所有属性
        var name = [];
        var value = []; // 定义两个数组保存属性名和属性值
        var obj = {}; // 定义一个空对象
        for (var i = 0; i < attributes.length; i++) {
          // 遍历节点的所有属性
          if (attributes[i].nodeName.slice(0, 5) === "data-") {
            // 如果属性名的前面5个字符符合"data-"
            // 取出属性名的"data-"的后面的字符串放入name数组中
            name.push(attributes[i].nodeName.slice(5));
            // 取出对应的属性值放入value数组中
            value.push(attributes[i].nodeValue);
          }
        }
        for (var j = 0; j < name.length; j++) {
          // 遍历name和value数组
          obj[name[j]] = value[j]; // 将属性名和属性值保存到obj中
        }
        return obj; // 返回对象
      }
    });
  }
}

//路由守卫
router.beforeEach((to, from, next) => {
  /*
  * nextRoute是需要权限的路由页面，没有权限直接跳转不过去。
  * */
  const nextRoute = [
    "PageHome",
    "PageOne",
    "Page2",
    "Page3",
  ];

  let isLogin =
    (sessionStorage.getItem("isLogin") === null) | undefined ? false : true; // 是否登录

  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      alert("请先登录");
      next({
        path: "/login"
      });

    } else {
      next();
    }
  } else {
    next();
  }
  // 已登录状态；当路由到login时，跳转至PageHome
  if (to.name === "login") {
    if (isLogin) {
      router.push({ name: "PageHome" });
    }
  }

});


//拦截器
axios.interceptors.request.use(
    /*
    * 登录后获取token，在头部携带token以访问其他接口。
    * */
  config => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


//PermissionState、TimoutError、Error字段防止访问多个接口导致多个提示。
let PermissionState = 0;
let TimoutError = 0; //超时提示，判断码
let Error = 0; //网络连接错误提示，判断码
//拦截器
axios.interceptors.response.use(
  response => {
    let operating = (prompt) => {
      alert(prompt);
      /*
      * 网络拦截跳转href，可能根据部署路径适当修改。
      * */
      window.location.href = axios.defaults.baseURL;
      sessionStorage.clear();
    };

    if (PermissionState === 0){
      /*
      * 根据接口返回的status，显示对应提示
      * */
      switch (response.data.status) {
        case "0004":
          operating("未授权，请重新登录");
          PermissionState = 1;
          break;
        case "0005":
          operating("令牌已过期，请重新登录");
          PermissionState = 1;
          break;
      }
    };

    return response.data;
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          alert("错误：401，权限不足");
          break;
        case 403:
          alert("错误：403，服务器拒绝请求");
          break;
        case 404:
          alert("错误：404，服务器找不到请求的网页");
          break;
        case 408:
          alert("错误：408，请求超时");
          break;
        case 500:
          alert("错误：500，服务器遇到错误，无法完成请求");
          break;
      }
    }

    if (err.message === 'Network Error'){
      if (Error === 0){
        alert("网络连接错误，请检查您的设备是否联网！");
        Error =1;
      }
    } else if (err.message === "timeout of 6000ms exceeded") {
      if (TimoutError === 0){
        alert("网络连接超时，请检查您的设备联网情况！");
        TimoutError = 1;
      }
    }

    return Promise.reject(err);
  }
);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
