<template>
  <div>
    <section id="postTweetContainer">
      <textarea name="postTweet" id="postTweet"></textarea>
      <button>Post</button>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
  },
  methods: {
    getTweets() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          //  method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            content: document.getElementById("postTweet").value,
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

<style scoped>
textarea {
  border: 1px solid black;
}
</style>
