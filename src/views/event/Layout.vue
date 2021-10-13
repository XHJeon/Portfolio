<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <!-- Since :id is required for each child path -->
      <!-- If :id isn't sent in, it will look and use the :id param that is present -->
      <router-link :to="{ name: 'EventDetails' }"> Details </router-link>
      |
      <router-link :to="{ name: 'EventRegister' }"> Register </router-link>
      |
      <router-link :to="{ name: 'EventEdit' }"> Edit </router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import EventService from "../../services/EventService";

export default defineComponent({
  name: "Layout",
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
