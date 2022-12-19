export default [
  {
    path: 'index',
    name: 'HomePage',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: 'login',
    name: 'Login',
    component: () => import('@/views/Home/Login.vue')
  },
  {
    path: 'signup',
    name: 'SignUp',
    component: () => import('@/views/Home/SignUp.vue')
  },
  {
    path: 'userCenter',
    name: 'UserCenter',
    component: () => import('@/views/Home/UserCenter.vue')
  }
];
