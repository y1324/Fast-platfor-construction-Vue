<template>
    <div id="app" class="app-index">
        <router-view :key="123"/>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="less" >
#app {
  width: 100%;
  height: 100%;
}
</style>
