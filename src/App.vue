<template>
  <div class="wrapper">
    <h1 class="title">{{ message }}</h1>
    <div class="list-group">
      <AppTodoItem
        v-for="task in todoItems"
        v-bind:key="task.id"
        v-bind:id="task.id"
        v-bind:text="task.text"
        v-bind:done="task.done"
        @checkDone="checkDone"
      ></AppTodoItem>
    </div>
    <div class="addTask">
      <input
        v-bind:value="newTextTask"
        v-on:input="newTextTask = $event.target.value"
        class="addTask__input"
        type="text"
        placeholder="Add new Task"
      />
      <button
        v-bind:disabled="newTextTask == ''"
        v-on:click="addNewTask"
        class="addTask__btn"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import todoItem from "./components/todoItem";
export default {
  data() {
    return {
      newTextTask: "",
      message: "Hello from Vue App",
      todoItems: [
        { id: 1, text: "task 1", done: false },
        { id: 2, text: "task 2", done: false },
        { id: 3, text: "task 3", done: true },
        { id: 4, text: "task 4", done: false },
        { id: 5, text: "task 5", done: false },
      ],
    };
  },
  components: {
    AppTodoItem: todoItem,
  },
  methods: {
    addNewTask: function () {
      this.todoItems.push({
        id: this.todoItems.length + 1,
        text: this.newTextTask,
        done: false,
      });
      this.newTextTask = "";
    },
    checkDone(arr) {
      let a = this.todoItems.find((x) => x.id === arr[1]);
      a.done = arr[0];
    },
  },
};
</script>

<style>
.wrapper {
  padding: 10px;
}
.title {
  font-size: 20px;
  text-align: center;
}
.addTask {
  display: flex;
  padding: 10px;
}
</style>
