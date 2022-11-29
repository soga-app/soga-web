export default [
    {
        path: 'index',
        name: 'Dictionary',
        component: () => import('@/views/Dictionary/index.vue')
    },
    {
        path: 'learning-word',
        name: 'LearningWord',
        component: () => import('@/views/Dictionary/LearningWord.vue')
    },
    {
        path: 'making-plan',
        name: 'DictionaryPlane',
        component: () => import('@/views/Dictionary/DictionaryPlan.vue')
    }
];
