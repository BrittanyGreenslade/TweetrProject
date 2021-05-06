<template>
  <div>
    <h4>{{ loginStatus }}</h4>

    <current-user v-if="Number(paramId) === currentUserInfo.userId" />

    <other-user-profile v-else />
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
      loginStatus: "",
      paramId: this.$route.params.userId,
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },

  computed: {},
  methods: {},
};
</script>

<style scoped>
button {
  border: 1px solid black;
}
</style>
