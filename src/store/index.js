import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginToken: "",
    username: "",
    userEmail: "",
    userPassword: "",
    // userImage:"",
    userBirthdate: "",
    userBio: "",
    myUserId: "",
    otherUserId: "",
    otherUserUsername: "",
    userInfo: cookies.get("setUserInfo"),
    allUsers: "",
    singleUser: "",
    otherUserInfo: "",
    userTweets: [],
  },
  mutations: {
    updateUserTweets(state, data) {
      state.userTweets = data;
    },
    updateAllUsers(state, data) {
      state.allUsers = data;
    },
    updateLoginToken(state, data) {
      state.loginToken = data;
    },
    updateUserName(state, data) {
      state.username = data;
    },
    updateUserEmail(state, data) {
      state.userEmail = data;
    },

    updateUserPassword(state, data) {
      state.userPassword = data;
    },
    updateUserBirthdate(state, data) {
      state.userBirthdate = data;
    },
    updateUserBio(state, data) {
      state.userBio = data;
    },
    updateUserId(state, data) {
      state.myUserId = data;
    },
    updateOtherUserId(state, data) {
      state.otherUserId = data;
    },
    updateOtherUserInfo(state, data) {
      state.otherUserInfo = data;
      console.log(data);
    },
  },
  actions: {},
  getters: {},
});
