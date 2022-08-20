<template>
  <div class="selectTask">
    <button
      v-for="item, inx in allArrTab"
      v-bind:key="inx"
      class="btn btn-info selectTask__btn"
      v-on:click="checkTab(item.key)"
      v-bind:class="{ 'btn-warning': getCheck === item.key }"
    >
      {{ item.text }}
    </button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions([
      "checkTab",
    ]),
  },
  computed: {
    ...mapGetters([
      "allArrTab",
      "getCheck"
    ]),
  },
};
</script>
<style>
.selectTask {
  display: flex;
  padding: 10px;
  max-width: 600px;
}
.selectTask__btn:not(:last-child){
    margin-right: 10px;
}
</style>