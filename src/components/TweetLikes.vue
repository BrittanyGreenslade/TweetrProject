<template>
  <div>
    <button @click="getSpecificTweetLikes">View Likes</button>
    <h2>People who like this tweet:</h2>
    <div v-for="like in tweetLikes" :key="like.userId">
      <h2>{{ like.username }}</h2>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tweet-likes",
  data() {
    return {
      tweetLikes: [],
    };
  },
  props: {
    tweetId: Number,
  },
  computed: {
    // tweetLikes() {
    //   return this.$store.state.tweetLikes;
    // },
  },
  methods: {
    //why would you want all likes
    // viewAllTweetLikes() {
    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/tweet-likes",
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },

    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    getSpecificTweetLikes() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          // method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          this.tweetLikes = res.data;
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
