export default [
  {
    path: 'index',
    name: 'Dictionary',
    component: () => import('@/views/Dictionary/index.vue')
  },
  {
    path: 'reciteword',
    name: 'Reciteword',
    component: () => import('@/views/Dictionary/LearningWord.vue')
  },
  {
    path: 'making-plan',
    name: 'DictionaryPlan',
    component: () => import('@/views/Dictionary/DictionaryPlan.vue')
  }
];
