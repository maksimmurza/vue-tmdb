import { createList, deleteList, updateList, clearList } from '../api/account';
import { ref, Ref } from 'vue';
import {
  ClearMovieListResponse,
  CreateMovieListParams,
  DeleteMovieListResponse,
  MovieListDetails,
  UpdateMovieListParams,
  UpdateMovieListResponse,
} from '@/types/fetching';

const useListActions = (): {
  createMovieListResult: Ref<MovieListDetails | null>;
  createMovieListError: Ref<Error | null>;
  createMovieListLoading: Ref<boolean>;
  deleteMovieListResult: Ref<DeleteMovieListResponse | null>;
  deleteMovieListError: Ref<Error | null>;
  deleteMovieListLoading: Ref<boolean>;
  clearMovieListResult: Ref<ClearMovieListResponse | null>;
  clearMovieListError: Ref<Error | null>;
  clearMovieListLoading: Ref<boolean>;
  updateMovieListResult: Ref<UpdateMovieListResponse | null>;
  updateMovieListError: Ref<Error | null>;
  updateMovieListLoading: Ref<boolean>;
  createMovieList: (access_token: string, payload: CreateMovieListParams) => Promise<void>;
  deleteMovieList: (access_token: string, listId: number) => Promise<void>;
  clearMovieList: (access_token: string, listId: number) => Promise<void>;
  updateMovieList: (
    access_token: string,
    listId: number,
    payload: UpdateMovieListParams
  ) => Promise<void>;
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

  const clearMovieListResult = ref<ClearMovieListResponse | null>(null);
  const clearMovieListError = ref<Error | null>(null);
  const clearMovieListLoading = ref<boolean>(false);

  const clearMovieList = async (access_token: string, listId: number) => {
    clearMovieListLoading.value = true;
    try {
      const response = await clearList(access_token, listId);
      clearMovieListResult.value = response.data as ClearMovieListResponse;
      clearMovieListError.value = null;
    } catch (err) {
      clearMovieListError.value = err as Error;
    } finally {
      clearMovieListLoading.value = false;
    }
  };

  const updateMovieListResult = ref<UpdateMovieListResponse | null>(null);
  const updateMovieListError = ref<Error | null>(null);
  const updateMovieListLoading = ref<boolean>(false);

  const updateMovieList = async (
    access_token: string,
    listId: number,
    payload: UpdateMovieListParams
  ) => {
    updateMovieListLoading.value = true;
    try {
      const response = await updateList(access_token, listId, payload);
      updateMovieListResult.value = response.data as ClearMovieListResponse;
      updateMovieListError.value = null;
    } catch (err) {
      updateMovieListError.value = err as Error;
    } finally {
      updateMovieListLoading.value = false;
    }
  };

  return {
    createMovieListResult,
    createMovieListError,
    createMovieListLoading,
    deleteMovieListResult,
    deleteMovieListError,
    deleteMovieListLoading,
    clearMovieListResult,
    clearMovieListError,
    clearMovieListLoading,
    updateMovieListResult,
    updateMovieListError,
    updateMovieListLoading,
    createMovieList,
    deleteMovieList,
    clearMovieList,
    updateMovieList,
  };
};

export default useListActions;
