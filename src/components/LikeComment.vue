<template>
  <div class="likesContainer">
    <img
      v-if="commentLiked === false"
      @click="likeComment"
      src="@/assets/images/heart.svg"
      alt="hand drawn heart dark green - like button"
      class="actionIcon"
    />
    <img
      class="actionIcon"
      v-else
      @click="unlikeComment"
      src="@/assets/images/unlike.svg"
      alt="hand drawn heart light green - unlike btn"
    />
    <p v-if="this.commentLikes.length >= 1">Likes: {{ numLikes }}</p>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "like-comment",
  props: {
    commentId: Number,
  },
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      commentLiked: false,
      currentUserInfo: cookies.get("currentUserInfo"),
      commentLikes: [],
      numLikes: "",
    };
  },
  mounted() {
    this.viewCommentLikes();
  },
  methods: {
    viewCommentLikes() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/comment-likes`,
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            commentId: this.commentId,
          },
        })
        .then((res) => {
          this.commentLikes = res.data;
          this.numLikes = res.data.length;
          for (let i = 0; i < res.data.length; i++) {
            if (this.currentUserInfo.userId === res.data[i].userId) {
              this.commentLiked = true;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likeComment() {
      this.commentLiked = true;
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/comment-likes`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            commentId: this.commentId,
          },
        })
        .then((res) => {
          res;
          this.viewCommentLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unlikeComment() {
      this.commentLiked = false;
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/comment-likes`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            commentId: this.commentId,
          },
        })
        .then((res) => {
          this.viewCommentLikes();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.likesContainer {
  width: 50%;
}
p {
  font-size: 12px;
  align-self: end;
  margin-bottom: 3px;
  margin-left: 3px;
}
</style>
