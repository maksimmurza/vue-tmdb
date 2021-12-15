import { fetchGenres } from '../api/genres';
import { Genre, VideoType } from '@/types/movie';
import { ref, Ref } from 'vue';

const useGenres = (
  type: VideoType
): {
  loading: Ref<boolean>;
  genres: Ref<Array<Genre>>;
  getGenres: () => Promise<void>;
  error: Ref<Error | null>;
} => {
  const genres = ref<Array<Genre>>([]);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const getGenres = async () => {
    loading.value = true;
    try {
      const response = await fetchGenres(type);
      genres.value = response.data.genres as Array<Genre>;
      error.value = null;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    genres,
    error,
    getGenres,
  };
};

export default useGenres;
