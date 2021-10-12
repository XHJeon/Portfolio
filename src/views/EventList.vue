<template>
  <div class="events">
    <h1>Events For Good</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
import EventService from "@/services/EventService";

export default defineComponent({
  name: "EventList",
  components: {
    EventCard,
  },
  setup() {
    const events = ref(null);

    onMounted(() => {
      EventService.getEvents()
        .then((response) => {
          events.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return {
      events,
    };
  },
});
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
