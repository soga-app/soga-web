export default [
  {
    path: 'index',
    name: 'Community',
    component: () => import('@/views/Community/index.vue')
  },
  {
    path: 'passage',
    name: 'CommunityContent',
    component: () => import('@/views/Community/passage.vue')
  }
];
