import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";

// PrimeVue imports
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";

const app = createApp(App);

app.use(store);
app.use(PrimeVue, { ripple: true });

app.mount("#app");
