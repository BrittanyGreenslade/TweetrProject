<template>
  <div>
    <!-- <div>
      <button @click="getAllUsers">
        All Users
      </button>
    </div> -->
    <!-- @click="updateOtherUserId(user.userId)" -->
    <!-- <button @click="grabSelectedUserId(user[selectedUser].userId)">
      View user profile
    </button> -->
    <!-- @click="grabSelectedUserId(user.userId)" -->

    <div v-for="user in allUsers" :key="user.userId">
      <h3>
        <button @click="viewSelectProfile(user.userId)">
          View User's Profile
        </button>
        <br />
        Username: {{ user.username }}
        <br />
        Email:{{ user.email }}
        <br />
        Bio:{{ user.bio }}
        <br />
        Birthday: {{ user.birthdate }}
      </h3>
      <other-follows />
      <other-followers />

      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OtherFollows from "@/components/OtherFollowers.vue";
import OtherFollowers from "@/components/OtherFollowers.vue";
export default {
  name: "other-users",
  components: {
    OtherFollows,
    OtherFollowers,
  },
  //this component is rendered on click in a fn in 'Profile.vue' so when it's mounted on
  //the dom, I want to run the axios call to get the users
  mounted() {
    this.getAllUsers();
  },
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
    selectedUserId() {
      return this.$store.state.selectedUserId;
    },

    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  methods: {
    viewSelectProfile(userId) {
      let selectedUserId = userId;
      this.$store.commit("updateSelectedUserId", selectedUserId);
      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.selectedUserId === this.allUsers[i].userId) {
          //     this.$store.commit("updateOtherUserInfo", this.allUsers[i]);

          //   }
          // }
          axios
            .request({
              url: "https://tweeterest.ml/api/users",
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
              },
              params: {
                userId: this.selectedUserId,
              },
            })
            .then((res) => {
              // res.data[this.selectedUserId] =
              this.$store.commit("updateOtherUserInfo", res.data);
              console.log(res.data);
              this.$router.push({
                name: "Single User",
                params: { selectedUserId: this.selectedUserId },
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },

    getAllUsers() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          // method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          this.$store.commit("updateAllUsers", res.data);
          console.log(this.allUsers);
        })
        .catch((err) => console.log(err));
    },
    // updateOtherUserId(userId) {
    //   this.$store.commit("updateOtherUserId", userId);
    // },
    //   this.viewOtherUserProfile();
    //   console.log(userId);
    //   console.log(this.currentUserInfo);
    // },
  },
};
</script>

<style scoped></style>
