<template>
  <div><button @click="likeComment">Like this comment</button></div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "like-comment",
  props: {
    commentId: Number,
  },
  data() {
    return {
      loginToken: cookies.get("loginToken"),
    };
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
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
