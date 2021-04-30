<template>
  <div>
    <div>
      <button @click="getAllUsers">
        All Users
      </button>
    </div>
    <p>{{ this.allUsers }}</p>
    <div v-for="user in this.allUsers" v-bind:key="user.userId">
      <h3>
        Username: {{ user.username }}
        <br />
        Email:{{ user.email }}
        <br />
        Bio:{{ user.bio }}
        <br />
        Birthday: {{ user.birthdate }}
      </h3>

      <br />
    </div>

    <!-- <div v-if="getAllUsers">
      <h3 v-for="user in allUsers" :key="user.userId"></h3>
    </div> -->
    <!-- <p v-for="user in allUsers" :key="user.userId">{{ user.username }}</p> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "all-users",
  computed: {
    allUsers() {
      return this.$store.state.allUsers;
    },
  },
  methods: {
    getAllUsers() {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          // method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            // userId:
          },
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("updateAllUsers", res.data);
          //   console.log(this.allUsers);
          // document.getElementById(
          //   "usersContainer"
          // ).innerHTML = `<h3>${res.data.username}</h3>`;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
