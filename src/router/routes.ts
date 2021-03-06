import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'recommend',
        component: () => import('pages/index/Index.vue'),
        children: [
          {
            path: 'recommend',
            component: () => import('pages/index/Recommend.vue'),
          },
          {
            path: 'song',
            component: () => import('pages/index/SongList.vue'),
          },
          {
            path: 'station',
            component: () => import('pages/index/Station.vue'),
          },
          {
            path: 'rank',
            component: () => import('pages/index/Rank.vue'),
          },
          {
            path: 'singer',
            component: () => import('pages/index/Singer.vue'),
          },
          {
            path: 'new',
            component: () => import('pages/index/New.vue'),
          },
        ],
      },
      { path: 'friends', component: () => import('pages/Friends.vue') },
      { path: 'live', component: () => import('pages/Live.vue') },
      { path: 'FM', component: () => import('pages/PersonalFM.vue') },
      { path: 'local', component: () => import('pages/LocalMusic.vue') },
      { path: 'download', component: () => import('pages/Download.vue') },
      { path: 'favorite', component: () => import('pages/MyFavorite.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
