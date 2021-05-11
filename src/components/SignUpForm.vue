<template>
  <section>
    New here? Create an account
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
        placeholder="YYYY/MM/DD"
        required
      />
      <input @click="userSignup" type="button" id="signupBtn" value="Sign Up" />
    </form>

    <h4>{{ loginStatus }}</h4>
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
          url: "https://tweeterest.ml/api/users",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
            //this process calls the .env.local file that's storing our api key so github
            //can't see it - for ~safety~
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
          setTimeout(this.navigateToProfile, 1500);
          cookies.set("currentUserInfo", res.data);
          cookies.set("loginToken", res.data.loginToken);
          this.$store.commit(
            "updateCurrentUserInfo",
            cookies.get("currentUserInfo")
          );
          this.$store.commit("updateLoginToken", cookies.get("loginToken"));
          this.loginStatus = "You've signed up! Logging you in...";
        })
        .catch((err) => {
          this.loginStatus =
            "Sorry, a user with that username or email already exists. Please try again.";
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
section {
  display: grid;
  place-items: center;
}
form {
  display: grid;
  row-gap: 5px;
}

/* // does this block of code need to be accssed by just this component, or lots of 
// components? */
</style>
