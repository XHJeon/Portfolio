import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

/**
 * Inside public directory we have an index.html file
 * At the bottom of the file there is a div with id="app"
 * When the project is build, this is where the code will go
 */
createApp(App).use(store).use(router).mount("#app");
