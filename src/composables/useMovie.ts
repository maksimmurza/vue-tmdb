import { fetchMovie, movieCredits, movieVideos } from '../api/movie';
import {
  MotionPictureVideo,
  Movie,
  MovieAccountStates,
  MovieInfo,
  TVShow,
  VideoType,
} from '@/types/movie';
import { computed, ref } from 'vue';
import { MovieCredits } from '@/types/credits';
import { fetchMovieAccountStates } from '@/api/account';

const useMovie = (type: VideoType, movieId: number): MovieInfo => {
  const details = ref<Movie | TVShow | null>(null);
  const detailsLoading = ref<boolean>(false);
  const detailsError = ref<Error | null>(null);
  const credits = ref<MovieCredits | null>(null);
  const creditsLoading = ref<boolean>(false);
  const creditsError = ref<Error | null>(null);
  const video = ref<Array<MotionPictureVideo>>([]);
  const videosLoading = ref<boolean>(false);
  const videosError = ref<Error | null>(null);

  const getDetails = async () => {
    detailsLoading.value = true;
    try {
      const response = await fetchMovie(type, movieId);
      details.value = response.data;
      detailsError.value = null;
    } catch (err) {
      detailsError.value = err as Error;
    } finally {
      detailsLoading.value = false;
    }
    return;
  };

  const getCredits = async () => {
    creditsLoading.value = true;
    try {
      if (details.value) {
        const response = await movieCredits(type, movieId);
        credits.value = response.data;
        creditsError.value = null;
      }
    } catch (err) {
      creditsError.value = err as Error;
    } finally {
      creditsLoading.value = false;
    }
  };

  const getVideo = async () => {
    videosLoading.value = true;
    try {
      if (details.value) {
        const response = await movieVideos(type, movieId);
        video.value = response.data.results;
        videosError.value = null;
      }
    } catch (err) {
      videosError.value = err as Error;
    } finally {
      videosLoading.value = false;
    }
  };

  const backgroundImageURL = computed(
    () => process.env.VUE_APP_BACKGROUND_IMG_URL + details.value?.backdrop_path
  );

  const backgroundImageStyle = computed(() => ({
    backgroundImage: `url(${backgroundImageURL.value})`,
  }));

  const coverURL = computed(() => process.env.VUE_APP_IMG_URL + details.value?.poster_path);

  const trailerURL = computed(() => {
    const officialTrailer = video.value.find(video => video.name === 'Official Trailer');

    if (officialTrailer) {
      return `https://www.youtube.com/embed/${officialTrailer.key}`;
    }

    const trailer = video.value.find(video => video.type === 'Trailer');

    if (trailer) {
      return `https://www.youtube.com/embed/${trailer.key}`;
    }

    return null;
  });

  return {
    details,
    detailsLoading,
    detailsError,
    credits,
    creditsLoading,
    creditsError,
    video,
    videosLoading,
    videosError,
    coverURL,
    trailerURL,
    backgroundImageURL,
    backgroundImageStyle,
    getDetails,
    getCredits,
    getVideo,
  };
};

export default useMovie;
