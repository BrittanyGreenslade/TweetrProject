<template>
  <div>
    <h4 id="loginStatus">{{ loginStatus }}</h4>
    <div id="formsContainer">
      <login-form />
      <sign-up-form />
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import SignUpForm from "../components/SignUpForm.vue";
export default {
  data() {
    return {
      loginStatus: "",
    };
  },
  components: {
    LoginForm,
    SignUpForm,
  },
};
</script>

<style scoped>
#formsContainer {
  display: grid;
  row-gap: 30px;
}
</style>
