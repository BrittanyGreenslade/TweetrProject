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
import axios from "axios";
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
      currentUserInfo: cookies.get("currentUserInfo"),
      followedTweets: [],
      getFollowersComplete: false,
    };
  },
  mounted() {
    // this.getFollowing();
    this.$store.dispatch("getAllTweets");
    // this.usersFollowing();
    // this.filterFollowing();
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
    filterFollowingTweets() {
      let tempArray = [];
      for (let tweet = 0; tweet < this.allTweets.length; tweet++) {
        for (let i = 0; i < this.followingUsers.length; i++) {
          if (this.allTweets[tweet].userId == this.followingUsers[i].userId) {
            tempArray.push(this.allTweets[tweet]);
          }
        }
      }

      this.followedTweets = tempArray;
    },
    // filterFollowing() {
    //   let tempArray = [];
    //   for (let tweet = 0; tweet < this.allTweets.length; tweet++) {
    //     for (let i = 0; i < this.followingUsers.length; i++) {
    //       if (this.allTweets[tweet].userId === this.followingUsers[i].userId) {
    //         tempArray.push(this.allTweets[tweet]);
    //       }
    //     }
    //   }
    //   console.log(this.tempArray);
    //   //making the most recent tweets go to the top
    //   // this.sortedFollowedTweets(tempArray);
    //   this.followedTweets = tempArray;
    // },
    getFollowing() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/follows`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          //this is the userId of the follower
          params: { userId: this.currentUserInfo.userId },
        })
        .then((res) => {
          this.$store.commit("updateFollowingUsers", res.data);
          this.$store.commit("addCurrentToFollowing", this.currentUserInfo);
          this.filterFollowingTweets();
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
