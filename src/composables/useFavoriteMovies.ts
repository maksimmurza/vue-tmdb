import { favoriteMovies as fetchFavoriteMovies, setFavorite } from '../api/account';
import { Movie, TVShow, VideoType } from '@/types/movie';
import { ref, Ref } from 'vue';
import { MovieSetAccountStateResponse, MoviesListResponse } from '@/types/fetching';

const useFavoriteMovies = (): {
  favoriteMovies: Ref<MoviesListResponse<Movie | TVShow> | null>;
  favoriteMoviesLoading: Ref<boolean>;
  favoriteMoviesError: Ref<Error | null>;
  setFavoriteValueResult: Ref<MovieSetAccountStateResponse | null>;
  setFavoriteValueLoading: Ref<boolean>;
  setFavoriteValueError: Ref<Error | null>;
  getFavoriteMovies: (accountId: string, session_id: string, type: VideoType) => Promise<void>;
  setFavoriteValue: (
    accountId: number,
    session_id: string,
    type: VideoType,
    movieId: number,
    favorite: boolean
  ) => Promise<void>;
} => {
  const favoriteMoviesLoading = ref<boolean>(false);
  const favoriteMovies = ref<MoviesListResponse<Movie | TVShow> | null>(null);
  const favoriteMoviesError = ref<Error | null>(null);

  const getFavoriteMovies = async (accountId: string, session_id: string, type: VideoType) => {
    favoriteMoviesLoading.value = true;
    try {
      const response = await fetchFavoriteMovies(accountId, session_id, type);
      favoriteMovies.value = response.data as MoviesListResponse<Movie | TVShow>;
      favoriteMoviesError.value = null;
    } catch (err) {
      favoriteMoviesError.value = err as Error;
    } finally {
      favoriteMoviesLoading.value = false;
    }
  };

  const setFavoriteValueLoading = ref<boolean>(false);
  const setFavoriteValueResult = ref<MovieSetAccountStateResponse | null>(null);
  const setFavoriteValueError = ref<Error | null>(null);

  const setFavoriteValue = async (
    accountId: number,
    session_id: string,
    type: VideoType,
    movieId: number,
    favorite: boolean
  ) => {
    setFavoriteValueLoading.value = true;
    try {
      const response = await setFavorite(accountId, session_id, type, movieId, favorite);
      setFavoriteValueResult.value = response.data as MovieSetAccountStateResponse;
      setFavoriteValueError.value = null;
    } catch (err) {
      setFavoriteValueError.value = err as Error;
    } finally {
      setFavoriteValueLoading.value = false;
    }
  };

  return {
    favoriteMovies,
    favoriteMoviesLoading,
    favoriteMoviesError,
    setFavoriteValueResult,
    setFavoriteValueLoading,
    setFavoriteValueError,
    getFavoriteMovies,
    setFavoriteValue,
  };
};

export default useFavoriteMovies;
