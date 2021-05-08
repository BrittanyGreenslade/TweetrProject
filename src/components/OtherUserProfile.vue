<template>
  <div>
    <button v-if="profileViewOn === false" @click="viewUserProfile">
      View User Profile
    </button>
    <!-- v-if="Number(paramId) === currentUserInfo.userId" -->
    <div v-if="profileViewOn === true">
      <div v-for="info in userProfile" :key="info.userId">
        <!-- <h2>{{ info.username }}</h2> -->
        <h3>{{ info.birthdate }}</h3>
        <h4>{{ info.bio }}</h4>
        <p>{{ info.email }}</p>
        <user-followers />
        <user-follows :userId="info.userId" />
        <follow-user :followId="info.userId" />
        <unfollow-user :followId="info.userId" />

        <button @click="profileViewOn = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FollowUser from "./FollowUser.vue";
import UserFollows from "./UserFollows.vue";
import UnfollowUser from "./UnfollowUser.vue";
import UserFollowers from "./UserFollowers.vue";

export default {
  components: { FollowUser, UserFollows, UnfollowUser, UserFollowers },
  name: "other-user-profile",
  data() {
    return {
      profileViewOn: false,
      userProfile: [],
    };
  },
  props: {
    userInfo: Object,
  },
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
  },
  // mounted() {
  //   this.viewUserProfile();
  // },
  methods: {
    viewUserProfile() {
      this.profileViewOn = true;
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          // method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.userInfo.userId,
          },
        })
        .then((res) => {
          this.userProfile = res.data;
        })
        .catch((err) => {
          console.log(err);
          console.log(this.userInfo);
        });
    },
  },
};
</script>

<style scoped></style>
