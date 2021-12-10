import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/HomePage.vue';
import MoviePage from '../views/MoviePage.vue';
import MoviesPage from '../views/MoviesPage.vue';
import Login from '../views/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
