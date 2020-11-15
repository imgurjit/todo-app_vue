import axios from "axios";

export const userService = {
  register,
  login
};

const server_url = "https://todo-app-vue-node-js.herokuapp.com";

function register(user, success, failure) {
  let postBody = {
    email: user.emailId,
    password: user.password,
    name: user.name
  };

  axios
    .post(server_url + "/api/user/register", postBody)
    .then((response) => {
      success(response);
    })
    .catch((e) => {
      failure(e);
    });
}

function login(emailId, password, success, failure) {
  let postBody = {
    email: emailId,
    password: password
  };

  axios
    .post(server_url + "/api/user/login", postBody)
    .then((response) => {
      success(response);
    })
    .catch((e) => {
      failure(e);
    });
}
