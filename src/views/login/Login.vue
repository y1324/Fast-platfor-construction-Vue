<template>
    <div class="login-index">
        <div class="component-layer">
            <div class="loginBox">

                <div class="loginLeftBox">
                    <h1 class="login-title">快速平台搭建</h1>

                    <div class="loginDetils-index">
                        <div class="loginBox-details" :class="+ this.isVisible?' loginAcount':' loginCertificate'">

                            <div class="loginInfo-index" >
                                <div class="loginInfo">
                                    <div class="inputBox">
                                        <span class="inputName">令牌名</span>
                                        <i class="material-icons icon-username">
                                            chrome_reader_mode
                                        </i>
                                        <select id="UserList" name="UserList" class="select">
                                            <option value="令牌1">令牌1</option>
                                        </select>
                                    </div>

                                    <div class="inputBox inputBox-margin-top">
                                        <span class="inputName">令牌口令</span>
                                        <i class="material-icons">lock</i>
                                        <input class="input-credential" maxlength="20" v-model="userInfo.password" type="password" @keyup.enter="certificateLoginClick" placeholder="直接点击登录即可"/>
                                    </div>
                                    <Button class="login-button" :loading="loginLoading" @click="certificateLoginClick" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                                </div>
                                <div class="login-line"><span>or</span></div>
                                <i class="icon-userlogin"><img src="../../assets/img/login/userLoginIcon.png"/></i>
                                <input type="button" value="账户登录" class="button-userLogin" v-on:click="loginAccount">
                            </div>

                            <div class="loginInfo-index" >

                                <i class="icon-userlogin"><img src="../../assets/img/login/lingPai.png"/></i>
                                <input type="button" value="令牌登录" class="button-userLogin" v-on:click="loginCerdential">

                                <div class="login-line"><span>or</span></div>

                                <div class="loginInfo">
                                    <div class="inputBox">
                                        <span class="inputName">用户名</span>
                                        <i class="material-icons">
                                            account_box
                                        </i>
                                        <input v-model="userInfo.userName" maxlength="20" class="input-username" type="text" placeholder="请输入用户名"/>
                                    </div>

                                    <div class="inputBox inputBox-margin-top">
                                        <span class="inputName">密码</span>
                                        <i class="material-icons">lock</i>
                                        <input v-model="userInfo.password" @keyup.enter="accountLoginClick" maxlength="12" class="input-credential" type="password" placeholder="请输入密码"/>
                                    </div>
                                    <Button class="login-button" :loading="loginLoading" @click="accountLoginClick" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                                    <br/>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div class="registerCount">
                        <Dropdown trigger="click">
                            <a href="javascript:void(0)">
                                注册我的账户
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>
                                    <router-link class="dropdownItem" to="/xxx">令牌注册</router-link>
                                </DropdownItem>
                                <DropdownItem>
                                    <router-link class="dropdownItem" to="/xxx">个人注册</router-link>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                    </div>


                </div>



            </div>
            <div class="recordNumber">备案号：<a href="http://www.miitbeian.gov.cn" target="_Blank"> 冀ICP备18023840号-1</a> 本网站用于开源项目经验学习分享等</div>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      isVisible: true,
      credentialList: [], //令牌列表
      credentialName: 1, //令牌默认选择
      userInfo: {
        userName: "",
        password: ""
      },
      token: "",
      userType: "", //用户类型

      userValue: "", //令牌名字
      userNumber: 10, //令牌失败次数

      loginLoading: false, //登录按钮状态
      certificate:false //是否令牌登录
    };
  },
  methods: {
      /*
      * 登录方式包括包括插卡登录、普通账号密码登录。
      * 插卡登录，需要导入外部读取卡的JS包才可以。
      * */

    loginAccount() {
      //账户登录
      this.isVisible = !this.isVisible;
      this.userInfo.password = "";
    },
    loginCerdential() {
      //令牌登录
      this.isVisible = !this.isVisible;
      this.userInfo.password = "";
    },


    certificateLoginClick() {
      //令牌登录
      this.loginLoading = true;  //登录按钮等待状态开启

        /*
        * userType,表示登录的用户类型：个人和企业
        * PERSONAL表示个人，ENTERPRISE表示企业，首页会根据用户类型跳转不同的页面。
        * token,表示登录用户的token信息
        * entName,表示登录的企业名称
        * isLogin,判断是否登录了
        * */

        setTimeout(()=>{
            sessionStorage.setItem("token", this.token);
            sessionStorage.setItem("userType", "ENTERPRISE");
            sessionStorage.setItem("entName", "快速搭建平台企业");
            sessionStorage.setItem("isLogin", true);
            this.loginLoading = false;  //登录按钮等待状态结束
            this.$Message.destroy();
            this.$Message.success("欢迎登陆。");
            this.$router.push({ path: "./pagehome" });
        },800)
    },

    accountLoginClick() {
        //账户登录按钮
      this.loginLoading = true;

      if (
          this.userInfo.userName === "" ||
          this.userInfo.userName === null
      ) {
        this.$Message.destroy();
        this.$Message.error("请输入用户名");
        this.loginLoading = false;
      } else if (
        this.userInfo.password === "" ||
        this.userInfo.password === null
      ) {
        this.$Message.destroy();
        this.$Message.error("请输入密码");
        this.loginLoading = false;
      } else {

          /*
           * userType,表示登录的用户类型：个人和企业
           * PERSONAL表示个人，ENTERPRISE表示企业，首页会根据用户类型跳转不同的页面。
           * token,表示登录用户的token信息
           * entName,表示登录的企业名称
           * isLogin,判断是否登录了,true为登录，false为未登录
           * */

          sessionStorage.setItem("token", this.token);
          sessionStorage.setItem("userType", "PERSONAL");
          sessionStorage.setItem("entName", "快速搭建平台企业");
          sessionStorage.setItem("isLogin", true);
          this.loginLoading = false;  //登录按钮等待状态结束
          this.$Message.destroy();
          this.$Message.success("欢迎登陆。");
          this.$router.push({ path: "./pagehome" });
      }
    }
  },

  mounted: function() {
  }
};
</script>

