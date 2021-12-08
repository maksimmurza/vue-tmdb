import { tvShowsFetchingService, TVShowsFetchingService } from '../api/movies';
import { TVShowsResponse } from '@/types';
import { ref, Ref } from 'vue';

const useTVShows = (
  type: keyof TVShowsFetchingService
): {
  loading: Ref<boolean>;
  movies: Ref<TVShowsResponse>;
  getMovies: (page?: number) => Promise<void>;
  error: Ref<Error | null>;
} => {
  const movies = ref<TVShowsResponse>({
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
      const response = await tvShowsFetchingService[type](page);
      movies.value = response.data;
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
