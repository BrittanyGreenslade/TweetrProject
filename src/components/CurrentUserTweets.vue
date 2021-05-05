<template>
  <div>
    <section id="userTweetContainer">
      <!-- if user tweets is empty -->
      <h4 v-if="(this.userTweets = null)">
        No tweets posted by you yet! Post in "Feed"
      </h4>
      <section
        id="tweetContainer"
        v-for="tweet in currentUserTweets"
        :key="tweet.tweetId"
      >
        <h3>{{ tweet.username }}</h3>
        <p>{{ tweet.content }}</p>
        <p>{{ tweet.createdAt }}</p>
        <!-- <div>{{tweet.imageUrl}}</div> -->
        <button v-if="editTweetViewOn === false" @click="toggleEditView">
          Edit Tweet
        </button>
        <section id="editTweetContainer">
          <section v-if="editTweetViewOn === true">
            <textarea name="editTweet" id="editTweet"></textarea>
            <button @click="editTweet">Post EditedTweet</button>
            <button @click="editTweetViewOn = false">Cancel</button>
          </section>
        </section>
        <button @click="deleteTweet()">Delete Tweet</button>

        <tweet-likes />
      </section>
    </section>

    <br /><br /><br />
  </div>
</template>

<script>
import axios from "axios";
import TweetLikes from "./TweetLikes.vue";
import cookies from "vue-cookies";

export default {
  components: { TweetLikes },
  name: "current-user-tweets",
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      currentUserTweets: [],
      editTweetViewOn: false,
      tweetId: 1218,
    };
  },
  mounted() {
    this.viewMyTweets();
  },
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    // tweetId() {
    //   return this.$store.state.tweetId;
    // },
  },

  methods: {
    toggleEditView() {
      this.editTweetViewOn = !this.editTweetViewOn;
    },
    editTweet() {
      //   this.$store.commit("updateTweetId", tweetId);
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
            tweetId: this.tweetId,
            content: document.getElementById("editTweet").value,
          },
        })
        .then((res) => {
          this.editTweetViewOn === false;
          //reloads so tweet view goes away
          location.reload(true);
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    viewMyTweets() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          //  method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.currentUserInfo.userId,
          },
        })
        .then((res) => {
          this.currentUserTweets = res.data;

          // this.$store.commit("updateCurrentUserTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
          // console.log(userId);
        });
    },
    deleteTweet() {
      // this.$store.commit("updateTweetId", tweetId);
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
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          document.getElementById(
            "tweetContainer"
          ).innerHTML = `<h2>Post Deleted!</h2>`;
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
textarea,
button {
  border: 1px solid black;
}
#tweetContainer {
  border: 1px solid black;
}
</style>
