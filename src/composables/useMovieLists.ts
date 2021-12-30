import { createdLists, checkMovieListState, addToList, removeFromList } from '../api/account';
import { ref, Ref } from 'vue';
import { MovieList, VideoType } from '@/types/movie';
import { MovieSetAccountStateResponse, MoviesListResponse } from '@/types/fetching';

const useMovieLists = (): {
  movieListsLoading: Ref<boolean>;
  movieListsResult: Ref<MoviesListResponse<MovieList> | null>;
  movieListsError: Ref<Error | null>;
  addMovieToListResponse: Ref<MovieSetAccountStateResponse | null>;
  addMovieToListError: Ref<Error | null>;
  addMovieToListLoading: Ref<boolean>;
  removeMovieFromListResponse: Ref<MovieSetAccountStateResponse | null>;
  removeMovieFromListError: Ref<Error | null>;
  removeMovieFromListLoading: Ref<boolean>;
  getMovieLists: (accountId: number, session_id: string) => Promise<void>;
  isMoviePersistInList: (
    movieId: number,
    type: VideoType,
    listId: number,
    access_token: string
  ) => Promise<boolean | void>;
  addMovieToList: (
    movieId: number,
    type: VideoType,
    listId: number,
    access_token: string
  ) => Promise<void>;
  deleteMovieFromList: (
    movieId: number,
    type: VideoType,
    listId: number,
    session_id: string
  ) => Promise<void>;
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

  const isMoviePersistInList = async (
    movieId: number,
    type: VideoType,
    listId: number,
    access_token: string
  ): Promise<boolean | void> => {
    movieListsLoading.value = true;
    try {
      const response = await checkMovieListState(movieId, type, listId, access_token);
      const isMovieInList = response.data as {
        id: string | null;
        media_id: number;
        media_type: string;
        status_code: number;
        status_message: string;
        success: boolean;
      };
      movieListsError.value = null;
      return isMovieInList.success;
    } catch (err) {
      movieListsError.value = err as Error;
    } finally {
      movieListsLoading.value = false;
    }
  };

  const addMovieToListResponse = ref<MovieSetAccountStateResponse | null>(null);
  const addMovieToListError = ref<Error | null>(null);
  const addMovieToListLoading = ref<boolean>(false);

  const addMovieToList = async (
    movieId: number,
    type: VideoType,
    listId: number,
    access_token: string
  ) => {
    addMovieToListLoading.value = true;
    try {
      const response = await addToList(movieId, listId, access_token, type);
      addMovieToListResponse.value = response.data as MovieSetAccountStateResponse;
      addMovieToListError.value = null;
    } catch (err) {
      addMovieToListError.value = err as Error;
    } finally {
      addMovieToListLoading.value = false;
    }
  };

  const removeMovieFromListResponse = ref<MovieSetAccountStateResponse | null>(null);
  const removeMovieFromListError = ref<Error | null>(null);
  const removeMovieFromListLoading = ref<boolean>(false);

  const deleteMovieFromList = async (
    movieId: number,
    type: VideoType,
    listId: number,
    access_token: string
  ) => {
    removeMovieFromListLoading.value = true;
    try {
      const response = await removeFromList(movieId, listId, access_token, type);
      removeMovieFromListResponse.value = response.data as MovieSetAccountStateResponse;
      removeMovieFromListError.value = null;
    } catch (err) {
      removeMovieFromListError.value = err as Error;
    } finally {
      removeMovieFromListLoading.value = false;
    }
  };

  return {
    movieListsLoading,
    movieListsResult,
    movieListsError,
    addMovieToListResponse,
    addMovieToListError,
    addMovieToListLoading,
    removeMovieFromListResponse,
    removeMovieFromListError,
    removeMovieFromListLoading,
    getMovieLists,
    addMovieToList,
    deleteMovieFromList,
    isMoviePersistInList,
  };
};

export default useMovieLists;
