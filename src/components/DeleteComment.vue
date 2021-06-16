<template>
  <div id="deleteTweetCont">
    <img
      v-if="
        toggleDeleteOn === false &&
          Number(currentUserInfo.userId) === Number(userId)
      "
      @click="deleteComment"
      class="actionIcon"
      src="@/assets/images/trash.svg"
      alt="recycle bin icon - delete tweet button"
    />
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "delete-comment",
  data() {
    return {
      toggleDeleteOn: false,
      loginToken: cookies.get("loginToken"),
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },
  props: {
    userId: Number,
    tweetComments: Array,
    commentId: Number,
  },
  computed: {},
  methods: {
    deleteComment() {
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            commentId: this.commentId,
          },
        })
        .then((res) => {
          res;
          for (let i = 0; i < this.tweetComments.length; i++) {
            if (this.tweetComments[i].commentId === this.commentId) {
              //at index [i] (where tweetId = commentID)
              this.tweetComments.splice(i, 1);
              this.$emit("commentsAfterDelete", this.tweetComments);
            }
          }
        })
        .catch((err) => {
          console.log(this.tweetComments);

          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#deleteTweetCont {
  margin-right: 10px;
}
</style>
