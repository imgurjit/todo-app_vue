<template>
  <div class="container login">
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <h2 class="heading">Login</h2>
        <form class="form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="emailId">Email ID</label>
            <input
              type="text"
              v-model="emailId"
              name="emailId"
              class="form-control"
              :class="{ 'is-invalid': submitted && !emailId }"
            />
            <div v-show="submitted && !emailId" class="invalid-feedback">
              Username is required
            </div>
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              v-model="password"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': submitted && !password }"
            />
            <div v-show="submitted && !password" class="invalid-feedback">
              Password is required
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Login</button>
            <router-link to="/register" class="btn btn-link"
              >Register</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      emailId: "",
      password: "",
      submitted: false,
    };
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    showToast(toaster, append = false) {
      this.counter++;
      this.$bvToast.toast(`Toast ${this.counter} body content`, {
        title: `Toaster ${toaster}`,
        toaster: toaster,
        solid: true,
        appendToast: append,
      });
    },
    handleSubmit() {
      this.submitted = true;
      const { emailId, password } = this;
      if (emailId && password) this.login({ emailId, password });
    },
  },
};
</script>

<style scoped>
.heading {
  display: flex;
  justify-content: center;
}
.login {
  margin-top: 100px;
}
.form {
  margin-top: 50px;
}
</style>
