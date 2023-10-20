<template>
  <div>
    <section id="postTweetContainer">
      <p>{{ submitStatus }}</p>
      <h3>Make Post</h3>
      <textarea
        name="postTweet"
        id="postTweet"
        placeholder="max 200 characters"
        maxlength="200"
        minlength="1"
        required
      ></textarea>

      <button id="postBtn" @click="postTweet">Post</button>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "post-tweet",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      submitStatus: "",
    };
  },
  computed: {
    currentUserTweets() {
      return this.$store.state.currentUserTweets;
    },
    allTweets() {
      return this.$store.state.allTweets;
    },
  },
  methods: {
    postTweet() {
      if (document.getElementById("postTweet").value !== "") {
        axios
          .request({
            // url: `${process.env.VUE_APP_API_URL}/tweets`,
            url: `api/tweets`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              loginToken: this.loginToken,
              content: document.getElementById("postTweet").value,
            },
          })
          .then((res) => {
            this.$store.commit("addTweetToCurrentTweets", res.data);
            this.$store.commit("addTweetToAllTweets", res.data);
            document.getElementById("postTweet").value = "";
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (document.getElementById("postTweet").value === "") {
        this.submitStatus = "Your post has no content!";
        setTimeout(() => {
          this.submitStatus = "";
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
#postBtn {
  margin-top: 5px;
  justify-self: right;
  width: 70px;
}
textarea {
  width: 100%;
}
#postTweetContainer {
  display: grid;
  place-items: center;
  width: 60vw;
  margin-top: 10px;
}
</style>
