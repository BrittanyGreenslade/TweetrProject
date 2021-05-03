<template>
  <div></div>
</template>

<script>
export default {
  name: "current-user-followers",
  computed: {
    currentUserId() {
      return this.$store.state.currentUserInfo.userId;
    },
    methods: {
      getCurrentUserFollowers() {
        axios
          .request({
            url: "https://tweeterest.ml/api/follows",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
            },
            data: {
              userId: this.currentUserId,
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
  },
};
</script>

<style scoped></style>
