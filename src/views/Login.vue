<template>
  <div>
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
  components: { LoginForm, SignUpForm },
};
</script>

<style scoped></style>
