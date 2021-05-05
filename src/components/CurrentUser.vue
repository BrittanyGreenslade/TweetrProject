<template>
  <div>
    <div>
      <h3>{{ currentUserInfo.username }}</h3>
      <h5>{{ currentUserInfo.bio }}</h5>
      <h5>{{ currentUserInfo.email }}</h5>
      <h4>{{ currentUserInfo.birthdate }}</h4>
      <!-- <user-tweets /> -->
    </div>
    <button v-if="toggleEditOn === false" @click="toggleEditOn = !toggleEditOn">
      Edit Profile
    </button>
    <button
      v-if="toggleDeleteOn === false"
      @click="toggleDeleteOn = !toggleDeleteOn"
    >
      Delete Profile
    </button>

    <section v-if="toggleEditOn === true" id="editProfile">
      <edit-profile-form />
      <button @click="toggleEditOn = false">Cancel</button>
    </section>

    <section v-if="toggleDeleteOn === true">
      <delete-profile />
      <button @click="toggleDeleteOn = false">Cancel</button>
    </section>
    <h3>Your Tweets</h3>
    <current-user-tweets />

    <!-- <div v-else>
      <div>
        <h3>{{ otherUserInfo.username }}</h3>
        <h5>{{ otherUserInfo.bio }}</h5>
        <h5>{{ otherUserInfo.email }}</h5>
        <h4>{{ otherUserInfo.birthdate }}</h4>
      </div> -->
    <!-- v-for="info in this.otherUserInfo"
        :key="info.userId"
        :otherUserId="info.userId" -->
  </div>
  <!-- </div> -->
</template>

<script>
import EditProfileForm from "./EditProfileForm.vue";
import DeleteProfile from "./DeleteProfile.vue";
import CurrentUserTweets from "./CurrentUserTweets.vue";
export default {
  components: { EditProfileForm, DeleteProfile, CurrentUserTweets },
  name: "current-user",
  data() {
    return {
      toggleEditOn: false,
      toggleDeleteOn: false,
      // paramId: this.$route.params.userId,
      // currentUserId: cookies.get("currentUserInfo").userId,
    };
  },
  // mounted() {
  //   this.viewUserProfile();
  // },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    otherUserInfo() {
      return this.$store.state.otherUserInfo;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
    // selectedUserId() {
    //   return this.$store.state.selectedUserId;
    // },
    currentUserTweets() {
      return this.$store.state.currentUserTweets;
    },
  },

  methods: {
    // viewOtherUserProfile() {
    //   for (let i = 0; i < this.otherUserInfo.length; i++) {
    //     let otherUserInfo = this.otherUserInfo[i];
    //     this.$store.commit("updateOtherUserInfo", otherUserInfo);
    //   }
    // },
    // viewUserProfile() {
    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/users",
    //       // method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },
    //       params: {
    //         userId: this.currentUserId,
    //       },
    //     })
    //     .then((res) => {
    //       this.$router.push({
    //         name: "User Profile",
    //         params: { userId: this.currentUserInfo.userId },
    //       }),
    //         console.log(res.data);
    //       //is this okkkkkk?
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       console.log(this.currentUserInfo);
    //     });
    // },
  },
};
</script>

<style scoped>
button {
  border: 1px solid black;
}
</style>
