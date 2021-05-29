<template>
  <div v-if="getFollowersComplete" class="cardContainer">
    <h4 v-if="followedTweets.length === 0">
      Go to the users page to follow some users!
    </h4>
    <div class="tweetCard" v-for="tweet in followedTweets" :key="tweet.tweetId">
      <h3 class="username">{{ tweet.username }}</h3>
      <p class="createdAt">{{ tweet.createdAt }}</p>
      <p class="content">{{ tweet.content }}</p>
      <div class="cmtContain" v-if="commentViewOn === true">
        <img
          id="cancel"
          class="actionIcon"
          @click="commentViewOn = false"
          src="@/assets/images/close.svg"
          alt="black x - cancel icon"
        />
        <tweet-comments :tweetId="tweet.tweetId" />
      </div>
      <!-- v-if="tweet.userId === currentUserInfo.userId" -->
      <div
        v-if="tweet.userId === currentUserInfo.userId"
        class="tweetActionsContainer"
      >
        <img
          v-if="commentViewOn === false"
          @click="commentViewOn = true"
          class="actionIcon"
          src="@/assets/images/comment.svg"
          alt="speech bubble - makecomment icon"
        />
        <edit-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
        <delete-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
        <like-tweet :tweetId="tweet.tweetId" />
      </div>
      <div
        v-else-if="tweet.userId !== currentUserInfo.userId"
        class="otherUserTweetActions"
      >
        <like-tweet :tweetId="tweet.tweetId" />
        <tweet-comments :tweetId="tweet.tweetId" />
      </div>
      <!-- <follow-unfollow :followId="tweet.userId" /> -->
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import DeleteTweet from "./DeleteTweet.vue";
import EditTweet from "./EditTweet.vue";
import TweetComments from "./TweetComments.vue";
import LikeTweet from "./LikeTweet.vue";
// import FollowUnfollow from "./FollowUnfollow.vue";
export default {
  name: "all-tweets-follow",
  components: {
    DeleteTweet,
    EditTweet,
    TweetComments,
    LikeTweet,
    // FollowUnfollow,
  },
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      followedTweets: [],
      getFollowersComplete: false,
      commentViewOn: false,
    };
  },
  mounted() {
    // this.$store.dispatch("getFollowing");
    this.$store.dispatch("getAllTweets");
  },

  computed: {
    followingUsers() {
      return this.$store.state.followingUsers;
    },
    allTweets() {
      return this.$store.state.allTweets;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
  },
  watch: {
    allTweets(newValue, oldValue) {
      this.getFollowing();
      newValue;
      oldValue;
    },
  },
  methods: {
    filterFollowing() {
      let tempArray = [];
      for (let tweet = 0; tweet < this.allTweets.length; tweet++) {
        for (let i = 0; i < this.followingUsers.length; i++) {
          if (this.allTweets[tweet].userId === this.followingUsers[i].userId) {
            tempArray.push(this.allTweets[tweet]);
          }
        }
      }
      //making the most recent tweets go to the top
      this.sortedFollowedTweets(tempArray);
      this.followedTweets = tempArray;
    },
    sortedFollowedTweets(tempArray) {
      return tempArray.sort(function(tweet1, tweet2) {
        return tweet2.tweetId - tweet1.tweetId;
      });
    },
    getFollowing() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          //this is the userId of the follower
          params: { userId: this.currentUserInfo.userId },
        })
        .then((res) => {
          this.$store.commit("updateFollowingUsers", res.data);
          this.$store.commit("addCurrentToFollowing");
          //whyyyyyyyyyyyyyyy this took so long to figure out0
          this.filterFollowing();
          this.getFollowersComplete = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
