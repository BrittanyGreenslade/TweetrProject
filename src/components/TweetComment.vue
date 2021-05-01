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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tweet-comment",
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    tweetId() {
      return this.$store.state.tweetId;
    },
    commentId() {
      return this.$store.state.commentId;
    },
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
          //do we have to send data?
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          console.log(this.tweetId);
          console.log(this.loginToken);
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
            //is this supposed to be commentId?
            tweetId: this.tweetId,
            content: document.getElementById("makeComment").value,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(this.tweetId);
          console.log(this.loginToken);
          console.log(err);
        });
    },
    // editComment() {
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
    //         commentId: this.commentId,
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
