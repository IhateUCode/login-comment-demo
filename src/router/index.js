import Vue from 'vue'
import Router from 'vue-router'
import comment from '../components/comment.vue'
import index from '../components/index.vue'
import login from '../components/login.vue'
import register from '../components/register.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/comments',
      name: 'comments',
      component: comment
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
