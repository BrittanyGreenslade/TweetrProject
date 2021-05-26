<template>
  <div>
    <img
      v-if="toggleDeleteOn === false"
      @click="toggleDeleteOn = true"
      class="actionIcon"
      src="@/assets/images/trash.svg"
      alt="recycle bin icon - delete tweet button"
    />
    <!-- <button v-if="toggleDeleteOn === false" @click="toggleDeleteOn = true">
      Delete Comment
    </button> -->

    <div v-if="toggleDeleteOn === true">
      <h4>Are you sure?</h4>
      <img
        class="actionIcon"
        @click="toggleDeleteOn = false"
        src="@/assets/images/close.svg"
        alt="black x - cancel icon"
      />
      <img
        src="@/assets/images/confirm.svg"
        alt="black checkmark - confirm"
        class="actionIcon"
        @click="deleteComment"
      />

      <!-- <button >Cancel</button> -->
    </div>
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
    };
  },
  props: {
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
    //     deleteComment(commentId) {
    //   this.$store.commit("updateCommentId", commentId);
    //   axios
    //     .request({
    //       url: "https://tweeterest.ml/api/comments",
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },
    //       data: {
    //         loginToken: this.loginToken,
    //         commentId: commentId,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style scoped></style>
