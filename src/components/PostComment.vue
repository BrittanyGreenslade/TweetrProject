<template>
  <div>
    <button v-if="commentViewOn === false" @click="commentViewOn = true">
      Make Comment
    </button>
    <div v-if="commentViewOn === true">
      <textarea
        name="tweetComment"
        :id="`makeComment${commentId}`"
        cols="30"
        rows="5"
        placeholder="max 150 characters"
      ></textarea>
      <button @click="postComment">Post Comment</button>
      <button @click="commentViewOn = false">Cancel</button>
    </div>
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
  },
  computed: {
    tweetComments() {
      return this.$store.state.tweetComments;
    },
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
          console.log(res.data);
          this.$store.commit("addCommentToComments", res.data);
          this.$store.commit("updateTweetComments", this.tweetComments);
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
