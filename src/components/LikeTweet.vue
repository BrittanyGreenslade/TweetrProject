<template>
  <div>
    <div class="likesContainer">
      <h2 v-if="this.tweetLikes.length >= 1">Tweet Likes ({{ numLikes }}):</h2>

      <h2 v-for="like in tweetLikes" :key="like.userId">
        {{ like.username }}
      </h2>
    </div>
    <!-- <button > -->
    <img
      v-if="tweetLiked === false"
      @click="likeTweet"
      src="@/assets/images/heart.svg"
      alt="hand drawn heart - like button"
      class="actionIcon"
    />
    <!-- </button> -->
    <button v-else @click="unlikeTweet">
      Unlike tweet
    </button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "like-tweet",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      tweetLiked: false,
      currentUserInfo: cookies.get("currentUserInfo"),
      tweetLikes: [],
      numLikes: "",
    };
  },
  props: {
    tweetId: Number,
  },
  mounted() {
    this.viewTweetLikes();
  },
  methods: {
    viewTweetLikes() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          // method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          this.tweetLikes = res.data;
          this.numLikes = res.data.length;
          for (let i = 0; i < res.data.length; i++) {
            if (this.currentUserInfo.userId === res.data[i].userId) {
              this.tweetLiked = true;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likeTweet() {
      this.tweetLiked = true;
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "POST",
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
          this.viewTweetLikes();
          res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unlikeTweet() {
      this.tweetLiked = false;
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
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
          res;
          // for (let i = 0; i < this.tweetLikes.length; i++) {

          // }
          this.viewTweetLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
