<template>
  <div id="editCommentContainer">
    <p
      v-if="editViewOn === false && currentUserInfo.userId === userId"
      @click="editViewOn = true"
      id="viewCmt"
    >
      Edit Comment
    </p>
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
          url: `${process.env.VUE_APP_API_URL}/comments`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
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

<style scoped>
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
