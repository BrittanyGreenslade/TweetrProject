<template>
  <div>
    <button
      v-if="Number(currentUserInfo.userId) === Number(userId)"
      @click="deleteTweet(tweetId)"
    >
      Delete Tweet
    </button>
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
          for (let i = 0; i < this.currentUserTweets.length; i++) {
            if (this.currentUserTweets[i].tweetId === tweetId) {
              this.currentUserTweets.splice(i, 1);
            }
          }
          this.$store.commit("updateCurrentUserTweets", this.currentUserTweets);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // deleteTweet(tweetId) {
    //   this.$store.commit("updateSelectedTweetId", tweetId);
    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/tweets",
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },
    //       data: {
    //         loginToken: this.loginToken,
    //         tweetId: this.selectedTweetId,
    //       },
    //     })
    //     .then((res) => {
    //       res;
    //       document.getElementById(
    //         "tweetContainer" + `${tweetId}`
    //       ).innerHtml = `<h2>Post Removed!</h2>`;
    //       this.$store.commit("removeTweetFromCurrentTweets", tweetId);
    //       this.$store.commit("removeTweetFromAllUsersTweets", tweetId);
    //       console.log(this.currentUserTweets);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style scoped></style>
