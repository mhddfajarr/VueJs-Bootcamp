import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import router from "./router/index"

const app = createApp(App);
app.use(router);
app.mount('#app');



