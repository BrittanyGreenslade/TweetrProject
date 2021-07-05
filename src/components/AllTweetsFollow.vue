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
// import cookies from "vue-cookies";
// import axios from "axios";
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
  data() {
    return {
      currentAndFollowing: [],
    };
  },
  mounted() {
    if (this.$store.state.followingTweets === undefined) {
      this.$store.dispatch("getFollowingTweets");
    } else {
      this.addToCurrentAndFollowing(this.followingTweets);
    }
    if (this.$store.state.currentUserTweets === undefined) {
      this.$store.dispatch("viewMyTweets");
    } else {
      this.addToCurrentAndFollowing(this.currentUserTweets);
    }
    this.sortCurrentAndFollowing(this.currentAndFollowing);
  },
  watch: {
    currentUserTweets(newValue, oldValue) {
      this.addToCurrentAndFollowing(this.currentUserTweets);
      this.sortCurrentAndFollowing(this.currentAndFollowing);
      oldValue;
      newValue;
    },
    followingTweets(newValue, oldValue) {
      this.addToCurrentAndFollowing(this.followingTweets);
      this.sortCurrentAndFollowing(this.currentAndFollowing);
      oldValue;
      newValue;
    },
  },
  computed: {
    followingTweets() {
      return this.$store.state.followingTweets;
    },
    currentUserTweets() {
      return this.$store.state.currentUserTweets;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
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

    // filterFollowingTweets() {
    //   let tempArray = [];
    //   console.log(this.allTweets);
    //   for (let tweet = 0; tweet < this.allTweets.length; tweet++) {
    //     for (let i = 0; i < this.followingUsers.length; i++) {
    //       if (this.allTweets[tweet].userId == this.followingUsers[i].userId) {
    //         console.log(this.allTweets[tweet]);
    //         tempArray.push(this.allTweets[tweet]);
    //       }
    //     }
    //   }
    //   this.followedTweets = tempArray;
    // },
  },
};
</script>

<style scoped></style>
