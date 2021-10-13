<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
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
