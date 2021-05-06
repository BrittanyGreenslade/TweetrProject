<template>
  <div>
    <h1>News Feed</h1>
    <current-user-post-tweet />
    <!-- <current-user-tweets /> -->
    <section>
      <all-tweets-follow />
    </section>
  </div>
</template>

<script>
// import CurrentUserTweets from "@/components/CurrentUserTweets.vue";
import AllTweetsFollow from "../components/AllTweetsFollow.vue";
import CurrentUserPostTweet from "../components/CurrentUserPostTweet.vue";

export default {
  components: {
    // CurrentUserTweets,
    AllTweetsFollow,
    CurrentUserPostTweet,
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
