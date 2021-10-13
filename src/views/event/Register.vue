<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Register",
  props: {
    event: Object,
  },
  setup() {
    const router = useRouter();

    function register() {
      // Call to API
      // If registered then redirect to event details

      // Both EventRegister and EventDetails have an :id parameter, which will be used be default when navigating
      router.push({
        name: "EventDetails",
      });
    }

    return {
      register,
    };
  },
});
</script>

<style scoped></style>
