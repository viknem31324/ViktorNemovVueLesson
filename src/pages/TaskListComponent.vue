<template>
  <div class="taskList">
    <ul class="taskList__list list-group">
      <router-link
        class="taskList__item list-group-item-success"
        tag="li"
        v-for="(task, inx) in taskList"
        :key="inx + key"
        :to="{
          name: 'task',
          params: {id: task.id},
          query: { task: task },
        }"
      >
        <a class="taskList__link nav-link">Task {{ task.id}}</a>
      </router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3001/taskList";

export default {
  data() {
    return {
      key: Date.now(),
      taskList: [],
    };
  },
  async created() {
    try {
      const ref = await axios.get(baseURL);
      this.taskList = ref.data;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
.taskList__list {
  display: flex;
  flex-direction: column;
}
.taskList__item {
  width: 100%;
  list-style-type: none;
  height: 50px;
  border-radius: 10px;
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
.taskList__element {
  /* width: 70%; */
}
</style>