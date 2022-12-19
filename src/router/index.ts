import { createRouter, createWebHistory } from 'vue-router';
import { sogaRoute } from './soga';

const routes = [...sogaRoute];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
