<template>
    <div class="notfound-index">
        Error:<span class="number">404</span>未找到,请返回。
        <Button @click="returnHome" type="error" long>返回首页</Button>
    </div>
</template>

<script>
export default {
  name: "notfound",
  methods: {
    returnHome() {
      if (
        sessionStorage.getItem("token") !== null &&
        sessionStorage.getItem("userType") !== null
      ) {
        this.$router.push({ path: "/home" });
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  }
};
</script>

<style lang="less">
.notfound-index {
  width: 100%;
  height: 100%;
  margin-top: 100px;
  text-align: center;
  font-size: 20px;
  .number {
    color: red;
    font-size: 40px;
    font-weight: bold;
    margin: 8px;
  }
  button {
    display: block;
    position: relative;
    margin: auto;
    margin-top: 100px;
    width: 145px;
    font-size: 14px;
  }
}
</style>
