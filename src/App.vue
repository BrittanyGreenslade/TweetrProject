<template>
  <div id="app">
    <h1>Tweeter</h1>
    <img
      src="@/assets/images/peace-dove.svg"
      alt="black outline of dove holding flower"
    />
    <div id="nav">
      <span v-if="!loginToken">
        <router-link to="/login">Login/Sign-up</router-link>
      </span>
      <span v-else-if="loginToken">
        <router-link :to="`/profile/${currentUserInfo.userId}`">
          My Profile</router-link
        >
        |
        <router-link to="/feed">Feed</router-link>
        |
        <router-link to="/discover">Discover</router-link> |
        <router-link to="/users">Users</router-link>
      </span>
    </div>
    <logout-button v-if="loginToken" />
    <router-view />

    {{ loginStatus }}
  </div>
</template>
<script>
import cookies from "vue-cookies";
import LogoutButton from "./components/LogoutButton.vue";

export default {
  components: {
    LogoutButton,
  },

  data() {
    return {
      loginStatus: "",
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },

  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
  },
  methods: {
    navigateToHome() {
      this.$router.push({ path: "/feed" });
    },
    notifyLogin() {
      if (!this.loginToken) {
        this.navigateToHome();
        // this.loginStatus = "Please login to continue";
      }
    },
    navigateToProfile() {
      this.$router.push({ path: `/profile/${this.currentUserInfo.userId}` });
    },
  },
};
</script>
<style scoped>
img {
  width: 50px;
}
</style>
<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<!-- <h1>Greetings Earthlings! Welcome to (Tweeter)</h1> -->
<!-- <h4>Crafting a green world</h4> -->
<!-- <h4>Be earth friendly.</h4> -->
<!-- <p>A platform on which to share sustainability tips, products, and information</p> -->
