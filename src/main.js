import Vue from 'vue'
import App from './App.vue'
import MuPlugin from './MyPludin'

Vue.config.productionTip = false;

Vue.use(MuPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
