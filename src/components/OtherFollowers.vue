<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  name: "other-user-followers",
  computed: {
    otherUserInfo() {
      return this.$store.state.otherUserInfo;
    },
  },
  methods: {
    getOtherUserFollowers() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            userId: this.otherUserInfo.userId,
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
