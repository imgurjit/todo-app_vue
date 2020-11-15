<template>
  <div class="container register">
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <h2 class="heading">Register</h2>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="form" @submit.prevent="handleSubmit(onSubmit)">
            <div class="form-group">
              <label for="name">Name</label>
              <validation-provider rules="required" v-slot="{ errors }">
                <input
                  type="text"
                  v-model="user.name"
                  name="name"
                  class="form-control"
                />
                <span class="error">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <label for="emailId">Email ID</label>
              <validation-provider rules="email" v-slot="{ errors }">
                <input
                  type="text"
                  v-model="user.emailId"
                  name="emailId"
                  class="form-control"
                />
                <span class="error">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <label htmlFor="password">Password</label>
              <validation-provider rules="required" v-slot="{ errors }">
                <input
                  type="password"
                  v-model="user.password"
                  name="password"
                  class="form-control"
                />
                <span class="error">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" :disabled="status.registering">
                Register
              </button>
              <img
                v-show="status.registering"
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
              <router-link to="/login" class="btn btn-link">Cancel</router-link>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        name: "",
        emailId: "",
        password: "",
      },
      submitted: false,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["register"]),
    onSubmit() {
      this.submitted = true;
      this.register(this.user);
    },
  },
};
</script>

<style scoped>
h2 {
  display: flex;
  justify-content: center;
}
.error {
  color: red;
  font-size: 12px;
}
.heading {
  display: flex;
  justify-content: center;
}
.register {
  margin-top: 100px;
}
.form {
  margin-top: 50px;
}
</style>