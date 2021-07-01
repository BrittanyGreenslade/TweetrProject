<template>
  <div>
    <div v-for="user in allUsers" :key="user.userId">
      <h3 class="username">
        {{ user.username }}
        <router-link class="navUserProf" :to="`/profile/${user.userId}`">
          <p>View user's profile</p></router-link
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
    this.$store.dispatch("getAllUsers");
  },

  computed: {
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
