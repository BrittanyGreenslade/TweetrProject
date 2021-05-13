<template>
  <div class="pageContainer">
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
          <h3>
            <router-link class="username" :to="`/profile/${tweet.userId}`">
              {{ tweet.username }}
            </router-link>
          </h3>
          <!-- <h3 class="username">{{ tweet.username }}</h3> -->
          <p class="createdAt">{{ tweet.createdAt }}</p>
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
