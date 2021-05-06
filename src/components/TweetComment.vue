<template>
  <div>
    <div id="tweetCommentsContainer">
      <textarea
        name="tweetComment"
        id="makeComment"
        cols="30"
        rows="5"
      ></textarea>
      <button @click="postComment">Post Comment</button>
      <br />
      <button @click="getComments">show comments</button>
      <div v-for="comment in commentInfo" :key="comment.commentId">
        <h3>{{ comment.username }}</h3>
        <p>{{ comment.content }}</p>
        <button @click="deleteComment(comment.commentId)">
          delete Comment
        </button>
        <button @click="editComment(comment.commentId)">Edit Comment</button>
        <button @click="testUdpateCommentId(comment.commentId)">
          Test update comment Id
        </button>
        <comment-likes />
      </div>
      <textarea
        name="editComment"
        :id="`editComment${comment.commentId}`"
        required
      ></textarea>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentLikes from "./CommentLikes.vue";
export default {
  components: {
    CommentLikes,
  },
  name: "tweet-comment",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    tweetId() {
      return this.$store.state.tweetId;
    },
    commentInfo() {
      return this.$store.state.commentInfo;
    },
    commentId() {
      return this.$store.state.commentInfo.commentId;
    },
  },
  methods: {
    testUdpateCommentId(commentId) {
      this.$store.commit("updateCommentId", commentId);
    },
    getComments() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          //do we have to send data?
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          this.$store.commit("updateCommentInfo", res.data);
          console.log(this.commentInfo);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    postComment() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.tweetId,
            content: document.getElementById("makeComment").value,
          },
        })
        .then((res) => {
          // this.$store.commit("updateCommentInfo", res.data);

          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
            commentId: this.commentInfo.commentId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editComment(commentId) {
      this.$store.commit("updateCommentId", commentId);
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            commentId: this.commentInfo.commentId,
            content: document.getElementById("editComment" + commentId).value,
            //remember: get element by id wasn't working because element went id was in loop
            //= more than one element with that id
          },
        })
        .then((res) => {
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
button,
textarea {
  border: 1px solid black;
}
</style>
