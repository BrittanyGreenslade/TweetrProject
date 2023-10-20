<template>
  <div id="postCommentContainer">
    <p id="postHeader">Post a comment:</p>
    <textarea
      name="tweetComment"
      id="makeComment"
      cols="30"
      rows="5"
      maxlength="150"
      minlength="1"
      placeholder="max 150 characters"
    ></textarea>
    <button id="postBtn" @click="postComment">Post</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "post-comment",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      commentViewOn: false,
    };
  },
  props: {
    commentId: Number,
    tweetId: Number,
  },

  methods: {
    postComment() {
      axios
        .request({
          // url: `${process.env.VUE_APP_API_URL}/comments`,
          url: `api/comments`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.tweetId,
            content: document.getElementById("makeComment").value,
          },
        })
        .then((res) => {
          this.$emit("newlyPostedComment", res.data);
          document.getElementById("makeComment").value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#postBtn {
  margin-top: 5px;
  justify-self: right;
  width: 70px;
  margin-right: 10px;
}
textarea {
  place-self: center;
  width: 90%;
}
</style>
