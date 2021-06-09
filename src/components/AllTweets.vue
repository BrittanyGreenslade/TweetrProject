<template>
  <!-- <div class="pageContainer"> -->
  <div class="cardContainer">
    <article class="tweetCardContainer">
      <div
        class="tweetCard"
        v-for="tweet in sortedAllTweets"
        :key="tweet.tweetId"
        :id="`tweetContainer${tweet.tweetId}`"
        :userId="tweet.userId"
        :tweetId="tweet.tweetId"
      >
        <h3>
          <router-link class="username" :to="`/profile/${tweet.userId}`">
            {{ tweet.username }}
          </router-link>
        </h3>
        <div id="sectContain">
          <p class="createdAt">{{ tweet.createdAt }}</p>
          <delete-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
        </div>
        <edit-tweet :tweetId="tweet.tweetId" :userId="tweet.userId" />
        <p class="content">{{ tweet.content }}</p>
        <div v-if="tweet.userId === currentUserInfo.userId">
          <div class="cmtContain">
            <!-- <img
              id="cancel"
              class="actionIcon"
              @click="commentViewOn = false"
              src="@/assets/images/close.svg"
              alt="black x - cancel icon"
            /> -->
            <tweet-comments :tweetId="tweet.tweetId" />
          </div>
          <!-- <div class="tweetActionsContainer"> -->
          <!-- <img
              v-if="commentViewOn === false"
              @click="commentViewOn = true"
              class="actionIcon"
              src="@/assets/images/comment.svg"
              alt="speech bubble - makecomment icon"
            /> -->

          <like-tweet :tweetId="tweet.tweetId" />
          <!-- </div> -->
        </div>

        <div v-if="tweet.userId !== currentUserInfo.userId">
          <div class="cmtContain">
            <tweet-comments :tweetId="tweet.tweetId" />
          </div>
          <!-- <div class="otherUserTweetActions"> -->
          <like-tweet :tweetId="tweet.tweetId" />
          <!-- </div> -->
        </div>
      </div>
    </article>
  </div>
  <!-- </div> -->
</template>

<script>
// import axios from "axios";
import cookies from "vue-cookies";
import DeleteTweet from "./DeleteTweet.vue";
import EditTweet from "./EditTweet.vue";
import TweetComments from "./TweetComments.vue";
import LikeTweet from "./LikeTweet.vue";
// import FollowUnfollow from "./FollowUnfollow.vue";
export default {
  name: "all-tweets",

  components: {
    DeleteTweet,
    EditTweet,
    TweetComments,
    LikeTweet,
    // FollowUnfollow,
  },
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },
  mounted() {
    this.$store.dispatch("getAllTweets");
  },
  computed: {
    allTweets() {
      return this.$store.state.allTweets;
    },
    sortedAllTweets() {
      return this.$store.getters.sortedAllTweets;
    },
  },
};
</script>

<style scoped></style>
