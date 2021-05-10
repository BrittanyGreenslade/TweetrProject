<template>
  <div>
    <div>
      <div v-for="user in userProfile" :key="user.userId">
        <!-- <follow-unfollow :followId="user.userId" /> -->
        <h2>{{ user.username }}</h2>
        <h3>{{ user.birthdate }}</h3>
        <h4>{{ user.bio }}</h4>
        <p>{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import UserFollowing from "./UserFollowing.vue";
// import UserFollowers from "./UserFollowers.vue";
// import FollowUnfollow from "./FollowUnfollow.vue";

export default {
  components: {
    // UserFollowing,
    // UserFollowers,
    // FollowUnfollow,
  },
  name: "other-user-profile",
  data() {
    return {
      userProfile: [],
    };
  },
  props: {
    userId: Number,
  },

  mounted() {
    this.viewUserProfile();
  },
  methods: {
    viewUserProfile() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          // method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          this.userProfile = res.data;
        })
        .catch((err) => {
          console.log(err);
          console.log(this.userProfile);
        });
    },
  },
};
</script>

<style scoped></style>
