<template>
  <div>
    <img
      v-if="commentViewOn === false"
      @click="getComments"
      class="actionIcon"
      src="@/assets/images/comment.svg"
      alt="speech bubble - makecomment icon"
    />
    <!-- <button v-if="commentViewOn === false" @click="getComments">
      View Comments
    </button> -->
    <!-- @newlyPostedComment="handlePostUpdate" -->
    <!-- <post-comment :tweetId="this.tweetId" /> -->
    <div v-if="commentViewOn === true" class="tweetCommentsContainer">
      <!-- <h2 v-if="tweetComments === null">No comments yet!</h2> -->
      <div v-for="comment in tweetComments" :key="comment.commentId">
        <h3>{{ comment.username }}</h3>
        <h4>{{ comment.createdAt }}</h4>
        <p>{{ comment.content }}</p>
        <h1>{{ comment.tweetId }}</h1>
        <edit-comment
          @newlyEditedComment="handleEditUpdate"
          :commentId="comment.commentId"
        />
        <!-- <post-comment
          :tweetId="comment.tweetId"
          @click="newlyPostedComment = handleChildUpdate"
        /> -->
        <delete-comment
          @commentsAfterDelete="handleDeleteComment"
          :tweetComments="tweetComments"
          :commentId="comment.commentId"
        />
        <like-comment :commentId="comment.commentId" />
      </div>
      <post-comment :tweetId="this.tweetId" />
      <button @click="commentViewOn = false">Hide Comments</button>
    </div>
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

  methods: {
    // handlePostUpdate(data) {
    //   this.tweetComments.push(data);
    // },
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
.tweetCommentsContainer {
  border: 1px solid black;
}
.tweetCommentsContainer {
  height: 700px;
}
</style>
