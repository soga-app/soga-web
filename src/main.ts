import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

import { useMessage } from 'naive-ui';
const app = createApp(App);

app.config.globalProperties.$message = useMessage();

app.use(router);
app.mount('#app');
