<template>
  <div>
    <button @click="viewSpecificTweetLikes">Likes</button>
    <h3>{{ this.numTweetLikes }}</h3>
    <br />
    <button @click="likeTweet">Like Tweet</button>
    <button @click="removeLikeTweet">Remove Like</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tweet-likes",
  computed: {
    tweetId() {
      return this.$store.state.tweetId;
    },
    loginToken() {
      return this.$store.state.currentUserInfo.loginToken;
    },
    tweetLikes() {
      return this.$store.state.tweetLikes;
    },
    numTweetLikes() {
      return this.$store.state.numTweetLikes;
    },
  },
  methods: {
    // viewAllTweetLikes() {
    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/tweet-likes",
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },

    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    viewSpecificTweetLikes() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("updateNumTweetLikes", res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likeTweet() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          res;
        })
        .catch((err) => {
          console.log(err);
          console.log(this.tweetId);
          console.log(this.tweetLikes);
        });
    },
    removeLikeTweet() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
