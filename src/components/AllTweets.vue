<template>
  <div>
    <!-- .reverse() here causes infinite loop -->
    <section
      v-for="tweet in sortedAllTweets"
      :key="tweet.tweetId"
      :id="`tweetContainer${tweet.tweetId}`"
      :userId="tweet.userId"
      :tweetId="tweet.tweetId"
    >
      <h3>{{ tweet.username }}</h3>
      <h5>{{ tweet.createdAt }}</h5>
      <p>{{ tweet.content }}</p>
      <!-- <button @click="navigateToUserProfile(tweet.userId)">
        View User's Profile
      </button> -->
      <tweet-comments :tweetId="tweet.tweetId" />
      <delete-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
      <edit-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
      <!-- <tweet-comments :tweetId="tweet.tweetId" /> -->
      <section />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import DeleteTweet from "./DeleteTweet.vue";
import EditTweet from "./EditTweet.vue";
import TweetComments from "./TweetComments.vue";

export default {
  name: "all-tweets",

  components: {
    DeleteTweet,
    EditTweet,
    TweetComments,
  },
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      currentUserInfo: cookies.get("currentUserInfo"),
      // followedUsersTweets: [],
    };
  },
  mounted() {
    this.getAllTweets();
  },
  computed: {
    sortedAllTweets() {
      return this.$store.getters.sortedAllTweets;
    },
    allTweets() {
      return this.$store.state.allTweets;
    },
  },
  methods: {
    navigateToUserProfile(userId) {
      this.$router.push({ path: `/profile/${userId}` });
    },
    getAllTweets() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          // method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          this.$store.commit("updateAllTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
