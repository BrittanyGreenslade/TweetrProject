<template>
  <div>
    <h4 v-for="info in this.otherUserInfo" :key="info.userId">
      <h1>Other User Profile</h1>

      <h2>{{ info.bio }}</h2>
    </h4>
  </div>
</template>

<script>
export default {
  name: "single-user",
  computed: {
    otherUserInfo() {
      return this.$store.state.otherUserInfo;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
