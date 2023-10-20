<template>
  <div class="pageContainer">
    <article class="tweetCardContainer">
      <h4 v-if="currentUserTweets === undefined">
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
          <div id="sectContain">
            <p class="createdAt">{{ tweet.createdAt }}</p>
          </div>
          <edit-tweet :userId="tweet.userId" :tweetId="tweet.tweetId" />
          <div class="cmtContain">
            <tweet-comments :tweetId="tweet.tweetId" />
          </div>
          <p class="content">{{ tweet.content }}</p>

          <div class="tweetActionsContainer">
            <like-tweet :tweetId="tweet.tweetId" />
            <delete-tweet :userId="tweet.userId" :tweetId="tweet.tweetId" />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
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
    };
  },
  mounted() {
    if (this.$store.state.currentUserTweets === undefined) {
      this.$store.dispatch("viewMyTweets");
    }
  },
  computed: {
    sortedCurrentTweets() {
      return this.$store.getters.sortedCurrentTweets;
    },
    currentUserTweets() {
      return this.$store.state.currentUserTweets;
    },
    tweetLikes() {
      return this.$store.state.tweetLikes;
    },
  },
};
</script>

<style scoped></style>
