<template>
  <div class="dashboard">
    <div class="dashboard__taskList">
      <TaskListComponent></TaskListComponent>
    </div>
    <div class="dashboard__task task">
      <h1 class="task__title">Task by Id {{ id }} {{ $route.query.title }}</h1>
      <div class="task__desc">{{ $route.query.desc }}</div>
    </div>
  </div>
</template>

<script>
import TaskListComponent from "./TaskListComponent.vue";
export default {
  data() {
    return {
      id: this.$route.params["id"],
    };
  },
  watch: {
    $route(toR) {
      this.id = toR.params["id"];
    },
  },
  components: {
    TaskListComponent,
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