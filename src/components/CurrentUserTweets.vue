<template>
  <div>
    <h3>Your Tweets</h3>
    <section class="userTweetContainer">
      <!-- help plz if user tweets is empty, tell them to go post a thing -->
      <!-- <h4 v-if="currentUserTweets === null">
        No tweets posted by you yet! Post in "Feed"
      </h4> -->
      <section>
        <div
          v-for="tweet in sortedCurrentTweets"
          :key="tweet.tweetId"
          :id="`tweetContainer${tweet.tweetId}`"
        >
          <h3>
            {{ tweet.username }}
          </h3>
          <p>{{ tweet.content }}</p>
          <p>{{ tweet.createdAt }}</p>
          <h1>{{ tweet.tweetId }}</h1>
          <delete-tweet :userId="tweet.userId" :tweetId="tweet.tweetId" />
          <edit-tweet :userId="tweet.userId" :tweetId="tweet.tweetId" />
          <tweet-comments :tweetId="tweet.tweetId" />
        </div>
        <br /><br />
        <!-- <div>{{tweet.imageUrl}}</div> -->

        <!-- <tweet-likes /> -->
      </section>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import EditTweet from "./EditTweet.vue";
import DeleteTweet from "./DeleteTweet.vue";
import TweetComments from "./TweetComments.vue";

export default {
  components: {
    EditTweet,
    DeleteTweet,
    TweetComments,
  },
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
    sortedCurrentTweets() {
      return this.$store.getters.sortedCurrentTweets;
    },
  },

  methods: {
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
  },
};
</script>

<style scoped>
textarea,
button,
.tweetContainer {
  border: 1px solid black;
}
</style>
