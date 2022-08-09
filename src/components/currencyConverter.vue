<template>
  <div>
    <input v-model.trim="val" type="text" />
    <div>{{ val | currencyFilter(currency) }}</div>
  </div>
</template>
<script>
import logHookMixin from "../mixin/logHookMixin";
export default {
  mixins: [logHookMixin],
  data() {
    return {
      name: "Converter",
      val: "",
      currency: " руб",
    };
  },
};
</script>