import { motionPicturesFetchingService } from '../api/movies';
import { MoviesListResponse, MoviesFetchingService } from '@/types/fetching';
import { ref, Ref, toRefs } from 'vue';
import { Movie, TVShow, VideoType } from '@/types/movie';

const useMovies = <Type extends Movie | TVShow>(
  type: VideoType,
  key: keyof MoviesFetchingService<Type>
): {
  loading: Ref<boolean>;
  movies: Ref<MoviesListResponse<Type>>;
  getMovies: (page?: number, filters?: any) => Promise<void>;
  error: Ref<Error | null>;
} => {
  const movies = ref<MoviesListResponse<Type>>({
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  }) as Ref<MoviesListResponse<Type>>;
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const getMovies = async (page = 1, filters: any) => {
    loading.value = true;
    try {
      const fetchingService = motionPicturesFetchingService[type];
      const fetchingFunction = fetchingService[filters ? 'discover' : key];
      if (fetchingFunction) {
        const response = await fetchingFunction(page, filters && toRefs(filters));
        movies.value = response.data as MoviesListResponse<Type>;
        error.value = null;
      }
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
