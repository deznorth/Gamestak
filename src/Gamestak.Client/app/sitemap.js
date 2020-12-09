import { lazy } from 'react';

// Gamestak Pages
const ThemePage = lazy(() => import(/* webpackChunkName: "gs-theme" */ 'pages/Theme'));
const StorePage = lazy(() => import(/* webpackChunkName: "gs-store" */ 'pages/Store'));
const GameDetailPage = lazy(() => import(/* webpackChunkName: "gs-detail" */ 'pages/GameDetail'));
const AboutPage = lazy(() => import(/* webpackChunkName: "gs-about" */ 'pages/About'));

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
    component: AboutPage,
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
  GameDetail: {
    name: 'gamedetail',
    path: '/game/:id',
    exact: true,
    component: GameDetailPage,
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