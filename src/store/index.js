import Vue from "vue";
import Vuex from "vuex";

import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginToken: cookies.get("loginToken"),
    currentUserInfo: cookies.get("currentUserInfo"),
    allUsers: [],
    allTweets: [],

    currentUserTweets: [],
  },
  mutations: {
    //all users mutations
    updateAllUsers(state, data) {
      state.allUsers = data;
    },
    //current User info Mutations
    updateCurrentUserInfo(state, data) {
      state.currentUserInfo = data;
    },
    updateLoginToken(state, data) {
      state.loginToken = data;
    },
    //tweet mutations
    updateCurrentUserTweets(state, data) {
      state.currentUserTweets = data;
    },
    updateAllTweets(state, data) {
      state.allTweets = data;
    },
    updateToggleTweetLikeOn(state, data) {
      state.toggleTweetLikeOn = data;
    },
    addTweetToCurrentTweets(state, data) {
      state.currentUserTweets.push(data);
    },
    addTweetToAllTweets(state, data) {
      state.allTweets.push(data);
    },
    removeTweetFromCurrentTweets(state, data) {
      state.currentUserTweets.splice(data);
    },
    removeTweetFromAllUsersTweets(state, data) {
      state.allTweets.splice(data);
    },
  },
  actions: {},
  getters: {
    sortedCurrentTweets: function(state) {
      return state.currentUserTweets.sort(function(tweet1, tweet2) {
        return tweet2.tweetId - tweet1.tweetId;
      });
    },
    sortedAllTweets: function(state) {
      return state.allTweets.sort(function(tweet1, tweet2) {
        return tweet2.tweetId - tweet1.tweetId;
      });
    },
  },
});
