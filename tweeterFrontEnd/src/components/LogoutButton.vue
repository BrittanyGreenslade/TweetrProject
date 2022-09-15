<template>
  <button @click="logout" id="logoutBtn">Logout</button>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "logout-button",
  data() {
    return {
      // currentUserInfo: cookies.get("currentUserInfo"),
      // loginToken: cookies.get("loginToken"),
    };
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    loginToken() {
      return this.$store.state.loginToken;
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
          url: `${process.env.VUE_APP_API_URL}/login`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            //   "X-API-Key": `${process.env.VUE_APP_API_KEY}`,
            //   //this process calls the .env.local file
          },
          data: {
            loginToken: this.loginToken,
          },
        })
        .then((res) => {
          cookies.remove("loginToken");
          this.$store.commit("updateLoginToken", "");
          cookies.remove("currentUserInfo");
          this.$store.commit("updateCurrentUserInfo", undefined);
          this.loginStatus = "Logging you out!";
          this.navigateToLogin();
          //use this if "didn't use res" error shows and no data sent back
          res;
        })
        .catch((err) => {
          console.log(this.loginToken);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#logoutBtn {
  margin-top: 5px;
}
</style>
