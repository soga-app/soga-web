import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import naive from 'naive-ui';
import pinia from '@/stores/index';
import plugin from './plugins';
// 引入全局样式
import '@/style/global.less';

const app = createApp(App);

app.use(plugin);

app.use(router).use(naive).use(pinia).mount('#app');
