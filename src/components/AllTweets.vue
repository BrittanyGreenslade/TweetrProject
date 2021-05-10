<template>
  <div>
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
      <tweet-comments :tweetId="tweet.tweetId" />
      <delete-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
      <edit-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
      <like-tweet :tweetId="tweet.tweetId" />
      <!-- <follow-unfollow :followId="tweet.userId" /> -->
      <section />
      <br /><br /><br />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import DeleteTweet from "./DeleteTweet.vue";
import EditTweet from "./EditTweet.vue";
import TweetComments from "./TweetComments.vue";
import LikeTweet from "./LikeTweet.vue";
// import FollowUnfollow from "./FollowUnfollow.vue";
export default {
  name: "all-tweets",

  components: {
    DeleteTweet,
    EditTweet,
    TweetComments,
    LikeTweet,
    // FollowUnfollow,
  },
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      currentUserInfo: cookies.get("currentUserInfo"),
      toggleLike: false,
      followedTweets: [],
    };
  },
  mounted() {
    this.getAllTweets();
  },
  computed: {
    sortedAllTweets() {
      return this.$store.getters.sortedAllTweets;
    },
  },
  methods: {
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
