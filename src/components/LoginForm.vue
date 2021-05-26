<template>
  <div class="pageContainer">
    <div id="introInfo">
      <h3>Crafting a greener world</h3>
      <p>
        A platform on which to share sustainability tips, products, and
        information
      </p>
    </div>
    <div id="successContainer"></div>
    <div id="loginFormContainer">
      <h3>Login</h3>
      <h4>{{ loginStatus }}</h4>
      <form id="loginForm" action="javascript:void(0)">
        <input
          type="text"
          id="emailInputLogin"
          name="emailInput"
          placeholder="Email"
          required
        />

        <input
          type="password"
          id="passwordInputLogin"
          name="passwordInput"
          placeholder="Password"
          required
        />
        <button @click="attemptLogin" id="loginBtn">
          Login
        </button>
      </form>
    </div>
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
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  data() {
    return {
      loginStatus: "",
    };
  },
  methods: {
    navigateToFeed() {
      this.$router.push({
        path: "/feed",
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
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": `${process.env.VUE_APP_API_KEY}`,
            //this process calls the .env.local file
          },
          data: {
            email: document.getElementById("emailInputLogin").value,
            password: document.getElementById("passwordInputLogin").value,
          },
        })
        .then((res) => {
          this.loginStatus = "Logging in...";
          cookies.set("currentUserInfo", res.data);
          this.$store.commit(
            "updateCurrentUserInfo",
            cookies.get("currentUserInfo")
          );
          cookies.set("loginToken", res.data.loginToken);
          this.$store.commit("updateLoginToken", cookies.get("loginToken")),
            //navigation is chill thx to this
            setTimeout(this.navigateToFeed, 1500);
          this.loginStatus = "Logged in! Redirecting...";
          // this.loginSuccess();
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
#loginForm {
  display: grid;
  place-items: center;
  row-gap: 5px;
}
#loginBtn {
  width: 75px;
  justify-self: right;
}
label {
  justify-self: start;
}
p {
  font-weight: 600;
  font-style: italic;
}
#loginFormContainer {
  margin-top: 45px;
}
#introInfo {
  display: grid;
  row-gap: 5px;
}
</style>
