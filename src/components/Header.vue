<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">ToDos</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav class="username-nav">
            <b-nav-text
              ><div class="username">{{ username }}</div></b-nav-text
            >
          </b-navbar-nav>
          <b-nav-form>
            <b-button size="sm" class="my-2 my-sm-0" @click="logout()"
              >Logout</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "toDoHeader",
  props: ["username"],
  methods: {
    ...mapActions("account", ["logout"]),
  },
};
</script>

<style scoped>
.username-nav {
  margin-right: 20px;
}
.username {
  color: white;
}
</style>
