import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'
import ChooseKnowledge from './components/ChooseKnowledge.vue'
import Quiz from './components/Quiz.vue'
import About from './components/About.vue'

const routes = [
  {path:'/',redirect:'/choose'},
  {name: 'choose', path: '/choose', component: ChooseKnowledge},
  {name: 'quiz', path: '/quiz', component: Quiz},
  {name: 'about', path:'/about', component: About}
] 

Vue.config.productionTip = false;
Vue.use(ElementUI); // ElementUI依赖
Vue.use(VueAxios, axios); // axios请求库
Vue.use(Router) // Vue路由

const router = new Router({
  // mode: 'history', 
  routes: routes 
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
