import { checkMovieListState, addToList, removeFromList } from '../api/account';
import { ref, Ref } from 'vue';
import { VideoType } from '@/types/movie';
import { MoviePresenceResponse, MovieSetAccountStateResponse } from '@/types/fetching';

const useListMovie = (): {
  addMovieToListResponse: Ref<MovieSetAccountStateResponse | null>;
  addMovieToListError: Ref<Error | null>;
  addMovieToListLoading: Ref<boolean>;
  removeMovieFromListResponse: Ref<MovieSetAccountStateResponse | null>;
  removeMovieFromListError: Ref<Error | null>;
  removeMovieFromListLoading: Ref<boolean>;
  isMoviePresentInList: (
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
  const moviePresence = ref<MoviePresenceResponse | null>(null);
  const moviePresenceLoading = ref<boolean>(false);
  const moviePresenceError = ref<Error | null>(null);

  const isMoviePresentInList = async (
    movieId: number,
    type: VideoType,
    listId: number,
    access_token: string
  ): Promise<boolean | void> => {
    moviePresenceLoading.value = true;
    try {
      const response = await checkMovieListState(movieId, type, listId, access_token);
      moviePresence.value = response.data as MoviePresenceResponse;
      moviePresenceError.value = null;
      return moviePresence.value.success;
    } catch (err) {
      moviePresenceError.value = err as Error;
    } finally {
      moviePresenceLoading.value = false;
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
    addMovieToListResponse,
    addMovieToListError,
    addMovieToListLoading,
    removeMovieFromListResponse,
    removeMovieFromListError,
    removeMovieFromListLoading,
    addMovieToList,
    deleteMovieFromList,
    isMoviePresentInList,
  };
};

export default useListMovie;
