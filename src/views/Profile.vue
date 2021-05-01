<template>
  <div>
    <router-view />
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
      <users-users />
    </section>

    <!-- <section>
      <single-user />
    </section> -->
  </div>
</template>

<script>
import DeleteProfile from "../components/DeleteProfile.vue";
import EditProfile from "../components/EditProfileForm.vue";
import UsersUsers from "../components/UsersUsers.vue";

import axios from "axios";
import cookies from "vue-cookies";

export default {
  components: {
    EditProfile,
    DeleteProfile,
    UsersUsers,
  },
  data() {
    return {
      loginStatus: "",
    };
  },
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    userId() {
      return this.$store.state.userId;
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
          console.log(res);
          //how can I get rid of this res console log?
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
