<template>
  <div class="dashboard">
    <div class="dashboard__taskList">
      <TaskListComponent></TaskListComponent>
    </div>
    <div class="dashboard__task task">
      <p>id {{ id }}</p>
      <h1 class="task__title">{{ task.title }}</h1>
      <div class="task__desc">{{ task.desc }}</div>
      <div class="task__created">дата создания {{ task.created }}</div>
      <div class="task__updated">дата обновления {{ task.updated }}</div>
      <button
        class="btn task__btn"
        v-bind:class="[task.done ? 'btn-success' : 'btn-secondary']"
        v-on:click="checkDone"
      >
        {{ bool }}
      </button>
    </div>
  </div>
</template>

<script>
import TaskListComponent from "./TaskListComponent.vue";
export default {
  data() {
    return {
      id: this.$route.params["id"],
      task: this.$route.query.task,
    };
  },
  methods: {
    checkDone() {
      // this.val = !this.val;
      // this.$emit("checkDone", [this.val, this.task.key]);
    },
  },
  watch: {
    $route(toR) {
      this.id = toR.params["id"];
      this.task = toR.query.task;
    },
  },
  components: {
    TaskListComponent,
  },
  computed: {
    bool() {
      return !this.task.done ? "in order" : "complited";
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
}
.dashboard__taskList {
  width: 30%;
}
.dashboard__task {
  width: 70%;
  border: 3px solid black;
  border-radius: 20px;
}
.task__title {
  padding: 30px;
}
.task__desc {
  padding: 30px;
}
</style>