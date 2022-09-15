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
    currentUserTweets: undefined,
    tweetLikes: {},
    commentLikes: {},
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
    },
    addUserToFollowing(state, data) {
      if (state.followingUsers !== undefined) {
        state.followingUsers.push(data);
      } else {
        let followingUsers = [];
        followingUsers.push(data);
        state.followingUsers = followingUsers;
      }
    },
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
    //tweet like mutations
    addLikeToTweetLikes(state, data) {
      Vue.set(state.tweetLikes, data.tweetId, data.likes);
    },
    likeTweet(state, data) {
      let likes = state.tweetLikes[data.tweetId];
      likes.push(data.like);
      Vue.set(state.tweetLikes, data.tweetId, likes);
    },
    removeLikeFromTweetLikes(state, data) {
      let likes = state.tweetLikes[data.tweetId];
      //filter based on user_id != my userid (if my user_id is not in, keep those ones)
      function notCurrentLike(likes) {
        for (let i = 0; i < likes.length; i++) {
          if (likes[i].userId != state.currentUserInfo.userId) {
            likes.push(data.like);
          }
        }
      }
      let filtered = likes.filter(notCurrentLike);

      Vue.set(state.tweetLikes, data.tweetId, filtered);
    },
    //comment like mutations
    addLikeToCommentLikes(state, data) {
      Vue.set(state.commentLikes, data.commentId, data.likes);
    },
    likeComment(state, data) {
      let likes = state.commentLikes[data.commentId];
      likes.push(data.like);
      Vue.set(state.commentLikes, data.commentId, likes);
    },
    removeLikeFromCommentLikes(state, data) {
      let likes = state.commentLikes[data.commentId];
      //filter based on user_id != my userid (if my user_id is not in, keep those ones)
      function notCurrentLike(likes) {
        for (let i = 0; i < likes.length; i++) {
          if (likes[i].userId != state.currentUserInfo.userId) {
            likes.push(data.like);
          }
        }
      }
      let filtered = likes.filter(notCurrentLike);

      Vue.set(state.commentLikes, data.commentId, filtered);
    },
    //tweet mutations
    updateCurrentUserTweets(state, data) {
      state.currentUserTweets = data;
    },
    updateAllTweets(state, data) {
      state.allTweets = data;
    },
    addTweetToCurrentTweets(state, data) {
      if (state.currentUserTweets !== undefined) {
        state.currentUserTweets.push(data);
      } else {
        let currentUserTweets = [];
        currentUserTweets.push(data);
        state.currentUserTweets = currentUserTweets;
      }
    },
    addTweetToAllTweets(state, data) {
      if (state.allTweets !== undefined) {
        state.allTweets.push(data);
      } else {
        let allTweets = [];
        allTweets.push(data);
        state.allTweets = allTweets;
      }
    },
    removeTweetFromCurrentTweets(state, data) {
      state.currentUserTweets.splice(data, 1);
    },
    removeTweetFromAllUsersTweets(state, data) {
      state.allTweets.splice(data, 1);
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

    // getFollowingUsers(context) {
    //   axios
    //     .request({
    //       url: `${process.env.VUE_APP_API_URL}/follows`,
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       //this is the userId of the follower
    //       params: { userId: context.state.currentUserInfo.userId },
    //     })
    //     .then((res) => {
    //       context.commit("updateFollowingUsers", res.data);
    //       context.commit(
    //         "addCurrentToFollowing",
    //         context.state.currentUserInfo
    //       );
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

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
    currentAndFollowing(state) {
      let tweets = [];
      if (
        state.followingTweets === undefined ||
        state.currentUserTweets === undefined
      ) {
        return tweets;
      }
      // for each tweet in tweets, push that tweet to tweets array
      state.followingTweets.forEach((tweet) => tweets.push(tweet));
      state.currentUserTweets.forEach((tweet) => tweets.push(tweet));

      return tweets.sort(function(tweet1, tweet2) {
        return Date.parse(tweet2.createdAt) - Date.parse(tweet1.createdAt);
      });
    },
    sortedCurrentTweets(state) {
      let tweets = [];
      if (state.currentUserTweets === undefined) {
        return tweets;
      }

      return state.currentUserTweets.sort(function(tweet1, tweet2) {
        return Date.parse(tweet2.createdAt) - Date.parse(tweet1.createdAt);
      });
    },
    sortedAllTweets(state) {
      let tweets = [];
      if (state.allTweets === undefined) {
        return tweets;
      }
      return state.allTweets.sort(function(tweet1, tweet2) {
        return Date.parse(tweet2.createdAt) - Date.parse(tweet1.createdAt);
      });
    },
  },
});
