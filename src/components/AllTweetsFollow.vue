<template>
  <div>
    <button @click="getOtherUsersTweets">Other Users' tweets</button>
    <section
      v-for="otherUsersTweet in this.otherUsersTweets"
      :key="otherUsersTweet.tweetId"
      id="tweetsContainer"
    >
      <h3>{{ otherUsersTweet.username }}</h3>
      <p>{{ otherUsersTweet.content }}</p>
      <button @click="getSpecificUserTweets(otherUsersTweet.userId)">
        Specific User Tweets
      </button>
      <br />
      <button @click="getTweetId(otherUsersTweet.tweetId)">
        Test button
      </button>
      <tweet-comment />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import TweetComment from "./TweetComment.vue";
export default {
  components: { TweetComment },
  name: "all-tweets-follow",
  computed: {
    // loginToken() {
    //   return this.$store.state.loginToken;
    // },
    otherUsersTweets() {
      return this.$store.state.otherUsersTweets;
    },
    otherUserInfo() {
      return this.$store.state.otherUserInfo;
    },
  },
  methods: {
    getTweetId(testTweetId) {
      this.$store.commit("updateTweetId", testTweetId);
    },

    getSpecificUserTweets(userId) {
      this.$store.commit("updateOtherUserId", userId);
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.otherUserInfo.userId,
          },
        })
        .then((res) => {
          this.$store.commit("updateOtherUsersTweets", res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getOtherUsersTweets() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          this.$store.commit("updateOtherUsersTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
