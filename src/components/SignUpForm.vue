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
  computed: {},
  data() {
    return {
      loginStatus: "",
    };
  },
  // mounted() {
  // if (this.loginToken) {
  //   this.getPosts();
  // }
  methods: {
    updateUserPassword() {
      let userPassword = document.getElementById("passwordInput").value;
      return this.$store.commit("updateUserPassword", userPassword);
    },
    navigateToProfile() {
      this.$router.push({ name: "Profile" });
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
            //can't see it ~safety~
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
          // cookies.set("setUserInfo", res.data);
          cookies.set("loginToken", res.data.loginToken);
          this.$store.commit("updateLoginToken", cookies.get("loginToken"));
          this.$store.commit("updateUserId", res.data.userId);
          this.$store.commit("updateUserEmail", res.data.email);
          this.$store.commit("updateUserName", res.data.username);
          this.$store.commit("updateUserBio", res.data.bio);
          this.$store.commit("updateUserBirthdate", res.data.birthdate);
          this.updateUserPassword();
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
input,
textarea {
  border: 1px solid black;
}
/* // does this block of code need to be accssed by just this component, or lots of 
// components? */
</style>
