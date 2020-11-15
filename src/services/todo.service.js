import axios from "axios";

export const todoService = {
  addTodo,
  fetchTodos,
  deleteTodo,
  updateTodo
};

const server_url = "https://todo-app-vue-node-js.herokuapp.com";

function addTodo(todo, success, failure) {
  let postBody = {
    title: todo.title,
    email: localStorage.getItem("user"),
    note: todo.note,
    completed: todo.completed
  };

  axios
    .post(server_url + "/api/todos/addTodo", postBody, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    .then((response) => {
      success(response);
    })
    .catch((e) => {
      failure(e);
    });
}

function deleteTodo(id, success, failure) {
  let postBody = {
    id: id
  };

  axios
    .post(server_url + "/api/todos/deleteTodo", postBody, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    .then((response) => {
      success(response);
    })
    .catch((e) => {
      failure(e);
    });
}

function updateTodo(todo, success, failure) {
  axios
    .post(server_url + "/api/todos/updateTodo", todo, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    .then((response) => {
      success(response);
    })
    .catch((e) => {
      failure(e);
    });
}

function fetchTodos(success, failure) {
  let postBody = {
    email: localStorage.getItem("user")
  };

  axios
    .post(server_url + "/api/todos/fetchTodos", postBody, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    .then((response) => {
      success(response.data);
    })
    .catch((e) => {
      failure(e);
    });
}
