import { watchlist } from '../api/account';
import { VideoType } from '@/types/movie';
import { ref, Ref } from 'vue';
import { MovieSetAccountStateResponse } from '@/types/fetching';

const useWatchlist = (): {
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
} => {
  const setWatchlistValueLoading = ref<boolean>(false);
  const setWatchlistValueResult = ref<MovieSetAccountStateResponse | null>(null);
  const setWatchlistValueError = ref<Error | null>(null);

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
    setWatchlistValueLoading,
    setWatchlistValueResult,
    setWatchlistValueError,
    setWatchlistValue,
  };
};

export default useWatchlist;
