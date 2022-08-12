<template>
  <div class="home">
    <login-component></login-component>
  </div>
</template>

<script>
import LoginComponent from "./LoginComponent.vue";
export default {
  components: {
    LoginComponent,
  },
};
</script>

<style>
.home__btn {
  display: flex;
  justify-content: space-between;
}
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 100px;
}
.login__btn {
  width: 100%;
  max-width: 200px;
}
.error {
  color: red;
}
</style>