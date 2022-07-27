<template>
  <div class="wrapper">
    <h1 class="title">{{ message }}</h1>
    <div class="statistic">
      <div class="statistic__complited btn btn-primary">
        Completed tasks {{ taskCompl }}
      </div>
      <div class="statistic__all btn btn-primary">All tasks {{ taskAll }}</div>
      <div class="statistic__percent btn btn-primary">
        Percent completed taskslist {{ taskComplPercent }}%
      </div>
    </div>
    <checkSelectTask
      v-bind:check="check"
      @checkTab="checkTab"
    ></checkSelectTask>

    <input type="search" class="searchTask" v-model="search" />

    <p class="info" v-if="taskAll === 0">Please add new task</p>
    <div class="list-group">
      <AppTodoItem
        v-for="task in searchHandler(check)"
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
import selectTask from "./components/selectTask";
export default {
  data() {
    return {
      newTextTask: "",
      search: "",
      check: "all",
      message: "Hello from Vue App",
      todoItems: [],
    };
  },
  components: {
    AppTodoItem: todoItem,
    checkSelectTask: selectTask,
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
    checkTab(a) {
      this.check = a;
    },
    searchHandler(check) {
      let arr = [];
      if (check === "all") {
        arr = this.todoItems;
      } else if (check === "compl") {
        arr = this.todoItems.filter((item) => item.done == true);
      } else if (check === "outst") {
        arr = this.todoItems.filter((item) => item.done == false);
      }
      return arr.filter((task) => {
        return task.text.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  computed: {
    taskCompl() {
      let age = this.todoItems.filter((item) => item.done == true);
      return age.length;
    },
    taskAll() {
      return this.todoItems.length;
    },
    taskComplPercent() {
      if (this.taskAll === 0) {
        return 0;
      }
      return Math.round((this.taskCompl * 100) / this.taskAll);
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
.statistic {
  display: flex;
  width: 600px;
  justify-content: space-between;
  padding: 20px;
}
.info {
  font-size: 18px;
  margin: 0;
  padding: 10px;
}
.searchTask {
  max-width: 200px;
  margin: 10px;
}
</style>
