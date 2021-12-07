import { tvShowsFetchingService, TVShowsFetchingService } from '../api/movies';
import { TVShow } from '@/types';
import { ref, Ref } from 'vue';

const useTVShows = (
  type: keyof TVShowsFetchingService
): {
  loading: Ref<boolean>;
  movies: Ref<Array<TVShow>>;
  getMovies: () => Promise<void>;
  error: Ref<Error | null>;
} => {
  const movies = ref<Array<TVShow>>([]);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const getMovies = async () => {
    loading.value = true;
    try {
      const response = await tvShowsFetchingService[type]();
      movies.value = response.data.results;
      error.value = null;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    movies,
    error,
    getMovies,
  };
};

export default useTVShows;
