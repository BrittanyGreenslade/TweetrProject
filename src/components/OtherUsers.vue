<template>
  <div>
    <div>
      <button @click="getAllUsers">
        All Users
      </button>
    </div>

    <div v-for="user in this.allUsers" v-bind:key="user.userId">
      <button @click="updateOtherUserId(user.userId)">
        View user profile
      </button>
      <h3>
        Username: {{ user.username }}
        <br />
        Email:{{ user.email }}
        <br />
        Bio:{{ user.bio }}
        <br />
        Birthday: {{ user.birthdate }}
      </h3>
      <other-follows />
      <other-followers />

      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OtherFollows from "@/components/OtherFollowers.vue";
import OtherFollowers from "@/components/OtherFollowers.vue";
export default {
  name: "all-users",
  components: {
    OtherFollows,
    OtherFollowers,
  },
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
    otherUserId() {
      return this.$store.state.otherUserId;
    },
    otherUserInfo() {
      return this.$store.state.otherUserInfo;
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
    updateOtherUserId(userId) {
      this.$store.commit("updateOtherUserId", userId);
      this.viewOtherUserProfile();
      console.log(userId);
    },

    viewOtherUserProfile() {
      // this.$store.commit("updateOtherUserId", userId);
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
          // this.$router.push(`/${this.otherUserId}`);
          this.$router.push({
            name: "Single User",
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
