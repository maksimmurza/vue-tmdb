import { SortValue } from './types/movie';

export const moviesDropdownOptions = ['Popular', 'Now playing', 'Upcoming', 'Top Rated'].map(
  label => ({
    label,
    key: label.toLowerCase(),
    url: `/movie/${label.toLowerCase().replaceAll(' ', '-')}`,
    props: {},
  })
);

export const tvShowsDropdownOptions = ['Popular', 'Airing Today', 'On TV', 'Top Rated'].map(
  label => ({
    label,
    key: label.toLowerCase(),
    url: `/tv/${label.toLowerCase().replaceAll(' ', '-')}`,
    props: {},
  })
);

export const moreShowsDropdownOptions = [
  { label: 'About', key: 'about', url: 'https://www.themoviedb.org/about' },
  {
    label: 'API',
    key: 'api',
    url: 'https://developers.themoviedb.org/3/getting-started/introduction',
    props: {},
  },
];

export const profileDropdownOptions = [
  { label: 'View profile', key: 'view profile' },
  { label: 'Lists', key: 'lists' },
  { label: 'Ratings', key: 'ratings' },
  { label: 'Watchlist', key: 'watchlist' },
  { label: 'Edit profile', key: 'edit profile' },
  {
    label: 'Logout',
    key: 'logout',
    props: {},
  },
];

export const sortOptions = [
  {
    label: 'Popularity Descending',
    value: 'popularity.desc' as SortValue,
  },
  {
    label: 'Popularity Ascending',
    value: 'popularity.asc' as SortValue,
  },
  {
    label: 'Rating Descending',
    value: 'vote_average.desc' as SortValue,
  },
  {
    label: 'Rating Ascending',
    value: 'vote_average.asc' as SortValue,
  },
  {
    label: 'Release Date Descending',
    value: 'release_date.desc' as SortValue,
  },
  {
    label: 'Release Date Ascending',
    value: 'release_date.asc' as SortValue,
  },
  {
    label: 'Title (A-Z)',
    value: 'original_title.asc' as SortValue,
  },
  {
    label: 'Title (Z-A)',
    value: 'original_title.desc' as SortValue,
  },
];
