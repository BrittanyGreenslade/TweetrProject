<template>
  <div>
    <h2>{{ successMsg }}</h2>
    <button
      v-if="
        toggleEditOn === false &&
          Number(currentUserInfo.userId) === Number(userId)
      "
      @click="toggleEditOn = true"
    >
      Edit Tweet
    </button>
    <section v-if="toggleEditOn === true">
      <textarea name="editTweet" :id="`editTweet${tweetId}`"></textarea>
      <!-- OMG DYNAMIC BINDING TWEET ID this is fun  -->
      <button @click="editTweet">Post Edited Tweet</button>
      <button @click="toggleEditOn = !toggleEditOn">Cancel</button>
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
            content: document.getElementById("editTweet" + this.tweetId).value,
          },
        })
        .then((res) => {
          this.editTweetViewOn = false;
          console.log(res.data);
          for (let i = 0; i < this.currentUserTweets.length; i++) {
            if (this.currentUserTweets[i].tweetId === this.tweetId) {
              this.currentUserTweets[i].content = res.data.content;
              this.$store.commit(
                "updateAllUsersTweets",
                this.currentUserTweets
              );
            }
          }
          this.successMsg = "Tweet Edited!";
        })
        .catch((err) => {
          console.log(err);
          console.log(this.tweetId);
        });
    },
    // toggleEditView(tweetId) {
    //   this.$store.commit("updateSelectedTweetId", tweetId);
    //   this.editTweetViewOn = !this.editTweetViewOn;
    // },
    // editTweet() {
    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/tweets",
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },
    //       data: {
    //         loginToken: this.loginToken,
    //         tweetId: this.selectedTweetId,
    //         content: document.getElementById(
    //           "editTweet" + `${this.selectedTweetId}`
    //         ).value,
    //         //AND GRABBING THE DYNAMIC ID WORKED HERE AHHHHHH
    //       },
    //     })
    //     .then((res) => {
    //       this.editTweetViewOn = false;
    //       console.log(res.data);
    //       // this.$store;

    //       for (let i = 0; i < this.currentUserTweets.length; i++) {
    //         if (this.currentUserTweets[i].tweetId === this.selectedTweetId) {
    //           this.currentUserTweets[i].content = res.data.content;
    //           this.$store.commit(
    //             "updateCurrentUserTweets",
    //             this.currentUserTweets
    //           );
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style scoped></style>
