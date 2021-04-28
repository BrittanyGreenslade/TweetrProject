<template>
  <div>
    New here? Create an account
    <form action="javascript:void(0)">
      <input type="text" id="emailInput" placeholder="Email" />
      <input type="text" id="usernameInput" placeholder="Username" />
      <input type="password" id="passwordInput" placeholder="Password" />
      <textarea name="bioInput" id="bioInput" placeholder="User Bio"></textarea>
      <input type="button" id="signupBtn" value="Sign Up" />
    </form>
  </div>
</template>

<script>
export default {
  name: "sign-up-form",
};
</script>

<style scoped></style>
