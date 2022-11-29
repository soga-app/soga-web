export default [
    {
        path: 'index',
        name: 'HomePage',
        component: () => import('@/views/Home/index.vue')
    },
    {
        path: 'login-regist',
        name: 'LoginRegister',
        component: () => import('@/views/Home/LoginRegister.vue')
    },
    {
        path: 'userCenter',
        name: 'UserCenter',
        component: () => import('@/views/Home/UserCenter.vue')
    }
];
