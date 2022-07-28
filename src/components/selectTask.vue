<template>
  <div class="selectTask">
    <button
      v-for="item, inx in arrTab"
      v-bind:key="inx"
      class="btn btn-info"
      v-on:click="checkTab(item.key)"
      v-bind:class="{ 'btn-warning': val === item.key }"
    >
      {{ item.text }}
    </button>
  </div>
</template>
<script>
export default {
  props: ["check", "arrTab"],
  data() {
    return {
      val: this.check,
    };
  },
  methods: {
    checkTab(a) {
      this.val = a;
      this.$emit("checkTab", this.val);
    },
  },
};
</script>
<style>
.selectTask {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  max-width: 600px;
}
</style>
