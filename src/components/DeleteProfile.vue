<template>
  <section>
    <button v-if="toggleDeleteOn === false" @click="toggleDeleteOn = true">
      Delete Profile
    </button>

    <div v-if="toggleDeleteOn === true">
      Enter your email & password to delete your profile:
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

      <button @click="toggleDeleteOn = false">Cancel</button>
    </div>
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
      toggleDeleteOn: false,
    };
  },
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    userPassword() {
      return this.$store.state.userPassword;
    },
  },
  methods: {
    navigateToLogin() {
      this.$router.push({ name: "Login" });
    },

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
          res;
          setTimeout(this.navigateToLogin, 1500);
          cookies.remove("loginToken");
          this.$store.commit("updateLoginToken", "");
          cookies.remove("currentUserInfo");
          this.$store.commit("updateCurrentUserInfo", "");
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
textarea,
button {
  border: 1px solid black;
}
</style>
