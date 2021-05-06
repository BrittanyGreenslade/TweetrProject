<template>
  <div>
    <section class="userTweetContainer">
      <!-- if user tweets is empty -->
      <h4 v-if="recentCurrentTweets === null">
        No tweets posted by you yet! Post in "Feed"
      </h4>
      <section>
        <div
          v-for="tweet in recentCurrentTweets"
          :key="tweet.tweetId"
          :id="`tweetContainer${tweet.tweetId}`"
        >
          <h3>
            {{ tweet.username }}
          </h3>
          <p>{{ tweet.content }}</p>
          <p>{{ tweet.createdAt }}</p>
          <!-- <div>{{tweet.imageUrl}}</div> -->
          <button
            @click="toggleEditView(tweet.tweetId)"
            v-if="editTweetViewOn === false"
          >
            Edit Tweet
          </button>

          <section
            v-if="editTweetViewOn === true && tweet.tweetId === selectedTweetId"
          >
            <textarea
              name="editTweet"
              placeholder="max 200 characters"
              class="editTweet"
              :id="`editTweet${tweet.tweetId}`"
            ></textarea>
            <!-- OMG DYNAMIC BINDING TWEET ID WORKED  -->
            <button @click="editTweet">
              Post EditedTweet
            </button>
            <button @click="editTweetViewOn = false">Cancel</button>
          </section>

          <button @click="deleteTweet(tweet.tweetId)">Delete Tweet</button>
        </div>
        <!-- <tweet-likes /> -->
      </section>
    </section>

    <br /><br /><br />
  </div>
</template>

<script>
import axios from "axios";
// import TweetLikes from "./TweetLikes.vue";
import cookies from "vue-cookies";

export default {
  // components: { TweetLikes },
  name: "current-user-tweets",
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      loginToken: cookies.get("loginToken"),
      editTweetViewOn: false,
    };
  },
  mounted() {
    this.viewMyTweets();
  },
  computed: {
    currentUserTweets() {
      return this.$store.state.currentUserTweets;
    },
    recentCurrentTweets() {
      return this.$store.getters.recentCurrentTweets;
    },
    selectedTweetId() {
      return this.$store.state.selectedTweetId;
    },
  },

  methods: {
    toggleEditView(tweetId) {
      this.$store.commit("updateSelectedTweetId", tweetId);
      this.editTweetViewOn = !this.editTweetViewOn;
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
            //AND GRABBING THE DYNAMIC ID WORKED HERE AHHHHHH
          },
        })
        .then((res) => {
          this.editTweetViewOn = false;
          console.log(res.data);
          // this.$store;

          for (let i = 0; i < this.currentUserTweets.length; i++) {
            if (this.currentUserTweets[i].tweetId === this.selectedTweetId) {
              this.currentUserTweets[i].content = res.data.content;
              this.$store.commit(
                "updateCurrentUserTweets",
                this.currentUserTweets
              );
            }
          }
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
          this.$store.commit("updateCurrentUserTweets", res.data);
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
          ).innerHtml = `<h2>Post Removed!</h2>`;
          this.$store.commit("removeTweetFromCurrentTweets", tweetId);
          this.$store.commit("removeTweetFromAllUsersTweets", tweetId);
          console.log(this.currentUserTweets);
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
.tweetContainer {
  border: 1px solid black;
}
</style>
