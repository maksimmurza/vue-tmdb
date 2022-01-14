import { createList, deleteList, updateList, clearList } from '../api/account';
import { reactive, UnwrapNestedRefs } from 'vue';
import {
  ClearMovieListAction,
  ClearMovieListResponse,
  CreateMovieListAction,
  CreateMovieListParams,
  DeleteMovieListAction,
  DeleteMovieListResponse,
  MovieListDetails,
  UpdateMovieListAction,
  UpdateMovieListParams,
} from '@/types/fetching';

const useListActions = (): {
  createMovieListAction: UnwrapNestedRefs<CreateMovieListAction>;
  updateMovieListAction: UnwrapNestedRefs<UpdateMovieListAction>;
  clearMovieListAction: UnwrapNestedRefs<ClearMovieListAction>;
  deleteMovieListAction: UnwrapNestedRefs<DeleteMovieListAction>;
  createMovieList: (access_token: string, payload: CreateMovieListParams) => Promise<void>;
  deleteMovieList: (access_token: string, listId: number) => Promise<void>;
  clearMovieList: (access_token: string, listId: number) => Promise<void>;
  updateMovieList: (
    access_token: string,
    listId: number,
    payload: UpdateMovieListParams
  ) => Promise<void>;
} => {
  const initActionState = {
    result: null,
    error: null,
    loading: false,
  };
  const createMovieListAction = reactive<CreateMovieListAction>({ ...initActionState });
  const deleteMovieListAction = reactive<DeleteMovieListAction>({ ...initActionState });
  const clearMovieListAction = reactive<ClearMovieListAction>({ ...initActionState });
  const updateMovieListAction = reactive<UpdateMovieListAction>({ ...initActionState });

  const createMovieList = async (access_token: string, payload: CreateMovieListParams) => {
    createMovieListAction.loading = true;
    try {
      const response = await createList(access_token, payload);
      createMovieListAction.result = response.data as MovieListDetails;
      createMovieListAction.error = null;
    } catch (err) {
      createMovieListAction.error = err as Error;
    } finally {
      createMovieListAction.loading = false;
    }
  };

  const deleteMovieList = async (access_token: string, listId: number) => {
    deleteMovieListAction.loading = true;
    try {
      const response = await deleteList(access_token, listId);
      deleteMovieListAction.result = response.data as DeleteMovieListResponse;
      deleteMovieListAction.error = null;
    } catch (err) {
      deleteMovieListAction.error = err as Error;
    } finally {
      deleteMovieListAction.loading = false;
    }
  };

  const clearMovieList = async (access_token: string, listId: number) => {
    clearMovieListAction.loading = true;
    try {
      const response = await clearList(access_token, listId);
      clearMovieListAction.result = response.data as ClearMovieListResponse;
      clearMovieListAction.error = null;
    } catch (err) {
      clearMovieListAction.error = err as Error;
    } finally {
      clearMovieListAction.loading = false;
    }
  };

  const updateMovieList = async (
    access_token: string,
    listId: number,
    payload: UpdateMovieListParams
  ) => {
    updateMovieListAction.loading = true;
    try {
      const response = await updateList(access_token, listId, payload);
      updateMovieListAction.result = response.data as ClearMovieListResponse;
      updateMovieListAction.error = null;
    } catch (err) {
      updateMovieListAction.error = err as Error;
    } finally {
      updateMovieListAction.loading = false;
    }
  };

  return {
    createMovieListAction,
    deleteMovieListAction,
    clearMovieListAction,
    updateMovieListAction,
    createMovieList,
    deleteMovieList,
    clearMovieList,
    updateMovieList,
  };
};

export default useListActions;
