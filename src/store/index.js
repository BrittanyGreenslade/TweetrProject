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
    otherUserInfo: [],
    // otherUserId: "",
    currentUserTweets: [],
    otherUsersTweets: [],
    tweetLikes: [],
    numTweetLikes: "",
    tweetId: "",
    numCommentLikes: "",
    followInfo: {
      currentUserFollowers: [],
      otherUserFollowers: [],
    },
    //same as otherUserId so might not need?
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
    updateCurrentUserPassword(state, data) {
      state.currentUserPassword = data;
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
    updateOtherUsersTweets(state, data) {
      state.otherUsersTweets = data;
    },
    updateTweetId(state, data) {
      state.tweetId = data;
    },
    updateUserTweets(state, data) {
      state.userTweets = data;
    },
  },
  actions: {},
  getters: {},
});
