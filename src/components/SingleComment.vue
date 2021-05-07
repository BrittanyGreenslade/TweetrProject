<template>
  <div>
    <div v-for="comment in tweetComment" :key="comment.commentId">
      <h2>{{ comment.username }}</h2>
      <h3>{{ comment.createdAt }}</h3>
      <p>{{ comment.content }}</p>
    </div>
    <!-- <button
        v-if="toggleCommentOn === false"
        @click="toggleCommentPost(recentAllUsersTweet.tweetId)"
      >
        Comment On Tweet
      </button>
      <post-comment
        v-if="
          toggleCommentOn === true &&
            recentAllUsersTweet.tweetId === selectedTweetId
        "
      />
      <button v-if="toggleCommentOn === true" @click="toggleCommentPost">
        Cancel
      </button>
      <br />
      <button
        v-if="toggleCommentViewOn === false"
        @click="toggleCommentView(recentAllUsersTweet.tweetId)"
      >
        View Comments
      </button>
      <tweet-comments
        v-if="
          toggleCommentViewOn === true &&
            recentAllUsersTweet.tweetId === selectedTweetId
        "
      />
      <button v-if="toggleCommentViewOn === true" @click="toggleCommentView">
        Cancel
      </button> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "single-comment",
  data() {
    return {
      tweetComment: [],
    };
  },
  computed: {
    selectedTweetId() {
      return this.$store.state.selectedTweetId;
    },
  },
  methods: {
    getComment() {
      axios
        .request({
          url: "",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            params: this.selectedTweetId,
          },
        })
        .then((res) => {
          this.tweetComment = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
