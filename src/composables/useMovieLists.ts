import { createdLists, checkMovieListState } from '../api/account';
import { ref, Ref } from 'vue';
import { MovieList } from '@/types/movie';
import { MoviesListResponse } from '@/types/fetching';

const useMovieLists = (): {
  movieListsLoading: Ref<boolean>;
  movieLists: Ref<MoviesListResponse<MovieList> | null>;
  movieListsError: Ref<Error | null>;
  getMovieLists: (accountId: string, sessionId: string) => Promise<void>;
  isMoviePersistInList: (
    movieId: number,
    listId: number,
    sessionId: string
  ) => Promise<boolean | void>;
} => {
  const movieLists = ref<MoviesListResponse<MovieList> | null>(null);
  const movieListsError = ref<Error | null>(null);
  const movieListsLoading = ref<boolean>(false);

  const getMovieLists = async (accountId: string, sessionId: string) => {
    movieListsLoading.value = true;
    try {
      const response = await createdLists(accountId, sessionId);
      movieLists.value = response.data as MoviesListResponse<MovieList>;
      movieListsError.value = null;
    } catch (err) {
      movieListsError.value = err as Error;
    } finally {
      movieListsLoading.value = false;
    }
  };

  const isMoviePersistInList = async (
    movieId: number,
    listId: number,
    sessionId: string
  ): Promise<boolean | void> => {
    movieListsLoading.value = true;
    try {
      const response = await checkMovieListState(movieId, listId, sessionId);
      const isMovieInList = response.data as { id: string | null; item_present: boolean };
      movieListsError.value = null;
      return isMovieInList.item_present;
    } catch (err) {
      movieListsError.value = err as Error;
    } finally {
      movieListsLoading.value = false;
    }
  };

  return {
    movieListsLoading,
    movieLists,
    movieListsError,
    getMovieLists,
    isMoviePersistInList,
  };
};

export default useMovieLists;
