<template>
  <div>
    <all-tweets />
    <!-- <all-tweets-dont-follow /> -->
  </div>
</template>

<script>
import AllTweets from "../components/AllTweets.vue";
// import AllTweetsDontFollow from "../components/AllTweetsDontFollow.vue";
export default {
  components: {
    AllTweets,
    // AllTweetsDontFollow,
  },
  data() {
    return {
      allUsers: [],
    };
  },
  methods: {},
};
</script>

<style scoped></style>
