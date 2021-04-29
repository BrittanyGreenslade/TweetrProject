<template>
  <div>
    <button>Edit Profile</button>
    <section id="editProfile">
      <edit-profile />
    </section>

    <button>Delete Profile</button>
    <section>
      <delete-profile />
    </section>
  </div>
</template>

<script>
import DeleteProfile from "../components/DeleteProfile.vue";
import EditProfile from "../components/EditProfileForm.vue";
export default {
  components: {
    EditProfile,
    DeleteProfile,
  },
};
</script>

<style scoped></style>