<style lang="less">
@font-size: 14px;
.login-index {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 650px;
  /*background-color: #f5f7fa;*/
  background: linear-gradient(blue, pink);
  position: relative;
  overflow: hidden;

  .component-layer {
    width: 100%;
    height: 100%;
    min-height: 600px;
    min-width: 1000px;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .loginBox {
      width: 370px;
      height: 600px;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      box-shadow: 0px 2px 40px #888888;

      /*左侧样式*/
      .loginLeftBox {
        width: 370px;
        height: 600px;
        border-radius: 20px;
        background-color: #ffffff;
        z-index: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;

        /*标题样式*/
        .login-title {
          font-size: 24px;
          color: #1890ff;
          margin-top: 75px;
          margin-left: 58px;
          position: absolute;
        }

        .loginDetils-index {
          width: 240px;
          height: 300px;
          overflow: hidden;
          top: 180px;
          margin-left: 57px;
          position: absolute;

          .loginBox-details {
            width: 240px;
            height: 600px;

            .loginInfo-index {
              width: 240px;
              height: 300px;
              transition-duration: 2s;
              /*设置分割线*/
              .login-line {
                height: 1px;
                border-top: 1px dashed #ddd;
                text-align: center;
                margin-top: 24px;
                margin-bottom: 24px;
                span {
                  position: relative;
                  top: -8px;
                  background: #fff;
                  padding: 0 15px;
                }
              }

              .loginInfo {
                width: 240px;
                height: 176px;

                .inputBox {
                  width: 100%;
                  display: block;
                  flex-direction: column;
                  position: relative;

                  .inputName {
                    //position: relative;
                    color: #979797;
                    font-size: @font-size;
                    font-family: "Heiti SC";
                    font-weight: lighter;
                    margin-left: 10px;
                    display: block;
                  }
                  /*图标*/
                  .material-icons {
                    font-size: 20px;
                    position: absolute;
                    //top:50%;
                    margin-top: 7px;
                    left: 15px;
                    z-index: 1;
                  }
                  .select {
                    /*清除select默认样式*/
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    -ms-appearance: none;

                    border: 1px solid #eeeeee;
                    border-radius: 16px;
                    width: 240px;
                    height: 32px;
                    background: url("../../assets/img/xiala.png") no-repeat;
                    background-position: 210px center;
                    /*ie下,原默认的箭头样式还是会显示，所以这里把自定义的样式给去除了*/
                    background: #fff\9;
                    color: #666;
                    outline: none;
                    padding-left: 50px;
                    padding-right: 30px;
                    color: #999999;
                    font-size: @font-size;
                  }
                  select::-ms-expand {
                    display: none;
                  }
                  .input-credential {
                    width: 240px;
                    height: 32px;
                    border-radius: 16px;
                    border: 1px solid #eeeeee;
                    padding-left: 50px;
                    padding-right: 15px;
                    font-size: @font-size;
                    color: #999999;
                  }
                  .input-username {
                    width: 240px;
                    height: 32px;
                    border-radius: 16px;
                    border: 1px solid #eeeeee;
                    padding-left: 50px;
                    padding-right: 15px;
                    font-size: @font-size;
                    color: #999999;
                    line-height: 32px;
                  }

                  ::-webkit-input-placeholder {
                    /* WebKit browsers */
                    color: #999;
                  }
                  :-moz-placeholder {
                    /* Mozilla Firefox 4 to 18 */
                    color: #999;
                  }
                  ::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    color: #999;
                  }
                  :-ms-input-placeholder {
                    /* Internet Explorer 10+ */
                    color: #999;
                  }

                  .ivu-select-selection {
                    width: 240px;
                    height: 32px;
                    border: 1px solid #eeeeee;
                    color: #999999;
                    border-radius: 16px;
                    padding-left: 40px;
                    box-shadow: none;
                  }
                  .ivu-select-placeholder {
                    color: #999999;
                    font-size: @font-size;
                  }
                  .ivu-select-dropdown {
                    border: 1px solid #eeeeee;
                    box-shadow: none;
                  }
                }
                .inputBox-margin-top {
                  margin-top: 18px;
                }

                /*登录按钮*/
                .login-button {
                  width: 100%;
                  height: 32px;
                  font-size: @font-size;
                  font-family: "Heiti SC";
                  margin-top: 18px;
                  border-radius: 16px;
                }
              }
              /*登录图标*/
              .icon-userlogin {
                position: absolute;
                padding-top: 10px;
                padding-left: 15px;
                z-index: 1;
                img {
                  width: 14px; /*设置图片显示的宽*/
                  height: 14px; /*图片显示的高*/
                }
              }
              /*账户登录按钮和令牌登录按钮*/
              .button-userLogin {
                width: 240px;
                height: 32px;
                font-size: @font-size;
                color: #fff;
                font-family: "Heiti SC";
                font-weight: lighter;
                border: 0;
                border-radius: 4px;
                background: linear-gradient(90deg, #1890ff, #2e89d5);
              }
            }
          }
          /*令牌登录和账号登录切换效果的实现*/
          .loginAcount {
            transform: translateY(0%);
            transition-duration: 1s;
          }
          .loginCertificate {
            transform: translateY(-50%);
            transition-duration: 1s;
          }
        }
        /*账户登录部分*/
        .registerCount {
          color: #1890ff;
          font-size: @font-size;
          font-family: "Heiti SC";
          margin-top: 500px;
          margin-left: 57px;
          font-weight: lighter;
          cursor: pointer;

          /*设置弹出气泡样式*/
          .tip-frame {
            width: 100px;
            height: 50px;
            background-color: #000;
            border: 1px solid #979797;
            border-radius: 3px;
            position: relative;
            top: 5px;

            .tip-triangle {
              width: 10px;
              height: 10px;
              display: inline-block;
              position: absolute;
              top: -5px;
              left: 20px;
              background-color: #000;
              border-bottom: 1px solid #979797;
              border-right: 1px solid #979797;
              transform: rotate(225deg);
              -ms-transform: rotate(225deg); /* IE 9 */
              -moz-transform: rotate(225deg); /* Firefox */
              -webkit-transform: rotate(225deg); /* Safari 和 Chrome */
              -o-transform: rotate(225deg); /* Opera */
            }
            .tip-content {
              padding-top: 5px;
              text-align: center;
              font-size: 12px;
              a {
                color: #fff;
                display: block;
                text-decoration: none;
                width: 100%;
                height: 20px;
              }
            }
          }

          .dropdownItem {
            color: #333333;
          }
        }

        .operation-platform-p {
          height: 30px;
          width: 100px;
          margin-left: 35px;
          font-size: 14px;
          color: #1890ff;
          margin-top: 10px;
        }
      }
    }

    .recordNumber{
        width: 100%;
        height: 30px;
        display: inline-block;
        position: fixed;
        bottom: 10px;
        text-align: center;
    }
  }
}
</style>
