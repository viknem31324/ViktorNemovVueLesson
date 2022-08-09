import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

Vue.directive('focus', {
  inserted(el) {
    el.focus();
  }
});

Vue.directive('blur', {
  inserted(el, bindings) {
    el.addEventListener("focusout", function () {
      if (el.value !== "") {
        bindings.value(el.value);
      }else el.focus();
    });
  }
});

Vue.directive('color', {
  bind(el, bindings) {
    const arg = bindings.arg;
    el.style[arg] = bindings.value;
  }
});

Vue.filter('currencyFilter', (val, cur) => {
  let num = Number(val);
  console.log(num);
  if(num !== 0) {
    return num.toLocaleString('ru') + cur;
  } else return "Введите число"
});

new Vue({
  render: h => h(App),
}).$mount('#app');
