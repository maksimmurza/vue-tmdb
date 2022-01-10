import { createdLists, listDetails } from '../api/account';
import { ref, Ref } from 'vue';
import { MovieListDetails, MoviesListResponse } from '@/types/fetching';
import { MovieList } from '@/types/movie';

const useListsInfo = (): {
  movieListsLoading: Ref<boolean>;
  movieListsResult: Ref<MoviesListResponse<MovieList> | null>;
  movieListsError: Ref<Error | null>;
  listDetailsResult: Ref<MovieListDetails | null>;
  listDetailsError: Ref<Error | null>;
  listDetailsLoading: Ref<boolean>;
  getMovieLists: (accountId: number, session_id: string) => Promise<void>;
  getListDetails: (listId: number, access_token: string, page?: number) => Promise<void>;
} => {
  const movieListsResult = ref<MoviesListResponse<MovieList> | null>(null);
  const movieListsError = ref<Error | null>(null);
  const movieListsLoading = ref<boolean>(false);

  const getMovieLists = async (accountId: number, session_id: string) => {
    movieListsLoading.value = true;
    try {
      const response = await createdLists(accountId, session_id);
      movieListsResult.value = response.data as MoviesListResponse<MovieList>;
      movieListsError.value = null;
    } catch (err) {
      movieListsError.value = err as Error;
    } finally {
      movieListsLoading.value = false;
    }
  };

  const listDetailsResult = ref<MovieListDetails | null>(null);
  const listDetailsError = ref<Error | null>(null);
  const listDetailsLoading = ref<boolean>(false);

  const getListDetails = async (listId: number, access_token: string, page = 1) => {
    listDetailsLoading.value = true;
    try {
      const response = await listDetails(listId, access_token, page);
      listDetailsResult.value = response.data as MovieListDetails;
      listDetailsError.value = null;
    } catch (err) {
      listDetailsError.value = err as Error;
    } finally {
      listDetailsLoading.value = false;
    }
  };

  return {
    movieListsLoading,
    movieListsResult,
    movieListsError,
    listDetailsResult,
    listDetailsError,
    listDetailsLoading,
    getMovieLists,
    getListDetails,
  };
};

export default useListsInfo;
