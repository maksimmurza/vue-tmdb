import { moviesFetchingService } from '../api/movies';
import { MoviesListResponse, MoviesFetchingService } from '@/types/fetching';
import { ref, Ref, toRefs } from 'vue';
import { Movie, TVShow, VideoType } from '@/types/movie';

const useMovies = <Type extends Movie | TVShow>(
  type: VideoType,
  key: keyof MoviesFetchingService<Type>
): {
  moviesLoading: Ref<boolean>;
  movies: Ref<MoviesListResponse<Type>>;
  getMovies: (page?: number, filters?: any) => Promise<void>;
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

  const getMovies = async (page = 1, filters: any) => {
    moviesLoading.value = true;
    try {
      const fetchingService = moviesFetchingService[type];
      const fetchingFunction = fetchingService[filters ? 'discover' : key];
      if (fetchingFunction) {
        const response = await fetchingFunction(page, filters && toRefs(filters));
        movies.value = response.data as MoviesListResponse<Type>;
        moviesError.value = null;
      }
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
