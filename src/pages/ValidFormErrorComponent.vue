<template>
    <p class="error" v-if="errors.length">
      <b>Please correct these errors:</b>
      <ul class="error__list">
        <li class="error__item" v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      </p>
</template>
<script>
export default {
  props: {
    errors: Array,
  },
};
</script>
<style>
</style>