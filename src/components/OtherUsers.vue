<template>
  <div>
    <!-- <div>
      <button @click="getAllUsers">
        All Users
      </button>
    </div> -->
    <!-- @click="updateOtherUserId(user.userId)" -->
    <div v-for="user in this.allUsers" v-bind:key="user.userId">
      <button @click="grabSelectedUserId(user.userId)">
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
  name: "other-users",
  components: {
    OtherFollows,
    OtherFollowers,
  },
  //this component is rendered on click in a fn in 'Profile.vue' so when it's mounted on
  //the dom, I want to run the axios call to get the users
  mounted() {
    this.getAllUsers();
  },
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
    selectedUserId() {
      return this.$store.state.selectedUserId;
    },

    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  methods: {
    grabSelectedUserId(userId) {
      this.$store.commit("updateSelectedUserId", userId);
      this.$router.push({
        name: "Single User",
        params: { selectedUserId: this.selectedUserId },
      });
    },

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
    // updateOtherUserId(userId) {
    //   this.$store.commit("updateOtherUserId", userId);
    // },
    //   this.viewOtherUserProfile();
    //   console.log(userId);
    //   console.log(this.currentUserInfo);
    // },
  },
};
</script>

<style scoped></style>
