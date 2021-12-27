import { setRating, deleteRating } from '../api/account';
import { VideoType } from '@/types/movie';
import { ref, Ref } from 'vue';
import { MovieSetAccountStateResponse } from '@/types/fetching';

const useRating = (): {
  setRatingValueLoading: Ref<boolean>;
  setRatingValueResult: Ref<MovieSetAccountStateResponse | null>;
  setRatingValueError: Ref<Error | null>;
  deleteRatingValueLoading: Ref<boolean>;
  deleteRatingValueResult: Ref<MovieSetAccountStateResponse | null>;
  deleteRatingValueError: Ref<Error | null>;
  setRatingValue: (
    session_id: string,
    type: VideoType,
    movieId: number,
    ratingValue: number
  ) => Promise<void>;
  deleteRatingValue: (session_id: string, type: VideoType, movieId: number) => Promise<void>;
} => {
  const setRatingValueLoading = ref<boolean>(false);
  const setRatingValueResult = ref<MovieSetAccountStateResponse | null>(null);
  const setRatingValueError = ref<Error | null>(null);
  const deleteRatingValueLoading = ref<boolean>(false);
  const deleteRatingValueResult = ref<MovieSetAccountStateResponse | null>(null);
  const deleteRatingValueError = ref<Error | null>(null);

  const setRatingValue = async (
    session_id: string,
    type: VideoType,
    movieId: number,
    ratingValue: number
  ) => {
    setRatingValueLoading.value = true;
    try {
      const response = await setRating(session_id, type, movieId, ratingValue);
      setRatingValueResult.value = response.data as MovieSetAccountStateResponse;
      setRatingValueError.value = null;
    } catch (err) {
      setRatingValueError.value = err as Error;
    } finally {
      setRatingValueLoading.value = false;
    }
  };

  const deleteRatingValue = async (session_id: string, type: VideoType, movieId: number) => {
    deleteRatingValueLoading.value = true;
    try {
      const response = await deleteRating(session_id, type, movieId);
      deleteRatingValueResult.value = response.data as MovieSetAccountStateResponse;
      deleteRatingValueError.value = null;
    } catch (err) {
      deleteRatingValueError.value = err as Error;
    } finally {
      deleteRatingValueLoading.value = false;
    }
  };

  return {
    setRatingValueLoading,
    setRatingValueResult,
    setRatingValueError,
    deleteRatingValueLoading,
    deleteRatingValueResult,
    deleteRatingValueError,
    setRatingValue,
    deleteRatingValue,
  };
};

export default useRating;
