<template>
  <div>
    <div>
      <h3>{{ currentUserInfo.username }}</h3>
      <h5>{{ currentUserInfo.bio }}</h5>
      <h5>{{ currentUserInfo.email }}</h5>
      <h4>{{ currentUserInfo.birthdate }}</h4>
    </div>
    <edit-profile-form />
    <delete-profile />
    <br /><br /><br />
    <!-- <user-following :userId="currentUserInfo.userId" /> -->
    <post-tweet />
    <current-user-tweets />
  </div>
</template>

<script>
import cookies from "vue-cookies";
import EditProfileForm from "./EditProfileForm.vue";
import DeleteProfile from "./DeleteProfile.vue";
import CurrentUserTweets from "./CurrentUserTweets.vue";
import PostTweet from "./PostTweet.vue";
// import UserFollowing from "./UserFollowing.vue";
export default {
  components: {
    EditProfileForm,
    DeleteProfile,
    CurrentUserTweets,
    PostTweet,
    // UserFollowing,
  },
  name: "current-user",
  data() {
    return {
      toggleDeleteOn: false,
      currentUserInfo: cookies.get("currentUserInfo"),
      toggleEditOn: false,
    };
  },
};
</script>

<style scoped>
button {
  border: 1px solid black;
}
</style>
