<template>
  <div>
    <single-user />
    <button @click="logout" id="logoutBtn">Logout</button>
    <h4>{{ loginStatus }}</h4>
    <button>Edit Profile</button>
    <section id="editProfile">
      <edit-profile />
    </section>

    <button>Delete Profile</button>

    <section>
      <delete-profile />
    </section>

    <section>
      <other-users />
    </section>
  </div>
</template>

<script>
import DeleteProfile from "../components/DeleteProfile.vue";
import EditProfile from "../components/EditProfileForm.vue";
import OtherUsers from "../components/OtherUsers.vue";

import axios from "axios";
import cookies from "vue-cookies";
import SingleUser from "../components/SingleUser.vue";

export default {
  components: {
    EditProfile,
    DeleteProfile,
    OtherUsers,
    SingleUser,
  },
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
    navigateToHome() {
      this.$router.push({ name: "Login" });
    },
    logout() {
      axios
        .request({
          url: "https://tweeterest.ml/api/login",
          method: "DELETE",
          data: {
            loginToken: this.loginToken,
          },
        })
        .then((res) => {
          setTimeout(this.navigateToHome, 1500);
          cookies.remove("loginToken");
          this.$store.commit("updateLoginToken", "");
          this.loginStatus = "Logging you out!";
          //user this if "didn't user res" error shows and no data sent back
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
