<template>
  <div>
    <section id="postTweetContainer">
      <h3>Post Tweet</h3>
      <textarea name="postTweet" id="postTweet"></textarea>
      <button @click="postTweet">Post</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "user-post-tweet",

  methods: {
    postTweet() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "POST",
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
          res;
          // console.log(res.data);
          // this.userTweets.push(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
