import { watchlist, watchlistMovies } from '../api/account';
import { Movie, TVShow, VideoType } from '@/types/movie';
import { ref, Ref } from 'vue';
import { MovieSetAccountStateResponse, MoviesListResponse } from '@/types/fetching';

const useWatchlist = (): {
  watchlistMoviesResults: Ref<MoviesListResponse<Movie | TVShow> | null>;
  watchlistMoviesLoading: Ref<boolean>;
  watchlistMoviesError: Ref<Error | null>;
  setWatchlistValueLoading: Ref<boolean>;
  setWatchlistValueResult: Ref<MovieSetAccountStateResponse | null>;
  setWatchlistValueError: Ref<Error | null>;
  setWatchlistValue: (
    accountId: number,
    session_id: string,
    type: VideoType,
    movieId: number,
    watchlistValue: boolean
  ) => Promise<void>;
  getWatchlistMovies: (
    accountId: number,
    session_id: string,
    type: VideoType | 'all'
  ) => Promise<void>;
} => {
  const watchlistMoviesResults = ref<MoviesListResponse<Movie | TVShow> | null>(null);
  const watchlistMoviesLoading = ref<boolean>(false);
  const watchlistMoviesError = ref<Error | null>(null);
  const setWatchlistValueLoading = ref<boolean>(false);
  const setWatchlistValueResult = ref<MovieSetAccountStateResponse | null>(null);
  const setWatchlistValueError = ref<Error | null>(null);

  const getWatchlistMovies = async (
    accountId: number,
    session_id: string,
    type: VideoType | 'all'
  ) => {
    watchlistMoviesLoading.value = true;
    try {
      if (type === 'all') {
        let response = await watchlistMovies(accountId, session_id, 'movie');
        watchlistMoviesResults.value = response.data as MoviesListResponse<Movie | TVShow>;
        watchlistMoviesResults.value.results = watchlistMoviesResults.value.results.map(movie => ({
          ...movie,
          type: 'movie',
        }));
        response = await watchlistMovies(accountId, session_id, 'tv');
        watchlistMoviesResults.value.results = watchlistMoviesResults.value.results.concat(
          (response.data.results as Array<Movie | TVShow>).map(movie => ({ ...movie, type: 'tv' }))
        );
      } else {
        const response = await watchlistMovies(accountId, session_id, type);
        watchlistMoviesResults.value = response.data as MoviesListResponse<Movie | TVShow>;
        watchlistMoviesError.value = null;
      }
    } catch (err) {
      watchlistMoviesError.value = err as Error;
    } finally {
      watchlistMoviesLoading.value = false;
    }
  };

  const setWatchlistValue = async (
    accountId: number,
    session_id: string,
    type: VideoType,
    movieId: number,
    watchlistValue: boolean
  ) => {
    setWatchlistValueLoading.value = true;
    try {
      const response = await watchlist(accountId, session_id, type, movieId, watchlistValue);
      setWatchlistValueResult.value = response.data as MovieSetAccountStateResponse;
      setWatchlistValueError.value = null;
    } catch (err) {
      setWatchlistValueError.value = err as Error;
    } finally {
      setWatchlistValueLoading.value = false;
    }
  };

  return {
    watchlistMoviesResults,
    watchlistMoviesLoading,
    watchlistMoviesError,
    setWatchlistValueLoading,
    setWatchlistValueResult,
    setWatchlistValueError,
    setWatchlistValue,
    getWatchlistMovies,
  };
};

export default useWatchlist;
