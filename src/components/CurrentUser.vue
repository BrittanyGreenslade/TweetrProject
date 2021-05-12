<template>
  <div class="pageContainer">
    <div class="profileContents">
      <h1>Your Profile</h1>
      <h2 class="username">{{ currentUserInfo.username }}</h2>
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
.profileContents {
  display: grid;
  row-gap: 3px;
  padding: 15px;
  text-align: center;
  margin-top: -10px;
}
h5 {
  font-size: 14px;
}
#iconsContainer {
  display: grid;
  grid-auto-flow: column;
  width: 30%;
  place-self: center;
}
.bio {
  font-style: italic;
}
</style>
