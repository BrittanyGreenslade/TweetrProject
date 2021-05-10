<template>
  <div>
    <div v-for="user in allUsers" :key="user.userId">
      <router-link :to="`/profile/${user.userId}`">
        {{ user.username }}</router-link
      >
      <!-- <follow-unfollow
        :followId="user.userId"
        v-if="user.userId !== currentUserInfo.userId"
      /> -->
      <br />
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import FollowUnfollow from "./FollowUnfollow.vue";
import cookies from "vue-cookies";
export default {
  name: "all-users",
  // components: { FollowUnfollow },
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      followedUser: {},
    };
  },
  mounted() {
    this.$store.dispatch("getFollowing");
    console.log(this.followingUsers);
    console.log(this.followingUsers);
  },
  // mounted() {
  //   this.$store.dispatch("getAllUsers");
  //   // this.$store.dispatch("getFollowing");
  // },
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
    followingUsers() {
      return this.$store.state.followingUsers;
    },
  },
  methods: {
    getFollowedUser() {
      for (let i = 0; i < this.followingUsers.length; i++) {
        this.followingUsers[i] = this.followedUser;
      }
    },
  },
};
</script>

<style scoped></style>
