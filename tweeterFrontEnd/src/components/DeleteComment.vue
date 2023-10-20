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
          url: `api/comments`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            commentId: this.commentId,
          },
        })
        .then(() => {
          const updatedComments = this.tweetComments.filter(
            (comment) => comment.commentId !== this.commentId
          );
          this.$emit("commentsAfterDelete", updatedComments);
        })
        .catch((err) => {
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
