<template>
  <div class="bar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link
            v-for="link in arrLink"
            :key="link.path"
            tag="li"
            class="nav-item btn btn-outline-secondary"
            exact
            :to="{ path: link.path }"
            active-class="btn-outline-success"
          >
            <a class="nav-link">{{ link.text }}</a>
          </router-link>
          <button
            class="btn btn-outline-secondary bar__btn"
            active-class="btn-outline-success"
            v-show="$root.checkLogin"
            @click="exit()"
          >
            Exit
          </button>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arrLink: [
        { text: "Home", path: "/", check: !this.$root.checkLogin },
        { text: "About", path: "/about", check: true },
        { text: "tasklist", path: "/tasklist", check: this.$root.checkLogin },
      ],
    };
  },
  methods: {
    exit() {
      this.$router.push("/");
      this.$root.checkLogin = false;
    },
  },
};
</script>
<style scoped>
.bar__btn {
  width: 150px;
}
</style>
    
