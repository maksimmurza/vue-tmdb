import router from './router';
import store from './store';

export const moviesDropdownOptions = ['Popular', 'Now playing', 'Upcoming', 'Top Rated'].map(
  label => ({
    label,
    key: label.toLowerCase(),
    props: {
      onClick: () => {
        router.push(`/movies/${label.toLowerCase().replaceAll(' ', '-')}`);
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
        router.push(`/tv/${label.toLowerCase().replaceAll(' ', '-')}`);
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
