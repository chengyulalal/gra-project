/*
 * @Date: 2021-04-09 16:15:02
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-09 13:35:11
 * @FilePath: \gra-project-sourcetree\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index.js'

// 挂载到Vue实力上，全局可通过this.$store进行调用
Vue.prototype.$store = store

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
