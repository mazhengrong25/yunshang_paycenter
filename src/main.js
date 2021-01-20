import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

import axios from "axios";

axios.defaults.baseURL="http://192.168.0.23:8089/";

Vue.prototype.$axios = axios;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
