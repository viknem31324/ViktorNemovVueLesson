<template>
  <li class="todoItem list-group-item">
    <button
      class="btn todoItem__btn"
      v-bind:class="[done ? 'btn-success' : 'btn-secondary']"
      v-on:click="checkDone"
    >
      {{ bool }}
    </button>
    <p class="todoItem__text">{{ text }}</p>
    <button class="btn btn-danger todoItem__btn todoItem__btn_remove" v-on:click="removeTask(index)">Remove</button>
  </li>
</template>
<script>
export default {
  props: {
    id: Number,
    index: Number,
    text: String,
    done: Boolean,
    removeTask: Function,
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
      return !this.done ? "in order" : "complited";
    },
  },
};
</script>
<style>
.todoItem {
  display: flex;
  justify-content: space-between;
}
.todoItem__btn {
  width: 100px;
}
.todoItem__text {
  padding-left: 20px;
}
</style>