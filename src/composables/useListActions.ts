import { createList, deleteList, updateList, clearList } from '../api/account';
import { ref, Ref } from 'vue';
import { CreateMovieListParams, DeleteMovieListResponse, MovieListDetails } from '@/types/fetching';

const useListActions = (): {
  createMovieListResult: Ref<MovieListDetails | null>;
  createMovieListError: Ref<Error | null>;
  createMovieListLoading: Ref<boolean>;
  deleteMovieListResult: Ref<DeleteMovieListResponse | null>;
  deleteMovieListError: Ref<Error | null>;
  deleteMovieListLoading: Ref<boolean>;
  createMovieList: (access_token: string, payload: CreateMovieListParams) => Promise<void>;
  deleteMovieList: (access_token: string, listId: number) => Promise<void>;
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

  const deleteMovieListResult = ref<DeleteMovieListResponse | null>(null);
  const deleteMovieListError = ref<Error | null>(null);
  const deleteMovieListLoading = ref<boolean>(false);

  const deleteMovieList = async (access_token: string, listId: number) => {
    deleteMovieListLoading.value = true;
    try {
      const response = await deleteList(access_token, listId);
      deleteMovieListResult.value = response.data as DeleteMovieListResponse;
      deleteMovieListError.value = null;
    } catch (err) {
      deleteMovieListError.value = err as Error;
    } finally {
      deleteMovieListLoading.value = false;
    }
  };

  return {
    createMovieListResult,
    createMovieListError,
    createMovieListLoading,
    deleteMovieListResult,
    deleteMovieListError,
    deleteMovieListLoading,
    createMovieList,
    deleteMovieList,
  };
};

export default useListActions;
