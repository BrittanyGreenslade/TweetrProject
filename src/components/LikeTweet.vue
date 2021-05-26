<template>
  <div class="likesContainer">
    <!-- <div class="likesContainer"> -->
    <!-- <h2 v-for="like in tweetLikes" :key="like.userId">
        {{ like.username }}
      </h2> -->
    <img
      v-if="tweetLiked === false"
      @click="likeTweet"
      src="@/assets/images/heart.svg"
      alt="hand drawn heart dark green - like button"
      class="actionIcon"
    />
    <img
      class="actionIcon"
      v-else
      @click="unlikeTweet"
      src="@/assets/images/unlike.svg"
      alt="hand drawn heart light green - unlike btn"
    />
    <p v-if="this.tweetLikes.length >= 1">Likes: {{ numLikes }}</p>
    <p v-else></p>
  </div>
  <!-- </div> -->
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

<style scoped>
p {
  font-size: 12px;
  align-self: end;
}
.likesContainer {
  display: grid;
  width: 30vw;
  margin-bottom: 3px;
  grid-template-columns: 1.5fr 5fr;
  place-self: end;
  justify-items: start;

  /* grid-template-columns: 3fr, 1fr; */
}
.actionIcon {
  justify-self: end;
  margin-right: 3px;
  margin-bottom: 3px;
}
</style>
