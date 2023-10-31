import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { VDataTable } from 'vuetify/labs/VDataTable'

loadFonts();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component('VDataTable', VDataTable);

app.mount("#app");
