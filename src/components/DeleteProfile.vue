<template>
  <section>
    <form action="javascript:void(0)">
      <input
        type="text"
        id="emailInputDelete"
        name="emailInput"
        placeholder="Email"
        required
      />
      <input
        type="password"
        id="passwordInputDelete"
        name="passwordInput"
        placeholder="Password"
        required
      />
      <input
        @click="deleteProfile"
        type="text"
        id="deleteBtn"
        value="Delete Account"
      />
    </form>
    <h4>{{ loginStatus }}</h4>
  </section>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "delete-profile",
  data() {
    return {
      loginStatus: "",
    };
  },
  computed: {
    loginToken() {
      return this.$store.state.currentUserInfo.loginToken;
    },
    userPassword() {
      return this.$store.state.userPassword;
    },
  },
  methods: {
    navigateToHome() {
      this.$router.push({ name: "Login" });
    },

    //you can store json string as a cookie
    deleteProfile() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            password: document.getElementById("passwordInputDelete").value,
          },
        })
        .then((res) => {
          console.log(res);
          setTimeout(this.navigateToHome, 1500);
          this.$store.commit("updateLoginToken", "");
          cookies.remove("loginToken");
          this.loginStatus = "Profile deleted! Redirecting...";
        })
        .catch((err) => {
          console.log(err);
          this.loginStatus = "Sorry, an error occurred. Please try again.";
        });
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  row-gap: 5px;
  width: 100px;
}
input,
textarea {
  border: 1px solid black;
}
</style>
