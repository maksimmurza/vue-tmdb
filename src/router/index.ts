import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/HomePage.vue';
import MoviePage from '../views/MoviePage.vue';
import Login from '../views/LoginPage.vue';
import { movieRoutes } from './movieRoutes';
import { tvRoutes } from './tvRoutes';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:type/:id',
    name: 'Movie Page',
    component: MoviePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  ...movieRoutes,
  ...tvRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
