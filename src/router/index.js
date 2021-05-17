/*
 * @Date: 2021-04-09 16:15:02
 * @LastEditors: chengyu.yang
 * @LastEditTime: 2021-05-16 16:20:24
 * @FilePath: \gra-project-sourcetree\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import enter from '@/components/enter'
import register from '@/components/register'
import index from '@/components/index'
import content from '@/components/content'
import indexteacher from '@/components/indexteacher'
import teachercontent from '@/components/teachercontent'
import endcontent from '@/components/endcontent'

Vue.use(Router)
 
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'enter',
      component: enter,
      redirect:'/login',
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
    },
    {
      path: '/indexteacher',
      component: indexteacher
    },
    {
      path: '/teachercontent',
      component: teachercontent
    },
    {
      path: '/endcontent',
      component: endcontent
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
