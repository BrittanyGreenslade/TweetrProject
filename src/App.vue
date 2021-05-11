<template>
  <div id="app">
    <h1>Sustainappbility</h1>
    <!-- <h1>Greetings Earthlings! Welcome to (Tweeter)</h1> -->
    <!-- <h4>Crafting a green world</h4> -->
    <!-- <h4>Be earth friendly.</h4> -->
    <!-- <p>A platform on which to share sustainability tips, products, and information</p> -->
    <img
      src="@/assets/images/peace-dove.svg"
      alt="black outline of dove holding flower"
    />
    <section id="nav">
      <div v-if="!loginToken">
        <router-link to="/login">Login/Sign-up</router-link>
      </div>
      <div v-else-if="loginToken">
        <router-link :to="`/profile/${currentUserInfo.userId}`">
          My Profile</router-link
        >
        |
        <router-link to="/feed">Feed</router-link>
        |
        <router-link to="/discover">Discover</router-link> |
        <router-link to="/users">Users</router-link>
      </div>
    </section>
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
  //try global emit toast popup
  computed: {
    loginToken() {
      return this.$store.state.loginToken;
    },
    routePath() {
      return this.$route.path;
    },
  },
  watch: {
    routePath(newValue, oldValue) {
      if (this.loginToken && newValue === "/") {
        this.$router.push({ path: `/feed` });
      }
      oldValue;
    },
  },
  mounted() {
    if (this.loginToken && this.$route.path === "/") {
      this.$router.push({ path: `/feed` });
    }
  },
  methods: {
    notifyLogin() {
      if (!this.loginToken) {
        this.$router.push({ path: `/login` });
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
h1 {
  font-family: "Courgette", cursive;
}
</style>
<style>
@import url("https://fonts.googleapis.com/css2?family=Courgette&family=Prata&display=swap");
/* font-family: 'Courgette', cursive;
font-family: 'Prata', serif; */
* {
  padding: 0;
  margin: 0;
}
img {
  width: 50px;
}

.tweetCard {
  width: 50%;
  background: #cbddbb;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0;
}
body {
  background: #efffc8;
  color: #30321c;
  font-family: "Prata", serif;
}
/* root {
  background: #5f9d62;
} */
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #30321c;
  font-size: 14px;
  /* height: 100%; */
  background: #efffc8;
  /* background: #94ae89; */
}
#nav {
  padding: 30px;
}
#nav a {
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #30321c;
}
#nav a.router-link-exact-active {
  color: #82ad5c;
}
</style>
