import { SortValue } from './types/movie';

export const moviesDropdownOptions = ['Popular', 'Now playing', 'Upcoming', 'Top Rated'].map(
  label => ({
    label,
    key: label.toLowerCase(),
    url: `/movie/${label.toLowerCase().replaceAll(' ', '-')}`,
  })
);

export const tvShowsDropdownOptions = ['Popular', 'Airing Today', 'On TV', 'Top Rated'].map(
  label => ({
    label,
    key: label.toLowerCase(),
    url: `/tv/${label.toLowerCase().replaceAll(' ', '-')}`,
  })
);

export const moreDropdownOptions = [
  { label: 'About', key: 'about', url: 'https://www.themoviedb.org/about' },
  {
    label: 'API',
    key: 'api',
    url: 'https://developers.themoviedb.org/3/getting-started/introduction',
  },
];

export const profileDropdownOptions = [
  { label: 'View profile', key: 'view profile', url: '/profile' },
  { label: 'Lists', key: 'lists', url: '/profile/lists' },
  { label: 'Ratings', key: 'ratings', url: '/profile/rated' },
  { label: 'Watchlist', key: 'watchlist', url: '/profile/watchlist' },
  {
    label: 'Logout',
    key: 'logout',
    url: '',
  },
];

export const sortOptions = [
  {
    label: 'Popularity Descending',
    value: 'popularity.desc',
  },
  {
    label: 'Popularity Ascending',
    value: 'popularity.asc',
  },
  {
    label: 'Rating Descending',
    value: 'vote_average.desc',
  },
  {
    label: 'Rating Ascending',
    value: 'vote_average.asc',
  },
  {
    label: 'Release Date Descending',
    value: 'release_date.desc',
  },
  {
    label: 'Release Date Ascending',
    value: 'release_date.asc',
  },
  {
    label: 'Title (A-Z)',
    value: 'original_title.asc',
  },
  {
    label: 'Title (Z-A)',
    value: 'original_title.desc',
  },
] as Array<{ label: string; value: SortValue }>;

export const listMoviesSortOptions = [
  {
    label: 'Original order ascending',
    value: 'original_order.asc',
  },
  {
    label: 'Original order descending',
    value: 'original_order.desc',
  },
  {
    label: 'Vote average ascending',
    value: 'vote_average.asc',
  },
  {
    label: 'Vote average descending',
    value: 'vote_average.desc',
  },
  {
    label: 'Primary release date ascending',
    value: 'primary_release_date.asc',
  },
  {
    label: 'Primary release date descending',
    value: 'primary_release_date.desc',
  },
  {
    label: 'Title ascending',
    value: 'title.asc',
  },
  {
    label: 'Title descending',
    value: 'title.desc',
  },
];

export const scoreMarks = {
  0: '0',
  10: '1',
  20: '2',
  30: '3',
  40: '4',
  50: '5',
  60: '6',
  70: '7',
  80: '8',
  90: '9',
  100: ' 10',
};
