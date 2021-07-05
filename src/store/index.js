import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginToken: cookies.get("loginToken"),
    currentUserInfo: cookies.get("currentUserInfo"),
    allUsers: undefined,
    allTweets: undefined,
    followingUsers: undefined,
    followingTweets: undefined,
    // usersNotFollowing: [],
    currentUserTweets: undefined,
    // followedUser: false,
  },
  mutations: {
    //all users mutations
    //used
    updateAllUsers(state, data) {
      state.allUsers = data;
    },
    //used
    updateFollowingUsers(state, data) {
      state.followingUsers = data;
    },
    //used
    updateFollowingTweets(state, data) {
      state.followingTweets = data;
    },
    //used
    addUserToFollowing(state, data) {
      state.followingUsers.push(data);
    },
    //used
    removeUserFromFollowing(state, data) {
      state.followingUsers.splice(data, 1);
    },
    //current User info Mutations
    updateCurrentUserInfo(state, data) {
      state.currentUserInfo = data;
      cookies.set("currentUserInfo", data);
    },
    updateLoginToken(state, data) {
      state.loginToken = data;
    },
    addCurrentToFollowing(state) {
      state.followingUsers.push(state.currentUserInfo);
    },
    //tweet mutations
    updateCurrentUserTweets(state, data) {
      state.currentUserTweets = data;
    },
    updateAllTweets(state, data) {
      state.allTweets = data;
    },
    // addTweetToCurrentTweets(state, data) {
    //   state.currentUserTweets = data;
    // },
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
  actions: {
    getFollowingTweets(context) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/followingTweets`,
          headers: {
            "Content-Type": "application/json",
            loginToken: context.state.loginToken,
          },
        })
        .then((res) => {
          context.commit("updateFollowingTweets", res.data);
          //add current user tweets here
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewMyTweets(context) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/tweets`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userId: context.state.currentUserInfo.userId,
          },
        })
        .then((res) => {
          context.commit("updateCurrentUserTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getFollowingUsers(context) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/follows`,
          headers: {
            "Content-Type": "application/json",
          },
          //this is the userId of the follower
          params: { userId: context.state.currentUserInfo.userId },
        })
        .then((res) => {
          context.commit("updateFollowingUsers", res.data);
          context.commit(
            "addCurrentToFollowing",
            context.state.currentUserInfo
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllTweets(context) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/tweets`,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          context.commit("updateAllTweets", res.data);
          console.log(context.state.allTweets);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllUsers(context) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          context.commit("updateAllUsers", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  getters: {
    // sortedCurrentTweets: function(state) {
    //   return state.currentUserTweets.sort(function(tweet1, tweet2) {
    //     return tweet2.tweetId - tweet1.tweetId;
    //   });
    // },
    // sortedAllTweets: function(state) {
    //   return state.allTweets.sort(function(tweet1, tweet2) {
    //     return tweet2.tweetId - tweet1.tweetId;
    //   });
    // },
  },
});
