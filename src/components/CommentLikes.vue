<template>
  <div>
    <button @click="likeComment">Like Comment</button>

    <button @click="removeCommentLike">Remove Comment Like</button>
    <button @click="viewSpecificCommentLikes">See Comment Likes</button>
    <h3>{{ this.numCommentLikes }}</h3>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "comment-likes",
  computed: {
    commentLikes() {
      return this.$store.state.commentInfo.commentLikes;
    },
    numCommentLikes() {
      return this.$store.state.numCommentLikes;
    },
    commentId() {
      return this.$store.state.commentInfo.commentId;
    },
    loginToken() {
      return this.$store.state.currentUserInfo.loginToken;
    },
  },
  methods: {
    likeComment() {
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
          console.log(res);
          console.log(this.commentId);
        })
        .catch((err) => {
          console.log(err);
          //   console.log(this.commentId);
        });
    },
    removeCommentLike() {
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
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewSpecificCommentLikes() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comment-likes",
          // method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            commentId: this.commentId,
          },
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("updateNumCommentLikes", res.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
