import { moviesFetchingService } from '../api/movies';
import { MoviesListResponse } from '@/types/fetching';
import { ref, Ref } from 'vue';
import { Movie, MovieFilters, MovieKey, TVShow, VideoType } from '@/types/movie';

const useMovies = <Type extends Movie | TVShow>(
  type: VideoType,
  key: MovieKey<Type>
): {
  moviesLoading: Ref<boolean>;
  movies: Ref<MoviesListResponse<Type>>;
  getMovies: (page?: number, filters?: MovieFilters) => Promise<void>;
  moviesError: Ref<Error | null>;
} => {
  const movies = ref<MoviesListResponse<Type>>({
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  }) as Ref<MoviesListResponse<Type>>;
  const moviesError = ref<Error | null>(null);
  const moviesLoading = ref<boolean>(false);

  const getMovies = async (page = 1, filters?: MovieFilters) => {
    moviesLoading.value = true;
    try {
      const fetchingService = moviesFetchingService[type];
      let fetchingFunction, response;
      if (filters) {
        fetchingFunction = fetchingService['discover'];
        response = await fetchingFunction(page, filters);
      } else {
        fetchingFunction = fetchingService[key];
        if (fetchingFunction) {
          response = await fetchingFunction(page);
        }
      }
      movies.value = response?.data as MoviesListResponse<Type>;
      moviesError.value = null;
    } catch (err) {
      moviesError.value = err as Error;
    } finally {
      moviesLoading.value = false;
    }
  };

  return {
    moviesLoading,
    movies,
    moviesError,
    getMovies,
  };
};

export default useMovies;
