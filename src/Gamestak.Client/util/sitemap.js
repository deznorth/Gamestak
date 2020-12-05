import { lazy } from 'react';

// Gamestak Pages
const StorePage = lazy(() => import(/* webpackChunkName: "gs-store" */ 'pages/Store'));
const ThemePage = lazy(() => import(/* webpackChunkName: "gs-theme" */ 'pages/Theme'));

// Admin Pages

export const SITEMAP_NAVBAR = {
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
};

export const SITEMAP = {
  ...SITEMAP_NAVBAR,
  Theme: {
    name: 'theme',
    path: '/theme',
    exact: true,
    component: ThemePage,
  },
};

export const SITEMAP_ADMIN_NAVBAR = {
  Dashboard: {
    name: 'dashboard',
    path: '/',
    exact: true,
  }
};

export const SITEMAP_ADMIN = {
  ...SITEMAP_ADMIN_NAVBAR,
};