<template>
  <div>
    <Header v-bind:username="user"></Header>
    <div class="container">
      <div style="display: flex; justify-content: center; margin-top: 10px">
        <b-button variant="outline-primary" @click="modalShow = !modalShow"
          >Add Todo</b-button
        >
        <b-modal
          id="modal-prevent-closing"
          v-model="modalShow"
          centered
          @ok="handleOk"
          title="Add Todo"
        >
          <b-form ref="form" @submit.prevent="onSubmit">
            <b-form-group id="input-group-1" label="Title:" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.title"
                required
                placeholder="Enter title"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Note:" label-for="input-2">
              <b-form-textarea
                id="input-2"
                v-model="form.note"
                placeholder="Enter note"
              ></b-form-textarea>
            </b-form-group>
          </b-form>
        </b-modal>
      </div>
      <div class="row">
        <div class="col">
          <div class="todos">
            <div class="no-todo" v-if="allTodos.length <= 0">
              No Todo found, add your first Todo
            </div>
            <div v-for="todo in allTodos" :key="todo.id" class="todo">
              <b-form-checkbox
                size="lg"
                v-model="todo.completed"
                @change="toggleTodo(todo)"
              >
                <div v-bind:class="{ 'is-complete': todo.completed }">
                  {{ todo.title }}
                </div>
              </b-form-checkbox>
              <i
                @click="handleDeleteTodo(todo._id)"
                class="fas fa-trash-alt"
              ></i>
              <div>{{ todo.note }}</div>
              <div>{{ todo.date | formatDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import Header from "./Header";
import moment from "moment";

export default {
  name: "Todos",
  components: {
    Header,
  },
  data() {
    return {
      title: "",
      form: {
        title: "",
        note: "",
      },
      modalShow: false,
    };
  },
  methods: {
    ...mapActions(["addTodo", "fetchTodos", "deleteTodo", "updateTodo"]),
    toggleTodo(todo) {
      const updTodo = {
        id: todo._id,
        title: todo.title,
        note: todo.note,
        email: localStorage.getItem("user"),
        completed: !todo.completed,
      };
      this.updateTodo(updTodo).then(
        () => {
          this.fetchTodos();
          this.showToast("success", "Info", "Todo updated successfully.");
        },
        () => {
          this.showToast("danger", "Error", "Error while updating todo.");
        }
      );
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) return;

      const newTodo = {
        title: this.form.title,
        note: this.form.note,
        completed: false,
      };

      this.addTodo(newTodo).then(
        () => {
          this.fetchTodos();
          this.showToast("success", "Info", "Todo Added successfully.");
        },
        () => {
          this.showToast("danger", "Error", "Error while adding todo.");
        }
      );
      this.form.title = "";
      this.form.note = "";
      this.modalShow = false;
    },
    handleDeleteTodo(id) {
      this.deleteTodo(id).then(
        () => {
          this.fetchTodos();
          this.showToast("success", "Info", "Todo deleted successfully.");
        },
        () => {
          this.showToast("danger", "Error", "Error while deleting todo.");
        }
      );
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    showToast(type, title, message) {
      setTimeout(() => {
        this.$bvToast.toast(message, {
          title: title,
          toaster: "b-toaster-bottom-center",
          solid: true,
          variant: type,
          autoHideDelay: 3000,
        });
      }, 500);
    },
  },
  filters: {
    formatDate: function (date) {
      if (date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      }
    },
  },
  computed: { ...mapGetters(["allTodos"]), ...mapState("account", ["user"]) },
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
  margin-top: 10px;
}
.todo {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
}
i {
  color: black;
  cursor: pointer;
  float: right;
}
.is-complete {
  text-decoration: line-through;
}
.no-todo {
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin-top: 50px;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
