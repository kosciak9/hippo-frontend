import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import router from './router';
import store from './store';

import App from './App.vue';

import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
