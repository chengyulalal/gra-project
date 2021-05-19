<!--
 * @Date: 2021-04-09 16:15:02
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-18 20:05:39
 * @FilePath: \gra-project-sourcetree\src\App.vue
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url("//unpkg.com/element-ui@2.15.1/lib/theme-chalk/index.css");
body{
  margin: 0;
  padding: 0;
  overflow:hidden
}
a{
  text-decoration: none;
  color: black;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
