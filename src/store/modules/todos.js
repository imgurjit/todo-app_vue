import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const state = {
  todos: [
    {
      id: uuidv4(),
      title: "Wake up",
      completed: false,
    },
    {
      id: uuidv4(),
      title: "Take Bath",
      completed: false,
    },
    {
      id: uuidv4(),
      title: "Eat Breakfast",
      completed: false,
    },
    {
      id: uuidv4(),
      title: "Eat Lunch",
      completed: false,
    },
    {
      id: uuidv4(),
      title: "Take Nap",
      completed: false,
    },
    {
      id: uuidv4(),
      title: "Sleep",
      completed: false,
    },
  ],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5");
    commit("setTodos", response.data);
  },
  addTodo({ commit }, todo) {
    commit("newTodo", todo);
  },
  deleteTodo({ commit }, id) {
    commit("removeTodo", id);
  },
  updateTodo({ commit }, updTodo) {
    commit("updateTodo", updTodo);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
