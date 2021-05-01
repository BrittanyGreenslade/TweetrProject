<template>
  <div>
    <button>All Likes</button>
  </div>
</template>

<script>
export default {
  name: "tweet-likes",
  computed: {
    tweetId() {
      return this.$store.state.tweetId;
    },
    loginToken() {
      return this.store.state.tweetId;
    },
  },
  methods: {
    viewAllTweetLikes() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewSpecificTweetLikes() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
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
        });
    },
  },
};
</script>

<style scoped></style>
