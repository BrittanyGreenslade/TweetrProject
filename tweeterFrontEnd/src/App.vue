<template>
  <div id="app">
    <div id="inApp">
      <div id="titleContainer">
        <h1>Sustainappbility</h1>
        <img
          id="logo"
          src="@/assets/images/peace-dove.svg"
          alt="black outline of dove holding flower"
        />
      </div>
      <!-- <router-link v-if="!loginToken" :to="`/login`">Login</router-link> -->
      <section id="nav">
        <div v-if="loginToken" id="navIconsContainer">
          <router-link to="/feed">
            <img
              id="feedNav"
              class="navIcon"
              src="@/assets/images/home.svg"
              alt="group of trees - users icon"
            />
          </router-link>
          <router-link :to="`/profile/${currentUserInfo.userId}`">
            <img
              class="navIcon"
              src="@/assets/images/tree.svg"
              alt="single tree - user profile icon"
          /></router-link>
          <router-link to="/discover"
            ><img
              class="navIcon"
              src="@/assets/images/discover.svg"
              alt="light bulb with leaves inside - discover icon"
            />
          </router-link>
          <router-link to="/users">
            <img
              class="navIcon"
              src="@/assets/images/trees.svg"
              alt="group of trees - users icon"
          /></router-link>
        </div>
        <logout-button v-if="loginToken" id="logoutBtn" />
      </section>

      <router-view />
    </div>
  </div>
</template>
<script>
// import cookies from "vue-cookies";
import LogoutButton from "./components/LogoutButton.vue";

export default {
  components: {
    LogoutButton,
  },
  //try global emit toast popup for success messages?
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
    loginToken() {
      return this.$store.state.loginToken;
    },
    routePath() {
      return this.$route.path;
    },
  },
  watch: {
    //routes to feed when link path is just /
    routePath(newValue, oldValue) {
      if (this.loginToken && newValue === "/") {
        this.$router.push({ path: `/feed` });
      }
      oldValue;
    },
  },
  mounted() {
    // this.$router.push({ path: `/login` });
    if (this.loginToken && this.$route.path === "/") {
      this.$router.push({ path: `/feed` });
    }
    this.notifyLogin();
  },
  methods: {
    notifyLogin() {
      if (!this.loginToken) {
        this.$router.push({ path: `/login` });
      }
    },
  },
};
</script>
<style scoped>
#inApp {
  display: grid;
}
h1 {
  font-size: 33px;
  font-family: "Courgette", cursive;
}
div {
  align-self: start;
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
#logo {
  width: 35px;
}
#titleContainer {
  display: grid;
  /* width: 40%; */
  grid-template-columns: 0.75fr 0.1fr;
  column-gap: 15px;
  margin-top: 5vh;
  place-self: center;
  /* margin-right: 5%; */
}
.pageContainer {
  display: grid;
  place-items: center;
  width: 90vw;
  margin-top: 15px;
  margin-bottom: 20px;
}

button {
  border-radius: 4px;
  border: 2px solid #30321c;
  height: 30px;
  padding: 5px 10px;
  background: #a7b18e;
  color: #30321c;
  box-shadow: 0px 1px 2px 1px #30321c6f;
  font-weight: 700;
}
textarea,
input {
  background: #f5f1e3;
  width: 200px;
  display: grid;
  border: 2px solid #30321c;
  font-family: "Prata", serif;
  border-radius: 4px;
  max-height: 200px;
}
textarea {
  resize: vertical;
  height: 50px;
}
.tweetCommentsContainer {
  background: #f1e9c8;
  border-radius: 5px;
  place-self: center;
  width: 95%;
  display: grid;
  row-gap: 10px;
  margin-bottom: 10px;
}

#logoutBtn:active {
  border-bottom: 1px solid 35a5d346f;
  box-shadow: none;
  /* box-shadow: 0px 1px 1px 0x #5a5d346f; */
}
#btnContain {
  display: grid;
  grid-auto-flow: column;
  width: 45%;
  place-self: end;
  column-gap: 5px;
}
.actionIcon {
  width: 20px;
}
.navIcon {
  width: 30px;
}
.content {
  font-size: 15px;
  margin-bottom: 5px;
}
.createdAt {
  font-size: 10px;
}
.username {
  color: #30331c;
  text-decoration: none;
}
.username:hover {
  color: #909929;
}
/* used break-all here to break tweet if it's too long and breaks out of the container */
.createdAt,
.content,
.username {
  overflow-wrap: anywhere;
  justify-self: start;
}
.profileContents {
  display: grid;
  row-gap: 3px;
  text-align: center;
}
.bio {
  font-style: italic;
}
.navUserProf {
  text-decoration: none;
  color: #909929;
  font-weight: 500;
  font-size: 14px;
}
#nav {
  width: 100%;
  display: grid;
  place-items: center;
}
#navIconsContainer {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 50%;
  margin-top: 10px;
}
#app {
  color: #30321c;
  font-size: 14px;
  width: 90%;
  display: grid;
  place-items: center;
  height: 100vh;
}
.tweetCard {
  overflow-wrap: break-word;
  display: grid;
  padding: 10px;
  width: 70vw;
  height: auto;
  background: #cbddbb;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0;
  text-align: start;
}
/* is it normal to have to style html in vue? */
html {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
}
body {
  height: 100vh;
  display: grid;
  place-items: center;
  width: 100vw;
  text-align: center;
  background: #efffc8;
  color: #30321c;
  font-family: "Prata", serif;
}
.tweetActionsContainer {
  margin-top: 5px;
  width: 100%;
  column-gap: 5px;
  display: grid;
  grid-template-columns: 2fr 1fr;
}
.likesContainer {
  display: grid;
  width: 40%;
  margin-bottom: 3px;
  grid-template-columns: 1.5fr 5fr;
  justify-items: start;
}
.otherUserTweetActions {
  margin-top: 5px;
}
.tweetCardContainer {
  display: grid;
  row-gap: 10px;
  margin-top: 10px;
}
.editContainer,
.postContainer {
  margin-top: 10px;
  display: grid;
  margin-bottom: 10px;
}
#sectContain {
  display: grid;
  grid-auto-flow: column;
  width: 50%;
  align-items: center;
}
#deleteTweetCont {
  justify-self: end;
  margin-right: 5px;
  align-self: center;
}
#postCommentContainer {
  display: grid;
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;
}
#btnsContainer {
  display: grid;
  grid-auto-flow: column;
  width: 35%;
  place-self: end;
  place-items: center;
  margin-top: 2px;
  margin-right: 1%;
}
#cancel {
  justify-self: end;
  margin-right: 10px;
  margin-top: 10px;
}
#postHeader {
  margin-left: 10px;
  font-weight: bold;
}
.cmtContain {
  display: grid;
  place-self: center;
  width: 100%;
}
.cardContainer {
  margin-top: 10px;
  display: grid;
  row-gap: 10px;
}

#viewCmt:hover {
  font-size: 12px;
  color: #30321c;
}
#viewCmt {
  color: #909929;
  font-size: 11px;
  font-style: italic;
  font-weight: bold;
}
</style>
