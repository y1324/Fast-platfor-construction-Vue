import Vue from "vue";
import Router from "vue-router";

import Eroor from "./components/notfound404";
import Index from "./views/Index";
import Login from "./views/login/Login";

//页面
import PageOne from "./views/page-list/PageOne";
import Page2 from "./views/page-list/Page2";
import Page3 from "./views/page-list/Page3";
import PageHome from "./views/page-list/Home";

import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      //这里配置requireAuth为true,就是说必须登录的才能访问
      meta: {
        requireAuth: true
      },
      children: [
        {
          path:"/PageOne",
          name:"PageOne",
          component:PageOne
        },
        {
          path:"/page2",
          name:"Page2",
          component:Page2
        },
        {
          path:"/page3",
          name:"Page3",
          component:Page3
        },
        {
          path:"/pagehome",
          name:"PageHome",
          component:PageHome
        }
      ],
      redirect: "/login"
    },

    {
      path: "/login",
      name: "login",
      component: Login
    },

    {
      path: "*",
      component: Eroor
    }
  ]
});
