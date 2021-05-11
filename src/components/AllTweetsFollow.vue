<template>
  <div>
    <div v-for="tweet in followedTweets" :key="tweet.tweetId">
      <h3>{{ tweet.username }}</h3>
      <h4>{{ tweet.createdAt }}</h4>
      <p>{{ tweet.content }}</p>
      <!-- <follow-unfollow :followId="tweet.userId" /> -->
    </div>
    <!-- <all-tweets /> -->
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  name: "all-tweets-follow",
  components: {
    // FollowUnfollow,
    // AllTweets,
  },
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      followedTweets: [],
    };
  },
  mounted() {
    this.$store.dispatch("getAllTweets");
    this.getFollowing();
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
  // watch: {
  //   //runs when computed values change
  //   followingUsers(newValue, oldValue) {
  //     for (let i = 0; i < newValue.length; i++) {
  //       if (newValue[i].userId === this.followId) {
  //         this.followedUser = true;
  //         return;
  //       }
  //     }
  //     oldValue;
  //   },
  // },
  methods: {
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
          //whyyyyyyyyyyyyyyy this took so long to figure out
          for (let tweet = 0; tweet < this.allTweets.length; tweet++) {
            for (let i = 0; i < this.followingUsers.length; i++) {
              if (
                this.allTweets[tweet].userId === this.followingUsers[i].userId
              ) {
                this.followedTweets.push(this.allTweets[tweet]);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
