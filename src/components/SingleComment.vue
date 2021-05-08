<template>
  <div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "single-comment",
  // data() {
  //   return {
  //     tweetComment: [],
  //   };
  // },
  computed: {
    tweetComments() {
      return this.$store.state.tweetComments;
    },
  },
  // methods: {,
  //   singleComment(){
  //     for (let i = 0; i<this.tweetComments.length; i++){

  //     }
  //   }
  // },
};
</script>

<style scoped></style>
