<template>
  <div>
    <div v-for="tweet in tweetsNotFollowing" :key="tweet.tweetId">
      <h2>{{ tweet.usermame }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "all-tweets-dont-follow",
  data() {
    return {
      tweetsNotFollowing: [],
    };
  },
  computed: {
    followingUsers() {
      return this.$store.state.followingUsers;
    },
    allTweets() {
      return this.$store.state.allTweets;
    },
  },
  mounted() {
    this.$store.dispatch("getFollowing");
    this.notFollowingTweets();
  },
  methods: {
    notFollowingTweets() {
      for (let i = 0; i < this.allTweets.length; i++) {
        for (let i = 0; i < this.followingUsers.length; i++) {
          // if (this.allTweets[i].userId === this.followingUsers[i].userId) {
          //   this.tweetsNotFollowing = this.allTweets[i];
          // }
          console.log(this.allTweets[i]);
          console.log(this.followingUsers[i]);
        }
      }
    },
  },
};
</script>

<style scoped></style>
