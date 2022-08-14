import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './routes'

Vue.use(VueRouter);
Vue.config.productionTip = false;


new Vue({
  data: {
    checkLogin: false,
  },
  render: h => h(App),
  router: router,
}).$mount('#app');
