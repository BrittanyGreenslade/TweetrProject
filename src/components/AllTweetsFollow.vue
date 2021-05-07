<template>
  <div>
    <!-- .reverse() here causes infinite loop -->
    <section
      v-for="tweet in followedUsersTweets"
      :key="tweet.tweetId"
      :id="`tweetContainer${tweet.tweetId}`"
      :userId="tweet.userId"
      :tweetId="tweet.tweetId"
    >
      <h3>{{ tweet.username }}</h3>
      <h5>{{ tweet.createdAt }}</h5>
      <p>{{ tweet.content }}</p>
      <button @click="navigateToUserProfile(tweet.userId)">
        View User's Profile
      </button>
      <delete-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
      <edit-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
      <section />
      <!-- <button
        v-if="toggleCommentOn === false"
        @click="toggleCommentPost(recentAllUsersTweet.tweetId)"
      >
        Comment On Tweet
      </button>
      <post-comment
        v-if="
          toggleCommentOn === true &&
            recentAllUsersTweet.tweetId === selectedTweetId
        "
      />
      <button v-if="toggleCommentOn === true" @click="toggleCommentPost">
        Cancel
      </button>
      <br />
      <button
        v-if="toggleCommentViewOn === false"
        @click="toggleCommentView(recentAllUsersTweet.tweetId)"
      >
        View Comments
      </button>
      <tweet-comments
        v-if="
          toggleCommentViewOn === true &&
            recentAllUsersTweet.tweetId === selectedTweetId
        "
      />
      <button v-if="toggleCommentViewOn === true" @click="toggleCommentView">
        Cancel
      </button> -->

      <!-- <delete-comment :tweetId="recentUsersTweet.tweetId" /> -->
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import DeleteTweet from "./DeleteTweet.vue";
import EditTweet from "./EditTweet.vue";

export default {
  name: "all-tweets-follow",

  components: {
    DeleteTweet,
    EditTweet,
  },
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      currentUserInfo: cookies.get("currentUserInfo"),
      followedUsersTweets: [],
    };
  },
  mounted() {
    this.getAllUsersTweets();
  },
  computed: {
    allTweets() {
      return this.$store.state.allTweets;
    },
  },
  methods: {
    navigateToUserProfile(userId) {
      this.$router.push({ path: `/profile/${userId}` });
    },
    getAllUsersTweets() {
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
          let sortedTweets = res.data.sort(function(tweet1, tweet2) {
            return tweet2.tweetId - tweet1.tweetId;
          });
          this.$store.commit("udpateAllTweets", sortedTweets);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
