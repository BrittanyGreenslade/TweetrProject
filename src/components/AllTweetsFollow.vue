<template>
  <div>
    <div v-for="tweet in followingTweets" :key="tweet.tweetId">
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
      // tweetsFollowing: [],
      // followingUsers: [],
    };
  },
  mounted() {
    this.getFollowing();
    // this.$store.dispatch("getFollowing");
    console.log(this.allTweets);
    console.log(this.followedTweets);
    console.log(this.followingUsers);
    console.log(this.currentUserInfo.userId);
  },

  computed: {
    followingTweets() {
      return this.$store.state.followingTweets;
    },
    followingUsers() {
      return this.$store.state.followingUsers;
    },
    allTweets() {
      return this.$store.state.allTweets;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
    followedTweets() {
      return this.$store.getters.followedTweets;
    },
  },
  methods: {
    // getFollowedTweets() {
    //   for (let i = 0; i < this.followingUsers.length; i++) {
    //     for (let i = 0; i < this.allTweets.length; i++) {
    //       if (this.followingUsers[i].userId === this.allTweets[i].userId) {
    //         this.tweetsFollowing = this.allTweets[i];
    //       }
    //     }
    //   }
    // },
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
          // console.log(res.data);
          //   this.numFollowing = res.data.length;
          // let followingTweets = [];
          // for (let i = 0; i < this.allTweets.length; i++) {
          //   for (let i = 0; i < res.data.length; i++) {
          //     if (this.allTweets[i].userId === res.data[i].userId) {
          //       followingTweets = this.allTweets[i];
          //     }
          //   }
          // }
          // this.$store.commit("updateFollowingTweets", followingTweets);
          // console.log(this.followingTweets);
          // return followingTweets;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // findFollwersTweets() {
    //   for (let i = 0; i < this.allTweets.length; i++) {
    //     for (let i = 0; i < this.followingUsers.length; i++) {
    //       if (this.allTweets[i].userId === this.followingUsers[i].userId) {
    //         this.tweetsFollowing = this.allTweets[i];
    //       }
    //     }
    //   }
    // },
  },
};
</script>

<style scoped></style>
