<template>
  <div>
    <div v-if="this.selectedUserId === this.currentUserInfo.userId">
      <h3>{{ currentUserInfo.username }}</h3>
      <h5>{{ currentUserInfo.bio }}</h5>
      <h5>{{ currentUserInfo.email }}</h5>
      <h4>{{ currentUserInfo.birthdate }}</h4>
    </div>
    <div v-else-if="this.selectedUserId === this.otherUserInfo.userId">
      <div>
        <h3>{{ otherUserInfo.username }}</h3>
        <h5>{{ otherUserInfo.bio }}</h5>
        <h5>{{ otherUserInfo.email }}</h5>
        <h4>{{ otherUserInfo.birthdate }}</h4>
      </div>
      <!-- v-for="info in this.otherUserInfo"
        :key="info.userId"
        :otherUserId="info.userId" -->
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
// import axios from "axios";
export default {
  name: "single-user",
  data() {
    return {
      currentUserInfo: cookies.get("currentUserInfo"),
      // otherUserId: "",
    };
  },
  mounted() {
    this.viewOtherUserProfile();
  },
  computed: {
    otherUserInfo() {
      return this.$store.state.otherUserInfo;
    },
    allUsers() {
      return this.$store.state.allUsers;
    },
    selectedUserId() {
      return this.$store.state.selectedUserId;
    },
    userTweets() {
      return this.$store.state.currentUserTweets;
    },
  },

  methods: {
    viewOtherUserProfile() {
      for (let i = 0; i < this.otherUserInfo.length; i++) {
        let otherUserInfo = this.otherUserInfo[i];
        this.$store.commit("updateOtherUserInfo", otherUserInfo);
      }
    },
    // axios
    //   .request({
    //     url: "https://tweeterest.ml/api/users",
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //     },
    //     params: {
    //       userId: this.selectedUserId,
    //     },
    //   })
    //   .then((res) => {
    //     this.$store.commit("updateOtherUserInfo", res.data);
    //     console.log(res.data);
    //     //is this okkkkkk?
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>

<style scoped></style>
