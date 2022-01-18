import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MoviePage from '../views/MoviePage.vue';
import MoviesPage from '../views/MoviesPage.vue';
import store from '../store/index';

const SearchResults = () => import('../views/SearchResults.vue');
const LoginPage = () => import('../views/LoginPage.vue');
const LoginApprovedPage = () => import('../views/LoginApprovedPage.vue');
const UserPage = () => import('../views/UserPage.vue');

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
    meta: { requireAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(to => {
  const userInfo = store.state.user.userInfo;
  if (to.meta.requireAuth && !userInfo) {
    return { path: '/' };
  }
});

export default router;
