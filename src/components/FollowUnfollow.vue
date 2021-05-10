<template>
  <div>
    <button
      v-if="followingUsers.length >= 0 && followedUser === false"
      @click="followUser"
    >
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
      followedUser: undefined,
      // followingUsers: [],
      //   numFollowing: "",
      loginToken: cookies.get("loginToken"),
    };
  },
  props: {
    followId: Number,
  },
  mounted() {
    this.$store.dispatch("getFollowing");
    for (let i = 0; i < this.followingUsers.length; i++) {
      // for (let i = 0; i < this.allUsers.length; i++) {
      if (this.followingUsers[i].userId === this.followId) {
        this.followedUser = true;
      } else {
        this.followedUser = false;
        // }
      }
    }
  },

  //   // console.log(this.currentUserInfo.userId);
  //   // this.$store.dispatch("getAllUsers");
  // },
  computed: {
    followedTweets() {
      return this.$store.getters.followedTweets;
    },
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
    followingUsers() {
      return this.$store.state.followingUsers;
    },
  },
  methods: {
    // getFollowing() {
    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/follows",
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },
    //       //this is the userId of the follower
    //       params: { userId: this.currentUserInfo.userId },
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //       // this.$store.commit("updateFollowingUsers", res.data);
    //       //   this.numFollowing = res.data.length;
    //       for (let i = 0; i < res.data.length; i++) {
    //         if (this.followId === res.data[i].userId) {
    //           this.followedUser = true;
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
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
            followId: this.followId,
          },
        })
        .then((res) => {
          res;
          this.followedUser = true;
          for (let i = 0; i < this.allUsers.length; i++) {
            for (let i = 0; i < this.followingUsers.length; i++) {
              if (this.allUsers[i].userId === this.followingUsers[i].userId) {
                this.$store.commit("addUserToFollowing", this.allUsers[i]);
                this.followingUsers = this.allUsers[i];
              }
            }

            // this.$store.commit("updateFollowingUsers", this.followingUsers);
          }
          console.log(this.followingUsers);
        })
        .catch((err) => {
          console.log(this.followingUsers);
          console.log(this.allUsers);
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
            followId: this.followId,
          },
        })
        .then((res) => {
          res;
          this.followedUser = false;
          console.log(this.followingUsers);
          // for (let i = 0; i < this.allUsers.length; i++) {
          //   for (let i = 0; i < this.followingUsers.length; i++) {
          //     if (this.allUsers[i].userId === this.followingUsers[i].userId) {
          //       this.followingUsers.splice(i, 1);
          //     }
          //   }
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
