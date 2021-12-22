import { watchlist } from '../api/account';
import { VideoType } from '@/types/movie';
import { ref, Ref } from 'vue';
import { MovieSetAccountStateResponse } from '@/types/fetching';

const useFavoriteMovies = (): {
  setWatchlistValueLoading: Ref<boolean>;
  setWatchlistValueResult: Ref<MovieSetAccountStateResponse | null>;
  setWatchlistValueError: Ref<Error | null>;
  setWatchlistValue: (
    accountId: string,
    sessionId: string,
    type: VideoType,
    movieId: number,
    favorite: boolean
  ) => Promise<void>;
} => {
  const setWatchlistValueLoading = ref<boolean>(false);
  const setWatchlistValueResult = ref<MovieSetAccountStateResponse | null>(null);
  const setWatchlistValueError = ref<Error | null>(null);

  const setWatchlistValue = async (
    accountId: string,
    sessionId: string,
    type: VideoType,
    movieId: number,
    favorite: boolean
  ) => {
    setWatchlistValueLoading.value = true;
    try {
      const response = await watchlist(accountId, sessionId, type, movieId, favorite);
      setWatchlistValueResult.value = response.data as MovieSetAccountStateResponse;
      setWatchlistValueError.value = null;
    } catch (err) {
      setWatchlistValueError.value = err as Error;
    } finally {
      setWatchlistValueLoading.value = false;
    }
  };

  return {
    setWatchlistValueLoading,
    setWatchlistValueResult,
    setWatchlistValueError,
    setWatchlistValue,
  };
};

export default useFavoriteMovies;