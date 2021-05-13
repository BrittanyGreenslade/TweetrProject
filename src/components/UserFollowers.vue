<template>
  <!-- ignore for now -->
  <div><h2>This user is followed by:</h2></div>
</template>

<script>
import axios from "axios";
export default {
  name: "user-followers",
  props: {
    usreId: Number,
  },
  methods: {
    getFollowers() {
      axios
        .request({
          url: "https://tweeterest.ml/api/followers",
          // method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            userId: this.userId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
