import Vuex from "vuex";
import Vue from "vue";
import todos from "./modules/todos";
import { account } from "./modules/account";
import { alert } from "./modules/alert";

// Load Vuex
Vue.use(Vuex);

// Create Store
export const store = new Vuex.Store({
  modules: {
    todos,
    account,
    alert
  }
});
