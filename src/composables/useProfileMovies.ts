import { MovieListDetails } from '@/types/fetching';
import { computed, reactive, Ref, ref, UnwrapNestedRefs } from '@vue/runtime-dom';
import { useStore } from 'vuex';
import useFavoriteMovies from './useFavoriteMovies';
import useListsInfo from './useListsInfo';
import useRating from './useRating';
import useWatchlist from './useWatchlist';

const useProfileMovies = (): {
  favorite: UnwrapNestedRefs<ReturnType<typeof useFavoriteMovies>>;
  watchlist: UnwrapNestedRefs<ReturnType<typeof useWatchlist>>;
  rated: UnwrapNestedRefs<ReturnType<typeof useRating>>;
  listsInfo: UnwrapNestedRefs<ReturnType<typeof useListsInfo>>;
  moviesLists: Ref<Array<MovieListDetails>>;
  getFavoriteMovies: () => void;
  getWatchlistMovies: () => void;
  getRatedMovies: () => void;
  getListsMovies: () => void;
} => {
  const store = useStore();
  const user = computed(() => store.state.user);

  const favorite = reactive(useFavoriteMovies());
  const watchlist = reactive(useWatchlist());
  const rated = reactive(useRating());
  const listsInfo = reactive(useListsInfo());

  const moviesLists = ref<Array<MovieListDetails>>([]);

  const getFavoriteMovies = () => {
    favorite.getFavoriteMovies(
      user.value.userInfo.account_id,
      user.value.userInfo.session_id,
      'all'
    );
  };

  const getWatchlistMovies = () => {
    watchlist.getWatchlistMovies(
      user.value.userInfo.account_id,
      user.value.userInfo.session_id,
      'all'
    );
  };

  const getRatedMovies = () => {
    rated.getRatedMovies(user.value.userInfo.account_id, user.value.userInfo.session_id, 'all');
  };

  const getListsMovies = () => {
    listsInfo
      .getMovieLists(user.value.userInfo.account_id, user.value.userInfo.session_id)
      .then(() => {
        if (listsInfo.movieListsResult && listsInfo.movieListsResult.results) {
          moviesLists.value = [];
          listsInfo.movieListsResult.results.forEach(list => {
            listsInfo.getListDetails(list.id, user.value.userInfo.access_token).then(() => {
              if (listsInfo.listDetailsResult) {
                moviesLists.value.push(listsInfo.listDetailsResult);
              }
            });
          });
        }
      });
  };

  return {
    favorite,
    watchlist,
    rated,
    listsInfo,
    moviesLists,
    getFavoriteMovies,
    getWatchlistMovies,
    getRatedMovies,
    getListsMovies,
  };
};

export default useProfileMovies;
