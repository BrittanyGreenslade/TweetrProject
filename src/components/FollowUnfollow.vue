<template>
  <div>
    <p v-if="followedUser === undefined">...</p>
    <img
      class="actionIcon"
      v-else-if="followedUser === false"
      @click="followUser"
      src="@/assets/images/follow.svg"
      alt="follow user icon"
    />

    <img
      class="actionIcon"
      v-else-if="followedUser === true"
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
      currentUserInfo: cookies.get("currentUserInfo"),
      followedUser: undefined,
      loginToken: cookies.get("loginToken"),
    };
  },
  props: {
    userId: Number,
  },
  mounted() {
    if (this.followingUsers === undefined) {
      this.getFollowingUsers();
    } else {
      this.checkUserFollowed(this.userId);
    }
  },
  computed: {
    followingUsers() {
      return this.$store.state.followingUsers;
    },
  },
  //leaving this here as reference for watch if I need later on
  // watch: {
  //   //watch runs when computed values change
  //   followingUsers(newValue, oldValue) {
  //     for (let i = 0; i < newValue.length; i++) {
  //       if (newValue[i].userId === this.user.userId) {
  //         this.followedUser = true;
  //         return;
  //       }
  //     }
  //     oldValue;
  //   },
  // },
  methods: {
    checkUserFollowed(userId) {
      for (let i = 0; i < this.followingUsers.length; i++) {
        if (Number(userId) == Number(this.followingUsers[i].userId)) {
          this.followedUser = true;
          break;
        }
        if (this.followedUser === undefined) {
          this.followedUser = false;
        }
        // if(this.followedUser === true){

        // }
        //
        //  else if (Number(userId) !== Number(this.followingUsers[i].userId)) {
        //   this.followedUser = false;
        // }
        // } else {
        //   this.followedUser = "...";
        // }
      }
    },
    getFollowingUsers() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/follows`,
          headers: {
            "Content-Type": "application/json",
          },
          //this is the userId of the follower
          params: { userId: this.currentUserInfo.userId },
        })
        .then((res) => {
          this.$store.commit("updateFollowingUsers", res.data);
          this.$store.commit("addCurrentToFollowing", this.currentUserInfo);
          this.checkUserFollowed(this.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    followUser() {
      this.followedUser = true;
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/follows`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            followId: this.userId,
          },
        })
        .then((res) => {
          res;
          console.log(this.followingUsers);
          this.$store.commit("addUserToFollowing", res.data);
          console.log(this.followingUsers);
          this.checkUserFollowed(this.userId);
          //dispatch followed users' tweets or get tweets by their id
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unfollowUser() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/follows`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            followId: this.userId,
          },
        })
        .then((res) => {
          res;
          //filter out unfollowed users tweets
          this.followedUser = false;
          console.log(this.followingUsers);
          for (let i = 0; i < this.followingUsers.length; i++) {
            if (this.userId === this.followingUsers[i].userId) {
              this.$store.commit("removeUserFromFollowing", i);
            }
          }
          console.log(this.followingUsers);
          this.checkUserFollowed();
          // this.$store.commit("updateFollowingUsers", this.followingUsers);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
