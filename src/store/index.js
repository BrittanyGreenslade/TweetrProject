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
    loginStatus: "",
  },
  mutations: {
    updateLoginToken(state) {
      let updatedLoginToken = cookies.get("loginToken");
      state.loginToken = updatedLoginToken;
      console.log(state.loginToken);
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
    updateLoginStatus(state, data) {
      state.loginStatus = data;
    },
  },
  actions: {},
  getters: {},
});
