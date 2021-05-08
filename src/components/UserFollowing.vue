<template>
  <div>
    <button @click="getFollowing">See following</button>
    <h2>This user is following:</h2>
    <div v-for="user in followingUsers" :key="user.userId">
      <h3>{{ user.username }}</h3>
      <h4>{{ user.email }}</h4>
      <h4>{{ user.birthdate }}</h4>
      <p>{{ user.bio }}</p>
      <button @click="unfollowUser">Unfollow User</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "user-following",
  data() {
    return {
      followingUsers: [],
    };
  },
  props: {
    userId: Number,
  },
  methods: {
    getFollowing() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: { userId: this.userId },
        })
        .then((res) => {
          this.followingUsers = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unfollowUser() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            followId: this.userId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
