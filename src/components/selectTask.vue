<template>
  <div class="selectTask">
    <button
      class="btn btn-info"
      v-on:click="checkTab('all')"
      v-bind:class="{ 'btn-warning': val === 'all' }"
    >
      display all tasks
    </button>
    <button
      class="btn btn-info"
      v-on:click="checkTab('compl')"
      v-bind:class="{ 'btn-warning': val === 'compl' }"
    >
      display completed tasks
    </button>
    <button
      class="btn btn-info"
      v-on:click="checkTab('outst')"
      v-bind:class="{ 'btn-warning': val === 'outst' }"
    >
      display outstanding tasks
    </button>
  </div>
</template>
<script>
export default {
  props: ["check"],
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
