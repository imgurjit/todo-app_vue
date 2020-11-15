import Vue from "vue";
import Router from "vue-router";

import LoginPage from "../components/Login.vue";
import RegisterPage from "../components/Register.vue";
import TodosPage from "../components/Todos.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { path: "/", component: LoginPage },
    { path: "/login", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/todos", component: TodosPage },

    // otherwise redirect to home
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});
