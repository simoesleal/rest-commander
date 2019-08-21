import Vue from 'vue'
import Router from 'vue-router'

// Rotas atualizadas com base no seguinte artigo da documentação:
// https://router.vuejs.org/guide/advanced/lazy-loading.html

// Main containers
const Dashboard = () => import(/* webpackChunkName: "main" */ './views/Dashboard')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'router-link-active open',
  linkExactActiveClass: 'router-link-exact-active link-exato',
  routes: [{
    name: 'home',
		path: '/',
		component: Dashboard
  }]
})
