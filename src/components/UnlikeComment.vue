<template>
  <div><button>Unlike Comment</button></div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "unlike-comment",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
    };
  },
  props: {
    commentId: Number,
  },
  methods: {
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
  },
};
</script>

<style scoped></style>
