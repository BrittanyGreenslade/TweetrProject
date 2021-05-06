<template>
  <div>
    <h4>{{ loginStatus }}</h4>
    <button @click="logout" id="logoutBtn">Logout</button>
    <current-user v-if="Number(paramId) === currentUserInfo.userId" />

    <other-user-profile v-else />
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import CurrentUser from "../components/CurrentUser.vue";
import OtherUserProfile from "../components/OtherUserProfile.vue";
export default {
  components: {
    CurrentUser,
    OtherUserProfile,
  },
  data() {
    return {
      loginStatus: "",
      paramId: this.$route.params.userId,
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },

  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    // currentUserInfo() {
    //   return this.$store.state.currentUserInfo;
    // },
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
