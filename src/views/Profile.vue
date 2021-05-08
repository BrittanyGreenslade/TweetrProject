<template>
  <div>
    <!-- v-if="Number(paramId) === currentUserInfo.userId" -->
    <current-user />
  </div>
</template>

<script>
// import axios from "axios";
import cookies from "vue-cookies";
import CurrentUser from "../components/CurrentUser.vue";

export default {
  components: {
    CurrentUser,
  },
  data() {
    return {
      // paramId: this.$route.params.userId,
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },
};
</script>

<style scoped>
button {
  border: 1px solid black;
}
</style>
