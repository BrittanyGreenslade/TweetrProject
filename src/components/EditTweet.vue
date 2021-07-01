<template>
  <div class="cmtContain">
    <p
      v-if="
        toggleEditOn === false &&
          Number(currentUserInfo.userId) === Number(userId)
      "
      @click="toggleEditOn = true"
      id="viewCmt"
    >
      Edit Post
    </p>

    <div class="tweetCommentsContainer" v-if="toggleEditOn === true">
      <img
        id="cancel"
        class="actionIcon"
        @click="toggleEditOn = !toggleEditOn"
        src="@/assets/images/close.svg"
        alt="black x - cancel icon"
      />
      <div id="postCommentContainer">
        <textarea
          name="editTweet"
          id="editTweet"
          placeholder="max 200 characters"
        ></textarea>
        <div id="btnsContainer">
          <button id="postBtn" @click="editTweet">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "edit-tweet",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      toggleEditOn: false,
      currentUserInfo: cookies.get("currentUserInfo"),
      successMsg: "",
    };
  },
  props: {
    tweetId: Number,
    userId: Number,
  },
  computed: {
    currentUserTweets() {
      return this.$store.state.currentUserTweets;
    },
    allTweets() {
      return this.$store.state.allTweets;
    },
  },
  methods: {
    editTweet() {
      this.toggleEditOn = false;
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/tweets`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.tweetId,
            content: document.getElementById("editTweet").value,
          },
        })
        .then((res) => {
          this.editTweetViewOn = false;

          for (let i = 0; i < this.currentUserTweets.length; i++) {
            if (this.currentUserTweets[i].tweetId === this.tweetId) {
              this.currentUserTweets[i].content = res.data.content;
              this.$store.commit(
                "updateCurrentUserTweets",
                this.currentUserTweets
              );
            }
            for (let i = 0; i < this.allTweets.length; i++) {
              if (this.allTweets[i].tweetId === this.tweetId) {
                this.allTweets[i].content = res.data.content;
              }
              this.$store.commit("updateAllTweets", this.allTweets);
            }
          }
          // this.successMsg = "Tweet Edited!";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#postBtn {
  margin-top: 5px;
  justify-self: right;
  width: 70px;
  margin-right: 10px;
}
textarea {
  place-self: center;
  width: 90%;
}
</style>
