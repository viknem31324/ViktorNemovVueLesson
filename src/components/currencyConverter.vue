<template>
  <div>
    <input v-model.trim="val" type="text" />
    <div>{{ val | currencyFilter(currency) }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      val: "",
      currency: " руб",
    };
  },
};
</script>