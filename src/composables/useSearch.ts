import { searchMovies } from '../api/movies';
import { MoviesListResponse } from '@/types/fetching';
import { ref, Ref } from 'vue';
import { VideoType } from '@/types/movie';

const useSearch = (): {
  searchLoading: Ref<boolean>;
  searchResults: Ref<MoviesListResponse<VideoType>>;
  searchError: Ref<Error | null>;
  getMoviesByQuery: (query: string, page?: number) => Promise<void>;
} => {
  const searchLoading = ref<boolean>(false);
  const searchResults = ref<MoviesListResponse<VideoType>>({
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  }) as Ref<MoviesListResponse<VideoType>>;
  const searchError = ref<Error | null>(null);

  const getMoviesByQuery = async (query: string, page?: number) => {
    searchLoading.value = true;
    try {
      if (page) {
        searchResults.value = searchMovies(query, page) as unknown as MoviesListResponse<VideoType>;
      } else {
        searchResults.value = searchMovies(query) as unknown as MoviesListResponse<VideoType>;
      }
    } catch (err) {
      searchError.value = err as Error;
    } finally {
      searchLoading.value = false;
    }
  };

  return {
    searchLoading,
    searchResults,
    searchError,
    getMoviesByQuery,
  };
};

export default useSearch;
