<template>
  <section>
    <img
      v-if="toggleDeleteOn === false"
      @click="toggleDeleteOn = true"
      class="actionIcon"
      src="@/assets/images/trash.svg"
      alt="recycle bin icon - delete tweet button"
    />
    <div class="tweetCard" v-if="toggleDeleteOn === true">
      Confirm password to delete profile:
      <input
        type="password"
        id="passwordInputDelete"
        name="passwordInput"
        placeholder="Password"
        required
      />
      <div id="btnsContainer">
        <img
          @click="toggleDeleteOn = false"
          class="actionIcon"
          src="@/assets/images/close.svg"
          alt="black x - cancel icon"
        />
        <button id="deleteBtn" @click="deleteProfile">Confirm</button>
      </div>
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
          url: `${process.env.VUE_APP_API_URL}/users`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
  width: 80px;
  margin-right: 2px;
}
.tweetCard {
  display: grid;
  position: absolute;
  z-index: 10px;
  right: 12%;
  height: 120px;
  font-style: italic;
  row-gap: 5px;
  width: 70%;
}
input {
  width: 95%;
}
#btnsContainer {
  display: grid;
  grid-auto-flow: column;
  width: 45%;
  place-items: center;
  justify-self: end;
}
</style>
