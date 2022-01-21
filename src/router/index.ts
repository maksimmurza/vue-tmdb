import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MoviePage from '../views/MoviePage.vue';
import MoviesPage from '../views/MoviesPage.vue';
import LoginPage from '../views/LoginPage.vue';
import LoginApprovedPage from '../views/LoginApprovedPage.vue';
import UserPage from '../views/UserPage.vue';
import SearchResults from '../views/SearchResults.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    children: [
      {
        path: 'search',
        component: SearchResults,
      },
    ],
  },
  {
    path: '/:type(movie|tv)/:id(\\d+)',
    name: 'Movie Page',
    component: MoviePage,
  },
  {
    path: '/:type(movie|tv)/:key',
    name: 'Movies Page',
    component: MoviesPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/approved',
    name: 'Approved',
    component: LoginApprovedPage,
  },
  {
    path: '/profile/:menuItem(favorite|watchlist|rated|lists)?',
    name: 'User Page',
    component: UserPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
