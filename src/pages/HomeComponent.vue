<template>
  <div class="home">
    <login-component></login-component>
  </div>
</template>

<script>
import LoginComponent from "./LoginComponent.vue";
import checkMixin from "./mixins";

export default {
  data() {
    return {
    };
  },
  components: {
    LoginComponent,
  },
  mixins: [checkMixin],
  created(){
    if(this.$root.checkLogin){
      this.$router.push('/tasklist')
    }
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