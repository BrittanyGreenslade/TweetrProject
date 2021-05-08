<template>
  <div>
    <current-user v-if="Number(paramId) === Number(currentUserInfo.userId)" />
    <other-user-profile :userId="Number(paramId)" v-else />
  </div>
</template>

<script>
// import axios from "axios";
import cookies from "vue-cookies";
import CurrentUser from "../components/CurrentUser.vue";
import OtherUserProfile from "../components/OtherUserProfile.vue";
export default {
  components: {
    CurrentUser,
    OtherUserProfile,
  },
  data() {
    return {
      // paramId: this.$route.params.userId,
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },
  computed: {
    paramId() {
      return this.$route.params.userId;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
  },
};
</script>

<style scoped>
button {
  border: 1px solid black;
}
/* key tells vue whether to reload component if stg changes  */
</style>
