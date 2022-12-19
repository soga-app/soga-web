import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import naive from 'naive-ui';
import pinia from '@/stores/index';
const app = createApp(App);

app.use(router).use(naive).use(pinia).mount('#app');
