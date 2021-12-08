import { moviesFetchingService, MoviesFetchingService } from '../api/movies';
import { MoviesResponse } from '@/types';
import { ref, Ref } from 'vue';

const useMovies = (
  type: keyof MoviesFetchingService
): {
  loading: Ref<boolean>;
  movies: Ref<MoviesResponse>;
  getMovies: (page?: number) => Promise<void>;
  error: Ref<Error | null>;
} => {
  const movies = ref<MoviesResponse>({
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  });
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const getMovies = async (page = 1) => {
    loading.value = true;
    try {
      const response = await moviesFetchingService[type](page);
      movies.value = response.data as MoviesResponse;
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
