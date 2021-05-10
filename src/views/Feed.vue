<template>
  <div>
    <h1>News Feed</h1>
    <post-tweet />
    <!-- <current-user-tweets /> -->
    <section>
      <!-- <all-tweets /> -->
      <all-tweets-follow />
    </section>
  </div>
</template>

<script>
// import CurrentUserTweets from "@/components/CurrentUserTweets.vue";
// import AllTweets from "../components/AllTweets.vue";
import PostTweet from "../components/PostTweet.vue";
import AllTweetsFollow from "../components/AllTweetsFollow.vue";
export default {
  components: {
    // CurrentUserTweets,
    // AllTweets,
    PostTweet,
    AllTweetsFollow,
  },

  computed: {},
  methods: {},
};
</script>

<style scoped></style>
