import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginToken: cookies.get("loginToken"),
    currentUserInfo: cookies.get("userInfo"),
    // otherUserInfo: {
    //   userId: "",
    //   email:"",
    //   username:"",
    //   bio:"",
    //   birthdate:"",
    //   imageUrl:"",
    //   bannerUrl:"",
    // },
    allUsers: [],
    selectedUserId: "",
    singleUser: "",
    otherUserInfo: {},
    // otherUserId: "",
    allUsersTweets: [],
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
    //same as otherUserInfo.id so might not need?
    followId: "",
    commentInfo: {
      commentId: "",
      commentTweetId: "",
      commentUserId: "",
      commentUsername: "",
      commentContent: "",
      commentCreatedAt: "",
      commentLikes: [],
    },
  },
  mutations: {
    //all users mutations
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
    updateCurrentUserEmail(state, data) {
      state.currentUserInfo.email = data;
    },
    updateCurrentUsername(state, data) {
      state.currentUserInfo.username = data;
    },
    updateCurrentUserBio(state, data) {
      state.currentUserInfo.userBio = data;
    },
    updateCurrentUserBirthdate(state, data) {
      state.currentUserInfo.userBirthdate = data;
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
    addTweetToCurrentsTweets(state, data) {
      state.currentUserTweets.push(data);
    },
    addTweetToAllTweets(state, data) {
      state.allUsersTweets.push(data);
    },
    removeTweetFromCurrentTweets(state, data) {
      state.currentUserTweets.pop(data);
    },
    removeTweetFromAllUsersTweets(state, data) {
      state.allUsersTweets.pop(data);
    },
    // udpateAllTweets(state, data) {
    //   state.allTweets = data;
    // },
    // updateUserTweets(state, data) {
    //   state.userTweets = data;
    // },
  },
  actions: {},
  getters: {
    recentCurrentTweets(state) {
      return state.currentUserTweets.reverse();
    },
    recentAllUsersTweets(state) {
      return state.allUsersTweets.reverse();
    },
  },
});
