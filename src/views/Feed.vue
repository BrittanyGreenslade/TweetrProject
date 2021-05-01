<template>
  <div>
    <section><user-tweets /></section>

    <section>
      <other-tweets />
    </section>
  </div>
</template>

<script>
import UserTweets from "@/components/UserTweets.vue";
import OtherTweets from "../components/OtherTweets.vue";
export default {
  components: {
    UserTweets,
    OtherTweets,
  },
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
