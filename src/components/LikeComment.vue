<template>
  <div class="likesContainer">
    <img
      v-if="commentLiked === false"
      @click="likeComment"
      src="@/assets/images/heart.svg"
      alt="hand drawn heart dark green - like button"
      class="actionIcon"
    />
    <img
      class="actionIcon"
      v-else
      @click="unlikeComment"
      src="@/assets/images/unlike.svg"
      alt="hand drawn heart light green - unlike btn"
    />
    <p>Likes: {{ numLikes }}</p>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "like-comment",
  props: {
    commentId: Number,
  },
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      commentLiked: false,
      currentUserInfo: cookies.get("currentUserInfo"),
      numLikes: 0,
    };
  },
  computed: {
    commentLikes() {
      return this.$store.state.commentLikes;
    },
  },
  mounted() {
    //obj will return undefined if it's not there
    if (this.commentLikes[this.commentId] === undefined) {
      this.viewCommentLikes(this.commentId);
    } else {
      this.checkCommentLiked();
      this.numLikes = this.commentLikes[this.commentId].length;
    }
  },
  methods: {
    checkCommentLiked() {
      for (let i = 0; i < this.commentLikes[this.commentId].length; i++) {
        if (
          this.currentUserInfo.userId ===
            this.commentLikes[this.commentId][i].userId &&
          this.commentLikes[this.commentId][i].commentId === this.commentId
        ) {
          this.commentLiked = true;
        }
      }
    },
    viewCommentLikes(commentId) {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/comment-likes`,
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            commentId: commentId,
          },
        })
        .then((res) => {
          this.$store.commit("addLikeToCommentLikes", {
            commentId: commentId,
            likes: res.data,
          });
          this.checkCommentLiked();
          this.numLikes = this.commentLikes[this.commentId].length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likeComment() {
      this.commentLiked = true;
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/comment-likes`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            commentId: this.commentId,
          },
        })
        .then((res) => {
          this.numLikes += 1;
          this.$store.commit("likeComment", {
            commentId: this.commentId,
            like: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unlikeComment() {
      this.commentLiked = false;
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/comment-likes`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            loginToken: this.loginToken,
            commentId: this.commentId,
          },
        })
        .then((res) => {
          this.numLikes -= 1;
          this.$store.commit("removeLikeFromCommentLikes", {
            commentId: this.commentId,
            like: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.likesContainer {
  width: 50%;
}
p {
  font-size: 12px;
  align-self: end;
  margin-bottom: 3px;
  margin-left: 3px;
}
</style>
