import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginToken: cookies.get("loginToken"),
    currentUserInfo: cookies.get("currentUserInfo"),
    allUsers: [],
    allTweets: [],
    followingUsers: [],
    followingTweets: [],
    usersNotFollowing: [],
    currentUserTweets: [],
    followedUser: false,
  },
  mutations: {
    //all users mutations
    updateAllUsers(state, data) {
      state.allUsers = data;
    },
    updateFollowingUsers(state, data) {
      state.followingUsers = data;
    },
    updateFollowingTweets(state, data) {
      state.followingTweets = data;
    }, // updateNotFollowing(state, data) {
    //   state.notFollowing = data;
    // },
    addUserToFollowing(state, data) {
      state.followingUsers.push(data);
    },
    toggleFollowedUser(state, data) {
      state.followedUser = data;
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
  actions: {
    getFollowing: function(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          //this is the userId of the follower
          params: { userId: context.state.currentUserInfo.userId },
        })
        .then((res) => {
          console.log(res.data);
          context.commit("updateFollowingUsers", res.data);
          return context.state.followingUsers;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllTweets(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          // method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          context.commit("updateAllTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllUsers(context) {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          // method:"GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
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

    followedTweets: function(state) {
      let followedTweets = [];
      return state.allTweets.filter(function filterFollowedTweets() {
        for (let i = 0; i < state.allTweets.length; i++) {
          for (let i = 0; i < state.followingUsers.length; i++) {
            if (state.allTweets[i].userId === state.followingUsers[i].userId) {
              followedTweets.push(state.allTweets[i]);
              // state.followingTweets = state.allTweets[i];
            }
          }
        }
        return followedTweets;
      });
    },
  },
});
