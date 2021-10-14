<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>

<script>
import { defineComponent, inject } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Register",
  props: {
    event: Object,
  },
  setup(props) {
    const router = useRouter();
    // Make the GStore object available inside this component
    const GStore = inject("GStore");

    function register() {
      // Call to API
      // If registered then redirect to event details

      // We need to set a success message right before we push navigation
      GStore.flashMessage = `You are successfully registered for ${props.event.title}`;

      // After 3 seconds, clear the flashMessage
      setTimeout(() => {
        GStore.flashMessage = "";
      }, 3000);

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
