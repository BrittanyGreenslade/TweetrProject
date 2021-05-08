<template>
  <div>
    <button v-if="editViewOn === false" @click="editViewOn = true">
      Edit Comment
    </button>
    <div v-if="editViewOn === true">
      <textarea
        name="editComment"
        :id="`editComment${commentId}`"
        placeholder="max 150 characters"
      ></textarea>
      <button @click="editComment">Post Edited Comment</button>
      <button @click="editViewOn = false">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "edit-comment",
  data() {
    return {
      editViewOn: false,
      loginToken: cookies.get("loginToken"),
    };
  },
  props: {
    commentId: Number,
  },

  methods: {
    editComment() {
      this.editViewOn = false;
      axios
        .request({
          url: "https://tweeterest.ml/api/comments",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.loginToken,
            commentId: this.commentId,
            content: document.getElementById("editComment" + this.commentId)
              .value,
            //get element by id wasn't working because element went id was in loop
            //= more than one element with that id - can bind Id
          },
        })
        .then((res) => {
          this.$emit("newlyEditedComment", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
