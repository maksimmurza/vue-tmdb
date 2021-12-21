import { favoriteMovies as fetchFavoriteMovies, setFavorite } from '../api/account';
import { Movie, TVShow, VideoType } from '@/types/movie';
import { ref, Ref } from 'vue';
import { MovieSetFavoriteResponse, MoviesListResponse } from '@/types/fetching';

const useFavoriteMovies = (
  accountId: string,
  sessionId: string,
  type: VideoType
): {
  favoriteMoviesLoading: Ref<boolean>;
  favoriteMovies: Ref<MoviesListResponse<Movie | TVShow> | null>;
  favoriteMoviesError: Ref<Error | null>;
  getFavoriteMovies: () => Promise<void>;
  setFavoriteValueLoading: Ref<boolean>;
  setFavoriteValueResult: Ref<MovieSetFavoriteResponse | null>;
  setFavoriteValueError: Ref<Error | null>;
  setFavoriteValue: (movieId: number, favorite: boolean) => Promise<void>;
} => {
  const favoriteMoviesLoading = ref<boolean>(false);
  const favoriteMovies = ref<MoviesListResponse<Movie | TVShow> | null>(null);
  const favoriteMoviesError = ref<Error | null>(null);

  const getFavoriteMovies = async () => {
    favoriteMoviesLoading.value = true;
    try {
      const response = await fetchFavoriteMovies(accountId, sessionId, type);
      favoriteMovies.value = response.data as MoviesListResponse<Movie | TVShow>;
      favoriteMoviesError.value = null;
    } catch (err) {
      favoriteMoviesError.value = err as Error;
    } finally {
      favoriteMoviesLoading.value = false;
    }
  };

  const setFavoriteValueLoading = ref<boolean>(false);
  const setFavoriteValueResult = ref<MovieSetFavoriteResponse | null>(null);
  const setFavoriteValueError = ref<Error | null>(null);

  const setFavoriteValue = async (movieId: number, favorite: boolean) => {
    setFavoriteValueLoading.value = true;
    try {
      const response = await setFavorite(accountId, sessionId, type, movieId, favorite);
      setFavoriteValueResult.value = response.data as MovieSetFavoriteResponse;
      setFavoriteValueError.value = null;
    } catch (err) {
      setFavoriteValueError.value = err as Error;
    } finally {
      setFavoriteValueLoading.value = false;
    }
  };

  return {
    favoriteMoviesLoading,
    favoriteMovies,
    favoriteMoviesError,
    getFavoriteMovies,
    setFavoriteValueLoading,
    setFavoriteValueResult,
    setFavoriteValueError,
    setFavoriteValue,
  };
};

export default useFavoriteMovies;
