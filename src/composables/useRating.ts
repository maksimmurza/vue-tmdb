import { setRating, deleteRating, ratedMovies } from '../api/account';
import { Movie, TVShow, VideoType } from '@/types/movie';
import { ref, Ref } from 'vue';
import { MovieSetAccountStateResponse, MoviesListResponse } from '@/types/fetching';

const useRating = (): {
  ratedMoviesResults: Ref<MoviesListResponse<Movie | TVShow> | null>;
  ratedMoviesLoading: Ref<boolean>;
  ratedMoviesError: Ref<Error | null>;
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
  getRatedMovies: (
    account_id: number,
    session_id: string,
    type: VideoType | 'all'
  ) => Promise<void>;
} => {
  const ratedMoviesResults = ref<MoviesListResponse<Movie | TVShow> | null>(null);
  const ratedMoviesLoading = ref<boolean>(false);
  const ratedMoviesError = ref<Error | null>(null);
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

  const getRatedMovies = async (
    account_id: number,
    session_id: string,
    type: VideoType | 'all'
  ) => {
    ratedMoviesLoading.value = true;
    try {
      if (type === 'all') {
        let response = await ratedMovies(account_id, session_id, 'movie');
        ratedMoviesResults.value = response.data as MoviesListResponse<Movie | TVShow>;
        ratedMoviesResults.value.results = ratedMoviesResults.value.results.map(movie => ({
          ...movie,
          type: 'movie',
        }));
        response = await ratedMovies(account_id, session_id, 'tv');
        ratedMoviesResults.value.results = ratedMoviesResults.value.results.concat(
          (response.data.results as Array<Movie | TVShow>).map(movie => ({ ...movie, type: 'tv' }))
        );
      } else {
        const response = await ratedMovies(account_id, session_id, type);
        ratedMoviesResults.value = response.data;
        ratedMoviesError.value = null;
      }
    } catch (err) {
      ratedMoviesError.value = err as Error;
    } finally {
      ratedMoviesLoading.value = false;
    }
  };

  return {
    ratedMoviesResults,
    ratedMoviesLoading,
    ratedMoviesError,
    setRatingValueLoading,
    setRatingValueResult,
    setRatingValueError,
    deleteRatingValueLoading,
    deleteRatingValueResult,
    deleteRatingValueError,
    setRatingValue,
    deleteRatingValue,
    getRatedMovies,
  };
};

export default useRating;
