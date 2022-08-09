<template>
  <div class="wrapper">
    <h1 class="title">{{ message }}</h1>

    <statisticTask
      v-bind:taskCompl="taskCompl"
      v-bind:taskAll="taskAll"
      v-bind:taskComplPercent="taskComplPercent"
    ></statisticTask>

    <selectTask
      v-bind:check="check"
      @checkTab="checkTab"
      v-bind:arrTab="arrTab"
    ></selectTask>

    <input type="search" class="searchTask" v-model="search" />

    <p class="info" v-if="taskAll === 0">Please add new task</p>

    <ul class="list-group">
      <todoItem
        is="todo-item"
        v-for="task in searchHandler(check)"
        v-bind:key="task.key"
        v-bind:task="task"
        @checkDone="checkDone"
        @createText="createText"
        @removeTask="removeTask(task)"
      ></todoItem>
    </ul>

    <div class="addTask">
      <input
        v-model.trim="newTextTask"
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

    <addList>
      <li v-for="i in [0, 1, 2, 3, 4, 5]" v-bind:key="i">{{ i }}</li>
    </addList>
  </div>
</template>

<script>
import todoItem from "./components/todoItem";
import selectTask from "./components/selectTask";
import statisticTask from "./components/statisticTask";
import addList from "./components/addList";
export default {
  data() {
    return {
      newTextTask: "",
      search: "",
      check: "all",
      message: "Hello from Vue App",
      todoItems: [],
      arrTab: [
        { key: "all", text: "display all tasks" },
        { key: "compl", text: "display completed tasks" },
        { key: "outst", text: "display outstanding tasks" },
      ],
    };
  },
  components: {
    todoItem,
    selectTask,
    statisticTask,
    addList,
  },
  computed: {
    taskCompl() {
      let age = this.todoItems.filter((item) => item.done);
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
  mounted() {
    if (localStorage.getItem("todoItems")) {
      try {
        this.todoItems = JSON.parse(localStorage.getItem("todoItems"));
      } catch (e) {
        localStorage.removeItem("todoItems");
      }
    }
  },
  methods: {
    addNewTask() {
      if (!this.todoItems) {
        return;
      }
      this.todoItems.push({
        key: Date.now(),
        text: this.newTextTask,
        done: false,
      });
      this.newTextTask = "";
      this.saveTask();
    },
    removeTask(task) {
      let taskIndex = this.todoItems.indexOf(task);
      this.todoItems.splice(taskIndex, 1);
      this.saveTask();
    },
    saveTask() {
      const parsed = JSON.stringify(this.todoItems);
      localStorage.setItem("todoItems", parsed);
    },
    checkDone(arr) {
      let a = this.todoItems.find((x) => x.key === arr[1]);
      a.done = arr[0];
      this.saveTask();
    },
    createText(arr) {
      let a = this.todoItems.find((x) => x.key === arr[1]);
      a.text = arr[0];
      this.saveTask();
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