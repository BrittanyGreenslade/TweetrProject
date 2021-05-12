<template>
  <div>
    <textarea
      name="tweetComment"
      :id="`makeComment${commentId}`"
      cols="30"
      rows="5"
      maxlength="150"
      minlength="1"
      placeholder="max 150 characters"
    ></textarea>

    <button @click="postComment">Post Comment</button>
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
      this.commentViewOn = false;
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
            content: document.getElementById("makeComment" + this.commentId)
              .value,
          },
        })
        .then((res) => {
          this.$emit("newlyPostedComment", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
