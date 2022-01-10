import { createList, deleteList, updateList, clearList } from '../api/account';
import { ref, Ref } from 'vue';
import { CreateMovieListParams, MovieListDetails } from '@/types/fetching';

const useListActions = (): {
  createMovieListResult: Ref<MovieListDetails | null>;
  createMovieListError: Ref<Error | null>;
  createMovieListLoading: Ref<boolean>;
  createMovieList: (access_token: string, payload: CreateMovieListParams) => Promise<void>;
} => {
  const createMovieListResult = ref<MovieListDetails | null>(null);
  const createMovieListError = ref<Error | null>(null);
  const createMovieListLoading = ref<boolean>(false);

  const createMovieList = async (access_token: string, payload: CreateMovieListParams) => {
    createMovieListLoading.value = true;
    try {
      const response = await createList(access_token, payload);
      createMovieListResult.value = response.data as MovieListDetails;
      createMovieListError.value = null;
    } catch (err) {
      createMovieListError.value = err as Error;
    } finally {
      createMovieListLoading.value = false;
    }
  };

  return {
    createMovieListResult,
    createMovieListError,
    createMovieListLoading,
    createMovieList,
  };
};

export default useListActions;
