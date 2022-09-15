<template>
  <div class="pageContainer">
    <div v-for="user in userProfile" :key="user.userId">
      <h2>{{ user.username }}</h2>
      <h3>{{ user.birthdate }}</h3>
      <h4>{{ user.bio }}</h4>
      <p>{{ user.email }}</p>
      <router-link class="navUserProf" :to="`/users`">
        <p>Back to all users</p></router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "other-user-profile",
  data() {
    return {
      userProfile: [],
    };
  },
  props: {
    userId: Number,
  },

  mounted() {
    this.viewUserProfile();
  },
  methods: {
    viewUserProfile() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.userProfile = res.data;
        })
        .catch((err) => {
          console.log(err);
          console.log(this.userProfile);
        });
    },
  },
};
</script>

<style scoped>
.pageContainer {
  margin-top: 40px;
  width: 90%;
}
</style>
