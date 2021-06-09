<template>
  <div>
    <!-- <img
      v-if="
        toggleEditOn === false &&
          Number(currentUserInfo.userId) === Number(userId)
      "
      @click="toggleEditOn = true"
      class="actionIcon"
      src="@/assets/images/edit.svg"
      alt="pencil icon - edit button"
    /> -->
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
    <section id="postCommentContainer" v-if="toggleEditOn === true">
      <textarea name="editTweet" id="editTweet"></textarea>
      <!-- OMG DYNAMIC BINDING TWEET ID fun  -->
      <div id="btnsContainer">
        <button @click="editTweet">Edit</button>
        <img
          class="actionIcon"
          @click="toggleEditOn = !toggleEditOn"
          src="@/assets/images/close.svg"
          alt="black x - cancel icon"
        />
      </div>
    </section>
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
          url: "https://tweeterest.ml/api/tweets",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            tweetId: this.tweetId,
            content: document.getElementById("editTweet").value,
            // content: document.getElementById("editTweet" + this.tweetId).value,
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
/* .actionIcon {
  width: 20px;
} */
#viewCmt {
  color: #909929;
  margin-bottom: 5px;
  font-size: 11px;
}
#viewCmt:hover {
  font-size: 12px;
}
#editTweet {
  margin-top: 5px;
}
textarea {
  place-self: center;
  width: 90%;
}
</style>
