import { MovieFilters, MovieFiltersWithRefGenres, MovieKey, VideoType } from '@/types/movie';
import { computed, ComputedRef, Ref, ref } from 'vue';
import getAirDates from '../utils/getAirDates';
import useGenres from './useGenres';
import { sortOptions } from '../constants';

const useFilters = (
  type: VideoType,
  key: MovieKey
): {
  filters: Ref<MovieFilters>;
  getFilters: () => void;
  filtersLoading: ComputedRef<boolean>;
  filtersError: ComputedRef<Error | null>;
} => {
  const { begin: releaseDateGteValue, end: releaseDateLteValue } = getAirDates(key);
  const { loading: genresLoading, genresOptions, error: genresError, getGenres } = useGenres(type);

  const filters = ref<MovieFiltersWithRefGenres>({
    sortOptions,
    sortValue: key === 'top-rated' ? 'vote_average.desc' : 'popularity.desc',
    genresOptions,
    genresValue: null,
    scoreValue: [0, 100],
    votesValue: 0,
    releaseDateGteValue,
    releaseDateLteValue,
  });

  const filtersLoading = computed(() => genresLoading.value);
  const filtersError = computed(() => genresError.value);

  const getFilters = () => {
    getGenres();
  };

  return { filters, getFilters, filtersLoading, filtersError };
};

export default useFilters;
