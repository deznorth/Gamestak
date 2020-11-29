import { lazy } from 'react';

const StorePage = lazy(() => import(/* webpackChunkName: "gs-store" */ 'pages/Store'));

const SITEMAP = {
  Store: {
    name: 'store',
    path: '/',
    exact: true,
    component: StorePage,
  },
  About: {
    name: 'about',
    path: '/about',
    exact: true,
  },
  Libary: {
    name: 'library',
    path: '/library',
    exact: true,
  },
  Profile: {
    name: 'profile',
    path: '/profile',
    exact: true,
  },
};

export default SITEMAP;