export default [
  {
    path: 'index',
    name: 'HomePage',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: 'login',
    name: 'Login',
    component: () => import('@/views/Home/Login.vue'),
    meta: { hideNav: true }
  },
  {
    path: 'signup',
    name: 'SignUp',
    component: () => import('@/views/Home/SignUp.vue'),
    meta: { hideNav: true }
  },
  {
    path: 'userCenter',
    name: 'UserCenter',
    component: () => import('@/views/Home/UserCenter.vue')
  },
  {
    path: 'updateInformation',
    name: 'UpdateInformation',
    component: () => import('@/views/Home/Updateformation.vue')
  },
  {
    path: 'updatePassword',
    name: 'UpdatePassword',
    component: () => import('@/views/Home/UpdatePassword.vue')
  }
];
