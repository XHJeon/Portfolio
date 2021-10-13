<template>
  <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Details",
  props: {
    event: Object,
  },
});
</script>

<style scoped></style>
