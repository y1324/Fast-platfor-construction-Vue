<template>
    <div id="index" class="index">

        <!--头部信息-->
        <header id="hd" class="hd">

            <h1 class="hd-h1">快速平台搭建</h1>

            <div class="hd-user-state-box">

                <span class="hd-user-span">您好，{{characterName}}<Icon class="hd-user-span-icon-down" type="ios-arrow-down"/></span>

                <div class="hd-user-box">

                    <div class="hd-user-triangle"></div>

                    <span v-show="userType === 'PERSONAL'"  class="hd-user-box-individual-center" v-on:click="userOclick"><Icon
                            type="md-person"/>个人中心</span>

                    <span @click="outClick" class="hd-user-box-out"><Icon type="md-power"/>退出</span>

                </div>

            </div>

        </header>

        <!--左侧菜单导航栏-->
        <div class="side">

            <router-link v-show="userType !== 'PERSONAL' && Object.keys(this.menus).length !== 0"  @click.native="homeClick" class="side-home" to="/pagehome"><Icon type="md-home" class="home-icon" />首页</router-link>

            <Menu v-if="Object.keys(this.menus).length !== 0" class="side-menu" ref="child" :accordion=true :open-names="[submenu]" :active-name="this.menuitem"
                      width="auto" :theme="theme2"
                      @on-select="menuClick">
                    <Submenu v-for="menu in menus" :key="menu.authorityId" :name="menu.authorityId">
                        <template slot="title">
                            <Icon type="md-home" v-if="menu.authorityName ==='首页'" />
                            <Icon type="ios-paper" v-if="menu.authorityName === '外部菜单一'"/>
                            <Icon type="md-settings" v-if="menu.authorityName === '外部菜单二'"/>
                            <Icon type="ios-people" v-if="menu.authorityName === '外部菜单三'"/>
                            {{menu.authorityName}}
                        </template>
                        <MenuItem v-for="item in menu.subAuths" :key="item.authorityId" :name="item.authorityId">
                            {{item.authorityName}}
                        </MenuItem>
                    </Submenu>
            </Menu>

        <div v-else class="demo-spin-col" >
            <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div>

        </div>

        <!--页面内容-->
        <div class="bd">
            <router-view></router-view>
        </div>

        <!--页面底部--其他-->
        <footer class="ft">
            <p>快速平台搭建</p>
        </footer>

    </div>
</template>

<script>
export default {
  name: "Index",

  data() {
    return {
      theme2: "light", //菜单显示大小
      submenu: "", //默认打开那个菜单
      menuitem: "", //默认选中那个菜单
      menus: [], //菜单列表
      userType: "", //用户类型
      roleName: "个人用户" //角色类型
    };
  },

  methods: {
      /*
      * 通过接口可以获取不同权限的动态菜单。
      * 通过接口获取用户类型和角色类型，并显示。
      * 菜单支持打开某个菜单后，刷新页面后该菜单项还是处于被选中状态。
      * 首页菜单点击后，跳转首页并收回所有菜单。
      * 菜单数据在获取前会有一个loading状态。
      * 这里根据菜单的唯一标识ID进行判断的，所以添加或者修改，需要注意相关数据库存的数据！
      * */
    menuClick(key) {
      //导航栏菜单选择事件
      switch (key) {
        case 6:
          this.$router.push({ path: "/pageone" });
          break;
        case 7:
          this.$router.push({ path: "/page2" });
          break;
        case 8:
          this.$router.push({ path: "/page3" });
          break;
        default:
          this.$router.push({ path: "/404" });
      }
    },

    userOclick() {
      //个人中心单击事件
      this.$router.push({ path: "/page3" });

      this.menuitem = "";
      this.submenu = "";
      //清除导航选中，并收起菜单
      this.$refs.child.currentActiveName = "/";

      this.$nextTick(() => {
        //收回菜单
        this.$refs.child.updateOpened();
      });
    },

    homeClick() {
      //首页点击事件
      this.menuitem = "";
      this.submenu = "";
      //清除导航选中，并收起菜单
      this.$refs.child.currentActiveName = "/";

      this.$nextTick(() => {
        //收回菜单
        this.$refs.child.updateOpened();
      });
    },

    getStatus(urlStr) {
      var urlStrArr = urlStr.split("/");
      return urlStrArr[urlStrArr.length - 1];
    },

    outClick() {
      sessionStorage.clear();
      this.$router.push({ path: "/login" });
    }
  },

  created: function() {
    let url = location.hash; //刷新选中当前页面菜单
    this.userType = sessionStorage.getItem("userType"); //获取登录用户的类型

      /*
      * 通过接口获取到菜单信息。
      * 写一个定时器为了展示获取菜单数据前loading状态和获取后的显示效果。
      * this.menus是根据不同权限请求不同的动态菜单。
      * 菜单是根据名称对应的id进行适配。
      * */
      setTimeout(()=>{
          this.menus = [
              {
                  authorityName:'外部菜单一',
                  subAuths:[
                      {
                          authorityName:'菜单一',
                          authorityId:6,
                      },
                      {
                          authorityName:'菜单二',
                          authorityId:7
                      }
                  ],
                  authorityId:3
              },
              {
                  authorityName:'外部菜单二',
                  subAuths:[
                      {
                          authorityName:'菜单三',
                          authorityId:8
                      }
                  ],
                  authorityId:4
              },
              {
                  authorityName:'外部菜单三',
                  subAuths:[
                      {
                          authorityName:'菜单五',
                          authorityId:10
                      }
                  ],
                  authorityId:5
              }
          ];

          /* eslint-disable */
          switch (url) {
              case url:
                  if (
                      url.indexOf("pageone") > -1 ||
                      url.indexOf("pageone-1") > -1
                  ) {
                      this.submenu = 3;
                      this.menuitem = 6;
                      break;
                  }
              case url:
                  if (
                      url.indexOf("page2") > -1 ||
                      url.indexOf("page2-1") > -1
                  ) {
                      this.submenu = 3;
                      this.menuitem = 7;
                      break;
                  }
              case url:
                  if (url.indexOf("page3") > -1) {
                      this.submenu = 4;
                      this.menuitem = 8;
                      break;
                  }

              default:
                  if (url.indexOf("home") > -1) {
                      //收起菜单
                      this.$nextTick(function() {
                          //收起菜单
                          // this.$refs.child.updateOpened();
                      });

                      break;
                  }
          }
          /* eslint-enable */
      },500);

  },

  watch: {
    /* eslint-disable */
    $route(to, from) {
      let outurl;
      outurl = this.getStatus(this.$route.path);
        switch (outurl) {
        case outurl:
          if (
              outurl.indexOf("pageone") > -1
          ) {
              this.submenu = 3;
              this.menuitem = 6;
              break;
          }
        case outurl:
          if (
            outurl.indexOf("page2") > -1
          ) {
            this.submenu = 3;
            this.menuitem = 7;
            break;
          }
        case outurl:
          if (outurl.indexOf("page3") > -1) {
            this.submenu = 4;
            this.menuitem = 8;
            break;
          }

        default:
          if (outurl.indexOf("home") > -1) {
            this.$refs.child.currentActiveName = "/";
            this.$nextTick(function() {
              this.$refs.child.updateOpened();
            });

            break;
          }
        /* eslint-enable */
      }

    }
  },

  computed: {
    // userType,表示登录的用户类型：个人和管理员

    characterName: function() {
      if (this.userType === "PERSONAL") {
        return this.roleName || "";
      } else if (this.userType === "ENTERPRISE") {
        return "管理员";
      }
    }

  }
};
</script>

