<template>
  <section>
    <h3>New here? Create an account</h3>
    <h4>{{ loginStatus }}</h4>
    <form action="javascript:void(0)">
      <input type="text" id="emailInput" placeholder="Email" required />
      <input type="text" id="usernameInput" placeholder="Username" required />
      <input
        type="password"
        id="passwordInput"
        placeholder="Password"
        required
      />
      <textarea
        name="bioInput"
        id="bioInput"
        placeholder="User Bio"
        required
      ></textarea>
      <label for="birthdateInput">Birthdate</label>
      <input
        type="text"
        id="userBirthdate"
        name="birthdateInput"
        placeholder="YYYY-MM-DD"
        required
      />
      <button @click="userSignup" id="signupBtn">Sign Up</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "sign-up-form",
  data() {
    return {
      loginStatus: "",
    };
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    // loginToken() {
    // //   return this.$store.state.loginToken;
    // },
  },
  methods: {
    navigateToProfile() {
      this.$router.push({
        path: `/profile/${this.currentUserInfo.userId}`,
      });
    },
    userSignup() {
      axios
        .request({
          url: `api/users`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //   "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
            //   //this process calls the .env.local file that's storing our api key so github
            //   //can't see it - for ~safety~
          },
          data: {
            email: document.getElementById("emailInput").value,
            username: document.getElementById("usernameInput").value,
            password: document.getElementById("passwordInput").value,
            bio: document.getElementById("bioInput").value,
            birthdate: document.getElementById("userBirthdate").value,
          },
        })
        .then((res) => {
          console.log(res.data);
          setTimeout(this.navigateToProfile, 1500);
          cookies.set("currentUserInfo", res.data);
          cookies.set("loginToken", res.data.loginToken);
          this.$store.commit("updateCurrentUserInfo", res.data);
          this.$store.commit("updateLoginToken", res.data.loginToken);
          this.loginStatus = "You've signed up! Logging you in...";
        })
        .catch((err) => {
          this.loginStatus = "Sorry, signup was incomplete. Please try again.";
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#signupBtn {
  width: 80px;
  justify-self: right;
}
section {
  display: grid;
  place-items: center;
}
form {
  display: grid;
  row-gap: 5px;
  margin-bottom: 10px;
}
label {
  justify-self: start;
  font-size: 12px;
}
</style>
