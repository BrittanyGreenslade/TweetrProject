<template>
  <div>
    <!-- @click="deleteTweet(recentAllUsersTweet.tweetId)" -->
    <button v-if="toggleDeleteOn === false">
      Delete Tweet
    </button>
  </div>
</template>

<script>
// import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "delete-comment",
  data() {
    return {
      toggleDeleteOn: false,
      // tweetId: value,
      loginToken: cookies.get("loginToken"),
    };
  },
  computed: {},
  methods: {
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
  },
};
</script>

<style scoped></style>
