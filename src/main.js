import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-alpine.css';
import router from "@/router/index.js";

createApp(App)
    .use(ElementPlus)
    .use(createPinia())
    .use(router)
    .mount('#app');