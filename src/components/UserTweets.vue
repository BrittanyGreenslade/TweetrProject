<template>
  <div>
    <section id="postTweetContainer">
      <h3>Post Tweet</h3>
      <textarea name="postTweet" id="postTweet"></textarea>
      <button @click="postTweet">Post</button>
    </section>
    <section id="userTweetContainer">
      <h3>Your Tweets</h3>
      <button @click="getMyTweets()">View my tweets</button>
      <section v-for="tweet in userTweets" :key="tweet.tweetId">
        <h3>{{ tweet.username }}</h3>
        <p id="tweetConent">{{ tweet.content }}</p>
        <p>{{ tweet.createdAt }}</p>
        <!-- <div>{{tweet.imageUrl}}</div> -->
        <button @click="editTweet(tweet.tweetId)">Edit Tweet</button>
        <button @click="deleteTweet(tweet.tweetId)">Delete Tweet</button>
      </section>
    </section>
    <section id="editTweetContainer">
      <textarea name="editTweet" id="editTweet"></textarea>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "user-tweets",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    userTweets() {
      return this.$store.state.userTweets;
    },
    tweetId() {
      return this.$store.state.tweetId;
    },
    myUserId() {
      return this.$store.state.myUserId;
    },
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
          this.userTweets.push(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editTweet(tweetId) {
      this.$store.commit("updateTweetId", tweetId);
      this.editTweetCall();
    },
    deleteTweet(tweetId) {
      this.$store.commit("updateTweetId", tweetId);
      this.deleteTweetCall();
    },
    editTweetCall() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.tweetId,
            content: document.getElementById("editTweet").value,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMyTweets() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          //  method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.myUserId,
          },
        })
        .then((res) => {
          this.$store.commit("updateUserTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTweetCall() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
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

<style scoped>
textarea {
  border: 1px solid black;
}
</style>
