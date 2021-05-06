<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  name: "other-user-profile",
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
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
            userId: this.selectedUserId,
          },
        })
        .then((res) => {
          this.$router.push({
            path: `/profile/${this.selectedUserId}`,
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
