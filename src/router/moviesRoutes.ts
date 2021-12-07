import MoviesPage from '../views/MoviesPage.vue';

export const moviesRoutes = ['Popular', 'Now Playing', 'Upcoming', 'Top Rated'].map(title => ({
  path: `/movies/${title.toLowerCase().replaceAll(' ', '-')}`,
  name: `Movies - ${title}`,
  component: MoviesPage,
}));
