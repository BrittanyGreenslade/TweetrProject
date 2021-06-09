<template>
  <div>
    <img
      v-if="Number(currentUserInfo.userId) === Number(userId)"
      @click="deleteTweet(tweetId)"
      class="actionIcon"
      src="@/assets/images/trash.svg"
      alt="recycle bin icon - delete tweet button"
    />
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "delete-tweet",
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      loginToken: cookies.get("loginToken"),
    };
  },
  props: {
    tweetId: Number,
    userId: Number,
  },
  computed: {
    sortedCurrentTweets() {
      return this.$store.getters.sortedCurrentTweets;
    },
    currentUserTweets() {
      return this.$store.state.currentUserTweets;
    },
    sortedAllTweets() {
      return this.$store.getters.sortedAllTweets;
    },
    allTweets() {
      return this.$store.state.allTweets;
    },
  },
  methods: {
    deleteTweet(tweetId) {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            tweetId: tweetId,
          },
        })
        .then((res) => {
          res;
          //not much collab but Shawn helped me with this splice business. v nice
          //this works because i is the index NUMBER and need to put index number into splice
          //
          for (let i = 0; i < this.sortedCurrentTweets.length; i++) {
            if (this.sortedCurrentTweets[i].tweetId === tweetId) {
              this.sortedCurrentTweets.splice(i, 1);
            }
          }
          for (let i = 0; i < this.sortedAllTweets.length; i++) {
            if (this.sortedAllTweets[i].tweetId === tweetId) {
              this.sortedAllTweets.splice(i, 1);
            }
          }
          this.$store.commit("updateCurrentUserTweets", this.currentUserTweets);
          this.$store.commit("updateAllTweets", this.allTweets);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.actionIcon {
  width: 17px;
}
</style>
