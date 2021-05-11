<template>
  <div>
    <div v-for="tweet in allTweets" :key="tweet.tweetId">
      <h2>{{ tweet.username }}</h2>
      <p>{{ tweet.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "all-tweets-dont-follow",
  computed: {
    // followingUsers() {
    //   return this.$store.state.followingUsers;
    // },
    allTweets() {
      return this.$store.state.allTweets;
    },
  },
  mounted() {
    this.$store.dispatch("getAllTweets");
  },
  methods: {},
};
</script>

<style scoped></style>
