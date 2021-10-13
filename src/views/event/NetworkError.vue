<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>
    <h3>
      It looks like you're experiencing some network issues, please take a
      breath and
      <a href="#" @click="$router.go(-1)">click here</a>
      to try again.
    </h3>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NetworkError",
});
</script>

<style scoped></style>
