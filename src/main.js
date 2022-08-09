import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})

Vue.directive('blur', {
  inserted(el, bindings) {
    el.addEventListener("focusout", function() {
      bindings.value(el.value);
    });
  }
})
Vue.directive('color', {
  bind(el, bindings) {
    const arg = bindings.arg;
    el.style[arg] = bindings.value;
}
});

new Vue({
  render: h => h(App),
}).$mount('#app')
