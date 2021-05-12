<template>
  <div class="pageContainer">
    <h1>Discover</h1>
    <article class="tweetCardContainer">
      <div
        class="cardContainer"
        v-for="tweet in sortedAllTweets"
        :key="tweet.tweetId"
        :id="`tweetContainer${tweet.tweetId}`"
        :userId="tweet.userId"
        :tweetId="tweet.tweetId"
      >
        <div class="tweetCard">
          <h2>
            <router-link class="username" :to="`/profile/${tweet.userId}`">
              {{ tweet.username }}
            </router-link>
          </h2>
          <!-- <h3 class="username">{{ tweet.username }}</h3> -->
          <h5 class="createdAt">{{ tweet.createdAt }}</h5>
          <p class="content">{{ tweet.content }}</p>
          <div class="tweetActionsContainer">
            <like-tweet :tweetId="tweet.tweetId" />
            <tweet-comments :tweetId="tweet.tweetId" />
            <delete-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
            <edit-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
// import axios from "axios";
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
    };
  },
  mounted() {
    this.$store.dispatch("getAllTweets");
  },
  computed: {
    allTweets() {
      return this.$store.state.allTweets;
    },
    sortedAllTweets() {
      return this.$store.getters.sortedAllTweets;
    },
  },
};
</script>

<style scoped></style>
