<template>
  <div><button @click="followUser">Follow this user</button></div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "follow-user",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
    };
  },
  props: {
    followId: Number,
  },
  methods: {
    followUser() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "POST",
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
          console.log(this.followId);
        });
    },
  },
};
</script>

<style scoped></style>
