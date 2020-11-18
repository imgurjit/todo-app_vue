import { userService } from "../../services";
import { router } from "../../helpers/router";

const user = localStorage.getItem("user");
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

const actions = {
  register({ dispatch, commit }, user) {
    commit("registerRequest");
    userService.register(
      user,
      (response) => {
        if (response.data["errMsg"]) {
          dispatch("alert/error", response.data["errMsg"], { root: true });
          commit("registerFailure");
        } else {
          router.push("/login");
          setTimeout(() => {
            dispatch("alert/success", "Registration successful", { root: true });
          });
          commit("registerSuccess");
        }
      },
      (error) => {
        console.log("Error --> ", error);
        commit("registerFailure");
        dispatch("alert/error", error.msg, { root: true });
      }
    );
  },
  login({ dispatch, commit }, { emailId, password }) {
    dispatch("displayLoader", undefined, { root: true });
    commit("loginRequest", { emailId });
    userService.login(
      emailId,
      password,
      (response) => {
        if (response.data["errMsg"]) {
          dispatch("alert/error", response.data["errMsg"], { root: true });
          dispatch("dismissLoader", undefined, { root: true });
          commit("loginFailure", response.data["errMsg"]);
        } else {
          commit("loginSuccess", emailId);
          localStorage.setItem("token", response.data);
          localStorage.setItem("user", emailId);
          dispatch("dismissLoader", undefined, { root: true });
          router.push("/todos");
        }
      },
      (error) => {
        commit("loginFailure", error);
        dispatch("alert/error", "Unable to login, please try again", { root: true });
        dispatch("dismissLoader", undefined, { root: true });
      }
    );
  },
  logout({ dispatch, commit }) {
    dispatch("displayLoader", undefined, { root: true });
    commit("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch("dismissLoader", undefined, { root: true });
    router.push("/login");
  }
};

const mutations = {
  registerRequest(state) {
    state.status = { registering: true };
  },
  registerFailure() {
    state.status = { registering: false };
  },
  registerSuccess() {
    state.status = { registering: false };
  },
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
