<template>
  <section>
    <img
      v-if="toggleEditOn === false"
      @click="toggleEditOn = true"
      class="actionIcon"
      src="@/assets/images/edit.svg"
      alt="pencil icon - edit button"
    />

    <div class="tweetCard" v-if="toggleEditOn === true">
      <form action="javascript:void(0)">
        <p>All fields not required</p>
        <input
          type="text"
          id="editUsername"
          name="usernameInput"
          placeholder="Update Username"
        />
        <input
          type="text"
          id="editEmail"
          name="emailInput"
          placeholder="Update Email"
        />
        <input
          type="password"
          id="editPassword"
          name="passwordInput"
          placeholder="Update Password"
        />
        <input
          type="text"
          id="editBirthdate"
          name="birthdateInput"
          placeholder="Update Birthdate (YYYY-MM-DD)"
        />
        <textarea
          name="bioInput"
          id="editBio"
          placeholder="Update Bio"
        ></textarea>
        <!-- does putting this div in here mess with the accessibility stuff
        for the form? -->
        <div id="btnContain">
          <img
            @click="toggleEditOn = false"
            class="actionIcon"
            src="@/assets/images/close.svg"
            alt="black x - cancel icon"
          />
          <button @click="editUserProfile" id="updateBtn">Save</button>
        </div>
      </form>
    </div>
    <h4>{{ loginStatus }}</h4>
  </section>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  name: "edit-profile-form",
  data() {
    return {
      loginStatus: "",
      loginToken: cookies.get("loginToken"),
      toggleEditOn: false,
    };
  },
  computed: {
    currentUserInfo() {
      return this.$store.state.currentUserInfo;
    },
  },
  methods: {
    editUserProfile() {
      axios
        .request({
          url: `${process.env.VUE_APP_API_URL}/users`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            username: document.getElementById("editUsername").value,
            email: document.getElementById("editEmail").value,
            password: document.getElementById("editPassword").value,
            bio: document.getElementById("editBio").value,
            birthdate: document.getElementById("editBirthdate").value,
            loginToken: this.loginToken,
          },
        })
        .then((res) => {
          res;
          this.loginStatus = "Profile updated!";
          cookies.set("currentUserInfo", res.data);
          this.$store.commit("updateCurrentUserInfo", res.data);
          this.toggleEditOn = false;
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
  width: 38%;
}

.tweetCard {
  position: absolute;
  z-index: 10px;
  height: 300px;
  right: 10%;
  width: 75%;
  font-style: italic;
}
input,
textarea {
  width: 95%;
}

form {
  display: grid;
  row-gap: 5px;
}
#updateBtn {
  margin-top: 2px;
  justify-self: right;
  width: 70px;
  margin-right: 5px;
}
</style>
