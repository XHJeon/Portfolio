<template>
  <p>Edit the event here</p>
</template>

<script>
import { defineComponent, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

export default defineComponent({
  name: "Edit",
  setup() {
    // Flag gets set to true if anything is changed on the form
    const unsavedChanges = ref(true);

    // onBeforeRouteLeave((routeTo, routeFrom, next) => {
    //   if (unsavedChanges.value) {
    //     const answer = window.confirm('Do you really want to leave? You have unsaved changes.');
    //     if (answer) {
    //       // Confirms the navigation
    //       next();
    //     } else {
    //       // Cancels the navigation
    //       next(false);
    //     }
    //   } else {
    //     // Confirms the navigation
    //     next();
    //   }
    // })

    // With no return value, navigation will continue. If I return false, then navigation will stop.
    onBeforeRouteLeave(() => {
      if (unsavedChanges.value) {
        const answer = window.confirm(
          "Do you really want to leave? You have unsaved changes."
        );
        if (!answer) {
          return false;
        }
      }
    });
  },
});
</script>

<style scoped></style>
