<template>
  <div class="home">
    <form class="login" action="" method="post" novalidate="true">
      <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control"
            id="inputEmail3"
            v-model.trim="login.email"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label"
          >Password</label
        >
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword3"
            v-model.trim="login.password"
          />
        </div>
      </div>
      <div class="home__btn">
        <router-link to="/registration">registration?</router-link>
        <button
          type="submit"
          @click.prevent.stop="validLogin"
          class="btn btn-primary login__btn"
        >
          Login
        </button>
      </div>
      <valid-form-error-component
        v-bind:errors="errors"
      ></valid-form-error-component>
    </form>
  </div>
</template>

<script>
import ValidFormErrorComponent from "./ValidFormErrorComponent.vue";
// import axios from "axios";

export default {
  components: {
    ValidFormErrorComponent,
  },
  data() {
    return {
      errors: [],
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async validLogin(e) {
      this.errors = [];

      if (!this.login.email) {
        this.errors.push("Enter your email");
      } else if (!this.validEmail(this.login.email)) {
        this.errors.push("Enter correct email");
      }

      if (!this.login.password) {
        this.errors.push("Enter your password");
      }

      if (!this.errors.length) {
        // try {
        //   const ref = await axios.get(this.$root.baseURL);
        // console.log(ref.data[0].email);
        // console.log(ref.data[0].password);

        // for (let i = 0; i < ref.data.length; i++) {
        //   if (
        //     this.login.email === ref.data[i].email &&
        //     this.login.password === ref.data[i].password
        //   ) {
        //     this.$router.push({
        //       name: "taskList",
        //     });
        //     this.setStorage(true, ref.data[i]);
        //   } else {
        //     this.errors.push("invalid login or password");
        //   }
        // }
        this.$router.push({
          name: "taskList",
        });
        this.$root.checkLogin = true;
      }
      e.preventDefault();
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    setStorage(bool) {
      localStorage.setItem("checkLogin", JSON.stringify(bool));
    },
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