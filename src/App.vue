<template>
  <div class="wrapper">
    <navbar-component></navbar-component>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarComponent from './pages/NavbarComponent.vue';
export default {
  components: { NavbarComponent },
  data() {
    return {};
  },
  created() {
    // this.checkLogin = this.getStorage("checkLogin");
  },
  updated() {
    // this.checkLogin = this.getStorage("checkLogin");
  },
  methods: {
    checkTask() {
      this.$root.checkDash = true;
    },
    checkOut() {
      this.setStorage(false);
      this.$root.checkDash = true;
    },
    getStorage(val) {
      return JSON.parse(localStorage.getItem(val));
    },
    setStorage(val) {
      localStorage.setItem("checkLogin", JSON.stringify(val));
    },
  },
};
</script>

<style>
.collapse {
  display: flex;
  justify-content: center;
}
.nav-item {
  width: 150px;
}
.nav-item:not(:last-child) {
  margin-right: 40px;
}
</style>