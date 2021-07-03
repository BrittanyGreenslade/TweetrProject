<template>
  <div class="pageContainer">
    <div class="profileContents">
      <h1>Your Profile</h1>
      <h2>{{ currentUserInfo.username }}</h2>
      <h5>Birthdate: {{ currentUserInfo.birthdate }}</h5>
      <h5>{{ currentUserInfo.email }}</h5>
      <p class="bio">{{ currentUserInfo.bio }}</p>
      <div id="iconsContainer">
        <edit-profile-form />
        <delete-profile />
      </div>
    </div>

    <post-tweet />
    <current-user-tweets />
  </div>
</template>

<script>
// import cookies from "vue-cookies";
import EditProfileForm from "./EditProfileForm.vue";
import DeleteProfile from "./DeleteProfile.vue";
import CurrentUserTweets from "./CurrentUserTweets.vue";
import PostTweet from "./PostTweet.vue";
export default {
  components: {
    EditProfileForm,
    DeleteProfile,
    CurrentUserTweets,
    PostTweet,
  },
  name: "current-user",
  data() {
    return {
      toggleDeleteOn: false,
      toggleEditOn: false,
    };
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
};
</script>

<style scoped>
h5 {
  font-size: 14px;
}
#iconsContainer {
  display: grid;
  grid-auto-flow: column;
  width: 20%;
  place-self: center;
  margin-right: 10px;
}
.pageContainer {
  margin-top: 0;
}
h2 {
  margin-top: 10px;
}
</style>
