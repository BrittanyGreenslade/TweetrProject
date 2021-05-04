<template>
  <div>
    <button @click="logout" id="logoutBtn">Logout</button>
    <!-- <h4>{{ loginStatus }}</h4> -->

    <button v-if="toggleEditOn === false" @click="toggleEditOn = !toggleEditOn">
      Edit Profile
    </button>
    <button
      v-if="toggleDeleteOn === false"
      @click="toggleDeleteOn = !toggleDeleteOn"
    >
      Delete Profile
    </button>
    <button @click="toggleViewUsersOn = !toggleViewUsersOn">
      View All Users
    </button>
    <button @click="grabSelectedUserId(currentUserInfo.userId)">
      My Profile
    </button>

    <section v-if="toggleEditOn === true" id="editProfile">
      <edit-profile />
      <button @click="toggleEditOn = !toggleEditOn">Cancel</button>
    </section>

    <section v-if="toggleDeleteOn === true">
      <delete-profile />
      <button @click="toggleDeleteOn = !toggleDeleteOn">Cancel</button>
    </section>
    <section v-if="toggleViewUsersOn === true">
      <other-users />
    </section>
    <section>
      <single-user />
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
      toggleEditOn: false,
      toggleDeleteOn: false,
      toggleViewUsersOn: false,
      loginToken: cookies.get("loginToken"),
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },
  computed: {
    selectedUserId() {
      return this.$store.state.selectedUserId;
    },
  },
  methods: {
    grabSelectedUserId(userId) {
      this.$store.commit("updateSelectedUserId", userId);
    },
    navigateToUserProfile() {
      this.$router.push();
    },
    viewAllUsers() {
      if (this.selecteduserId === null)
        this.toggleViewUsersOn === !this.toggleViewUsersOn,
          this.$router.push({
            path: "/profile/otherUsers",
          });
    },
    navigateToLogin() {
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
          setTimeout(this.navigateToLogin, 1500);
          cookies.remove("loginToken");
          this.$store.commit("updateLoginToken", "");
          cookies.remove("currentUserInfo");
          this.$store.commit("updateCurrentUserInfo", "");
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

<style scoped>
button {
  border: 1px solid black;
}
</style>
