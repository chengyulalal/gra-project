/*
 * @Date: 2021-04-09 16:15:02
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-11 16:04:51
 * @FilePath: \gra-project-sourcetree\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import enter from '@/components/enter'
import register from '@/components/register'
import index from '@/components/index'
import content from '@/components/content'

Vue.use(Router)
 
// 解决相同路径报错问题 重写push方法
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const router = new Router({
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
    },
    {
      path: '/index',
      component: index 
    },
    {
      path: '/content',
      component: content
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('token');
    console.log(to.path);
    console.log(token);
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router
