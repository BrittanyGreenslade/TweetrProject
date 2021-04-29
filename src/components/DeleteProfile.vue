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
  </section>
</template>

<script>
import axios from "axios";
// import cookies from "vue-cookies";
export default {
  name: "delete-profile",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    userPassword() {
      return this.$store.state.userPassword;
    },
  },
  methods: {
    // checkLoginToken() {
    //   console.log(this.loginToken);
    // },
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
        })
        .catch((err) => {
          console.log(err);
          console.log(this.loginToken);
          console.log(this.userPassword);
        });

      // deleteProfile() {
      //   axios
      //     .request({
      //       url: "https://tweeterest.ml/api/users",
      //       method: "DELETE",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
      //       },
      //       data: {
      //         loginToken: this.loginToken,
      //         password: document.getElementById("passwordInputDelete").value,
      //       },
      //     })
      //     .then((res) => {
      //       console.log(res);
      //       // this.$store.commit("updateLoginToken", "");
      //       cookies.remove("loginToken");
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // },
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
