<template>
  <div>
    <form
      class="row g-3 registration"
      action=""
      method="post"
      novalidate="true"
    >
      <div class="col-md-12">
        <label for="validationServer01" class="form-label">Имя</label>
        <input
          type="text"
          class="form-control"
          id="validationServer01"
          value=""
          required
          v-model.trim="form.name"
        />
      </div>
      <div class="col-md-12">
        <label for="validationServer02" class="form-label">Фамилия</label>
        <input
          type="text"
          class="form-control"
          id="validationServer02"
          value=""
          required
          v-model.trim="form.lastname"
        />
      </div>
      <div class="col-md-12">
        <label for="validationServerUsername" class="form-label">Email</label>
        <div class="input-group">
          <span class="input-group-text" id="inputGroupPrepend3">@</span>
          <input
            type="email"
            class="form-control"
            id="validationServerUsername"
            aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
            required
            v-model.trim="form.email"
          />
        </div>
      </div>
      <div class="col-md-12">
        <label for="validationServer05" class="form-label">Password</label>
        <input
          type="text"
          class="form-control"
          id="validationServer05"
          aria-describedby="validationServer05Feedback"
          required
          v-model.trim="form.password"
        />
      </div>
      <div class="col-12 registration__btn">
        <router-link to="/">login?</router-link>
        <button
          class="btn btn-primary"
          type="submit"
          @click.prevent.stop="validRegistration"
        >
          Registration
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
export default {
  components: {
    ValidFormErrorComponent,
  },
  data() {
    return {
      errors: [],
      form: {
        name: "",
        lastname: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    validRegistration(e) {
      this.errors = [];

      if (!this.form.email) {
        this.errors.push("Enter your email");
      } else if (!this.validEmail(this.form.email)) {
        this.errors.push("Enter correct email");
      }

      if (!this.form.password) {
        this.errors.push("Enter your password");
      }
      if (!this.form.name) {
        this.errors.push("Enter your name");
      }
      if (!this.form.lastname) {
        this.errors.push("Enter your lastname");
      }

      if (!this.errors.length) {
        this.$router.push("/tasklist");
        return true;
      }

      e.preventDefault();
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>

<style>
.registration {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
}
.registration__btn {
  display: flex;
  justify-content: space-between;
}
</style>