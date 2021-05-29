<template>
  <div class="tweetCommentsContainer">
    <div
      class="comments"
      v-for="comment in tweetComments"
      :key="comment.commentId"
    >
      <h3 class="username">{{ comment.username }}</h3>
      <p class="createdAt">{{ comment.createdAt }}</p>
      <p class="content">{{ comment.content }}</p>
      <div class="commentActionsContainer">
        <like-comment :commentId="comment.commentId" />
        <edit-comment
          @newlyEditedComment="handleEditUpdate"
          :commentId="comment.commentId"
        />
        <delete-comment
          @commentsAfterDelete="handleDeleteComment"
          :tweetComments="tweetComments"
          :commentId="comment.commentId"
        />
      </div>
    </div>
    <post-comment @newlyPostedComment="handleNewComment" :tweetId="tweetId" />
    <!-- <button @click="commentViewOn = false">Hide Comments</button> -->
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import EditComment from "./EditComment.vue";
import PostComment from "./PostComment.vue";
import DeleteComment from "./DeleteComment.vue";
import LikeComment from "./LikeComment.vue";

export default {
  components: {
    EditComment,
    PostComment,
    DeleteComment,
    LikeComment,
  },
  name: "tweet-comments",
  data() {
    return {
      loginToken: cookies.get("loginToken"),
      commentViewOn: false,
      tweetComments: [],
    };
  },
  props: {
    tweetId: Number,
  },

  mounted() {
    this.getComments();
  },
  methods: {
    handleNewComment(data) {
      this.tweetComments.push(data);
    },
    handleEditUpdate(data) {
      for (let i = 0; i < this.tweetComments.length; i++) {
        if (this.tweetComments[i].commentId === data.commentId) {
          this.tweetComments[i].content = data.content;
        }
      }
    },
    handleDeleteComment(data) {
      console.log(data);
    },
    getComments() {
      this.commentViewOn = true;
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          this.tweetComments = res.data;
        })
        .catch((err) => {
          console.log(err);
          console.log(this.tweetId);
        });
    },
  },
};
</script>

<style scoped>
.commentActionsContainer {
  display: grid;
  grid-auto-flow: column;
  width: 20%;
}
.tweetCommentsContainer {
  place-self: center;
  width: 95%;
  margin-top: 10px;
  display: grid;
  row-gap: 10px;
  margin-bottom: 10px;
}
</style>
