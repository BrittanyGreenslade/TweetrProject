<template>
  <div>
    Login
    <form action="javascript:void(0)">
      <input
        type="text"
        id="emailInput"
        name="emailInput"
        placeholder="Email"
      />
      <!-- <label for="passwordInput">Password:</label> -->
      <input
        type="password"
        id="passwordInput"
        name="passwordInput"
        placeholder="Password"
      />
      <input @click="attemptLogin" type="button" id="loginBtn" value="Login" />
    </form>
    <h4 id="loginStatus"></h4>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login-form",
  data() {
    return {
      password: "",
      loginStatus: "",
    };
  },
  methods: {
    attemptLogin() {
      this.loginStatus = "Logging in...";
      axios
        .request({
          url: "https://tweeterest.ml/api/login",
          method: "POST",
          data: {
            email: document.getElementById("emailInput").value,
            password: document.getElementById("passwordInput").value,
          },
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": `${process.env.VUE_APP_API_KEY}`,
            //this process calls the .env.local file
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
