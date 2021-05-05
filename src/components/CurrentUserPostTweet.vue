<template>
  <div>
    <section id="postTweetContainer">
      <h3>Post Tweet</h3>
      <textarea
        name="postTweet"
        id="postTweet"
        placeholder="max 200 characters"
      ></textarea>
      <button @click="postTweet">Post</button>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "current-user-post-tweet",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
    };
  },
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
          this.$store.commit("updateCurrentUserTweets", res.data);
          location.reload();
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

<style scoped>
textarea {
  border: solid black 1px;
}
</style>
