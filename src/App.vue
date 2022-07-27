<template>
  <div class="wrapper">
    <h1 class="title">{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello from Vue App",
    };
  },
};
</script>

<style>
.wrapper {
  padding: 10px;
}
.title {
  font-size: 20px;
  text-align: center;
}
</style>
