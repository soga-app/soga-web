export default [
  {
    path: 'index',
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
