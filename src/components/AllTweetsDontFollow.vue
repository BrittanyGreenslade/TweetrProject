<template>
  <div>
    <section
      id="tweetsContainer"
      v-for="tweet in allTweetsDontFollow"
      :key="tweet.tweetId"
    >
      <h2>{{ tweet.username }}</h2>
      <h3>{{ tweet.createdAt }}</h3>
      <p>{{ tweet.content }}</p>
      <!-- <button @click="navigateToUserProfile(recentAllUsersTweet.userId)">
        View user's profile
      </button> -->
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "all-tweets-dont-follow",
  data() {
    return {
      allTweetsDontFollow: [],
    };
  },
  mounted() {
    this.viewTweetsDontFollow();
  },
  methods: {
    //     navigateToUserProfile(userId) {
    //   this.$router.push({ path: `/profile/${userId}` });
    //   this.$store.commit("updateSelectedUserId", userId);
    // },
    viewTweetsDontFollow() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          //  method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          //   params: {
          //     userId: this.currentUserInfo.userId,
          //   },
        })
        .then((res) => {
          this.allTweetsDontFollow = res.data;

          // this.$store.commit("updateCurrentUserTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
          // console.log(userId);
        });
    },
  },
};
</script>

<style scoped></style>
