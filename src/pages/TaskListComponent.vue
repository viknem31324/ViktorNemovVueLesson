<template>
  <div class="taskList">
    <ul class="taskList__list list-group">
      <router-link
        class="taskList__item list-group-item-success"
        tag="li"
        v-for="id in 10"
        :key="id + key"
        :to="{
          name: 'task',
          params: { id: id },
          query: { desc: 'desc', title: 'title' },
        }"
      >
        <a class="taskList__link nav-link">Task {{ id }}</a>
      </router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: Date.now(),
    };
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