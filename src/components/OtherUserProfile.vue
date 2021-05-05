<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  name: "other-user-profile",
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
            userId: this.currentUserId,
          },
        })
        .then((res) => {
          this.$router.push({
            name: "Profile",
            // params: { userId: this.otherUserInfo.userId },
          }),
            console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
