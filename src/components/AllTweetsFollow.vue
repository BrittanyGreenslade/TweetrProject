<template>
  <div>
    <section
      v-for="recentAllUsersTweet in recentAllUsersTweets"
      :key="recentAllUsersTweet.tweetId"
      id="tweetContainer"
    >
      <h3>{{ recentAllUsersTweet.username }}</h3>
      <h5>{{ recentAllUsersTweet.createdAt }}</h5>
      <p>{{ recentAllUsersTweet.content }}</p>
      <button
        v-if="
          editTweetViewOn === false &&
            currentUserInfo.userId === recentAllUsersTweet.userId
        "
        @click="toggleEditView"
      >
        Edit Tweet
      </button>
      <section id="editTweetContainer">
        <section v-if="editTweetViewOn === true">
          <textarea name="editTweet" id="editTweet"></textarea>
          <!-- <button @click="editTweet">Post EditedTweet</button> -->
          <button @click="editTweetViewOn = false">Cancel</button>
        </section>
      </section>
      <button
        v-if="currentUserInfo.userId === recentAllUsersTweet.userId"
        @click="deleteTweet(recentAllUsersTweet.tweetId)"
      >
        Delete Tweet
      </button>

      <br />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
// import TweetComment from "./TweetComment.vue";
export default {
  // components: { TweetComment },
  name: "all-tweets-follow",

  data() {
    return {
      loginToken: cookies.get("loginToken"),
      currentUserInfo: cookies.get("currentUserInfo"),
      currentUserId: cookies.get("currentUserInfo").userId,
      editTweetViewOn: false,
    };
  },
  mounted() {
    this.getFollowingUsersTweets();
  },
  computed: {
    selectedTweetId() {
      return this.$store.state.selectedTweetId;
    },
    allUsersTweets() {
      return this.$store.state.allUsersTweets;
    },
    // loginToken() {
    //   return this.$store.state.loginToken;
    // // },
    // currentUserInfo() {
    //   return this.$store.state.currentUserInfo;
    // },
    recentAllUsersTweets() {
      return this.$store.getters.recentAllUsersTweets;
    },
    // otherUserInfo() {
    //   return this.$store.state.otherUserInfo;
    // },
  },
  methods: {
    toggleEditView() {
      this.editTweetViewOn = !this.editTweetViewOn;
    },
    getFollowingUsersTweets() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          this.$store.commit("updateAllUsersTweets", res.data);
          // res.data.filter(notMyTweets);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editTweet() {
      // this.$store.commit("updateSelectedTweetId", tweetId);
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.selectedTweetId,
            content: document.getElementById("editTweet").value,
          },
        })
        .then((res) => {
          this.editTweetViewOn === false;

          //reloads so tweet view goes away
          // location.reload(true);
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTweet(tweetId) {
      this.$store.commit("updateSelectedTweetId", tweetId);
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
            tweetId: this.selectedTweetId,
          },
        })
        .then((res) => {
          res;
          document.getElementById(
            "tweetContainer"
          ).innerHtml = `<h2>Post Removed!</h2>`;
          this.$store.commit("removeTweetFromAllUsersTweets", tweetId);
          console.log(this.allUsersTweets);
          (document.getElementById(
            "tweetContainer"
          ).innerHTML = `<h2>Post deleted!</h2>`),
            res;
        })
        .catch((err) => {
          console.log(err);
          console.log(this.selectedTweetId);
        });
    },
  },
};
</script>

<style scoped></style>
