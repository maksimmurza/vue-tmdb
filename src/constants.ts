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
