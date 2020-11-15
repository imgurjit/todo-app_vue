

<template>
  <div>
    <div v-if="alert.message" :class="`alert ${alert.type}`">
      {{ alert.message }}
    </div>
    <b-overlay
      :show="showLoader"
      spinner-variant="primary"
      centered
      rounded="sm"
      ><router-view></router-view
    ></b-overlay>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      showLoader: (state) => {
        return state.todos.showLoader;
      },
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
  },
  watch: {
    $route() {
      // clear alert on location change
      this.clearAlert();
    },
  },
};
</script>
