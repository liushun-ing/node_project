import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Particles from "vue3-particles";
import "@/util/axios.config"

createApp(App)
  .use(store)
  .use(Particles)
  .use(ElementPlus)
  .use(router)
  .mount("#app");
