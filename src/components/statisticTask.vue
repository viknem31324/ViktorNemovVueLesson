<template>
  <div class="statistic">
    <div class="statistic__complited btn btn-primary">
      Completed tasks {{ taskCompl }}
    </div>
    <div class="statistic__all btn btn-primary">All tasks {{ taskAll }}</div>
    <div class="statistic__percent btn btn-primary">
      Percent completed taskslist {{ taskComplPercent }}%
    </div>
  </div>
</template>
<script>
export default {
  props: ["todoItems", "taskCompl", "taskAll", "taskComplPercent"],
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