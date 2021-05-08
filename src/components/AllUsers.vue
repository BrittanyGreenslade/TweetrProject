<template>
  <div>
    <div v-for="user in allUsers" :key="user.userId">
      <router-link :to="`/profile/${user.userId}`">
        {{ user.username }}</router-link
      >
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "all-users",
  components: {},

  mounted() {
    this.getAllUsers();
  },
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
  },
  methods: {
    getAllUsers() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          // method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          this.$store.commit("updateAllUsers", res.data);
        })
        .catch((err) => {
          console.log(err);
          console.log(this.allUsers);
        });
    },
  },
};
</script>

<style scoped></style>
