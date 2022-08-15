<template>
  <div class="dashboard">
    <div class="dashboard__taskList">
      <TaskListComponent></TaskListComponent>
    </div>
    <div class="dashboard__task task">
      <div class="task__id">{{ id }}</div>
      <div class="task__left">
        <div class="task__title alert alert-success" @click="showTitle = true">
          <h2 v-if="!showTitle" class="task__text">
            {{ title }}
          </h2>
          <input
            v-else
            type="text"
            v-model="title"
            v-focus
            v-blur="createTitle"
            @keyup.enter="createTitle"
            class="task__input input-title"
          />
        </div>
        <div class="task__desc alert alert-success" @click="showDesc = true">
          <p v-if="!showDesc" class="task__text">
            {{ desc }}
          </p>
          <input
            v-else
            type="text"
            v-model="desc"
            v-focus
            v-blur="createDesc"
            @keyup.enter="createDesc"
            class="task__input input-desc"
          />
        </div>
      </div>
      <div class="task__right">
        <div class="task__date">
          <div class="task__created">date created {{ created }}</div>
          <div class="task__updated">date updated {{ updated }}</div>
        </div>
        <button
          class="btn task__btn"
          v-bind:class="[done ? 'btn-success' : 'btn-secondary']"
          v-on:click="[doneTask(id, done), done = !done]"
        >
          {{ !done ? "in order" : "complited"  }}
        </button>
        <button
          class="btn btn-danger task__btn task__btn_remove"
          v-on:click="[removeTask(id), $router.push('/tasklist')]"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TaskListComponent from "./TaskListComponent.vue";
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params["id"],
      task: this.$route.query.task,
      title: this.$route.query.task.title,
      desc: this.$route.query.task.desc,
      done: this.$route.query.task.done,
      created: this.$route.query.task.created,
      updated: this.$route.query.task.updated,
      showTitle: false,
      showDesc: false,
      doneTask: this.$route.query.doneTask,
      removeTask: this.$route.query.removeTask,
      taskPush: this.$route.query.taskPush,
      createdDay: this.$route.query.createdDay,
    };
  },
  methods: {
    async createTitle() {
      this.showTitle = false;
      if (this.title !== "") {
        try {
          await axios.patch(`${this.$root.baseURL}/${this.id}`, {
            title: this.title,
            updated: this.createdDay,
          });
          this.updated = this.createdDay;
        } catch (e) {
          console.error(e);
        }
      }
    },
    async createDesc() {
      this.showDesc = false;
      if (this.title !== "") {
        try {
          await axios.patch(`${this.$root.baseURL}/${this.id}`, {
            desc: this.desc,
            updated: this.createdDay,
          });
          this.updated = this.createdDay;
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
  watch: {
    $route(toR) {
      this.id = toR.params["id"];
      this.task = toR.query.task;
      this.title = toR.query.task.title;
      this.desc = toR.query.task.desc;
      this.done = toR.query.task.done;
      this.created = toR.query.task.created,
      this.updated = toR.query.task.updated,
      this.doneTask = toR.query.doneTask;
      this.removeTask = toR.query.removeTask;
      this.taskPush = toR.query.taskPush;
      this.createdDay = toR.query.createdDay;
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
  padding: 0;
}
.dashboard__task {
  width: 70%;
  border: 3px solid black;
  border-radius: 20px;
  padding-top: 50px;
}
.task__id {
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
  color: green;
}
.task__left {
  display: flex;
  flex-direction: column;
  width: 70%;
}
.task__title {
  padding: 30px;
  font-size: 15px;
  cursor: pointer;
  max-width: 800px;
  width: 100%;
  margin: 10px;
}
.task__desc {
  padding: 30px;
  font-size: 15px;
  cursor: pointer;
  max-width: 800px;
  width: 100%;
  margin: 10px;
}
.task__right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 10px;
}
.task__date {
  padding-bottom: 30px;
}
.task__btn {
  width: 100px;
  margin-bottom: 20px;
}
.task {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.task__btn {
  width: 100px;
  height: 50px;
}
h2 {
  font-size: 30px;
}
.task__text p {
  margin: 0;
  font-size: 15px;
}
.task__block {
  cursor: pointer;
  max-width: 800px;
  width: 100%;
  margin: 0;
}
.task__input {
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 15px;
  outline: none;
}
.input-title {
  font-size: 30px;
  font-weight: bold;
}
</style>