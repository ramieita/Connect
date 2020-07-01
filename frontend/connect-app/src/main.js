import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@popperjs/core'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSwal from 'vue-swal'

//import './assets/style/style.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSwal)


Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
