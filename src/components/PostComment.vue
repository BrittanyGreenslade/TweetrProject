<template>
  <div>
    <button @click="postComment()">Post Comment</button>
    <textarea
      name="tweetComment"
      :id="`makeComment${selectedTweetId}`"
      cols="30"
      rows="5"
    ></textarea>
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
    };
  },
  computed: {
    selectedTweetId() {
      return this.$store.state.selectedTweetId;
    },
    tweetComments() {
      return this.$store.state.tweetComments;
    },
  },
  methods: {
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
            tweetId: this.selectedTweetId,
            content: document.getElementById(
              "makeComment" + this.selectedTweetId
            ).value,
          },
        })
        .then((res) => {
          this.$store.commit("addTweetCommentToComments", res.data);
        })
        .catch((err) => {
          console.log(this.selectedTweetId);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
