<template>
  <div>
    <div v-for="userInfo in otherUserInfo" :key="userInfo.userId">
      <h2>{{ userInfo.username }}</h2>
      <h3>{{ userInfo.birthdate }}</h3>
      <h4>{{ userInfo.bio }}</h4>
      <p>{{ userInfo.email }}</p>
    </div>
    <other-user-tweets />
  </div>
</template>

<script>
import axios from "axios";
import OtherUserTweets from "./OtherUserTweets.vue";
export default {
  components: { OtherUserTweets },
  name: "other-user-profile",
  props: {
    userId: Number,
  },
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
    selectedUserId() {
      return this.$store.state.selectedUserId;
    },
    otherUserInfo() {
      return this.$store.state.otherUserInfo;
    },
  },
  mounted() {
    this.viewUserProfile();
  },
  methods: {
    viewUserProfile() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          // method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.$store.commit("updateOtherUserInfo", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
