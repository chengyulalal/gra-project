<!--
 * @Date: 2021-04-19 13:27:47
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-13 12:22:52
 * @FilePath: \gra-project-sourcetree\src\components\enter.vue
-->
<template>
  <div class="enter">
    <img src="/static/img/bg.jpg">
    <span class="title">课程管理系统</span>
    <router-view/>
  </div>
</template>

<script>
export default {
    name:'enter',
    data () {
      return {

      }
    },
    // created () {
    //   this.$router.replace( {path:'/login'} );
    // }
}
</script>

<style lang="scss" scoped>
img{
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.enter{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .title{
    width: 300px;
    height: 50px;
    color: black;
    font-size: 30px;
    z-index: 1000;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%,0%);
    font-weight: bold;
  }
}
</style>>
