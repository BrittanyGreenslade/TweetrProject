<template>
  <div>
    <h2>This user follows:</h2>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "user-follows",
  props: {
    userId: Number,
  },
  methods: {
    getUserFollows() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: { userId: this.currentUserId },
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
