<template>
  <div>
    <ul class="taskList list-group">
      <router-link class="taskList__item list-group-item-success" tag="li" v-for="id in 5" :key="id+key" :to="'/task/' + id">
        <a class="taskList__link nav-link">Task {{ id }}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return{
      key: Date.now(),
    }
  }
};
</script>

<style>
.taskList {
  display: flex;
  flex-direction: column;
}
.taskList__item {
  width: 100%;
  list-style-type: none;
  height: 50px;
  
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
</style>