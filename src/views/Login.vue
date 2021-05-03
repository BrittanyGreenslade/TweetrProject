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
  data() {
    return {
      loginStatus: "",
    };
  },
  components: {
    LoginForm,
    SignUpForm,
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
