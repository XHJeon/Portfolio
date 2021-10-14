<template>
  <div id="app">
    <div id="flashMessage" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <div id="nav">
      <!-- which path to navigate to -->
      <router-link :to="{ name: 'EventList' }">Events</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    <!-- replaced by route's component -->
    <router-view />
  </div>
</template>

<script>
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const GStore = inject("GStore");

    return {
      GStore,
    };
  },
});
</script>

<style lang="scss">
@keyframes yellowFade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowFade;
  animation-duration: 3s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

h4 {
  font-size: 20px;
}
</style>
