<template>
  <div class="cardContainer">
    <h4 v-if="currentAndFollowing.length === 0">
      Go to the users page to follow some users!
    </h4>
    <article class="tweetCardContainer">
      <div
        class="tweetCard"
        v-for="tweet in currentAndFollowing"
        :key="tweet.tweetId"
      >
        <h3 class="username">{{ tweet.username }}</h3>
        <div id="sectContain">
          <p class="createdAt">{{ tweet.createdAt }}</p>
        </div>
        <edit-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
        <div class="cmtContain">
          <tweet-comments :tweetId="tweet.tweetId" />
        </div>
        <p class="content">{{ tweet.content }}</p>
        <div v-if="tweet.userId === currentUserInfo.userId">
          <div class="tweetActionsContainer">
            <like-tweet :tweetId="tweet.tweetId" />
            <delete-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
          </div>
        </div>

        <div v-if="tweet.userId !== currentUserInfo.userId">
          <div class="otherUserTweetActions">
            <like-tweet :tweetId="tweet.tweetId" />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import DeleteTweet from "./DeleteTweet.vue";
import EditTweet from "./EditTweet.vue";
import TweetComments from "./TweetComments.vue";
import LikeTweet from "./LikeTweet.vue";
export default {
  name: "all-tweets-follow",
  components: {
    DeleteTweet,
    EditTweet,
    TweetComments,
    LikeTweet,
  },
  mounted() {
    if (this.$store.state.followingTweets === undefined) {
      this.$store.dispatch("getFollowingTweets");
    }
    if (this.$store.state.currentUserTweets === undefined) {
      this.$store.dispatch("viewMyTweets");
    }
    if (this.$store.state.allTweets === undefined) {
      this.$store.dispatch("getAllTweets");
    }
  },
  computed: {
    currentAndFollowing() {
      return this.$store.getters.currentAndFollowing;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    tweetLikes() {
      return this.$store.state.tweetLikes;
    },
  },
  methods: {
    sortCurrentAndFollowing() {
      return this.currentAndFollowing.sort(function(tweet1, tweet2) {
        return tweet2.tweetId - tweet1.tweetId;
      });
    },
    addToCurrentAndFollowing(tweets) {
      for (let i = 0; i < tweets.length; i++) {
        this.currentAndFollowing.push(tweets[i]);
      }
    },
  },
};
</script>

<style scoped></style>
