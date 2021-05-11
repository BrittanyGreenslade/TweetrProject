<template>
  <!-- this page doesn't load on refresh :( -->
  <div class="tweetCard" v-if="getFollowersComplete">
    <div v-for="tweet in followedTweets" :key="tweet.tweetId">
      <h3>{{ tweet.username }}</h3>
      <h4>{{ tweet.createdAt }}</h4>
      <p>{{ tweet.content }}</p>
      <!-- <follow-unfollow :followId="tweet.userId" /> -->
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
// import FollowUnfollow from "./FollowUnfollow.vue";
export default {
  name: "all-tweets-follow",
  components: {
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
        //whyyyyyyyyyyyyyyy this took so long to figure out0
        for (let tweet = 0; tweet < this.allTweets.length; tweet++) {
          for (let i = 0; i < this.followingUsers.length; i++) {
            if (
              this.allTweets[tweet].userId === this.followingUsers[i].userId
            ) {
              this.followedTweets.push(this.allTweets[tweet]);
            }
          }
        }
        this.getFollowersComplete = true;
      })
      .catch((err) => {
        console.log(err);
      });
    // this.$store.dispatch("getFollowing");
    // this.getFollowing();
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
          //whyyyyyyyyyyyyyyy this took so long to figure out0
          for (let tweet = 0; tweet < this.allTweets.length; tweet++) {
            for (let i = 0; i < this.followingUsers.length; i++) {
              if (
                this.allTweets[tweet].userId === this.followingUsers[i].userId
              ) {
                this.followedTweets.push(this.allTweets[tweet]);
              }
            }
          }
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
