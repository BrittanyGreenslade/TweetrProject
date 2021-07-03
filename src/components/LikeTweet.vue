<template>
  <div class="likesContainer">
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
          url: `${process.env.VUE_APP_API_URL}/tweet-likes`,
          headers: {
            "Content-Type": "application/json",
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
          url: `${process.env.VUE_APP_API_URL}/tweet-likes`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/tweet-likes`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          this.tweetLiked = false;
          this.numLikes -= 1;
          //this works because i is the index NUMBER and need to put index number into splice
          for (let i = 0; i < this.tweetLikes.length; i++) {
            if (this.tweetLikes[i].userId === this.currentUserInfo.userId) {
              this.tweetLikes.splice(i, 1);
            }
          }
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
p {
  font-size: 12px;
  align-self: end;
}
.actionIcon {
  justify-self: end;
  margin-right: 3px;
}
</style>
