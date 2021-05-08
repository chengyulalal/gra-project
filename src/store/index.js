/*
 * @Date: 2021-05-07 20:39:36
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-07 20:52:34
 * @FilePath: \gra-project-sourcetree\src\store\index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'
// 挂载vuex
Vue.use(Vuex)
 
// 创建vuex对象并向外暴露
export default new Vuex.Store({
  // 全局属性变量
  state: {
    unique:''
  },
  // 全局同步方法, 调用方法,this.$store.commit("xxx")
  mutations: {
    setunique (state, params) {
      state.unique = params;
    }
  },
  // 异步方法 调用方法,this.$store.dispatch("xxx") 
  actions: {
  },
  // Vuex属性计算,在视图里面当变量使用
  getters: {
  }
})
