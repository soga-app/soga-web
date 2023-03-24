import { createRouter, createWebHistory } from 'vue-router';
import { sogaRoute } from './soga';
import { UserStore } from '@/stores';
import NProgress from '@/config/nprogress';

const routes = [...sogaRoute];
const router = createRouter({
  history: createWebHistory(),
  routes
});

//需要用户登录才能访问的路由
const needLoginRouteName = ['UserCenter', 'Reciteword', 'Translate', 'Community', 'Oraltrain'];

// router.beforeEach((to, from, next) => {
//   const userStore = UserStore();
//   // NProgress.start();
//   if (needLoginRouteName.includes(to.name as string) && !localStorage.getItem('UserState')) {
//     window.$message.warning('请先登录!', { duration: 1000 });
//     console.log('1');
//     next({ name: 'Login' });
//   } else {
//     console.log('2');
//     next();
//   }
// });
export default router;
