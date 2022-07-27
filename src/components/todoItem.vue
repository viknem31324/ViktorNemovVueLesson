<template>
  <div class="todoItem list-group-item">
    <button
      class="btn todoItem__btn"
      v-bind:class="[val ? 'btn-success' : 'btn-secondary']"
      v-on:click="checkDone"
    >
      {{ bool }}
    </button>
    <p class="todoItem__text">{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: {
    id: Number,
    text: String,
    done: Boolean,
  },
  data() {
    return {
      val: this.done,
    };
  },
  methods: {
    checkDone() {
      this.val = !this.val;
      this.$emit("checkDone", [this.val, this.id]);
    },
  },
  computed: {
    bool() {
      return !this.val ? "in order" : "complited";
    },
  },
};
</script>
<style>
.todoItem {
  display: flex;
}
.todoItem__btn {
  width: 100px;
}
.todoItem__text {
  padding-left: 20px;
}
</style>