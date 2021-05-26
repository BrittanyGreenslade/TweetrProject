<template>
  <!-- this is ugly but the way I setup my app, the toggle doesn't work very well -->
  <div>
    <img
      v-if="commentViewOn === false"
      @click="getComments"
      class="actionIcon"
      src="@/assets/images/comment.svg"
      alt="speech bubble - makecomment icon"
    />
    <div v-if="commentViewOn === true" class="tweetCommentsContainer">
      <div
        class="comments"
        v-for="comment in tweetComments"
        :key="comment.commentId"
      >
        <h3>{{ comment.username }}</h3>
        <h4>{{ comment.createdAt }}</h4>
        <p>{{ comment.content }}</p>
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
      <div id="postCancel">
        <post-comment
          @newlyPostedComment="handleNewComment"
          :tweetId="this.tweetId"
        />
        <img
          class="actionIcon"
          @click="commentViewOn = false"
          src="@/assets/images/close.svg"
          alt="black x - cancel icon"
        />
      </div>
      <!-- <button @click="commentViewOn = false">Hide Comments</button> -->
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
.comments {
  margin-left: 10px;
  margin-top: 10px;
}
.tweetCommentsContainer {
  background: #f1e9c8;
  border-radius: 5px;
  width: 70%;
  right: 15%;
  position: absolute;
  min-height: 100px;
  display: grid;
}
.commentActionsContainer {
  display: grid;
  grid-auto-flow: column;
  width: 40%;
  place-self: end;
}
.actionIcon {
  margin-left: 2px;
  margin-bottom: 2px;
}
</style>
