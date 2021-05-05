<template>
  <div>
    Login
    <form action="javascript:void(0)">
      <input
        type="text"
        id="emailInputLogin"
        name="emailInput"
        placeholder="Email"
        required
      />
      <!-- <label for="passwordInput">Password:</label> -->
      <input
        type="password"
        id="passwordInputLogin"
        name="passwordInput"
        placeholder="Password"
        required
      />
      <input @click="attemptLogin" type="button" id="loginBtn" value="Login" />
    </form>
    <h4>{{ loginStatus }}</h4>
    <!-- <div id="successContainer"></div> -->
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
// import lottie from "lottie-web";
export default {
  name: "login-form",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    // currentUserInfo() {
    //   return this.$store.state.currentUserInfo;
    // },
  },
  data() {
    return {
      loginStatus: "",
      // currentUserInfo: cookies.get("currentUserInfo"),
    };
  },
  // mounted() {
  //   this.$store.commit("updateLoginToken", cookies.get("loginToken")),
  //     this.$store.commit(
  //       "updateCurrentUserInfo",
  //       cookies.get("currentUserInfo")
  //     );
  // },

  methods: {
    navigateToProfile() {
      this.$router.push({
        path: "/profile/:userId",
        // params: { userId: this.currentUserInfo.userId },
      });
    },
    // loginSuccess() {
    //   lottie.loadAnimation({
    //     container: document.getElementById("successContainer"),
    //     path: "@/assets/animations/success.json",
    //     loop: false,
    //     autoplay: true,
    //     renderer: "svg",
    //     name: "success",
    //   });
    // },
    attemptLogin() {
      axios
        .request({
          url: "https://tweeterest.ml/api/login",
          method: "POST",
          data: {
            email: document.getElementById("emailInputLogin").value,
            password: document.getElementById("passwordInputLogin").value,
          },
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": `${process.env.VUE_APP_API_KEY}`,
            //this process calls the .env.local file
          },
        })
        .then((res) => {
          this.loginStatus = "Logging in...";
          //makes transition chill btwn navigations
          cookies.set("currentUserInfo", res.data);
          this.$store.commit(
            "updateCurrentUserInfo",
            cookies.get("currentUserInfo")
          );
          cookies.set("loginToken", res.data.loginToken);
          this.$store.commit("updateLoginToken", cookies.get("loginToken")),
            setTimeout(this.navigateToProfile, 1500);
          this.loginStatus = "Logged in! Redirecting...";
        })
        .catch((err) => {
          console.log(err);
          this.loginStatus = "Sorry, an error occurred. Please try again";
        });
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  grid-auto-flow: column;
  column-gap: 10px;
}
input,
textarea {
  border: 1px solid black;
}
</style>
