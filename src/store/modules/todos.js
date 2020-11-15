// import { v4 as uuidv4 } from "uuid";
import { todoService } from "../../services";

const state = {
  todos: [],
  showLoader: false
};

const getters = {
  allTodos: (state) => state.todos,
  loaderStatus: (state) => state.showLoader
};

const actions = {
  fetchTodos({ dispatch, commit }) {
    dispatch("displayLoader");
    todoService.fetchTodos(
      (response) => {
        commit("setTodos", response.data);
        dispatch("dismissLoader");
      },
      () => {
        dispatch("dismissLoader", { root: true });
        dispatch("alert/error", "Unable to load todos, please try again by refreshing your page.", { root: true });
      }
    );
  },
  addTodo({ dispatch, commit }, todo) {
    dispatch("displayLoader", { root: true });
    return new Promise((resolve, reject) => {
      todoService.addTodo(
        todo,
        (response) => {
          commit("newTodo", response.data);
          resolve();
        },
        (error) => {
          dispatch("dismissLoader", { root: true });
          reject(error);
        }
      );
    });
  },
  deleteTodo({ dispatch, commit }, id) {
    dispatch("displayLoader", { root: true });
    return new Promise((resolve, reject) => {
      todoService.deleteTodo(
        id,
        () => {
          commit("removeTodo", id);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  updateTodo({ dispatch, commit }, updTodo) {
    dispatch("displayLoader", { root: true });
    return new Promise((resolve, reject) => {
      todoService.updateTodo(
        updTodo,
        () => {
          commit("updateTodo", updTodo);
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  displayLoader({ commit }) {
    commit("displayLoader");
  },
  dismissLoader({ commit }) {
    commit("dismissLoader");
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.push(todo),
  removeTodo: (state, id) => (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
  displayLoader(state) {
    state.type = "display-loader";
    state.showLoader = true;
  },
  dismissLoader(state) {
    state.type = "dismiss-loader";
    state.showLoader = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
