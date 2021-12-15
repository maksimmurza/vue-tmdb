import { fetchMovie, movieCredits, movieVideos } from '../api/movie';
import { Movie, TVShow, VideoType } from '@/types/movie';
import { ref, Ref, watch } from 'vue';

const useMovie = (
  type: VideoType,
  movieId: number
): {
  movieDetailsLoading: Ref<boolean>;
  movieCreditsLoading: Ref<boolean>;
  movieVideosLoading: Ref<boolean>;
  movie: Ref<Movie | TVShow | null>;
  movieDetailsError: Ref<Error | null>;
  movieCreditsError: Ref<Error | null>;
  movieVideosError: Ref<Error | null>;
  getMovie: () => Promise<void>;
  getMovieCredits: () => Promise<void>;
  getMovieVideo: () => Promise<void>;
} => {
  const movie = ref<Movie | TVShow | null>(null);
  const movieDetailsError = ref<Error | null>(null);
  const movieCreditsError = ref<Error | null>(null);
  const movieVideosError = ref<Error | null>(null);
  const movieDetailsLoading = ref<boolean>(false);
  const movieCreditsLoading = ref<boolean>(false);
  const movieVideosLoading = ref<boolean>(false);

  const getMovie = async () => {
    movieDetailsLoading.value = true;
    try {
      const response = await fetchMovie(type, movieId);
      movie.value = response.data;
      movieDetailsError.value = null;
    } catch (err) {
      movieDetailsError.value = err as Error;
    } finally {
      movieDetailsLoading.value = false;
    }
    return;
  };

  const getMovieCredits = async () => {
    movieCreditsLoading.value = true;
    try {
      if (movie.value) {
        const response = await movieCredits(type, movieId);
        movie.value.credits = response.data;
        movieCreditsError.value = null;
      }
    } catch (err) {
      movieCreditsError.value = err as Error;
    } finally {
      movieCreditsLoading.value = false;
    }
  };

  const getMovieVideo = async () => {
    movieVideosLoading.value = true;
    try {
      if (movie.value) {
        const response = await movieVideos(type, movieId);
        movie.value.videos = response.data;
        movieVideosError.value = null;
      }
    } catch (err) {
      movieVideosError.value = err as Error;
    } finally {
      movieVideosLoading.value = false;
    }
  };

  return {
    movieDetailsLoading,
    movieCreditsLoading,
    movieVideosLoading,
    movie,
    movieDetailsError,
    movieCreditsError,
    movieVideosError,
    getMovie,
    getMovieCredits,
    getMovieVideo,
  };
};

export default useMovie;
