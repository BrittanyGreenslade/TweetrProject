<template>
  <section>
    <form action="javascript:void(0)">
      <p>User must not update all fields if not necessary</p>
      <input
        type="text"
        id="editUsername"
        name="usernameInput"
        placeholder="Update Username"
      />
      <input
        type="text"
        id="editEmail"
        name="emailInput"
        placeholder="Update Email"
      />
      <input
        type="password"
        id="editPassword"
        name="passwordInput"
        placeholder="Update Password"
      />
      <textarea
        name="bioInput"
        id="editBio"
        placeholder="Update Bio"
      ></textarea>
      <label for="birthdateInput">Update Birthdate:</label>
      <input
        type="text"
        id="editBirthdate"
        name="birthdateInput"
        placeholder="YYYY/MM/DD"
      />
      <input @click="editUserProfile" type="text" id="updateBtn" value="Save" />
    </form>
    <h4>{{ loginStatus }}</h4>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-profile-form",
  data() {
    return {
      loginStatus: "",
    };
  },
  computed: {
    loginToken() {
      return this.$store.state.currentUserInfo.loginToken;
    },
  },
  methods: {
    editUserProfile() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            username: document.getElementById("editUsername").value,
            email: document.getElementById("editEmail").value,
            password: document.getElementById("editPassword").value,
            bio: document.getElementById("editBio").value,
            birthdate: document.getElementById("editBirthdate").value,
            loginToken: this.loginToken,
          },
        })
        .then((res) => {
          this.loginStatus = "Profile updated!";
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
