<template>
  <section>
    <img
      v-if="toggleDeleteOn === false"
      @click="toggleDeleteOn = true"
      class="actionIcon"
      src="@/assets/images/trash.svg"
      alt="recycle bin icon - delete tweet button"
    />
    <div v-if="toggleDeleteOn === true">
      Confirm password to delete profile:
      <input
        type="password"
        id="passwordInputDelete"
        name="passwordInput"
        placeholder="Password"
        required
      />
      <img
        class="actionIcon"
        src="@/assets/images/confirm.svg"
        alt="checkmark icon - confirm button"
        @click="toggleDeleteOn = false"
      />
      <img src="" alt="" />
      <img
        @click="toggleDeleteOn = false"
        class="actionIcon"
        src="@/assets/images/close.svg"
        alt="black x - cancel icon"
      />
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
#deleteBtn {
  margin-top: 5px;
  /* justify-self: right; */
  width: 75px;
}
</style>
