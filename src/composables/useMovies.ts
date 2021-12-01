import { movieFetchingService, MovieFetchingService } from '../api/movies';
import { Movie } from '@/types';
import { ref, Ref } from 'vue';

const useMovies = (
  type: keyof MovieFetchingService
): {
  loading: Ref<boolean>;
  movies: Ref<Array<Movie>>;
  getMovies: () => Promise<void>;
  error: Ref<Error | null>;
} => {
  const movies = ref<Array<Movie>>([]);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const getMovies = async () => {
    loading.value = true;
    try {
      const response = await movieFetchingService[type]();
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

export default useMovies;
