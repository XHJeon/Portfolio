<template>
  <router-link
    class="eventLink"
    :to="{ name: 'EventDetails', params: { id: event.id } }"
  >
    <div class="eventCard">
      <span>@ {{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EventCard",
  props: {
    event: Object,
  },
});
</script>

<style scoped>
.eventCard {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.eventCard:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.eventLink {
  color: #2c3e50;
  text-decoration: none;
}
</style>
