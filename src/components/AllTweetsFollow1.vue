<template>
  <div>
    <div v-for="tweet in followedTweets" class="tweetCard" :key="tweet.tweetId">
      <h3 class="username">{{ tweet.username }}</h3>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
// import DeleteTweet from "./DeleteTweet.vue";
// import EditTweet from "./EditTweet.vue";
// import TweetComments from "./TweetComments.vue";
// import LikeTweet from "./LikeTweet.vue";
export default {
  name: "all-tweets-follow1",
  // components: {
  //   DeleteTweet,
  //   EditTweet,
  //   TweetComments,
  //   LikeTweet,
  // },
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      followedTweets: [],
      getFollowersComplete: false,
    };
  },
  mounted() {
    this.$store.dispatch("getAllTweets");
    // this.getFollowing();
  },
  computed: {
    allTweets() {
      return this.$store.state.allTweets;
    },
    followingUsers() {
      return this.$store.state.followingUsers;
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
    // sortedFollowedTweets(tempArray) {
    //   return tempArray.sort(function(tweet1, tweet2) {
    //     return tweet2.tweetId - tweet1.tweetId;
    //   });
    // },
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
      // this.sortedFollowedTweets(tempArray);
      this.followedTweets = tempArray;
      console.log(tempArray);
    },
    getFollowing() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/tweets`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          //this is the userId of the follower
          params: { userId: this.currentUserInfo.userId },
        })
        .then((res) => {
          this.$store.commit("updateFollowingUsers", res.data);
          this.$store.commit("addCurrentToFollowing");
          this.filterFollowing();
          this.getFollowersComplete = true;
          console.log(this.allTweets);
          console.log(this.followingUsers);
          console.log(this.followedTweets);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
