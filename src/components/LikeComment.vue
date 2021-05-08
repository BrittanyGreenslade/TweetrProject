<template>
  <div>
    <div class="commentsContainer">
      <h2 v-if="this.commentLikes.length >= 1">
        Comment Likes ({{ numLikes }}):
      </h2>

      <h2 v-for="like in commentLikes" :key="like.userId">
        {{ like.username }}
      </h2>
    </div>
    <button v-if="commentLiked === false" @click="likeComment">
      Like this comment
    </button>
    <button v-else @click="unlikeComment">
      Unlike Comment
    </button>
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
      commentLikesOn: false,
    };
  },
  mounted() {
    this.viewCommentLikes();
  },
  methods: {
    viewCommentLikes() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comment-likes",
          // method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
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
          url: "https://tweeterest.ml/api/comment-likes",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
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
          url: "https://tweeterest.ml/api/comment-likes",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
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

<style scoped></style>
