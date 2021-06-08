<template>
  <div class="pageContainer">
    <h3>Your Posts</h3>
    <article class="tweetCardContainer">
      <h4 v-if="sortedCurrentTweets.length === 0">
        Get started with your first post!
      </h4>
      <div
        class="cardContainer"
        v-for="tweet in sortedCurrentTweets"
        :key="tweet.tweetId"
        :id="`tweetContainer${tweet.tweetId}`"
      >
        <div class="tweetCard">
          <h3
            class="username"
            v-if="$route.path !== `/profile/${currentUserInfo.userId}`"
          >
            <router-link :to="`/profile/${currentUserInfo.userId}`">
              {{ tweet.username }}
            </router-link>
          </h3>
          <h3 class="username" v-else>{{ tweet.username }}</h3>

          <p class="createdAt">{{ tweet.createdAt }}</p>
          <edit-tweet :userId="tweet.userId" :tweetId="tweet.tweetId" />
          <p class="content">{{ tweet.content }}</p>

          <div class="cmtContain">
            <tweet-comments :tweetId="tweet.tweetId" />
          </div>
          <div class="tweetActionsContainer">
            <delete-tweet :userId="tweet.userId" :tweetId="tweet.tweetId" />
            <like-tweet :tweetId="tweet.tweetId" />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import EditTweet from "./EditTweet.vue";
import DeleteTweet from "./DeleteTweet.vue";
import TweetComments from "./TweetComments.vue";
import LikeTweet from "./LikeTweet.vue";

export default {
  components: {
    EditTweet,
    DeleteTweet,
    TweetComments,
    LikeTweet,
  },
  name: "current-user-tweets",
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      loginToken: cookies.get("loginToken"),
    };
  },
  mounted() {
    this.viewMyTweets();
  },
  computed: {
    sortedCurrentTweets() {
      return this.$store.getters.sortedCurrentTweets;
    },
  },

  methods: {
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
          this.$store.commit("updateCurrentUserTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
