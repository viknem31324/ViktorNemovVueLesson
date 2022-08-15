<template>
  <div class="wrapper">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link
            v-show="!checkLogin"
            tag="li"
            class="nav-item btn btn-outline-secondary"
            exact
            to="/"
            active-class="btn-outline-success"
          >
            <a class="nav-link">Home</a>
          </router-link>

          <router-link
            tag="li"
            class="nav-item btn btn-outline-secondary"
            exact
            to="/about"
            active-class="btn-outline-success"
          >
            <a class="nav-link">About</a>
          </router-link>

          <router-link
            v-show="checkLogin"
            tag="li"
            class="nav-item btn btn-outline-secondary"
            exact
            :to="{
              name: 'taskList',
            }"
            active-class="btn-outline-success"
          >
            <a class="nav-link" @click="checkTask">tasklist</a>
          </router-link>
          <router-link
            v-show="checkLogin"
            tag="li"
            class="nav-item btn btn-outline-secondary"
            exact
            to="/"
            active-class="btn-outline-success"
          >
            <a class="nav-link" @click="checkOut">Exit</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return { checkLogin: false };
  },
  created() {
    this.checkLogin = this.getStorage("checkLogin");
  },
  updated() {
    this.checkLogin = this.getStorage("checkLogin");
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