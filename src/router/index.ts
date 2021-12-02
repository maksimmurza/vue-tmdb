import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import MoviePage from '../views/MoviePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/movie/:id',
    name: 'Movie Page',
    component: MoviePage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
