import { createApp, reactive } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "nprogress/nprogress.css";

// Create a global (reactive) object to share across multiple components
const GStore = reactive({ flashMessage: "" });

/**
 * Inside public directory we have an index.html file
 * At the bottom of the file there is a div with id="app"
 * When the project is build, this is where the code will go
 */
createApp(App)
  .use(store)
  .use(router)
  // Make this object available for components in our app to use (inject)
  .provide("GStore", GStore)
  .mount("#app");
