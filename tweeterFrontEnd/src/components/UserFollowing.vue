<template>
  <div>
    <!-- IGNORE FOR NOW -->
    <button v-if="followingViewOn === false" @click="getFollowing">
      See following
    </button>
    <div v-else>
      <h2>This user is following:</h2>
      <div v-for="user in followingUsers" :key="user.userId">
        <h3>{{ user.username }}</h3>
        <h4>{{ user.email }}</h4>
        <h4>{{ user.birthdate }}</h4>
        <p>{{ user.bio }}</p>
      </div>
      <button @click="followingViewOn = false">Close</button>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  name: "user-following",
  data() {
    return {
      // followingUsers: [],
      followingViewOn: false,
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },
  props: {
    userId: Number,
  },
  computed: {
    followingUsers() {
      return this.$store.state.followingUsers;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
