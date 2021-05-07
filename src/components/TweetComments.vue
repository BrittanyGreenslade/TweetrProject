<template>
  <div>
    <div id="tweetCommentsContainer">
      <div v-for="comment in tweetComments" :key="comment.commentId">
        <h3>{{ comment.username }}</h3>
        <p>{{ comment.content }}</p>
        <button @click="deleteComment(comment.commentId)">
          delete Comment
        </button>
        <!-- <button @click="editComment(comment.commentId)">Edit Comment</button> -->

        <!-- <comment-likes /> -->
      </div>
    </div>
    <!-- <single-comment /> -->
  </div>
</template>

<script>
import axios from "axios";
// import SingleComment from "./SingleComment.vue";
// import CommentLikes from "./CommentLikes.vue";
export default {
  components: {
    // SingleComment,
    // CommentLikes,
  },
  name: "tweet-comments",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    selectedTweetId() {
      return this.$store.state.selectedTweetId;
    },
    tweetComments() {
      return this.$store.state.tweetComments;
    },
    // commentId() {
    //   return this.$store.state.commentInfo.commentId;
    // },
  },
  mounted() {
    this.getComments();
  },
  methods: {
    getComments() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            tweetId: this.selectedTweetId,
          },
        })
        .then((res) => {
          this.$store.commit("updateTweetComments", res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log(this.selectedTweetId);
        });
    },
    deleteComment(commentId) {
      this.$store.commit("updateCommentId", commentId);
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            commentId: commentId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // editComment(commentId) {
    //   this.$store.commit("updateCommentId", commentId);
    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/comments",
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },
    //       data: {
    //         loginToken: this.loginToken,
    //         commentId: this.commentInfo.commentId,
    //         content: document.getElementById("editComment" + commentId).value,
    //         //remember: get element by id wasn't working because element went id was in loop
    //         //= more than one element with that id - can bind Id
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style scoped>
button,
textarea {
  border: 1px solid black;
}
</style>
