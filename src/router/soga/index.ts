import dictionary from './dictionary';
import home from './home';
import community from './community';
import oraltrain from './oraltrain';
import translate from './translate';
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
  },
  {
    path: '/translate',
    name: 'TranslateIndex',
    component: Layout,
    redirect: 'index',
    children: translate
  },
  {
    path: '/oraltrain',
    name: 'OraltrainIndex',
    component: Layout,
    redirect: 'index',
    children: oraltrain
  },
  {
    path: '/community',
    name: 'CommunityIndex',
    component: Layout,
    redirect: 'index',
    children: community
  }
];
