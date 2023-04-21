export default [
  {
    path: 'index',
    name: 'Dictionary',
    component: () => import('@/views/Dictionary/index.vue')
  },
  {
    path: 'reciteword',
    name: 'Reciteword',
    meta: { keepAlive: true },
    beforeEnter: (to: any, from: any, next: any) => {
      const userState = window.localStorage.getItem('UserState');
      if (userState) {
        const hasLearningWordPlan = JSON.parse(userState).hasLearningWordPlan;
        if (hasLearningWordPlan) {
          next();
        } else {
          next({ name: 'DictionaryPlan' });
        }
      } else {
        next();
      }
    },
    component: () => import('@/views/Dictionary/LearningWord.vue')
  },
  {
    path: 'making-plan',
    name: 'DictionaryPlan',
    component: () => import('@/views/Dictionary/DictionaryPlan.vue')
  }
];
