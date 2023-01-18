import { createRouter, createWebHistory } from 'vue-router';
import { sogaRoute } from './soga';
import { UserStore } from '@/stores';
import NProgress from '@/config/nprogress';

const routes = [...sogaRoute];
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const userStore = UserStore();
  // NProgress.start();
  next();
});
export default router;
