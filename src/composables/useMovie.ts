import { fetchMovie, movieCredits, movieVideos } from '../api/movie';
import { Movie, MovieDetails, TVShow, VideoType } from '@/types/movie';
import { ref, Ref } from 'vue';

const useMovie = (type: VideoType, movieId: number): MovieDetails => {
  const details = ref<Movie | TVShow | null>(null);
  const detailsError = ref<Error | null>(null);
  const creditsError = ref<Error | null>(null);
  const videosError = ref<Error | null>(null);
  const detailsLoading = ref<boolean>(false);
  const creditsLoading = ref<boolean>(false);
  const videosLoading = ref<boolean>(false);

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
        details.value.credits = response.data;
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
        details.value.videos = response.data;
        videosError.value = null;
      }
    } catch (err) {
      videosError.value = err as Error;
    } finally {
      videosLoading.value = false;
    }
  };

  return {
    details,
    detailsLoading,
    detailsError,
    creditsLoading,
    creditsError,
    videosLoading,
    videosError,
    getDetails,
    getCredits,
    getVideo,
  };
};

export default useMovie;
