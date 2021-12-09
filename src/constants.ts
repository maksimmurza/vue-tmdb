import router from './router';
import store from './store';

export const moviesDropdownOptions = ['Popular', 'Now playing', 'Upcoming', 'Top Rated'].map(
  label => ({
    label,
    key: label.toLowerCase(),
    props: {
      onClick: () => {
        router.push(`/movie/${label.toLowerCase().replaceAll(' ', '-')}`);
      },
    },
  })
);

export const tvShowsDropdownOptions = ['Popular', 'Airing Today', 'On TV', 'Top Rated'].map(
  label => ({
    label,
    key: label.toLowerCase(),
    props: {
      onClick: () => {
        router.push({
          name: `TV Shows - ${label}`,
          params: { title: 'Popular Movies' },
        });
      },
    },
  })
);

export const moreShowsDropdownOptions = [
  { label: 'About', key: 'about' },
  { label: 'API', key: 'api' },
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
    props: {
      onClick: (): void => {
        store.dispatch('logout', store.state.user.userInfo?.sessionId);
      },
    },
  },
];

export const sortingOptions = [
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
];

// release_date.gte
// release_date.lte

// vote_average.gte
// vote_average.lte

// vote_count.gte
// vote_average.lte

// with_genres
