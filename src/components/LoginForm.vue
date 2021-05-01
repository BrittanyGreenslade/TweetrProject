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
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "login-form",
  data() {
    return {
      loginStatus: "",
    };
  },
  // mounted() {
  //   if (this.loginToken) {
  //     setTimeout(this.navigateToProfile, 1500);
  //     // this.navigateToProfile();
  //     // console.log(this.loginToken);
  //   }
  // },

  methods: {
    //this isn't returned as data from api so had to put it as its own separate fn
    updateUserPassword() {
      let userPassword = document.getElementById("passwordInputLogin").value;
      return this.$store.commit("updateUserPassword", userPassword);
    },
    // updateLoginToken() {
    //   let updatedLoginToken = cookies.get("loginToken");
    //   this.$store.commit("updateLoginToken", updatedLoginToken);
    // },
    navigateToProfile() {
      this.$router.push({ path: "/profile" });
    },
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
          setTimeout(this.navigateToProfile, 1500);
          //updating things in the store with data returned from API call
          this.$store.commit("updateUserId", res.data.userId);
          this.$store.commit("updateUserEmail", res.data.email);
          this.$store.commit("updateUserName", res.data.username);
          this.$store.commit("updateUserBio", res.data.bio);
          this.$store.commit("updateUserBirthdate", res.data.birthdate);
          cookies.set("loginToken", res.data.loginToken);
          this.$store.commit("updateLoginToken", cookies.get("loginToken"));
          this.updateUserPassword();
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
