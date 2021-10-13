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
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Layout",
  props: {
    id: Number,
  },
  setup(props) {
    const router = useRouter();
    const event = ref(null);

    onMounted(() => {
      EventService.getEvent(props.id)
        .then((response) => {
          event.value = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            // If the event doesn't exist, load 404
            router.push({
              name: "404Resource",
              params: { resource: "event" },
            });
          } else {
            // Otherwise assume network error
            router.push({ name: "NetworkError" });
          }
        });
    });

    return {
      event,
    };
  },
});
</script>

<style scoped></style>
