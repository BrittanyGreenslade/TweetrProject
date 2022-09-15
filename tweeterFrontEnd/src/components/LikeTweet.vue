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
    <p>Likes: {{ this.numLikes }}</p>
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
      currentUserInfo: cookies.get("currentUserInfo"),
      tweetLiked: false,
      numLikes: 0,
    };
  },
  props: {
    tweetId: Number,
  },
  computed: {
    tweetLikes() {
      return this.$store.state.tweetLikes;
    },
  },
  mounted() {
    if (this.tweetLikes[this.tweetId] === undefined) {
      this.viewTweetLikes(this.tweetId);
    } else {
      this.checkTweetLiked();
      this.numLikes = this.tweetLikes[this.tweetId].length;
    }
  },
  methods: {
    checkTweetLiked() {
      for (let i = 0; i < this.tweetLikes[this.tweetId].length; i++) {
        if (
          this.currentUserInfo.userId ===
            this.tweetLikes[this.tweetId][i].userId &&
          this.tweetLikes[this.tweetId][i].tweetId === this.tweetId
        ) {
          this.tweetLiked = true;
        }
      }
    },
    viewTweetLikes(tweetId) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/tweet-likes`,
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            tweetId: tweetId,
          },
        })
        .then((res) => {
          this.$store.commit("addLikeToTweetLikes", {
            tweetId: this.tweetId,
            likes: res.data,
          });
          this.checkTweetLiked();
          this.numLikes = this.tweetLikes[this.tweetId].length;
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
          this.numLikes += 1;
          this.$store.commit("likeTweet", {
            tweetId: this.tweetId,
            like: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unlikeTweet() {
      this.tweetLiked = false;
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
          this.numLikes -= 1;
          this.$store.commit("removeLikeFromTweetLikes", {
            tweetId: this.tweetId,
            like: res.data,
          });
          //this works for splice because i is the index NUMBER and need to put index number into splice
          // for (let i = 0; i < this.thisTweetLikes.length; i++) {
          //   if (this.thisTweetLikes[i].tweetId === this.tweetId) {
          //     this.thisTweetLikes.splice(i, 1);
          //   }
          // }
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
