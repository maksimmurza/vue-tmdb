import MoviesPage from '../views/MoviesPage.vue';

export const movieRoutes = ['Popular', 'Now Playing', 'Upcoming', 'Top Rated'].map(title => ({
  path: `/movie/${title.toLowerCase().replaceAll(' ', '-')}`,
  name: `Movies - ${title}`,
  component: MoviesPage,
}));
