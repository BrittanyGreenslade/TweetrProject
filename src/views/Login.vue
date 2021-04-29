<template>
  <div>
    <h4 id="loginStatus">{{ loginStatus }}</h4>
    <section>
      <login-form />
    </section>
    <section>
      <sign-up-form />
    </section>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import SignUpForm from "../components/SignUpForm.vue";
export default {
  components: {
    LoginForm,
    SignUpForm,
  },
  computed: {
    loginStatus() {
      return this.$store.state.loginStatus;
    },
  },
};
</script>

<style scoped></style>
