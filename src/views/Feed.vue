<template>
  <div>
    <div class="pageContainer">
      <h1>News Feed</h1>
      <post-tweet />
      <section>
        <all-tweets-follow />
      </section>
    </div>
  </div>
</template>

<script>
import PostTweet from "../components/PostTweet.vue";
import AllTweetsFollow from "../components/AllTweetsFollow.vue";
export default {
  components: {
    PostTweet,
    AllTweetsFollow,
  },
};
</script>

<style scoped></style>
