import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './routes'
import MyPlugin from './MyPlugin'

Vue.use(VueRouter);
Vue.use(MyPlugin);

Vue.config.productionTip = false;


new Vue({
  data: {
    checkDash: true,
    baseURL: "http://localhost:3001/taskList",
  },
  render: h => h(App),
  router: router,
}).$mount('#app');
