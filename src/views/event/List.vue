<template>
  <div class="events">
    <h1>Events For Good</h1>
    <img alt="Vue logo" src="src/assets/logo.png" />
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <!-- When you call router-link it's calling this.$router.push from inside the router-link definition -->
      <router-link
        id="page-prev"
        v-if="page !== 1"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        >&#60; Prev</router-link
      >
      <router-link
        id="page-next"
        v-if="hasNextPAge"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watchEffect } from "vue";
import EventCard from "@/components/EventCard.vue"; // @ is an alias to /src
import EventService from "@/services/EventService";
import { onBeforeRouteUpdate, useRouter } from "vue-router";

export default defineComponent({
  name: "EventList",
  components: {
    EventCard,
  },
  props: {
    page: {
      default: 1,
      type: Number,
    },
  },
  setup(props) {
    const router = useRouter();
    const events = ref(null);
    const totalEvents = ref(0);

    const hasNextPAge = computed(() => {
      // Find the total number of pages
      let totalPages = Math.ceil(totalEvents.value) / 2;
      // If this page is not the las page
      return props.page < totalPages;
    });

    onMounted(() => {
      // When reactive objects that are accessed inside this function change, run this function again
      watchEffect(() => {
        // Clear out the events on the page, so our user knows the API has been called
        events.value = null;
        return EventService.getEvents(2, props.page)
          .then((response) => {
            events.value = response.data;
            totalEvents.value = parseInt(response.headers["x-total-count"]);
          })
          .catch(() => {
            router.push({ name: "NetworkError" });
          });
      });
    });

    return {
      events,
      hasNextPAge,
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
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
