<template>
  <div>
    <h1>Discover page</h1>

    <all-tweets-dont-follow />
  </div>
</template>

<script>
import AllTweetsDontFollow from "../components/AllTweetsDontFollow.vue";

export default {
  components: { AllTweetsDontFollow },
  data() {
    return {
      allUsers: [],
    };
  },
  methods: {
    // getAllUsers() {
    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/users",
    //       // method:"GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },
    //     })
    //     .then((res) => {
    //       this.allUsers = res.data;
    //       // this.$store.commit("updateAllUsers", res.data);
    //       // console.log(this.allUsers);
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
};
</script>

<style scoped></style>
