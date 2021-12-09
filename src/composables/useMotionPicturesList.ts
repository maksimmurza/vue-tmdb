import { motionPicturesFetchingService } from '../api/motionPictures';
import { MotionPicturesListResponse, MotionPicturesFetchingService } from '@/types/fetching';
import { ref, Ref } from 'vue';

const useMotionPicturesList = <Type>(
  type: 'movie' | 'tv',
  key: keyof MotionPicturesFetchingService<Type>
): {
  loading: Ref<boolean>;
  motionPictures: Ref<MotionPicturesListResponse<Type>>;
  getMotionPictures: (page?: number) => Promise<void>;
  error: Ref<Error | null>;
} => {
  const motionPictures = ref<MotionPicturesListResponse<Type>>({
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  }) as Ref<MotionPicturesListResponse<Type>>;
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const getMotionPictures = async (page = 1) => {
    loading.value = true;
    try {
      const fetchingService = motionPicturesFetchingService[type];
      const fetchingFunction = fetchingService[key];
      if (fetchingFunction) {
        const response = await fetchingFunction(page);
        motionPictures.value = response.data as unknown as MotionPicturesListResponse<Type>;
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
    motionPictures,
    error,
    getMotionPictures,
  };
};

export default useMotionPicturesList;
