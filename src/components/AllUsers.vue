<template>
  <div>
    <div v-for="user in allUsers" :key="user.userId">
      <h3 class="username">
        {{ user.username }}
        <router-link
          v-if="user.userId === currentUserInfo.userId"
          class="navUserProf"
          :to="`/profile/${user.userId}`"
        >
          <p>View your profile</p>
        </router-link>
        <router-link v-else class="navUserProf" :to="`/profile/${user.userId}`">
          <p v-if="user.userId === currentUserInfo.userId">View your profile</p>
          <p v-else>View user's profile</p></router-link
        >
      </h3>

      <follow-unfollow
        :user="user"
        v-if="user.userId !== currentUserInfo.userId"
      />
      <br />
    </div>
  </div>
</template>

<script>
import FollowUnfollow from "./FollowUnfollow.vue";
import cookies from "vue-cookies";
export default {
  name: "all-users",
  components: { FollowUnfollow },
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      followedUser: {},
    };
  },
  mounted() {
    if (this.allUsers === undefined) {
      this.$store.dispatch("getAllUsers");
    }
    if (this.followingUsers === undefined) {
      this.$store.dispatch("getFollowingUsers");
    }
  },

  computed: {
    // currentUserInfo() {
    //   return this.$store.state.currentUserInfo;
    // },
    allUsers() {
      return this.$store.state.allUsers;
    },
    followingUsers() {
      return this.$store.state.followingUsers;
    },
  },
};
</script>

<style scoped>
#navUserProf:hover {
  color: #30331c;
}
.username:hover {
  color: #30331c;
}
</style>
