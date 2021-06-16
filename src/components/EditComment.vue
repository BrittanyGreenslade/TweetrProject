<template>
  <div id="editCommentContainer">
    <p
      v-if="editViewOn === false && currentUserInfo.userId === userId"
      @click="editViewOn = true"
      id="viewCmt"
    >
      Edit Comment
    </p>
    <!-- <img
      v-if="editViewOn === false && currentUserInfo.userId === userId"
      @click="editViewOn = true"
      alt="pencil icon - edit button"
      src="@/assets/images/edit.svg"
      class="actionIcon"
    /> -->
    <div id="postCommentContainer" v-if="editViewOn === true">
      <p id="editHeader">Edit comment:</p>
      <textarea
        name="editComment"
        :id="`editComment${commentId}`"
        placeholder="max 150 characters"
      ></textarea>
      <div id="btnContain">
        <img
          class="actionIcon"
          @click="editViewOn = false"
          src="@/assets/images/close.svg"
          alt="black x - cancel icon"
        />
        <button id="postBtn" @click="editComment">Post</button>
      </div>
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
      currentUserInfo: cookies.get("currentUserInfo"),
    };
  },
  props: {
    commentId: Number,
    userId: Number,
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
          console.log(this.userId);
          this.$emit("newlyEditedComment", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#btnContain {
  display: grid;
  grid-auto-flow: column;
  width: 45%;
  place-self: end;
  column-gap: 5px;
}
.actionIcon {
  margin-top: 10px;
}
#editCommentContainer {
  display: grid;
  margin-top: -5px;
  width: 100%;
}
#postCommentContainer {
  display: grid;
  margin-top: -5px;
  width: 100%;
  place-self: center;
  margin-right: 10px;
}
#postBtn {
  margin-top: 5px;
  justify-self: right;
  width: 70px;
  margin-right: 10px;
}
textarea {
  place-self: center;
  width: 95%;
}
#editHeader {
  margin-left: 5px;
  margin-top: 15px;
  font-weight: bold;
}
#viewCmt {
  margin-top: 5px;
}
</style>
