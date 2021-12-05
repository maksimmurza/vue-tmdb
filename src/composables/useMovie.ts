import { fetchMovie, movieCredits } from '../api/movie';
import { Movie } from '@/types';
import { ref, Ref } from 'vue';

const useMovie = (
  movieId: number
): {
  loading: Ref<boolean>;
  movie: Ref<Movie | null>;
  error: Ref<Error | null>;
  getMovie: () => Promise<void>;
  getMovieCredits: () => Promise<void>;
} => {
  const movie = ref<Movie | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const getMovie = async () => {
    loading.value = true;
    try {
      const response = await fetchMovie(movieId);
      movie.value = response.data;
      error.value = null;
      getMovieCredits();
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  const getMovieCredits = async () => {
    loading.value = true;
    try {
      const response = await movieCredits(movieId);
      if (movie.value) {
        movie.value.credits = response.data;
      }
      error.value = null;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    movie,
    error,
    getMovie,
    getMovieCredits,
  };
};

export default useMovie;
