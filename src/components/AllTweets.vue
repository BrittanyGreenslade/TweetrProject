<template>
  <div>
    <article>
      <section
        class="tweetCard"
        v-for="tweet in allTweets"
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
      </section>
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
    // sortedAllTweets() {
    //   return this.$store.getters.sortedAllTweets;
    // },
  },
};
</script>

<style scoped>
article {
  display: grid;
  row-gap: 10px;
}
</style>
