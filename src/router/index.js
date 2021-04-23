/*
 * @Date: 2021-04-09 16:15:02
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-04-21 15:50:02
 * @FilePath: \gra-project-sourcetree\src\router\index.js
 */
/*
 * @Date: 2021-04-09 16:15:02
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-04-14 14:47:18
 * @FilePath: \gra-project\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import enter from '@/components/enter'
import register from '@/components/register'

Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'enter',
      component: enter,
      children:[
        {
          path: 'login',
          component: login
        },
        {
          path: 'register',
          component: register
        }
      ]
    }
  ]
})
