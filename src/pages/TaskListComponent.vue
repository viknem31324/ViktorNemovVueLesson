<template>
  <div class="taskList">
    <h2 class="taskList__title">My task</h2>

    <statisticTask
      v-show="checkVisibl"
      v-bind:taskCompl="taskCompl"
      v-bind:taskAll="taskAll"
      v-bind:taskComplPercent="taskComplPercent"
    ></statisticTask>

    <selectTask
      v-show="checkVisibl"
      v-bind:check="check"
      @checkTab="checkTab"
      v-bind:arrTab="arrTab"
    ></selectTask>

    <input
      type="search"
      class="searchTask border border-info"
      v-model="search"
      placeholder="search..."
    />

    <p class="info" v-if="taskAll === 0">Please add new task</p>

    <ul class="taskList__list list-group">
      <li
        class="taskList__item list-group-item-success item"
        v-for="(task, inx) in searchHandler(check)"
        :key="inx + key"
      >
        <button
          v-show="checkVisibl"
          class="btn item__btn"
          v-bind:class="[task.done ? 'btn-success' : 'btn-secondary']"
          v-on:click="doneTask(task.id, task.done)"
        >
          {{ !task.done ? "in order" : "complited" }}
        </button>
        <div class="item__id">{{ task.id }}</div>
        <div class="item__title" @click="taskPush(task)">
          {{ task.title }}
        </div>

        <button
          v-show="checkVisibl"
          class="btn btn-danger item__btn item__btn_remove"
          v-on:click="removeTask(task.id)"
        >
          Remove
        </button>
      </li>
    </ul>

    <div class="addTask" v-show="checkVisibl">
      <input
        v-model.trim="newTitleTask"
        class="addTask__input border border-success"
        type="text"
        placeholder="Add new Task"
      />
      <button
        v-bind:disabled="newTitleTask == ''"
        v-on:click="addNewTask"
        class="btn btn-success addTask__btn"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import selectTask from "./selectTask.vue";
import statisticTask from "./statisticTask";

export default {
  data() {
    return {
      key: Date.now(),
      now: new Date(),
      upDay: new Date(Date.now()),
      taskList: [],
      checkVisibl: this.$root.checkDash,
      newTitleTask: "",
      search: "",
      check: "all",
      arrTab: [
        { key: "all", text: "display all tasks" },
        { key: "compl", text: "display completed tasks" },
        { key: "outst", text: "display outstanding tasks" },
      ],
    };
  },
  methods: {
    async addNewTask() {
      if (!this.taskList) {
        return;
      }
      try {
        const res = await axios.post(`${this.$root.baseURL}`, {
          title: this.newTitleTask,
          desc: "",
          created: this.createdDay,
          updated: this.createdDay,
          done: false,
        });
        this.taskList = [...this.taskList, res.data];
        this.newTitleTask = "";
      } catch (e) {
        console.error(e);
      }
    },
    async removeTask(id) {
      this.$root.checkDash = true;
      try {
        await axios.delete(`${this.$root.baseURL}/${id}`, { id: id });
        this.taskList.splice(id);
      } catch (e) {
        console.error(e);
      }
    },
    async doneTask(id, done) {
      try {
        await axios.patch(`${this.$root.baseURL}/${id}`, {
          done: !done,
          updated: this.createdDay,
        });
        this.taskList = this.taskList.map((task) => {
          if (task.id === id) {
            task.done = !done;
          }
          return task;
        });
      } catch (e) {
        console.error(e);
      }
    },
    checkTab(a) {
      this.check = a;
    },
    searchHandler(check) {
      let arr = [];
      if (check === "all") {
        arr = this.taskList;
      } else if (check === "compl") {
        arr = this.taskList.filter((item) => item.done == true);
      } else if (check === "outst") {
        arr = this.taskList.filter((item) => item.done == false);
      }
      return arr.filter((task) => {
        return task.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    taskPush(task) {
      this.$router
        .push({
          name: "task",
          params: { id: task.id },
          query: {
            task: task,
            doneTask: this.doneTask,
            removeTask: this.removeTask,
            taskPush: this.taskPush,
            createdDay: this.createdDay,
          },
        })
        .catch(() => {});
      return (this.$root.checkDash = false);
    },
  },

  computed: {
    bool() {
      return !this.task.done ? "in order" : "complited";
    },
    taskCompl() {
      let age = this.taskList.filter((item) => item.done);
      return age.length;
    },
    taskAll() {
      return this.taskList.length;
    },
    taskComplPercent() {
      if (this.taskAll === 0) {
        return 0;
      }
      return Math.round((this.taskCompl * 100) / this.taskAll);
    },
    createdDay() {
      return (
        this.now.getDate() +
        " / 0" +
        (this.now.getMonth() + 1) +
        " / " +
        this.now.getFullYear()
      );
    },
  },
  async created() {
    try {
      const ref = await axios.get(this.$root.baseURL);
      this.taskList = ref.data;
    } catch (e) {
      console.error(e);
    }
    return (this.$root.checkDash = true);
  },
  async updated() {
    await axios
      .get(this.$root.baseURL)
      .then((response) => (this.taskList = response.data));
  },
  components: {
    selectTask,
    statisticTask,
  },
};
</script>

<style scoped>
.addTask {
  display: flex;
  padding: 30px;
}
.addTask__input {
  width: 500px;
  height: 40px;
  border-radius: 10px;
  outline: none;
}
.addTask__btn {
  width: 100px;
}
.info {
  font-size: 18px;
  margin: 0;
  padding: 10px;
}
.searchTask {
  width: 100%;
  max-width: 500px;
  margin: 20px;
  border-radius: 5px;
  outline: none;
}
.taskList {
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
}
.taskList__title {
  text-align: center;
  padding-bottom: 30px;
}
.taskList__list {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.taskList__item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  list-style-type: none;
  height: 50px;
  border-radius: 10px;
}
.item__id {
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
  color: green;
}
.item__title {
  text-align: center;
  width: 100%;
  cursor: pointer;
}
.taskList__item:not(:last-child) {
  margin-bottom: 10px;
}
.taskList__link {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 50px;
}
.item__btn {
  width: 200px;
}
</style>