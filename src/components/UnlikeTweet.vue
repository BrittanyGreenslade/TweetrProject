<template>
  <div>
    <button @click="unlikeTweet">
      Unlike tweet
    </button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "unlike-Tweet",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
    };
  },
  props: {
    tweetId: Number,
  },
  computed: {},
  methods: {
    unlikeTweet() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.tweetId,
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
