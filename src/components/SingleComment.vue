<template>
  <div>
    <div v-for="comment in tweetComment" :key="comment.commentId">
      <h2>{{ comment.username }}</h2>
      <h3>{{ comment.createdAt }}</h3>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "single-comment",
  data() {
    return {
      tweetComment: [],
    };
  },
  computed: {
    selectedTweetId() {
      return this.$store.state.selectedTweetId;
    },
  },
  methods: {
    getComment() {
      axios
        .request({
          url: "",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            params: this.selectedTweetId,
          },
        })
        .then((res) => {
          this.tweetComment = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