<style lang="less">
//公共属性
@font-size: 16px;

html,
body,
#index {
  width: 100%;
  height: 100%;
  font-family: "Microsoft YaHei";
}

.index {
  min-width: 1500px; //调节页面
  .hd {
    //头部
    width: 100%;
    height: 60px;
    min-width: 1200px;
    background: linear-gradient(70deg, #1890ff , #003a8c);
    position: relative;

    .hd-h1 {
      //头部网站名称
      width: 260px;
      height: 60px;
      color: white;
      display: inline-block;
      margin-left: 30px;
      line-height: 60px;
    }
    .hd-user-state-box {
      min-width: 130px;
      height: 40px;
      overflow: hidden;
      position: absolute;
      right: 30px;
      top: 0;
      z-index: 10;
      transition: 0s;

      &:hover {
        height: 126px;
        transition: 0.1s ease-in;
      }

      .hd-user-span {
        //头部右侧登录用户
        min-width: 120px;
        height: 60px;
        color: white;
        display: inline-block;
        line-height: 60px;
        text-align: right;
        float: right;
        clear: both;
        font-size: 14px;
        cursor: pointer;
        padding-right: 5px;
      }

      .hd-user-triangle {
        //头部个人中心菜单小三角
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-bottom: 6px solid white;
        border-right: 5px solid transparent;
        position: absolute;
        z-index: 10;
        right: 3px;
        top: -5px;
      }

      .hd-user-box {
        //头部用户中心下拉菜单
        width: 120px;
        background: white;
        position: absolute;
        top: 50px;
        z-index: 10;
        right: 5px;
        border-radius: 5px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.17);
        padding: 5px 4px;

        .hd-user-box-individual-center {
          //头部用户中心-个人中心

          width: 112px;
          height: 30px;
          display: block;
          line-height: 30px;
          border-radius: 2px;
          font-size: 14px;
          letter-spacing: 2px;

          i {
            width: 32px;
            padding-left: 8px;
          }
          &:hover {
            background: #eeeeee;
            cursor: pointer;
          }
        }

        .hd-user-box-out {
          //头部用户中心-退出
          width: 112px;
          height: 30px;
          display: block;
          line-height: 30px;
          border-radius: 2px;
          font-size: 14px;
          letter-spacing: 18px;

          i {
            padding-left: 8px;
          }
          &:hover {
            background: #eeeeee;
            cursor: pointer;
          }
        }
      }
    }
  }

  .side {
    //侧边导航栏
    width: 200px;
    height: calc(~"100% -" 120px);
    min-height: calc(~"100% -" 120px);
    display: inline-block;
    vertical-align: top; //因为有些游览器对于设置了display：inline-block属性的容器会自动设置其vertical-align
      .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
          margin-left: 7px;
      }
    .side-home {
      //侧边导航栏-首页标签
      width: 100%;
      height: 40px;
      display: block;
      line-height: 40px;
      font-size: 14px;
      letter-spacing: 1px;
      color: #515a6e;
      margin-top: 10px;
      .home-icon {
        width: 28px;
        height: 20px;
        margin-left: 23px;
        font-size: 17px;
      }
      &:hover {
        color: #003a8c;
      }
    }
  }

  .bd {
    //内容
    width: calc(~"100% -" 200px);
    min-width: 800px;
    height: calc(~"100% -" 120px);
    min-height: calc(~"100% -" 120px);
    display: inline-block;
    background-color: #f0f2f5;
    overflow-y: hidden;
  }

  .ft {
    //底部版权
    width: 100%;
    min-width: 1200px;
    text-align: center;
    line-height: 60px;
    font-size: @font-size;
    margin-top: -4.5px;
    background-color: white;
  }
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  margin-top: 15px;
  height: 400px;
  position: relative;
}
</style>
