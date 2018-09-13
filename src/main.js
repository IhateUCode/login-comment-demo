// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css'
Vue.use(ElementUI);

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
    var cookieArr = document.cookie.split('; ')
    var needCookie = cookieArr.filter(item=>{
        return item.indexOf('username') != -1
    })
    if(to.path === '/login'){
        if(needCookie && needCookie.length > 0){
            next('/comments')   // 如果有cookie就转向comment不返回登录页
        }
        next()      // 否则跳转回登录页
    }else if(to.path === '/register'){
        next()            //如果去注册页则前往
    }else {
        if(needCookie && needCookie.length > 0){
            next() // 如果有cookie就正常转向
        }else {
            next('/login') // 否则跳转回登录页
        }
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
