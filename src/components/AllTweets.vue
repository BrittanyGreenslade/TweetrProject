<template>
  <div class="cardContainer">
    <article class="tweetCardContainer">
      <div
        class="tweetCard"
        v-for="tweet in sortedAllTweets"
        :key="tweet.tweetId"
        :id="`tweetContainer${tweet.tweetId}`"
        :userId="tweet.userId"
        :tweetId="tweet.tweetId"
      >
        <h3>
          <router-link class="username" :to="`/profile/${tweet.userId}`">
            {{ tweet.username }}
          </router-link>
        </h3>
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
import cookies from "vue-cookies";
import DeleteTweet from "./DeleteTweet.vue";
import EditTweet from "./EditTweet.vue";
import TweetComments from "./TweetComments.vue";
import LikeTweet from "./LikeTweet.vue";
export default {
  name: "all-tweets",

  components: {
    DeleteTweet,
    EditTweet,
    TweetComments,
    LikeTweet,
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
