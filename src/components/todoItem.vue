<template>
  <li class="todoItem list-group-item">
    <button
      class="btn todoItem__btn"
      v-bind:class="[task.done ? 'btn-success' : 'btn-secondary']"
      v-on:click="checkDone"
    >
      {{ bool }}
    </button>

    <div @click="showInput = true" class="todoItem__block alert alert-success">
      <p v-if="!showInput" class="todoItem__text">{{ txt }}</p>
      <input
        v-else
        type="text"
        v-model="txt"
        v-focus
        @blur="createText"
        @keyup.enter="createText"
        class="todoItem__input"
      />
    </div>

    <button
      class="btn btn-danger todoItem__btn todoItem__btn_remove"
      v-on:click="removeTask(task)"
    >
      Remove
    </button>
  </li>
</template>
<script>
export default {
  props: ['task'],
  data() {
    return {
      txt: this.task.text,
      val: this.task.done,
      showInput: false,
    };
  },
  methods: {
    removeTask(task) {
      this.$emit('removeTask', task);
    },
    createText(event) {
      let inp = event.target;
      if(this.txt !== ''){
      this.showInput = false;
      this.$emit("createText", [this.txt, this.task.id]);
      }else inp.focus();
    },
    checkDone() {
      this.val = !this.val;
      this.$emit("checkDone", [this.val, this.task.id]);
    },
  },
  computed: {
    bool() {
      return !this.task.done ? "in order" : "complited";
    },
  },
};
</script>
<style>
.todoItem {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.todoItem__btn {
  width: 100px;
}
.todoItem__text {
  margin: 0;
}
.todoItem__block {
  cursor: pointer;
  max-width: 800px;
  width: 100%;
  margin: 0;
}
.todoItem__input {
  width: 100%;
  background: transparent;
}
</style>