<template>
  <div id="deleteTweetCont">
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
    currentUserTweets() {
      return this.$store.state.currentUserTweets;
    },
    allTweets() {
      return this.$store.state.allTweets;
    },
  },
  methods: {
    deleteTweet(tweetId) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/tweets`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            tweetId: tweetId,
          },
        })
        .then((res) => {
          res;
          //this works because i is the index NUMBER and need to put index number into splice
          for (let i = 0; i < this.currentUserTweets.length; i++) {
            if (this.currentUserTweets[i].tweetId === tweetId) {
              this.$store.commit("removeTweetFromCurrentTweets", i);
            }
          }
          for (let i = 0; i < this.allTweets.length; i++) {
            if (this.allTweets[i].tweetId === tweetId) {
              this.$store.commit("removeTweetFromAllUsersTweets", i);
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
