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
    userId: "",
    userInfo: cookies.get("setUserInfo"),
    allUsers: "",
  },
  mutations: {
    updateAllUsers(state, data) {
      state.allUsers = data;
    },
    updateLoginToken(state, data) {
      // let updatedLoginToken = cookies.get("loginToken");
      // state.loginToken = updatedLoginToken;
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
      state.userId = data;
    },
  },
  actions: {},
  getters: {},
});
