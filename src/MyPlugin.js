export default {
    install(Vue) {
        Vue.directive('focus', {
            inserted(el) {
                el.focus();
            }
        });

        Vue.directive('blur', {
            inserted(el, bindings) {
                el.addEventListener("focusout", () => {
                    if (el.value !== "") {
                        bindings.value(el.value);
                    } else el.focus();
                });
            }
        });

        Vue.directive('color', {
            bind(el, bindings) {
                const arg = bindings.arg;
                el.style[arg] = bindings.value;
            }
        });

        Vue.component('addList', {
            render: function (createElement) {
                return createElement("ul", this.$slots.default);
            },
        })

        Vue.filter('currencyFilter', (val, cur) => {
            let num = Number(val);
            if (num !== 0 && !isNaN(num)) {
                return num.toLocaleString('ru') + cur;
            } else return "Введите число"
        });
    }
} 