<template>
  <div>
    <section id="postTweetContainer">
      <h3>Post Tweet</h3>
      <textarea name="postTweet" id="postTweet"></textarea>
      <button @click="postTweet">Post</button>
    </section>
    <section id="userTweetContainer">
      <h3>Your Tweets</h3>
      <section
        id="tweetContainer"
        v-for="tweet in currentUserTweets"
        :key="tweet.tweetId"
      >
        <h3>{{ tweet.username }}</h3>
        <p>{{ tweet.content }}</p>
        <p>{{ tweet.createdAt }}</p>
        <!-- <div>{{tweet.imageUrl}}</div> -->
        <button @click="editTweet(tweet.tweetId)">Edit Tweet</button>
        <button @click="deleteTweet(tweet.tweetId)">Delete Tweet</button>
        <tweet-likes />
        <button @click="testUpdate(tweet.tweetId)">Test update</button>
      </section>
    </section>
    <section id="editTweetContainer">
      <textarea name="editTweet" id="editTweet"></textarea>
    </section>
    <br /><br /><br />
  </div>
</template>

<script>
import axios from "axios";
import TweetLikes from "./TweetLikes.vue";
import cookies from "vue-cookies";
export default {
  components: { TweetLikes },
  name: "user-tweets",
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      currentUserTweets: [],
    };
  },
  mounted() {
    this.viewMyTweets();
  },
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    tweetId() {
      return this.$store.state.tweetId;
    },
    // currentUserId() {
    //   return this.$store.state.currentUserInfo.userId;
    // },
  },

  methods: {
    // testUpdate(tweetId) {
    //   this.$store.commit("updateTweetId", tweetId);
    // },
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
          console.log(res.data);
          this.currentUserTweets = res.data;
          // this.userTweets.push(res.data);
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
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewMyTweets() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          //  method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.currentUserInfo.userId,
          },
        })
        .then((res) => {
          this.currentUserTweets = res.data;
          // this.$store.commit("updateCurrentUserTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
          // console.log(userId);
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
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
textarea,
button {
  border: 1px solid black;
}
#tweetContainer {
  border: 1px solid black;
}
</style>
