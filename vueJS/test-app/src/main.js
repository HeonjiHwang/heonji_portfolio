import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import i18n from './locales'
import '@/assets/scss/test_app.scss'

const app = createApp(App);
app.config.globalProperties.$axios = axios;

app.use(router).use(i18n).mount('#app')
