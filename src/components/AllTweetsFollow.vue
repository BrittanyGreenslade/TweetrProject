<template>
  <div v-if="getFollowersComplete" class="cardContainer">
    <h4 v-if="followedTweets.length === 0">
      Go to the users page to follow some users!
    </h4>
    <article class="tweetCardContainer">
      <div
        class="tweetCard"
        v-for="tweet in followedTweets"
        :key="tweet.tweetId"
      >
        <h3 class="username">{{ tweet.username }}</h3>
        <div id="sectContain">
          <p class="createdAt">{{ tweet.createdAt }}</p>
          <delete-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
        </div>
        <edit-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
        <p class="content">{{ tweet.content }}</p>
        <div v-if="tweet.userId === currentUserInfo.userId">
          <div class="cmtContain">
            <tweet-comments :tweetId="tweet.tweetId" />
          </div>
          <div class="tweetActionsContainer">
            <like-tweet :tweetId="tweet.tweetId" />
          </div>
        </div>

        <div v-if="tweet.userId !== currentUserInfo.userId">
          <div class="cmtContain">
            <tweet-comments :tweetId="tweet.tweetId" />
          </div>
          <div class="otherUserTweetActions">
            <like-tweet :tweetId="tweet.tweetId" />
          </div>
        </div>
        <!-- <follow-unfollow :followId="tweet.userId" /> -->
      </div>
    </article>
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
