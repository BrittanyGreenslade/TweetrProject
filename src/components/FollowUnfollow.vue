<template>
  <div>
    <img
      class="actionIcon"
      v-if="followedUser === false"
      @click="followUser"
      src="@/assets/images/follow.svg"
      alt="follow user icon"
    />

    <img
      class="actionIcon"
      v-else
      @click="unfollowUser"
      src="@/assets/images/unfollow.svg"
      alt="unfollow user icon"
    />
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "follow-unfollow",
  data() {
    return {
      followedUser: false,
      // followingUsers: [],
      //   numFollowing: "",
      loginToken: cookies.get("loginToken"),
    };
  },
  props: {
    user: Object,
    followId: Number,
  },
  mounted() {
    this.$store.dispatch("getFollowing");
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
  watch: {
    //runs when computed values change
    followingUsers(newValue, oldValue) {
      for (let i = 0; i < newValue.length; i++) {
        if (newValue[i].userId === this.user.userId) {
          this.followedUser = true;
          return;
        }
      }
      oldValue;
    },
  },
  methods: {
    followUser() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            followId: this.user.userId,
          },
        })
        .then((res) => {
          res;
          this.followedUser = true;

          this.$store.commit("addUserToFollowing", this.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unfollowUser() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            followId: this.user.userId,
          },
        })
        .then((res) => {
          res;
          this.followedUser = false;
          for (let i = 0; i < this.followingUsers.length; i++) {
            if (this.user.userId === this.followingUsers[i].userId) {
              this.$store.commit("removeUserFromFollowing", i);
            }
          }
          this.$store.commit("updateFollowingUsers", this.followingUsers);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
/* .actionIcon {
  width: 40px;
} */
</style>
