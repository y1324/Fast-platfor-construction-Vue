<template>
    <div class="home-main">
        <div class="home-con">
            <div class="home-information">
                <h2>首页信息</h2>
                <div class="information-main">
                    <div class="information-top-box author-information">
                        <h3>框架介绍</h3><br>
                        <div>
                            <p>1.基于Vue进行搭建</p><br>
                            <p>2.页面有一定的自适应，总页面最小为1500px</p><br>
                            <p>3.登录页面为读令牌卡和账号登录两种样式，可根据具体进行适配</p><br>
                            <p>4.导航菜单支持动态生成，需要在router.js配置。</p><br>
                            <p>5.选中某个导航菜单后，刷新页面还会打开并选中该菜单</p><br>
                            <p>6.路由支持权限拦截，例：未登录直接跳转某个页面提示未登录</p><br>
                            <p>7.axios基本配置：请求头部加token、状态码识别、网络错误、网络连接超时</p><br>
                            <p>8.框架已经添加iviewUI框架，全局配置的。按需加载的话，需要配置一下</p><br>
                            <p>9.默认图标：谷歌图标 (material.io)</p><br>
                            <p>10.CSS预加载默认为：less</p>
                        </div>
                    </div>
                    <div class="information-top-box ">
                        <h3>技术栈</h3>
                        <p>
                            Vue + Vue-Route + axios + iview + vuex + less
                        </p>
                    </div>
                    <div class="information-top-box ">
                         <h3>项目信息及其他信息</h3><br>
                        <p>
                            演示主页：
                            <a href="http://www.vygd.top/" target="_Blank" >http://www.vygd.top/</a>
                        </p><br>
                        <p>
                            github主页：<a href="https://github.com/y1324/Fast-platfor-construction">https://github.com/y1324/Fast-platfor-construction</a>
                        </p><br>
                        <p>个人邮箱：4445748@qq.com</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style lang="less">
    @fontSize:14px;
    .home-main{
        width: 100%;
        height: 100%;
        overflow: auto;
        font-size: @fontSize;

        .home-con{
            min-width: 700px;
            min-height: 720px;
            padding: 20px;
            .home-information{
                width: 100%;
                min-height: 720px;

                .information-main{
                    display: flex;
                    justify-content: space-between;

                    .information-top-box{
                        margin: 10px;
                        min-height: 200px;
                        flex-grow: 30;
                        flex-basis: 30%;
                        background-color: white;
                        -webkit-border-radius: 3px;
                        -moz-border-radius: 3px;
                        border-radius: 3px;
                        box-shadow:0 2px 4px rgba(0,0,0,.1);
                        padding: 10px;
                    }
                }


            }
        }

    }

</style>
