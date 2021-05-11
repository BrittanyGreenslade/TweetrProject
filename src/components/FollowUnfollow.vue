<template>
  <div>
    <!-- v-if="followingUsers.length >= 0 && followedUser === false" -->
    <button v-if="followedUser === false" @click="followUser">
      Follow User
    </button>
    <button v-else @click="unfollowUser">
      Unfollow User
    </button>
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
    // allTweets(newValue, oldValue) {
    //   this.$store.commit("updateAllTweets", newValue);
    //   oldValue;
    // },
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
          console.log(this.followingUsers);
        })
        .catch((err) => {
          console.log(err.response);
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
          console.log(this.followingUsers);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
