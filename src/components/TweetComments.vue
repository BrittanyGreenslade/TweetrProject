<template>
  <div>
    <button v-if="commentViewOn === false" @click="getComments">
      View Comments
    </button>
    <div v-if="commentViewOn === true" class="tweetCommentsContainer">
      <h2 v-if="tweetComments === null">No tweets yet!</h2>
      <div v-for="comment in tweetComments" :key="comment.commentId">
        <h3>{{ comment.username }}</h3>
        <h4>{{ comment.createdAt }}</h4>
        <p>{{ comment.content }}</p>
        <edit-comment :commentId="comment.commentId" />
        <post-comment :tweetId="comment.tweetId" />
        <!-- <comment-likes /> -->
      </div>

      <button @click="commentViewOn = false">Hide Comments</button>
    </div>
    <!-- <single-comment /> -->
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import EditComment from "./EditComment.vue";
import PostComment from "./PostComment.vue";
// import SingleComment from "./SingleComment.vue";
// import CommentLikes from "./CommentLikes.vue";
export default {
  components: {
    EditComment,
    PostComment,
    // SingleComment,
    // CommentLikes,
  },
  name: "tweet-comments",
  data() {
    return {
      loginToken: cookies.get("loginToken"),

      commentViewOn: false,
    };
  },
  props: {
    tweetId: Number,
  },
  computed: {
    tweetComments() {
      return this.$store.state.tweetComments;
    },
  },
  // mounted() {
  //   this.getComments();
  // },
  methods: {
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
          this.$store.commit("updateTweetComments", res.data);
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
button,
textarea,
.tweetCommentsContainer {
  border: 1px solid black;
}
.tweetCommentsContainer {
  height: 200px;
}
</style>
