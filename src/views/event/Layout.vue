<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <!-- Since :id is required for each child path -->
      <!-- If :id isn't sent in, it will look and use the :id param that is present -->
      <router-link :to="{ name: 'EventDetails' }"> Details </router-link>
      |
      <router-link :to="{ name: 'EventRegister' }"> Register </router-link>
      |
      <router-link :to="{ name: 'EventEdit' }"> Edit </router-link>
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>

<script>
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "Layout",
  props: {
    id: Number,
  },
  setup() {
    const GStore = inject("GStore");

    return {
      GStore,
    };
  },
});
</script>

<style scoped></style>
