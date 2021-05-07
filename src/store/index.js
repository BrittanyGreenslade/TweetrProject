import Vue from "vue";
import Vuex from "vuex";

import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginToken: cookies.get("loginToken"),
    currentUserInfo: cookies.get("currentUserInfo"),
    toggleEditOn: false,
    allUsers: [],
    allTweets: [],
    selectedUserId: "",
    singleUser: "",
    otherUserInfo: [],
    // otherUserId: "",
    allUsersTweets: [],
    otherUserTweets: [],

    currentUserTweets: [],
    // otherUsersTweets: [],
    tweetLikes: [],
    numTweetLikes: "",
    selectedTweetId: undefined,
    numCommentLikes: "",
    followInfo: {
      currentUserFollowers: [],
      otherUserFollowers: [],
    },
    toggleCommentOn: false,
    toggleCommentViewOn: false,
    //same as otherUserInfo.id so might not need?
    followId: "",
    tweetComments: [],
    // commentInfo: {
    //   commentId: "",
    //   commentTweetId: "",
    //   commentUserId: "",
    //   commentUsername: "",
    //   commentContent: "",
    //   commentCreatedAt: "",
    //   commentLikes: [],
    // },
  },
  mutations: {
    //all users mutations
    updateEditToggle(state, data) {
      state.toggleEditOn = data;
    },
    updateCommentToggle(state, data) {
      state.toggleCommentOn = data;
    },
    updateToggleCommentView(state, data) {
      state.toggleCommentViewOn = data;
    },
    updateAllUsers(state, data) {
      state.allUsers = data;
    },
    updateSelectedUserId(state, data) {
      state.selectedUserId = data;
    },
    //current User info Mutations
    updateCurrentUserInfo(state, data) {
      state.currentUserInfo = data;
    },
    updateCurrentUserId(state, data) {
      state.currentUserInfo.userId = data;
    },

    updateLoginToken(state, data) {
      state.loginToken = data;
    },
    updateCurrentUserTweets(state, data) {
      state.currentUserTweets = data;
    },

    //Other users info mutations
    updateFollowId(state, data) {
      state.followId = data;
    },
    updateOtherUserId(state, data) {
      state.otherUserInfo.userId = data;
    },
    updateOtherUserInfo(state, data) {
      state.otherUserInfo = data;
    },
    //comment mutations
    updateNumCommentLikes(state, data) {
      state.numCommentLikes = data;
    },
    updateCommentInfo(state, data) {
      state.commentInfo = data;
    },
    updateCommentContent(state, data) {
      state.commentContent = data;
    },
    updateCommentUserId(state, data) {
      state.commentUserId = data;
    },
    updateCommentId(state, data) {
      state.commentInfo.commentId = data;
    },
    //tweet mutations
    updateNumTweetLikes(state, data) {
      state.numTweetLikes = data;
    },
    updateTweetLikes(state, data) {
      state.tweetLikes = data;
    },
    updateAllUsersTweets(state, data) {
      state.allUsersTweets = data;
    },
    updateSelectedTweetId(state, data) {
      state.selectedTweetId = data;
    },
    updateTweetComments(state, data) {
      state.tweetComments = data;
    },
    addCommentToComments(state, data) {
      state.tweetComments.push(data);
    },
    addTweetToCurrentTweets(state, data) {
      state.currentUserTweets.push(data);
    },
    addTweetToAllTweets(state, data) {
      state.allUsersTweets.push(data);
    },
    removeTweetFromCurrentTweets(state, data) {
      state.currentUserTweets.splice(data);
    },
    removeTweetFromAllUsersTweets(state, data) {
      state.allUsersTweets.splice(data);
    },
    updateOtherUserTweets(state, data) {
      state.otherUserTweets = data;
    },

    udpateAllTweets(state, data) {
      state.allTweets = data;
    },
  },
  actions: {},
  getters: {},
});
