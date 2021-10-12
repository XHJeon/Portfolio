<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import EventService from "../services/EventService";

export default defineComponent({
  name: "EventDetails",
  props: {
    id: Number,
  },
  setup(props) {
    const event = ref(null);

    onMounted(() => {
      EventService.getEvent(props.id)
        .then((response) => {
          event.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return {
      event,
    };
  },
});
</script>

<style scoped></style>
