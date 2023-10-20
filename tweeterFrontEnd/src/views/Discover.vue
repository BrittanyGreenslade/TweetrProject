<template>
  <div>
    <div class="pageContainer">
      <h1>Discover</h1>
      <post-tweet />
      <all-tweets />
    </div>
  </div>
</template>

<script>
import AllTweets from "../components/AllTweets.vue";
import PostTweet from "../components/PostTweet.vue";
export default {
  components: {
    AllTweets,
    PostTweet,
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
