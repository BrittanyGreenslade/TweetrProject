<template>
  <div><button @click="unfollowUser">Unfollow User</button></div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "unfollow-user",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
    };
  },
  props: {
    followId: Number,
  },
  methods: {
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
            followId: this.followId,
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
