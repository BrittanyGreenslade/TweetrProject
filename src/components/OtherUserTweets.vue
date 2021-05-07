<template>
  <div>
    <div v-for="tweet in otherUserTweets" :key="tweet.tweetId">
      <h2>{{ tweet.username }}</h2>
      <h3>{{ tweet.createdAt }}</h3>
      <p>{{ tweet.content }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "other-user-tweets",
  computed: {
    selectedUserId() {
      return this.$store.state.selectedUserId;
    },
    otherUserTweets() {
      return this.$store.state.otherUserTweets;
    },
  },
  mounted() {
    this.getOtherUserTweets();
  },
  methods: {
    getOtherUserTweets() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.selectedUserId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$store.commit("updateOtherUserTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
