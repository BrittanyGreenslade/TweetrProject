<template>
  <div>
    <div v-for="user in allUsers" :key="user.userId">
      <h2>
        {{ user.username }}
        <br />
      </h2>

      <other-user-profile :userInfo="user" />

      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OtherUserProfile from "./OtherUserProfile.vue";

export default {
  name: "all-users",
  components: {
    OtherUserProfile,
  },
  data() {
    return {
      profileViewOn: false,
    };
  },
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
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
