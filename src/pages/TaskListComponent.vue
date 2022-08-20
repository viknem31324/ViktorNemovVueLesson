<template>
  <div class="taskList">
    <h2 class="taskList__title">My task</h2>

    <statisticTask v-show="checkVisibl"></statisticTask>

    <selectTask v-show="checkVisibl"></selectTask>

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
        v-for="(task, inx) in searchHandler"
        :key="inx + d"
      >
        <button
          v-show="checkVisibl"
          class="btn item__btn"
          v-bind:class="[task.done ? 'btn-success' : 'btn-secondary']"
          v-on:click="doneTask({ task, createdDay, inx })"
        >
          {{ !task.done ? "in order" : "complited" }}
        </button>
        <div class="item__id">{{ task.id }}</div>
        <div class="item__title" @click="taskPush(task, inx)">
          {{ task.title }}
        </div>

        <button
          v-show="checkVisibl"
          class="btn btn-danger item__btn item__btn_remove"
          v-on:click="removeTask({ task, inx })"
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
        v-on:click="
          [
            addNewTask({
              title: newTitleTask,
              desc: '',
              created: createdDay,
              updated: createdDay,
              done: false,
              arrLength: taskAll,
            }),
            (newTitleTask = ''),
          ]
        "
        class="btn btn-success addTask__btn"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import selectTask from "./selectTask.vue";
import statisticTask from "./statisticTask";
import checkMixin from "./mixins";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      search: "",
      d: Date.now(),
      checkVisibl: this.$root.checkDash,
      newTitleTask: "",
    };
  },

  mixins: [checkMixin],
  methods: {
    ...mapActions([
      "axioTaskList",
      "axioTask",
      "addNewTask",
      "removeTask",
      "doneTask",
      "checkTab",
      "taskPush",
      "taskComplPercent",
    ]),
    ...mapMutations(["visibleTask"]),
    taskPush(task, inx) {
      this.axioTask(inx);
      this.$router
        .push({
          name: "task",
          params: { id: task.id },
          query: {
            task: task,
            inx: inx
          }
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapGetters([
      "getVisTask",
      "allTaskList",
      "taskCompl",
      "taskAll",
      "createdDay",
      "findAllTask",
      "findCompilTask",
      "findOutsTask",
      "getCheck",
    ]),
    searchHandler() {
      if (this.getCheck === "all") {
        this.visibleTask(this.findAllTask);
      } else if (this.getCheck === "compl") {
        this.visibleTask(this.findCompilTask);
      } else if (this.getCheck === "outst") {
        this.visibleTask(this.findOutsTask);
      }
      return this.getVisTask.filter((task) => {
        return task.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.axioTaskList();
  },
  async created() {
    if (!this.$root.checkLogin) {
      this.$router.push("/");
    }
    this.$root.checkDash = true;
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