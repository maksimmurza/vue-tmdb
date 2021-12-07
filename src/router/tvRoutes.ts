import MoviesPage from '../views/MoviesPage.vue';

export const tvRoutes = ['Popular', 'Airing Today', 'On TV', 'Top Rated'].map(title => ({
  path: `/tv/${title.toLowerCase().replaceAll(' ', '-')}`,
  name: `TV Shows - ${title}`,
  component: MoviesPage,
}));
