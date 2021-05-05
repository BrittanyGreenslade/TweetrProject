<template>
  <div>
    <button @click="logout" id="logoutBtn">Logout</button>
    <current-user />
    <h4>{{ loginStatus }}</h4>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import CurrentUser from "../components/CurrentUser.vue";

export default {
  components: {
    CurrentUser,
  },
  data() {
    return {
      loginStatus: "",
      // paramId: this.$router.params.userId,
    };
  },

  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  methods: {
    //called in logout fn
    navigateToLogin() {
      this.$router.push({ name: "Login" });
    },
    //logs user out and deletes cookie/updates store
    logout() {
      axios
        .request({
          url: "https://tweeterest.ml/api/login",
          method: "DELETE",
          data: {
            loginToken: this.loginToken,
          },
        })
        .then((res) => {
          setTimeout(this.navigateToLogin, 1500);
          cookies.remove("loginToken");
          this.$store.commit("updateLoginToken", "");
          cookies.remove("currentUserInfo");
          this.$store.commit("updateCurrentUserInfo", "");
          this.loginStatus = "Logging you out!";
          //user this if "didn't user res" error shows and no data sent back
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
button {
  border: 1px solid black;
}
</style>
