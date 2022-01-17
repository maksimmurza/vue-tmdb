import { searchMovies } from '../api/movies';
import { MoviesListResponse } from '@/types/fetching';
import { ref, Ref } from 'vue';
import { Movie, MoviesSearchResults, TVShow } from '@/types/movie';

const useSearch = (): {
  searchLoading: Ref<boolean>;
  searchResults: Ref<MoviesListResponse<MoviesSearchResults>>;
  searchError: Ref<Error | null>;
  getMoviesByQuery: (query: string, page?: number) => Promise<void>;
} => {
  const searchLoading = ref<boolean>(false);
  const searchResults = ref<MoviesListResponse<MoviesSearchResults>>({
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  });
  const searchError = ref<Error | null>(null);

  const getMoviesByQuery = async (query: string, page?: number) => {
    searchLoading.value = true;
    try {
      let response;
      if (page) {
        response = await searchMovies(query, page);
      } else {
        response = await searchMovies(query);
      }
      searchResults.value = response.data;
      searchError.value = null;
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
