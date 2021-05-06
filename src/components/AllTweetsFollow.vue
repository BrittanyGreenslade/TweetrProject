<template>
  <div>
    <!-- .reverse() here causes infinite loop -->

    <section
      v-for="recentAllUsersTweet in recentAllUsersTweets"
      :key="recentAllUsersTweet.tweetId"
      :id="`tweetContainer${recentAllUsersTweet.tweetId}`"
    >
      <h3>{{ recentAllUsersTweet.username }}</h3>
      <h5>{{ recentAllUsersTweet.createdAt }}</h5>
      <p>{{ recentAllUsersTweet.content }}</p>
      <button
        v-if="
          editTweetViewOn === false &&
            currentUserInfo.userId === recentAllUsersTweet.userId
        "
        @click="toggleEditView(recentAllUsersTweet.tweetId)"
      >
        Edit Tweet
      </button>

      <section
        v-if="
          editTweetViewOn === true &&
            recentAllUsersTweet.tweetId === selectedTweetId
        "
      >
        <textarea
          name="editTweet"
          :id="`editTweet${recentAllUsersTweet.tweetId}`"
        ></textarea>
        <button @click="editTweet">Post Edited Tweet</button>
        <button @click="editTweetViewOn = false">Cancel</button>
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

    recentAllUsersTweets() {
      return this.$store.getters.recentAllUsersTweets;
    },
  },
  methods: {
    getFollowingUsersTweets() {
      //do you have these grouping into tweets that are all by the same person?
      //most recent is at top but on page mount "get tweets" it's in a different order
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          // method: "GET",
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
    toggleEditView(tweetId) {
      this.editTweetViewOn = !this.editTweetViewOn;
      this.$store.commit("updateSelectedTweetId", tweetId);
    },
    editTweet() {
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
            content: document.getElementById(
              "editTweet" + `${this.selectedTweetId}`
            ).value,
          },
        })
        .then((res) => {
          this.editTweetViewOn = false;
          console.log(res.data);
          for (let i = 0; i < this.recentAllUsersTweets.length; i++) {
            if (this.recentAllUsersTweets[i].tweetId === this.selectedTweetId) {
              this.recentAllUsersTweets[i].content = res.data.content;
              this.$store.commit(
                "updateAllUsersTweets",
                this.recentAllUsersTweets
              );
            }
          }

          //reloads so tweet view goes away
          // location.reload(true);
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
            "tweetContainer" + `${tweetId}`
          ).innerHTML = `<h2>Post Removed!</h2>`;
          this.$store.commit("removeTweetFromAllUsersTweets", tweetId);

          res;
        })
        .catch((err) => {
          console.log(err);
          console.log(this.allUsersTweets);
        });
    },
  },
};
</script>

<style scoped></style>
