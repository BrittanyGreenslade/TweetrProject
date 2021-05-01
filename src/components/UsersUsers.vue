<template>
  <div>
    <div>
      <button @click="getAllUsers">
        All Users
      </button>
    </div>

    <div v-for="user in this.allUsers" v-bind:key="user.userId">
      <button @click="updateOtherUserId(user.userId)">View user profile</button>
      <h3>
        Username: {{ user.username }}
        <br />
        Email:{{ user.email }}
        <br />
        Bio:{{ user.bio }}
        <br />
        Birthday: {{ user.birthdate }}
      </h3>

      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "all-users",
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
    // userId() {
    //   return this.$store.state.userId;
    // },
    otherUserId() {
      return this.$store.state.otherUserId;
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
    updateOtherUserId(otherUserId) {
      this.$store.commit("updateOtherUserId", otherUserId);
      this.viewUserProfile();
    },

    viewUserProfile() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.otherUserId,
          },
        })
        .then((res) => {
          this.$store.commit("updateOtherUserInfo", res.data);
          //is this okkkkkk?
          this.$router.push({
            name: "User",
            params: { otherUserId: this.otherUserId },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
