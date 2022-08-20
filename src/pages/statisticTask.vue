<template>
  <div class="statistic">
    <div class="statistic__complited btn btn-primary">
      Completed tasks {{ taskCompl }}
    </div>
    <div class="statistic__all btn btn-primary">All tasks {{ taskAll }}</div>
    <div class="statistic__percent btn btn-primary">
      Percent completed taskslist {{ taskComplPercent() }}%
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    taskComplPercent() {
      if (this.taskAll === 0) {
        return 0;
      }
      return Math.round((this.taskCompl * 100) / this.taskAll);
    },
  },
  computed: {
    ...mapGetters(["allTaskList", "taskCompl", "taskAll"]),
  },
};
</script>
<style>
.statistic {
  display: flex;
  width: 600px;
  justify-content: space-between;
  padding: 20px;
}
</style>