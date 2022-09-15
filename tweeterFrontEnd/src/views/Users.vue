<template>
  <div class="pageContainer">
    <h1>All Users</h1>
    <all-users id="allUsers" />
  </div>
</template>

<script>
import AllUsers from "@/components/AllUsers.vue";

export default {
  name: "users",
  components: {
    AllUsers,
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>
