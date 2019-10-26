import 'font-awesome/css/font-awesome.css'
import './plugins/bootstrap-vue'
import './plugins/mq'
import './plugins/vue-select'
import 'vue-select/dist/vue-select.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
