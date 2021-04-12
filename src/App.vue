<template>
  <div id="app" class="fillcontain">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@import "./style/common";
</style>
<!--
<style >
#app {
  font-family: "MicrosoftYaHei", 微软雅黑, "Avenir", Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
-->
