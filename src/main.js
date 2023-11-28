import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from "./stores/auth.store";
import axiosInterceptor from "./helper/axiosInterceptor.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
const app = createApp(App)


app.use(createPinia())
app.use(router)

const store = useAuthStore();
store.initialize();
axiosInterceptor(store);

app.mount('#app')
