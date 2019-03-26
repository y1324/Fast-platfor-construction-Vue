<template>
    <div class="pageone-index">
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/pagehome">Home</BreadcrumbItem>
                <BreadcrumbItem to="./pageone">外部菜单一</BreadcrumbItem>
                <BreadcrumbItem >菜单一</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <h1>页面1</h1>
    </div>
</template>

<script>
    export default {
        name: "PageOne.vue"
    }
</script>

<style lang="less">
    .pageone-index{
        width: 100%;
        height: 100%;
        overflow: auto;

        .breadcrumb {
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding-left: 40px;
            background-color: white;
        }
    }
</style>