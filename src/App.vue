<template>
  <div class="wrapper">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link
            v-show="!this.$root.checkLogin"
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
            v-show="this.$root.checkLogin"
            tag="li"
            class="nav-item btn btn-outline-secondary"
            exact
            :to="{ name: 'taskList' }"
            active-class="btn-outline-success"
          >
            <a class="nav-link">tasklist</a>
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
    return {};
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