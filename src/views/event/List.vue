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
import NProgress from "nprogress";
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

    // onBeforeRouteUpdate((routeTo) => {
    //   NProgress.start();
    //   EventService.getEvents(2, parseInt(String(routeTo.query.page)) || 1)
    //     .then((response) => {
    //       events.value = response.data;
    //       totalEvents.value = parseInt(response.headers["x-total-count"]);
    //     })
    //     .catch(() => {
    //       return { name: "NetworkError" };
    //     })
    //     .finally(() => {
    //       NProgress.done();
    //     });
    // });

    onMounted(() => {
      // When reactive objects that are accessed inside this function change, run this function again
      watchEffect(() => {
        NProgress.start();
        // Clear out the events on the page, so our user knows the API has been called
        events.value = null;
        EventService.getEvents(2, props.page)
          .then((response) => {
            events.value = response.data;
            totalEvents.value = parseInt(response.headers["x-total-count"]);
          })
          .catch(() => {
            router.push({ name: "NetworkError" });
          })
          .finally(() => {
            NProgress.done();
          });
      });
    });

    return {
      events,
      hasNextPAge,
    };
  },
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   NProgress.start();
  //   // Parse the page number from the route we're navigating to
  //   EventService.getEvents(2, parseInt(String(routeTo.query.page)) || 1)
  //     .then((response) => {
  //       // Continue routing and once component is loaded, set these values
  //       // I'm using comp (as in component). In the docs you'll see vm (as in View Model)
  //       next((comp: any) => {
  //         comp.events = response.data;
  //         comp.totalEvents = parseInt(response.headers["x-total-count"]);
  //         return true;
  //       });
  //     })
  //     .catch(() => {
  //       // If the API fails, load the NetworkError page
  //       next({ name: "NetworkError" });
  //     })
  //     .finally(() => {
  //       NProgress.done();
  //     });
  // },
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
