import { fetchMovieAccountStates } from '../api/account';
import { ref, Ref } from 'vue';
import { MovieAccountStates, VideoType } from '@/types/movie';

const useMovieAccountStates = (): {
  movieAccountStatesLoading: Ref<boolean>;
  movieAccountStates: Ref<MovieAccountStates | null>;
  movieAccountStatesError: Ref<Error | null>;
  getMovieAccountStates: (session_id: string, movieId: number, type: VideoType) => Promise<void>;
} => {
  const movieAccountStates = ref<MovieAccountStates | null>(null);
  const movieAccountStatesError = ref<Error | null>(null);
  const movieAccountStatesLoading = ref<boolean>(false);

  const getMovieAccountStates = async (session_id: string, movieId: number, type: VideoType) => {
    movieAccountStatesLoading.value = true;
    try {
      const response = await fetchMovieAccountStates(session_id, movieId, type);
      movieAccountStates.value = response.data as MovieAccountStates;
      movieAccountStatesError.value = null;
    } catch (err) {
      movieAccountStatesError.value = err as Error;
    } finally {
      movieAccountStatesLoading.value = false;
    }
  };

  return {
    movieAccountStatesLoading,
    movieAccountStates,
    movieAccountStatesError,
    getMovieAccountStates,
  };
};

export default useMovieAccountStates;
