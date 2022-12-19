import dictionary from './dictionary';
import home from './home';
import Layout from '@/Layout/index.vue';

export const sogaRoute: Array<any> = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    redirect: 'index',
    children: home
  },
  {
    path: '/dictionary',
    name: 'DictinaryIndex',
    component: Layout,
    redirect: 'index',
    children: dictionary
  }
];
